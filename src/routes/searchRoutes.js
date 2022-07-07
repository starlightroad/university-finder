import express from 'express';
import * as searchController from '../controllers/searchController.js';

const router = express.Router();

router.route('/university/:university').get(searchController.getSearchResults);
router.route('/coordinates/:latitude/:longitude').get(searchController.getSearchResults);

export default router;
