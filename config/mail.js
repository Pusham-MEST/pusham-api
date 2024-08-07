import nodemailer from 'nodemailer';

// Send OTP via email
export const mailTransporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST, // Outgoing server from cPanel
    port: parseInt(process.env.SMTP_PORT, 10), // Ensure the port is an integer
    secure: true, // true for port 465, false for other ports
    auth: {
        user: process.env.SMTP_USERNAME,
        pass: process.env.SMTP_PASSWORD
    }
});
