import express from 'express';
import { getNeighbourhoods, getNeighbourhoodById, updateNeighbourhood, deleteNeighbourhood, getOutagesByNeighbourhood, search } from '../controllers/neighbourhoodController.js';

const neighbourhoodRouter = express.Router();

neighbourhoodRouter.get('/neighbourhoods', getNeighbourhoods);
neighbourhoodRouter.get('/neighbourhoods/:id', getNeighbourhoodById);
neighbourhoodRouter.put('/neighbourhoods/:id', updateNeighbourhood);
neighbourhoodRouter.delete('/neighbourhoods/:id', deleteNeighbourhood);

// New route for outages by neighborhood and search
neighbourhoodRouter.get('/search', search);
neighbourhoodRouter.get('/neighbourhoods/:id/outages', getOutagesByNeighbourhood); 

export default neighbourhoodRouter;
