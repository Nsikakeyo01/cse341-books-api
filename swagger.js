
import swaggerAutogen from 'swagger-autogen';

const doc = {
    info: {
        title: 'CSE 341 Books and Authors API',
        description: 'REST API for managing books and authors using Express and MongoDB.',
        version: '1.0.0'
    },

    // Production and local development servers
    servers: [
        {
            url: 'https://cse341-books-api-0drw.onrender.com',
            description: 'Production server on Render'
        },
        {
            url: 'http://localhost:3000',
            description: 'Local development server'
        }
    ],

    consumes: ['application/json'],
    produces: ['application/json'],

    tags: [
        {
            name: 'Books',
            description: 'Books management endpoints'
        },
        {
            name: 'Authors',
            description: 'Authors management endpoints'
        }
    ],

    definitions: {
        Book: {
            id: 'b1',
            title: 'Things Fall Apart',
            authorId: 'a1',
            publicationDate: '1958-06-17'
        },
        Author: {
            id: 'a1',
            name: 'Chinua Achebe',
            birthYear: 1930
        }
    }
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./src/router.js'];

await swaggerAutogen({ openapi: '3.0.0' })(
    outputFile,
    endpointsFiles,
    doc
);

console.log('Swagger documentation generated successfully!');
