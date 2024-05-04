const express = require('express');
const router = express.Router();
const Jobs = require('../models/jobs');
const User = require("../models/User");
const mongoose = require('mongoose');
// Create a new job posting
router.post('/jobpost', async (req, res) => {
    try {
      const { token } = req.params;
      console.log(token);
      const user = await User.findOne({ token });
      if (!user) {  
        return res.status(404).json({ error: 'User not found' });
      }
      const {
        CompanyName,
        JobDescription,
        JobType,
        Role,
        JobLocation,
        Experience,
        SkillsRequired,
        ApplyLinks,
        postedBy,
      } = req.body;      
      // Create a new job opening
      const jobOpening = new Jobs({
        CompanyName,
        JobDescription,
        JobType,
        Role,
        JobLocation,
        Experience,
        SkillsRequired,
        ApplyLinks,
        postedBy,
      });
  
      // Save the job opening to the database
      await jobOpening.save();
  
      res.status(201).json({ message: 'Job posted successfully' });
    } catch (error) {
      console.error('Error posting job:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });

// Fetch all job openings
router.get('/jobopenings', async (req, res) => {
    try {
      const jobOpenings = await Jobs.find();
      res.json(jobOpenings);
    } catch (error) {
      console.error('Error fetching job openings:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });

// GET user details by ID
router.get('/:id', async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid user ID' });
    }
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
module.exports = router;
