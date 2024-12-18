const express = require("express");
const router = express.Router();
const User = require("../models/User");
const validator = require('validator');
require('dotenv').config();
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// const upload = multer({ storage });
const authEnrollRoutes = (upload, gfs, mongoose) => {
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_NAME,
    pass: process.env.EMAIL_PASS,
  },
});

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000);
}

// Map to store enrollment numbers and corresponding OTPs
const enrollmentOTPMap = new Map();

// Middleware to verify token
const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  jwt.verify(token, JWT_SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Unauthorized" });
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
      console.log(otp);
      enrollmentOTPMap.set(enrollmentNumber, otp);

      const mailOptions = {
        from: process.env.EMAIL_NAME,
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
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
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
        return res
          .status(404)
          .json({ success: false, message: "User not found" });
      }
      return res.json({ success: true, user });
    } catch (error) {
      console.error("Error fetching user details:", error);
      return res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  });

router.put('/updateUserDetails',async (req, res) => {
  const { enrollmentNumber, ...userData } = req.body;
  try {
    if (userData.password) {
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      userData.password = hashedPassword;
    }
    else{
      console.log("hello");
    }
    await mongoose.model('User').findOneAndUpdate({ enrollmentNumber }, userData);
    res.json({ success: true, message: 'User details updated successfully' });
  } catch (error) {
    console.error('Error updating user details:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

  // Endpoint for login
  router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
      if (!validator.isEmail(email)) {
        return res
            .status(400)
            .json({ success: false, message: "Email Must Contains @ and . " });
    }
    if (!password) {
      return res
          .status(400)
          .json({ success: false, message: "Password is required" });
  }
      const user = await User.findOne({ email });
      if (!user) {
        return res
          .status(404)
          .json({ success: false, message: "User not found" });
      }
      const isPasswordMatch = await bcrypt.compare(password, user.password);
      if (!isPasswordMatch) {
        return res
          .status(400)
          .json({ success: false, message: "Invalid credentials" });
      }
      // Generate token
      const token = jwt.sign({ userId: user.id, role: 'user' }, JWT_SECRET_KEY,{expiresIn:'1d'});
      // console.log(token);
      res.status(200).json({ success: true, message: "Login successful!", token, role:'user' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  });

  // Endpoint to fetch user details based on token
  router.get("/FetchuserDetails", verifyToken, async (req, res) => {
    try {
      const user = await User.findById(req.userId);
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Route to get details of connected people using token
router.get('/connected-people', verifyToken, async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId).populate('connections'); // Assuming 'connections' is an array of ObjectId in your User schema
    res.json(user.connections);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

  router.get("/data/random", async (req, res) => {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const decodedToken = jwt.verify(token, JWT_SECRET_KEY);
      const userId = decodedToken.userId;

      const currentUser = await User.findById(userId);
      const connectedUserIds = currentUser.connections;

      const data = await User.find({
        _id: { $ne: userId, $nin: connectedUserIds },
      });
      res.json(data);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  });

  router.get("/token/:token", async (req, res) => {
    const { token } = req.params;
    try {
      const user = await User.findOne({ token });
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      res.json(user);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server error" });
    }
  });
  router.get("/user/:userId", async (req, res) => {
    const { userId } = req.params; // Extract userId from request parameters
  
    try {
      // Fetch user details from the database by userId
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      // Return the user details (you can customize which fields to return)
      res.json({
        id: user._id,
        name: user.name,
        email: user.email,
        image: user.image,
        // Include any other fields you need
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  });
  return router;
};
module.exports = authEnrollRoutes;
