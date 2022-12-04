const { MongoClient, ObjectId } = require('mongodb');

const config = {
    user: process.env.MONGO_USER,
    password: process.env.MONGO_PASSWORD,
    host: process.env.MONGO_HOST,
    port: process.env.MONGO_DOCKER_PORT,
    database: process.env.MONGO_DB,
    interval: process.env.MONGO_INTERVAL,
};

const mongoUrl = `mongodb+srv://${config.user}:${config.password}@${config.host}/${config.database}?retryWrites=true&w=majority`;
const conOptions = { useNewUrlParser: true };

let client = new MongoClient(mongoUrl, conOptions);

module.exports = {
    connect: async () => {
        try {
            const connection = await client.connect();
            client = connection.db(config.database);

            console.info('[MONGODB] successfully connected!!!');
            return client;
        } finally {
            // Ensures that the client will close when you finish/error
            // await client.close();
        }
    },
    closeDb: () => client.close(),
    getDb: () => client,
    isValidId: (id) => {
        if (ObjectId.isValid(id)) {
            if (String(new ObjectId(id)) === id) return true;

            return false;
        }
        return false;
    },
    ObjectId,
};
