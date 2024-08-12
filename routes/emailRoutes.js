import express from 'express';
import { sendNotificationEmail } from '../controllers/emailController.js';

const router = express.Router();

// Route to send an email
router.post('/send-email', sendNotificationEmail);

export default router;
