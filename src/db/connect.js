
import { MongoClient } from 'mongodb';

let client;
let db;

export async function connectToDb() {
    const uri = process.env.MONGODB_URI;
    const dbName = process.env.MONGODB_DB_NAME;

    if (!uri || !dbName) {
        throw new Error('MongoDB environment variables are missing');
    }

    client = new MongoClient(uri);
    await client.connect();

    db = client.db(dbName);
    await db.command({ ping: 1 });

    console.log('Connected to MongoDB');
}

export function getDb() {
    if (!db) {
        throw new Error('Database connection is not ready');
    }

    return db;
}
