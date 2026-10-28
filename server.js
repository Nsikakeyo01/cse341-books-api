import 'dotenv/config';
import dns from 'node:dns';
import app from './app.js';
import { connectToDb } from './src/db/connect.js';

dns.setServers(['8.8.8.8']);

const PORT = process.env.PORT || 3000;

await connectToDb();

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});