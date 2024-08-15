import Router from 'express';
import { createOutage, getOutages, getOutageById, getOutagesByNeighbourhood, updateOutage, deleteOutage, search } from '../controllers/outageController.js';
import { checkUserSession, isAdmin } from '../middleware/auth.js';


const outageRouter = Router();

// Public routes
outageRouter.get('/neighbourhoods/:id/outages', getOutagesByNeighbourhood); 
outageRouter.get('/outages', getOutages);
outageRouter.get('/outages/:id', getOutageById);


 // Protected routes (requires authentication)
outageRouter.post('/outages', checkUserSession, isAdmin , createOutage);
outageRouter.patch('/outages/:id',  checkUserSession, isAdmin , updateOutage);
outageRouter.delete('/outages/:id', checkUserSession, isAdmin , deleteOutage);


// New route for outages by neighborhood
outageRouter.get('/search', search);


export default outageRouter;
