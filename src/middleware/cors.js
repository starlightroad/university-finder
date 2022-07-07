import cors from 'cors';

export default () => {
    const options = {
        origin: 'https://www.example.com',
        optionsSuccessStatus: 200
    };

    return cors(options);
};
