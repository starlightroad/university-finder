const renderAppView = async (req, res, next) => {
    res.sendFile(`${process.env.__dirname}/src/views/app.html`);
};

export default renderAppView;
