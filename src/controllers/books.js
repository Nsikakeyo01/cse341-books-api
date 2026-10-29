import { getAllBooks, getBookById } from '../models/books.js';

// GET /books - Retrieve all books
export async function getBooksHandler(req, res) {
    try {
        const books = await getAllBooks();

        res.status(200).json(books);
    } catch (error) {
        console.error('Error retrieving books:', error);

        res.status(500).json({
            message: 'Internal server error'
        });
    }
}

// GET /books/:id - Retrieve a single book
export async function getBookByIdHandler(req, res) {
    try {
        const book = await getBookById(req.params.id);

        if (!book) {
            return res.status(404).json({
                message: 'Book not found'
            });
        }

        return res.status(200).json(book);
    } catch (error) {
        console.error('Error retrieving book:', error);

        return res.status(500).json({
            message: 'Internal server error'
        });
    }
}