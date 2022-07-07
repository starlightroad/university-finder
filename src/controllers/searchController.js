import Yelp from '../utilities/yelp.js';

export const renderSearch = (req, res) => {
    res.status(200);
};

export const getSearchResults = async (req, res) => {
    let university = null;
    let coords = null;
    let data = null;

    if (!req.params.university) {
        coords = req.params;
        const yelp = new Yelp();
        data = await yelp.fetch(coords);
    }

    if (req.params.university) {
        university = req.params;
        const yelp = new Yelp();
        data = await yelp.fetch(university);
    }

    res.status(200).json({
        status: 'success',
        q: university,
        data
    });
};
