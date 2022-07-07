import express from 'express';
import homeRouter from './homeRoutes.js';
import universityRouter from './universityRoutes.js';
import searchRouter from './searchRoutes.js';
import mapboxRouter from './mapboxRoutes.js';

const router = express.Router();

router.use('/', homeRouter);
router.use('/universities', universityRouter);
router.use('/search', searchRouter);
router.use('/mapbox/api/v1', mapboxRouter);

export default router;
