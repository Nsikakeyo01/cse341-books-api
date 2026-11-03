
import {
    getAllBooks,
    getBookById,
    createBook,
    updateBook,
    deleteBook
} from '../models/books.js';

import { getAuthorById } from '../models/authors.js';

// Validate book information
function validateBook(book) {
    const { id, title, authorId, publicationDate } = book;

    if (
        typeof id !== 'string' || !id.trim() ||
        typeof title !== 'string' || !title.trim() ||
        typeof authorId !== 'string' || !authorId.trim() ||
        typeof publicationDate !== 'string' ||
        !/^\d{4}-\d{2}-\d{2}$/.test(publicationDate)
    ) {
        return false;
    }

    const date = new Date(publicationDate);

    return (
        !Number.isNaN(date.getTime()) &&
        date.toISOString().slice(0, 10) === publicationDate
    );
}

// GET /books - Retrieve all books
export async function getBooksHandler(req, res) {
    try {
        const books = await getAllBooks();
        return res.status(200).json(books);
    } catch (error) {
        console.error('Error fetching books:', error);
        return res.status(500).json({
            message: 'Failed to retrieve books'
        });
    }
}

// GET /books/:id - Retrieve one book
export async function getBookByIdHandler(req, res) {
    try {
        const id = req.params.id.trim();

        if (!id) {
            return res.status(400).json({
                message: 'A valid book ID is required'
            });
        }

        const book = await getBookById(id);

        if (!book) {
            return res.status(404).json({
                message: 'Book not found'
            });
        }

        return res.status(200).json(book);
    } catch (error) {
        console.error('Error fetching book:', error);
        return res.status(500).json({
            message: 'Failed to retrieve book'
        });
    }
}

// POST /books - Create a new book
export async function createBookHandler(req, res) {
    try {
        const { id, title, authorId, publicationDate } = req.body || {};

        if (!validateBook({ id, title, authorId, publicationDate })) {
            return res.status(400).json({
                message: 'Valid id, title, authorId, and publicationDate (YYYY-MM-DD) are required'
            });
        }

        const cleanId = id.trim();
        const cleanAuthorId = authorId.trim();

        const existingBook = await getBookById(cleanId);

        if (existingBook) {
            return res.status(400).json({
                message: 'A book with this ID already exists'
            });
        }

        const author = await getAuthorById(cleanAuthorId);

        if (!author) {
            return res.status(400).json({
                message: 'The specified author does not exist'
            });
        }

        const newBook = {
            id: cleanId,
            title: title.trim(),
            authorId: cleanAuthorId,
            publicationDate
        };

        await createBook(newBook);

        return res.status(201).json(newBook);
    } catch (error) {
        console.error('Error creating book:', error);
        return res.status(500).json({
            message: 'Failed to create book'
        });
    }
}

// PUT /books/:id - Update an existing book
export async function updateBookHandler(req, res) {
    try {
        const id = req.params.id.trim();
        const { title, authorId, publicationDate } = req.body || {};

        if (!id) {
            return res.status(400).json({
                message: 'A valid book ID is required'
            });
        }

        if (!validateBook({ id, title, authorId, publicationDate })) {
            return res.status(400).json({
                message: 'Valid title, authorId, and publicationDate (YYYY-MM-DD) are required'
            });
        }

        const existingBook = await getBookById(id);

        if (!existingBook) {
            return res.status(404).json({
                message: 'Book not found'
            });
        }

        const cleanAuthorId = authorId.trim();

        const author = await getAuthorById(cleanAuthorId);

        if (!author) {
            return res.status(400).json({
                message: 'The specified author does not exist'
            });
        }

        await updateBook(id, {
            title: title.trim(),
            authorId: cleanAuthorId,
            publicationDate
        });

        const updatedBook = await getBookById(id);

        return res.status(200).json(updatedBook);
    } catch (error) {
        console.error('Error updating book:', error);
        return res.status(500).json({
            message: 'Failed to update book'
        });
    }
}

// DELETE /books/:id - Delete a book
export async function deleteBookHandler(req, res) {
    try {
        const id = req.params.id.trim();

        if (!id) {
            return res.status(400).json({
                message: 'A valid book ID is required'
            });
        }

        const deletedCount = await deleteBook(id);

        if (deletedCount === 0) {
            return res.status(404).json({
                message: 'Book not found'
            });
        }

        return res.status(204).send();
    } catch (error) {
        console.error('Error deleting book:', error);
        return res.status(500).json({
            message: 'Failed to delete book'
        });
    }
}
