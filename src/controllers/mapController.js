const getToken = (req, res) => {
    const token = process.env.MAPBOX_API_KEY;

    res.status(200).json({
        status: 'success',
        requestedAt: req.requestTime,
        data: {
            token
        }
    });
};

export { getToken };
