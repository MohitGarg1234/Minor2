const express = require('express');
const router = express.Router();
const User = require('../models/User');
const nodemailer = require('nodemailer');

// Configure nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'mgarg1557@gmail.com', // replace with your email
    pass: 'mmhv esrk lnfp khvc', // replace with your password
  },
});

// Generate OTP function
function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000); // Generate a 6-digit OTP
}

// Map to store enrollment numbers and corresponding OTPs
const enrollmentOTPMap = new Map();


// Endpoint to verify enroll number
router.post('/verifyEnrollNumber', async (req, res) => {
    console.log("Received request to verify enroll number"); 
    const enrollmentNumber = req.body.enrollmentNumber;
    // console.log(enrollmentNumber)
    try {
      const user = await User.findOne({ enrollmentNumber });
      // console.log(user);
      if(!user) {
        console.log("Not Found");
        return res.json({ success: false, message: "Enroll number is not valid" });
      }
      console.log("Found");
      res.json({ success: true, message: "Enroll number is valid" });
      // Generate OTP
      const otp = generateOTP();
      // console.log(otp);
    // Store enrollment number and corresponding OTP in the map
      enrollmentOTPMap.set(enrollmentNumber, otp);

    // Send OTP to user's email
    console.log(user.email);
    const mailOptions = {
      from: 'mgarg1557@gmail.com', // replace with your email
      to: user.email, // user's email
      subject: 'OTP for verification',
      text: `Your OTP for verification is: ${otp}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("Error sending OTP:", error);
        return res.status(500).json({ success: false, message: "Failed to send OTP" });
      }
      console.log("OTP sent:", info.response);
      return res.json({ success: true, message: "OTP sent to your email" });
    });
  } catch (err) {
    console.error("Error verifying enroll number:", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
  });
  // Endpoint to verify OTP
router.post('/verifyOTP', (req, res) => {
  const { enrollmentNumber, otp } = req.body;
  // console.log(enrollmentNumber);

  // Retrieve OTP corresponding to the enrollment number from the map
  const storedOTP = enrollmentOTPMap.get(enrollmentNumber);

  // Compare entered OTP with stored OTP
  if (storedOTP && parseInt(otp) === storedOTP) {
    res.json({ success: true, message: "OTP is valid" });
  } else {
    res.json({ success: false, message: "Invalid OTP" });
  }
});


  module.exports = router;
