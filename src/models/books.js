import { getDb } from '../db/connect.js';

export async function getAllBooks() {
    const db = getDb();

    return await db.collection('books')
        .find({})
        .project({ _id: 0 })
        .toArray();
}