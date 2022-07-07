import express from 'express';
import renderAppView from '../controllers/appController.js';

const router = express.Router();

router.route('/').get(renderAppView);

export default router;
