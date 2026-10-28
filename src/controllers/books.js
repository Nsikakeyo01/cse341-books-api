import { getAllBooks } from '../models/books.js';

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