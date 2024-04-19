const express = require("express");
const router = express.Router();
const User = require("../models/User");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT_SECRET_KEY = "Jiit$Alumni#Portal"
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "mgarg1557@gmail.com", 
    pass: "mmhv esrk lnfp khvc", 
  },
});

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000); 
}

// Map to store enrollment numbers and corresponding OTPs
const enrollmentOTPMap = new Map();

// Middleware to verify token
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  jwt.verify(token, JWT_SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    req.userId = decoded.userId;
    next();
  });
};

// Endpoint to verify enroll number
router.post("/verifyEnrollNumber", async (req, res) => {
  const enrollmentNumber = req.body.enrollmentNumber;
  try {
    const user = await User.findOne({ enrollmentNumber });
    if (!user) {
      return res.json({
        success: false,
        message: "Enroll number is not valid",
      });
    }
    res.json({ success: true, message: "Enroll number is valid" });
    const otp = generateOTP();
    enrollmentOTPMap.set(enrollmentNumber, otp);

    const mailOptions = {
      from: "mgarg1557@gmail.com", 
      to: user.email, 
      subject: "OTP for verification",
      text: `Your OTP for verification is: ${otp}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res
          .status(500)
          .json({ success: false, message: "Failed to send OTP" });
      }
      return res.json({ success: true, message: "OTP sent to your email" });
    });
  } catch (err) {
    console.error("Error verifying enroll number:", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// Endpoint to verify OTP
router.post("/verifyOTP", (req, res) => {
  const { enrollmentNumber, otp } = req.body;
  const storedOTP = enrollmentOTPMap.get(enrollmentNumber);
  if (storedOTP && parseInt(otp) === storedOTP) {
    res.json({ success: true, message: "OTP is valid" });
  } else {
    res.json({ success: false, message: "Invalid OTP" });
  }
});


// Endpoint to fetch user details after successful OTP verification
router.get("/details", async (req, res) => {
  try {
    const { enrollmentNumber } = req.query;
    const user = await User.findOne({ enrollmentNumber });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    return res.json({ success: true, user });
  } catch (error) {
    console.error("Error fetching user details:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
});
router.put(`/updateUserDetails`, async (req, res) => {
  const userData = req.body;
  try {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    userData.password = hashedPassword;
    await User.findOneAndUpdate({ enrollmentNumber: userData.enrollmentNumber }, userData);
    res.json({ success: true, message: 'User details updated successfully' });
  } catch (error) {
    console.error('Error updating user details:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// Endpoint for login
router.post('/login',async (req,res)=>{
  const {email,password} = req.body
  try{
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({ success: false, message: "Invalid credentials" });
    }
    // Generate token
    const token = jwt.sign({ userId: user.id }, JWT_SECRET_KEY);
    res.status(200).json({success:true,message:"Login successful!",token});
  }
  catch(error){
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
