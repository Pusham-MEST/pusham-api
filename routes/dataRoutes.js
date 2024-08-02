import express from 'express';
import { getAllData, getUserHomeData } from '../controllers/outdata.js';
import auth from '../middleware/auth.js'; 
// Middleware for user authentication

const router = express.Router();

// Route for landing page data (public access)
router.get('/data', getAllData);

// Route for user home page data (requires authentication)
router.get('/data/home', auth, getUserHomeData);

export default router;
