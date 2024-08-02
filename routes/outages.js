import express from 'express';
import { getAllOutages, getOutageById, createOutage, updateOutage, deleteOutage } from '../controllers/outageController.js';
import { checkUserSession } from '../middleware/auth.js';

const outageRouter = express.Router();

// Public routes
outageRouter.get('/', getAllOutages);
outageRouter.get('/:id', getOutageById);

// Protected routes (requires authentication)
outageRouter.post('/user/outage', checkUserSession, createOutage);
outageRouter.put('/user/outage/:id', checkUserSession, updateOutage);
outageRouter.delete('/user/outage/:id', checkUserSession, deleteOutage);

export default outageRouter;
