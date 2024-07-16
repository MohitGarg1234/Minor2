const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const multer = require('multer');
const router = express.Router();

// Multer middleware for handling file uploads
const upload = multer();

// Nodemailer transporter configuration
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: "mgarg1557@gmail.com",
    pass: "mmhv esrk lnfp khvc",
  }
});

// Route to handle sending email
router.post('/send-email', upload.single('resume'), async (req, res) => {
  try {
    let { message,subject, currentUserEmail, targetUserEmail } = req.body;
    const resume = req.file;
    message+=`\nThis is my email id ${currentUserEmail}`;
    transporter.set('user', currentUserEmail);

    // Send email from current user to target user
    await transporter.sendMail({
      to: targetUserEmail,
      subject: subject,
      text: message,
      attachments: [{ filename: resume.originalname, content: resume.buffer }]
    });

    res.status(200).json({ success: true, message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ success: false, message: 'Failed to send email' });
  }
});

module.exports = router;
