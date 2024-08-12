import nodemailer from 'nodemailer';

// Send OTP via email
export const mailTransporter = nodemailer.createTransport({
    // Outgoing server from cPanel
    host: process.env.SMTP_HOST,
    // Ensure the port is an integer
    port: parseInt(process.env.SMTP_PORT, 10),
    // true for port 465, false for other ports
    secure: true, auth: {
        user: process.env.SMTP_USERNAME,
        pass: process.env.SMTP_PASSWORD
    }
});
