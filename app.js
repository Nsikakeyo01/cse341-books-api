
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import router from './src/router.js';
import swaggerDocument from './swagger-output.json' with { type: 'json' };

const app = express();

// Allow the API to receive JSON data
app.use(express.json());

// Swagger API documentation
app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument)
);

// Books and Authors API routes
app.use(router);

// Home route
app.get('/', (req, res) => {
    res.status(200).json({
        message: 'CSE 341 Books API is running successfully!'
    });
});

export default app;
