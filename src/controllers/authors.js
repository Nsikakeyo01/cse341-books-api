
import {
    getAllAuthors as findAllAuthors,
    getAuthorById,
    createAuthor,
    updateAuthor,
    deleteAuthor
} from '../models/authors.js';

// GET /authors - Retrieve all authors
export async function getAllAuthors(req, res) {
    try {
        const authors = await findAllAuthors();

        return res.status(200).json(authors);
    } catch (error) {
        console.error('Error fetching authors:', error);

        return res.status(500).json({
            message: 'Failed to retrieve authors'
        });
    }
}

// GET /authors/:id - Retrieve one author
export async function getAuthorByIdHandler(req, res) {
    try {
        const author = await getAuthorById(req.params.id);

        if (!author) {
            return res.status(404).json({
                message: 'Author not found'
            });
        }

        return res.status(200).json(author);
    } catch (error) {
        console.error('Error fetching author:', error);

        return res.status(500).json({
            message: 'Failed to retrieve author'
        });
    }
}

// POST /authors - Create a new author
export async function createAuthorHandler(req, res) {
    try {
        const { id, name, birthYear } = req.body || {};

        if (
            typeof id !== 'string' || !id.trim() ||
            typeof name !== 'string' || !name.trim() ||
            !Number.isInteger(birthYear) ||
            birthYear < 1
        ) {
            return res.status(400).json({
                message: 'Valid id, name, and birthYear are required'
            });
        }

        const cleanId = id.trim();

        const existingAuthor = await getAuthorById(cleanId);

        if (existingAuthor) {
            return res.status(400).json({
                message: 'An author with this ID already exists'
            });
        }

        const newAuthor = {
            id: cleanId,
            name: name.trim(),
            birthYear
        };

        await createAuthor(newAuthor);

        return res.status(201).json(newAuthor);
    } catch (error) {
        console.error('Error creating author:', error);

        return res.status(500).json({
            message: 'Failed to create author'
        });
    }
}

// PUT /authors/:id - Update an author
export async function updateAuthorHandler(req, res) {
    try {
        const { id } = req.params;
        const { name, birthYear } = req.body || {};

        if (
            typeof name !== 'string' ||
            !name.trim() ||
            !Number.isInteger(birthYear) ||
            birthYear < 1
        ) {
            return res.status(400).json({
                message: 'Valid name and birthYear are required'
            });
        }

        const matchedCount = await updateAuthor(id, {
            name: name.trim(),
            birthYear
        });

        if (matchedCount === 0) {
            return res.status(404).json({
                message: 'Author not found'
            });
        }

        const updatedAuthor = await getAuthorById(id);

        return res.status(200).json(updatedAuthor);
    } catch (error) {
        console.error('Error updating author:', error);

        return res.status(500).json({
            message: 'Failed to update author'
        });
    }
}

// DELETE /authors/:id - Delete an author
export async function deleteAuthorHandler(req, res) {
    try {
        const { id } = req.params;

        const result = await deleteAuthor(id);

        if (result.status === 'has_books') {
            return res.status(409).json({
                message: 'Cannot delete an author with existing books'
            });
        }

        if (result.status === 'not_found') {
            return res.status(404).json({
                message: 'Author not found'
            });
        }

        return res.status(204).send();
    } catch (error) {
        console.error('Error deleting author:', error);

        return res.status(500).json({
            message: 'Failed to delete author'
        });
    }
}
