 import { createTransport } from "nodemailer";
  
  
  
  
  // Send OTP via email
        export const mailTransporter = createTransport({

            host: process.env.SMTP_HOST, // Outgoing server from cPanel
            port: process.env.SMTP_PORT, // Port for SSL
            secure: true, // true for port 465, false for other ports
            auth: {
                user: process.env.SMTP_USERNAME,
                pass: process.env.SMTP_PASSWORD
            }
        });