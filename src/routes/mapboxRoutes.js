import express from 'express';
import * as mapController from '../controllers/mapController.js';

const router = express.Router();

router.route('/token').get(mapController.getToken);

export default router;
