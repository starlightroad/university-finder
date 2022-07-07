import University from '../models/universityModel.js';
import tryCatch from '../utilities/tryCatch.js';
import Yelp from '../utilities/yelp.js';

export const getAllUniversities = async (req, res) => {
    const universities = await University.find().select('-__v');

    res.status(200).json({
        status: 'success',
        requestedAt: req.requestTime,
        results: universities.length,
        data: {
            universities
        }
    });
};

export const getUniversityReviews = tryCatch(async (req, res, next) => {
    const yelp = new Yelp();
    const data = await yelp.fetchReviews(req.params.id);

    res.status(200).json({
        status: 'success',
        id: req.params.id,
        data
    });
});
