
import { getDb } from '../db/connect.js';

// GET /authors - Retrieve all authors
export async function getAllAuthors() {
    const db = getDb();

    return await db.collection('authors')
        .find({})
        .project({ _id: 0 })
        .toArray();
}

// GET /authors/:id - Retrieve one author by ID
export async function getAuthorById(id) {
    const db = getDb();

    return await db.collection('authors').findOne(
        { id: id },
        { projection: { _id: 0 } }
    );
}

// POST /authors - Create a new author
export async function createAuthor(author) {
    const db = getDb();

    const result = await db.collection('authors').insertOne(author);

    return result.insertedId;
}

// PUT /authors/:id - Update an existing author
export async function updateAuthor(id, authorData) {
    const db = getDb();

    const result = await db.collection('authors').updateOne(
        { id: id },
        {
            $set: {
                name: authorData.name,
                birthYear: authorData.birthYear
            }
        }
    );

    return result.matchedCount;
}

// DELETE /authors/:id - Delete an author
export async function deleteAuthor(id) {
    const db = getDb();

    // Check if any books reference this author
    const relatedBook = await db.collection('books').findOne({
        authorId: id
    });

    if (relatedBook) {
        return { status: 'has_books' };
    }

    // Delete the author
    const result = await db.collection('authors').deleteOne({
        id: id
    });

    if (result.deletedCount === 0) {
        return { status: 'not_found' };
    }

    return { status: 'deleted' };
}
