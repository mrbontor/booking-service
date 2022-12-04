const Mongo = require('../../../libraries/db/mongoDb');
const client = Mongo.getDb().db();
const { buildQueryMongoPagination, buildResponsePagination } = require('../../../helpers/mongoDbPagination');
const { UnprocessableEntityError, GeneralError, BadRequestError } = require('../../../helpers/exceptions');

const COLLECTION_NAME = 'user';

module.exports = {
    isUsernameOrEmailExist: async (data) => {
        const user = await client.collection(COLLECTION_NAME).findOne({
            $or: [{ username: data.username }, { email: data.email }],
        });

        if (user && user.username == data.username) {
            throw new UnprocessableEntityError('the username has been taken');
        }
        if (user && user.email == data.email) {
            throw new UnprocessableEntityError('the email has been taken');
        }
    },

    isUserIdExist: async (userId, options = {}) => {
        if (!Mongo.isValidId(userId)) {
            throw new BadRequestError('User not found!');
        }
        const user = await client.collection(COLLECTION_NAME).findOne({ _id: Mongo.ObjectId(userId) }, options);

        if (null === user) {
            throw new BadRequestError('User not found!');
        }
        return user;
    },

    save: async (data = {}, options = {}) => {
        const user = await client.collection(COLLECTION_NAME).insertOne(data, options);
        if (!user.insertedId) {
            throw new GeneralError('Something went wrong, please try again!');
        }
        return user.insertedId;
    },

    update: async (userId, payload = {}) => {
        if (!Mongo.isValidId(userId)) {
            throw new Error('User not found!');
        }

        const clause = { _id: Mongo.ObjectId(userId) };
        const data = { $set: payload };
        const options = { upsert: false, returnDocument: 'after' };
        const updateUser = await client.collection(COLLECTION_NAME).findOneAndUpdate(clause, data, options);
        if (!updateUser.value) {
            throw new BadRequestError('User not found!');
        }
        return updateUser.value;
    },

    updateCustom: async (filter, payload = {}) => {
        if (typeof filter.userId !== 'undefined' && !Mongo.isValidId(filter.userId)) {
            throw new BadRequestError('User not found!');
        }

        return await client.collection(COLLECTION_NAME).updateOne(filter, payload);
    },

    getByUserId: async (userId, projection = {}) => {
        if (!Mongo.isValidId(userId)) {
            throw new BadRequestError('User not found!');
        }

        return await client.collection(COLLECTION_NAME).findOne({ _id: Mongo.ObjectId(userId) }, projection);
    },

    getByUserEmail: async (email, projection = {}) => {
        return await client.collection(COLLECTION_NAME).findOne({ email: email }, projection);
    },

    findUser: async (payload, projection = {}) => {
        return await client.collection(COLLECTION_NAME).findOne(payload, projection);
    },

    getAllUsers: async (payload = {}, projection = null) => {
        const { search, status, userId } = payload || null;

        let query = {};
        let options = [{ $sort: { firstName: 1 } }];

        if (status) {
            if (typeof status == 'object') {
                query.isActive = { $in: status };
            } else {
                const statuses = status.toString().replace(/\s/g, '').split(',');

                if (statuses.length > 0) {
                    let stats = statuses.map((status) => JSON.parse(status));
                    query.isActive = { $in: stats };
                }
            }
        }

        if (search) {
            query.$or = [
                { username: { $regex: search, $options: 'i' } },
                { firstName: { $regex: search, $options: 'i' } },
                { lastName: { $regex: search, $options: 'i' } },
                { email: { $regex: search, $options: 'i' } },
            ];

            options.push({ $limit: 10 });
        }

        let userIds = [];
        if (userId) {
            userIds = userId.replace(/\s/g, '').split(',');

            if (userIds.length > 0) {
                let ids = [];
                userIds.forEach((id) => {
                    if (Mongo.isValidId(id)) {
                        ids.push(Mongo.ObjectId(id));
                    }
                });

                query._id = { $in: ids };
            }
        }

        if (projection) {
            options.push({ $project: projection });
        }
        const queryUser = [{ $match: query }, ...options];

        return (await client.collection(COLLECTION_NAME).aggregate(queryUser).toArray()) || [];
    },

    getTableUsers: async (payload = {}, fieldSearch = [], projection = null) => {
        const query = buildQueryMongoPagination(payload, fieldSearch, projection);
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

        const list = await client.collection(COLLECTION_NAME).aggregate(queryTable).toArray();

        return buildResponsePagination(payload, list);
    },

    delete: async (userId) => {
        if (!Mongo.isValidId(userId)) {
            throw new BadRequestError('User not found!');
        }

        const clause = { _id: Mongo.ObjectId(userId) };

        return await client.collection(COLLECTION_NAME).findOneAndDelete(clause, { projection: { _id: 1 } });
    },
};
