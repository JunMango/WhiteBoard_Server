import {MongoClient,ServerApiVersion} from "mongodb";

const uri = process.env.MONGODB_SECRET;
const MongoDbClient = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        await MongoDbClient.connect();
        await MongoDbClient.db("admin").command({ ping: 1 });
    } finally {
        await MongoDbClient.close();
    }
}
run().catch(console.dir);
export async function connectMongoDB() {
    try {
        // Check connection by pinging the server
        await MongoDbClient.connect();
        await MongoDbClient.db("admin").command({ ping: 1 });
        console.log("MongoDb 연결-----------------------------------");
        return MongoDbClient;
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        throw error;
    }
}

export async function closeMongoDB() {
    try {
        await MongoDbClient.close(); // No need to check topology, safe to call
        console.log("MongoDb 연결 종료----------------------------------");
    } catch (error) {
        console.error("Error closing MongoDB connection:", error);
        throw error;
    }
}
export default MongoDbClient
