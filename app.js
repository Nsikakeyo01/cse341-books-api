import express from 'express';
import router from './src/router.js';

const app = express();

app.use(express.json());
app.use(router);

app.get('/', (req, res) => {
    res.status(200).json({
        message: 'CSE 341 Books API is running successfully!'
    });
});

export default app;