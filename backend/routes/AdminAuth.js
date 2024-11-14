const express = require("express");
const router = express.Router();
const Admin = require("../models/Admin");
const Articles = require("../models/Articles");
const Announcements = require("../models/Announcements");
const Jobs = require('../models/Jobs');
const validator = require("validator");
require("dotenv").config();
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const path = require("path");
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },                    
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname);
        const sanitizedOriginalname = file.originalname.replace(/[^a-zA-Z0-9\-_.]/g, ''); 
        if (ext) {
          cb(null, file.fieldname + "-" + uuidv4() + Number(Date.now()).toString() + "-" + sanitizedOriginalname.replace(ext, '') + ext);
        } 
        else if (req.body.post_type == 3) {
          cb(null, file.fieldname + "-" + uuidv4() + Number(Date.now()).toString() + "-" + sanitizedOriginalname + ".mp4");
        } 
        else {
          cb(null, file.fieldname + "-" + uuidv4() + Number(Date.now()) + "-" + sanitizedOriginalname.replace(ext, '') + ext);
        }
      },
      onError: function (err, next) {
        console.log('error', err);
        next(err);
      }
    });

const upload = multer({ storage });

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_NAME,
    pass: process.env.EMAIL_PASS,
  },
});

// Generate OTP function
function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000);
}

// Map to store OTPs for enrollment numbers
const enrollmentOTPMap = new Map();

// Middleware to verify JWT token
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

// Admin login functionality
router.post("/admin/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!validator.isEmail(email)) {
      return res.status(400).json({ success: false, message: "Invalid Email" });
    }
    if (!password) {
      return res
        .status(400)
        .json({ success: false, message: "Password is required" });
    }

    const user = await Admin.findOne({ email });
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

    // Generate JWT token
    const token = jwt.sign({ userId: user.id }, JWT_SECRET_KEY);
    res
      .status(200)
      .json({ success: true, message: "Login successful!", token, role:'admin' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});
// Forgot password functionality
router.post("/admin/forgot-password", async (req, res) => {
  const { email } = req.body;

  try {
    const user = await Admin.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Generate OTP and store it
    const otp = generateOTP();
    console.log(otp);
    enrollmentOTPMap.set(email, otp);

    const mailOptions = {
      from: process.env.EMAIL_NAME,
      to: user.email,
      subject: "OTP for Password Reset",
      text: `Your OTP for password reset is: ${otp}`,
    };

    // Respond to the client immediately
    res.json({ success: true, message: "Email is valid" });

    // Send OTP email asynchronously without blocking the response
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Failed to send OTP:", error);
        return; // Don't send a response back, just log the error
      }
      console.log("OTP sent successfully:", info.response);
    });

  } catch (error) {
    console.error("Error during password reset:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// OTP Verification
router.post("/admin/verify-otp", (req, res) => {
  const { email, otp } = req.body;
  const storedOTP = enrollmentOTPMap.get(email);
  if (storedOTP && parseInt(otp) === storedOTP) {
    res.json({ success: true, message: "OTP is valid" });
  } else {
    res.json({ success: false, message: "Invalid OTP" });
  }
});
// Update user details with new password
router.post("/admin/reset-password", async (req, res) => {
  const { email, newPassword } = req.body;
  try {
    const user = await Admin.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();
    res.json({ success: true, message: "Password updated successfully" });
  } catch (error) {
    console.error("Error updating password:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});
// Get Admin Details
router.get("/admin/getAdminDetails", verifyToken, async (req, res) => {
  try {
    const admin = await Admin.findById(req.userId);
    if (!admin) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    res.json({ success: true, admin });
  } catch (error) {
    console.error("Error fetching admin details:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});


// Articles Related API's
router.get('/admin/getPosts',async (req,res) =>{
  try {
    const articles = await Articles.find({}).populate("author");
    const reversedData = articles.reverse();
    res.status(200).json({ articles: reversedData });
  } catch (error) {
    res.status(500).json({ message: 'Server error, could not retrieve articles.' });
  }
});
router.post("/admin/deletePost/:id",async(req,res) =>{
  try {
    const { id } = req.params;
    if(!id){
      return res.status(400).json({ message: 'Please provide the id of the post you want to delete.' });
    }
    const article = await Articles.findByIdAndDelete(id);
    res.status(200).json({ message: 'Article deleted successfully.',article:article });
  }
  catch (error) {
    res.status(500).json({ message: 'Server error, could not retrieve articles.' });
  }
});
router.post("/admin/addPost", upload.single("image"), async (req, res) => {
  try {
    const { content, author } = req.body;
    let image = null;
    if (req.file) {
      image = req.file.filename;
    }
    const article = new Articles({
      content,
      author,
      image,
    });
    await article.save();
    res.status(201).json({ article });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Job Post Realted API's
router.get("/admin/getJobs",async (req,res)=>{
  try{
    const jobs = await Jobs.find().populate("postedBy");
    res.status(200).json(jobs);
  }
  catch(error){
    res.status(500).json({error:error.message});
  }
})
router.post("/admin/deleteJob/:id",async(req,res)=>{
  try{
    const {id} = req.params;
    const job = await Jobs.findByIdAndDelete(id);
    res.status(200).json({message:'Job deleted successfully.',job:job}); 
  }
  catch(error){
    res.status(500).json({error:error.message});
  }
});
router.post("/admin/postJob",async(req,res)=>{
  try{
    const {
      CompanyName,
      JobDescription,
        JobType,
        JobSalary,
        Role,
        JobLocation,
        Experience,
        SkillsRequired,
        ApplyLinks,
        postedBy,
      } = req.body;
      const jobOpening = new Jobs({
        CompanyName,
        JobDescription,
        JobType,
        JobSalary,
        Role,
        JobLocation,
        Experience,
        SkillsRequired,
        ApplyLinks,
        postedBy,
      });
      await jobOpening.save();
      res.status(201).json({ message: 'Job posted successfully' });
    } catch (error) {
      console.error('Error posting job:', error);
      res.status(500).json({ message: 'Server error' });
    }
});


// Announcements Realted API's
router.get("/admin/getAnnouncements",async(req,res)=>{
  try{
    const data = await Announcements.find();
    res.status(200).json(data);
  }
  catch(error){
    res.status(500).json({error : error.message});
  }
});
router.post("/admin/postAnnouncements",async(req,res)=>{
  try{
    const {title,description,postedBy} = req.body;
    const announcement = new Announcements({
      title,
      description,
      postedBy
    });
    await announcement.save();
    res.status(200).json({message : "Announcement posted successfully"});
  }
  catch(error){
    res.status(500).json({error : error.message});
  }
});
router.delete("/admin/deleteAnnouncements",async(req,res)=>{
  try{
    const id = req.body.id;
    const announcement = await Announcements.findByIdAndDelete(id);
    res.status(200).json({message : "Announcement deleted successfully",announcement : announcement});
  }
  catch(error){
    res.status(500).json({error : error.message});
  }
});

module.exports = router;