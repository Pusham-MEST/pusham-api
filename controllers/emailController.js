import { mailTransporter } from "../config/mail.js";

export const sendNotificationEmail = async (req, res) => {
  const { to, subject, text, html } = req.body;

  const mailOptions = {
    // Sender address
    from: process.env.EMAIL_USER, to, subject, text, html };

  try {
    const info = await mailTransporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email sent successfully', info });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Failed to send email', error });
  }
};
