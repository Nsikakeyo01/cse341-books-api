
import { Router } from 'express';

import {
    getBooksHandler,
    getBookByIdHandler,
    createBookHandler,
    updateBookHandler,
    deleteBookHandler
} from './controllers/books.js';

import {
    getAllAuthors,
    getAuthorByIdHandler,
    createAuthorHandler,
    updateAuthorHandler,
    deleteAuthorHandler
} from './controllers/authors.js';

const router = Router();

// Books routes
router.get('/books', getBooksHandler);
router.get('/books/:id', getBookByIdHandler);
router.post('/books', createBookHandler);
router.put('/books/:id', updateBookHandler);
router.delete('/books/:id', deleteBookHandler);

// Authors routes
router.get('/authors', getAllAuthors);
router.get('/authors/:id', getAuthorByIdHandler);
router.post('/authors', createAuthorHandler);
router.put('/authors/:id', updateAuthorHandler);
router.delete('/authors/:id', deleteAuthorHandler);

export default router;
