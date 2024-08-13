// import express from 'express';
// import { getAllOutages, getOutageById, createOutage, updateOutage, deleteOutage } from '../controllers/outageController.js';
// import { checkUserSession } from '../middleware/auth.js';

// // const outageRouter = express.Router();

// // Public routes
// outageRouter.get('/', getAllOutages);
// outageRouter.get('/:id', getOutageById);

// // Protected routes (requires authentication)
// outageRouter.post('/user/outage', checkUserSession, createOutage);
// outageRouter.put('/user/outage/:id', checkUserSession, updateOutage);
// outageRouter.delete('/user/outage/:id', checkUserSession, deleteOutage);

// export default outageRouter;



import express from 'express';
import { createOutage, getOutages, getOutageById, getOutagesByNeighbourhood, updateOutage, deleteOutage, search } from '../controllers/outageController.js';
import { sendOutageAlert } from '../controllers/outageController.js';
const outageRouter = express.Router();

outageRouter.post('/outages', createOutage);
outageRouter.get('/outages', getOutages);
outageRouter.get('/outages/:id', getOutageById);
outageRouter.put('/outages/:id', updateOutage);
outageRouter.delete('/outages/:id', deleteOutage);
outageRouter.post('/outages/send-outage-alert', sendOutageAlert); 
// New route for outages by neighborhood

outageRouter.get('/search', search);


export default outageRouter;