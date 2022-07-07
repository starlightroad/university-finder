import express from 'express';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
import corsMiddleware from './src/middleware/cors.js';

import AppError from './src/utilities/appError.js';
import globalErrorHandler from './src/controllers/errorController.js';
import router from './src/routes/routes.js';

process.env.__dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();

if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// app.use(cors());
app.use(express.static(`${process.env.__dirname}/public`));

app.use((req, res, next) => {
    const date = new Date().toISOString();
    req.requestTime = date;

    next();
});

app.use('/', corsMiddleware(), router);

app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

export default app;
