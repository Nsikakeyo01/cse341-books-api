
import { getDb } from '../db/connect.js';

// GET /books - Retrieve all books
export async function getAllBooks() {
    const db = getDb();

    return await db.collection('books')
        .find({})
        .project({ _id: 0 })
        .toArray();
}

// GET /books/:id - Retrieve one book by ID
export async function getBookById(id) {
    const db = getDb();

    return await db.collection('books').findOne(
        { id: id },
        { projection: { _id: 0 } }
    );
}

// POST /books - Create a new book
export async function createBook(book) {
    const db = getDb();

    const result = await db.collection('books').insertOne({
        ...book
    });

    return result.insertedId;
}

// PUT /books/:id - Update an existing book
export async function updateBook(id, bookData) {
    const db = getDb();

    const result = await db.collection('books').updateOne(
        { id: id },
        {
            $set: {
                title: bookData.title,
                authorId: bookData.authorId,
                publicationDate: bookData.publicationDate
            }
        }
    );

    return result.matchedCount;
}

// DELETE /books/:id - Delete a book
export async function deleteBook(id) {
    const db = getDb();

    const result = await db.collection('books').deleteOne({
        id: id
    });

    return result.deletedCount;
}
