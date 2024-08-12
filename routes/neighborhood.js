import express from 'express';
import { getNeighbourhoods, getNeighbourhoodById, updateNeighbourhood, deleteNeighbourhood, getOutagesByNeighbourhood } from '../controllers/neighbourhoodController.js';
import { checkUserSession } from '../middleware/auth.js';

const neighbourhoodRouter = express.Router();

neighbourhoodRouter.get('/neighbourhoods', checkUserSession, getNeighbourhoods);
neighbourhoodRouter.get('/neighbourhoods/:id', checkUserSession, getNeighbourhoodById);
neighbourhoodRouter.put('/neighbourhoods/:id', checkUserSession, updateNeighbourhood);
neighbourhoodRouter.delete('/neighbourhoods/:id', checkUserSession, deleteNeighbourhood);

// New route for outages by neighborhood and search
// neighbourhoodRouter.get('/search', search);
neighbourhoodRouter.get('/neighbourhoods/:id/outages', getOutagesByNeighbourhood); 

export default neighbourhoodRouter;
