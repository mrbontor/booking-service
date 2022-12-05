const Mongo = require('../../../libraries/db/mongoDb');
const client = Mongo.getDb().db();
const { buildQueryMongoPagination, buildResponsePagination } = require('../../../helpers/mongoDbPagination');
const { UnprocessableEntityError, GeneralError, BadRequestError } = require('../../../helpers/exceptions');

const COLLECTION_BOOKING = 'booking';
const COLLECTION_USER = 'user';

module.exports = {
    save: async (data = {}, options = {}) => {
        const booking = await client.collection(COLLECTION_BOOKING).insertOne(data, options);
        if (!booking.insertedId) {
            throw new GeneralError('Something went wrong, please try again!');
        }
        return booking.insertedId;
    },

    update: async (bookingId, payload = {}) => {
        if (!Mongo.isValidId(bookingId)) {
            throw new Error('Booking Id not found!');
        }

        const clause = { _id: Mongo.ObjectId(bookingId) };
        const data = { $set: payload };
        const options = { upsert: false, returnDocument: 'after' };
        const updateUser = await client.collection(COLLECTION_BOOKING).findOneAndUpdate(clause, data, options);
        if (!updateUser.value) {
            throw new BadRequestError('Failed to update, please check your data!');
        }
        return updateUser.value;
    },

    updateCustom: async (filter, payload = {}) => {
        if (typeof filter.bookingId !== 'undefined' && !Mongo.isValidId(filter.bookingId)) {
            throw new BadRequestError('Booking Id not found!');
        }

        return await client.collection(COLLECTION_BOOKING).updateOne(filter, payload);
    },

    findBooking: async (payload, projection = {}) => {
        return await client.collection(COLLECTION_BOOKING).findOne(payload, projection);
    },

    getById: async (bookingId, projection = {}) => {
        if (!Mongo.isValidId(bookingId)) {
            throw new BadRequestError('Booking Id not found!');
        }

        return await client.collection(COLLECTION_BOOKING).findOne({ _id: Mongo.ObjectId(bookingId) }, projection);
    },

    getByKey: async (bookKey, projection = {}) => {
        return await client.collection(COLLECTION_BOOKING).findOne({ bookKey: bookKey }, projection);
    },

    getAll: async (payload = {}, projection = null) => {
        const { search, status, bookingId } = payload || null;

        let query = {};
        let options = [{ $sort: { startDate: 1 } }];

        if (status) {
            const statuses = status.toString().replace(/\s/g, '').split(',');

            if (statuses.length > 0) {
                let stats = statuses.map((status) => JSON.parse(JSON.stringify(status)));
                query.status = { $in: stats };
            }
        }

        if (search) {
            query.$or = [
                { 'list.bookKey': { $regex: search, $options: 'i' } },
                { 'list.bookTitle': { $regex: search, $options: 'i' } },
            ];

            options.push({ $limit: 10 });
        }
        let bookingIds = [];
        if (bookingId) {
            bookingIds = bookingId.replace(/\s/g, '').split(',');

            if (bookingIds.length > 0) {
                let ids = [];
                bookingIds.forEach((id) => {
                    if (Mongo.isValidId(id)) {
                        ids.push(Mongo.ObjectId(id));
                    }
                });

                query._id = { $in: ids };
            }
        }

        if (projection) {
            options.push({ $project: projection, userAgregation });
        }

        const userAgregated = payload.userId ? userAgregation(payload.userId) : userAgregation();
        const queryfinal = [{ $match: query }, ...userAgregated, ...options];

        return (await client.collection(COLLECTION_BOOKING).aggregate(queryfinal).toArray()) || [];
    },

    getTable: async (payload = {}, fieldSearch = [], projection = null) => {
        let userAgregated = payload.userId ? userAgregation(payload.userId) : userAgregation();
        const query = buildQueryMongoPagination(payload, fieldSearch, projection, userAgregated);

        const queryTable = [
            {
                $facet: {
                    data: query,
                    count: [
                        {
                            $group: {
                                _id: 1,
                                totalRecord: { $sum: 1 },
                            },
                        },
                    ],
                },
            },
        ];
        const list = await client.collection(COLLECTION_BOOKING).aggregate(queryTable).toArray();

        return buildResponsePagination(payload, list);
    },

    delete: async (bookingId) => {
        if (!Mongo.isValidId(bookingId)) {
            throw new BadRequestError('Booking Id not found!');
        }

        const clause = {
            _id: Mongo.ObjectId(bookingId),
            status: { $ne: 'approved' },
        };

        return await client.collection(COLLECTION_BOOKING).findOneAndDelete(clause, { projection: { _id: 1 } });
    },
};

const userAgregation = (userId = '') => {
    let results = [
        {
            $lookup: {
                from: COLLECTION_USER,
                let: { userId: { $toObjectId: '$userId' } },
                pipeline: [
                    { $match: { $expr: { $eq: ['$_id', '$$userId'] } } },
                    {
                        $project: {
                            _id: 1,
                            fullname: { $concat: ['$firstName', ' ', '$lastName'] },
                        },
                    },
                ],
                as: 'userId',
            },
        },
        {
            $unwind: {
                path: '$userId',
                preserveNullAndEmptyArrays: true,
            },
        },
    ];

    if (userId && userId !== '') {
        const userIds = userId.replace(/\s/g, '').split(',');

        if (userIds.length > 0) {
            const ids = [];
            userIds.forEach((id) => {
                if (Mongo.isValidId(id)) {
                    ids.push(Mongo.ObjectId(id));
                }
            });

            results.push({ $match: { 'userId._id': { $in: ids } } });
        }
    }

    return results;
};
