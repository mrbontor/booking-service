const Mongo = require('../../libraries/db/mongoDb');
const client = Mongo.getDb().db();
const { buildQueryMongoPagination, buildResponsePagination } = require('../../helpers/mongoDbPagination');
const { GeneralError, BadRequestError, NotFoundError } = require('../../helpers/exceptions');

const COLLECTION_NAME = 'appResource';

module.exports = {
    save: async (data = {}, options = {}) => {
        const resource = await client.collection(COLLECTION_NAME).insertOne(data, options);
        if (!resource.insertedId) {
            throw new GeneralError('Something went wrong, please try again!');
        }
        return resource.insertedId;
    },

    update: async (resourceId, payload = {}) => {
        if (!Mongo.isValidId(resourceId)) {
            throw new NotFoundError('App resource not found!');
        }

        const clause = { _id: Mongo.ObjectId(resourceId) };
        const data = { $set: payload };
        const options = { upsert: false, returnDocument: 'after' };
        const update = await client.collection(COLLECTION_NAME).findOneAndUpdate(clause, data, options);
        if (!update.value) {
            throw new BadRequestError('Failed to update, please check your data!');
        }
        return update.value;
    },

    updateCustom: async (filter, payload = {}) => {
        if (typeof filter.resourceId !== 'undefined' && !Mongo.isValidId(filter.resourceId)) {
            throw new NotFoundError('App resource not found!');
        }

        return await client.collection(COLLECTION_NAME).updateOne(filter, payload);
    },

    delete: async (resourceId) => {
        if (!Mongo.isValidId(resourceId)) {
            throw new NotFoundError('App resource not found!');
        }

        const clause = { _id: Mongo.ObjectId(resourceId) };

        return await client.collection(COLLECTION_NAME).findOneAndDelete(clause, { projection: { _id: 1 } });
    },

    getOne: async (payload, projection = {}) => {
        return await client.collection(COLLECTION_NAME).findOne(payload, projection);
    },

    getById: async (resourceId, projection = {}) => {
        if (!Mongo.isValidId(resourceId)) {
            throw new NotFoundError('App resource not found!');
        }

        return await client.collection(COLLECTION_NAME).findOne({ _id: Mongo.ObjectId(resourceId) }, projection);
    },

    getByName: async (name, projection = {}) => {
        return await client.collection(COLLECTION_NAME).findOne({ name: name }, projection);
    },

    getAll: async (payload = {}, projection = null) => {
        const { search, status, resourceId } = payload || null;

        let query = {};
        let options = [{ $sort: { name: 1 } }];

        if (status) {
            if (typeof status == 'object') {
                query.status = { $in: status };
            } else {
                const statuses = status.toString().replace(/\s/g, '').split(',');

                if (statuses.length > 0) {
                    let stats = statuses.map((status) => JSON.parse(status));
                    query.status = { $in: stats };
                }
            }
        }

        if (search) {
            query.$or = [
                { name: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } },
            ];

            options.push({ $limit: 10 });
        }

        let resourceIds = [];
        if (resourceId) {
            resourceIds = resourceId.replace(/\s/g, '').split(',');

            if (resourceIds.length > 0) {
                let ids = [];
                resourceIds.forEach((id) => {
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
        const queryfinal = [{ $match: query }, ...options];

        return (await client.collection(COLLECTION_NAME).aggregate(queryfinal).toArray()) || [];
    },

    getTable: async (payload = {}, fieldSearch = [], projection = null) => {
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
};
