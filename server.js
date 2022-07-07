import mongoose from 'mongoose';
import dotenv from 'dotenv';
import app from './app.js';

dotenv.config({ path: './config.env' });

const PORT = process.env.PORT || 3030;
const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

mongoose
    .connect(DB, {
        useUnifiedTopology: true
    })
    .then(() => console.log('The DB connection has been established!'));

app.listen(PORT, () => {
    console.log(`Server is now running via port ${PORT}`);
});
