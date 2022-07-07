import express from 'express';
import * as universityController from '../controllers/universityController.js';

const router = express.Router();

router.route('/').get(universityController.getAllUniversities);
router.route('/:id/reviews').get(universityController.getUniversityReviews);

export default router;
