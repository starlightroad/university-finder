import AppError from '../utilities/appError.js';

const handleCastErrorDatabase = (err) => {
    const message = `Invalid ${err.path}: ${err.value}`;
    return new AppError(message, 400);
};

const sendErrorDevelopmentEnvironment = (err, res) => {
    res.status(err.statusCode).json({
        status: err.status,
        error: err,
        message: err.message,
        stack: err.stack
    });
};

const sendErrorProductionEnvironment = (err, res) => {
    if (err.isOperational) {
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message
        });
    }

    if (!err.isOperational) {
        console.error('ERROR 💥', err);

        res.status(500).json({
            status: 'error',
            message: 'Something went wrong'
        });
    }
};

export default (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    if (process.env.NODE_ENV === 'development') {
        sendErrorDevelopmentEnvironment(err, res);
    }

    if (process.env.NODE_ENV === 'production') {
        let error = { ...err };

        if (err.name === 'CastError') error = handleCastErrorDatabase(error);

        sendErrorProductionEnvironment(error, res);
    }
};
