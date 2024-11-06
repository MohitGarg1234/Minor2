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

router.get('/jobOpenings/:userId', async (req, res) => {
  try {
      const { userId } = req.params;
      const user = await User.findById(userId);
      if (!user) return res.status(404).json({ message: 'User not found' });
      const userSkills = user.Skill.map(skill => skill.skillName.toLowerCase());
      const jobs = await Jobs.find();
      const jobMatches = jobs.map(job => {
          const requiredSkills = job.SkillsRequired.split(',').map(skill => skill.trim().toLowerCase()).filter(skill => skill);
          const matchedSkills = userSkills.filter(skill => requiredSkills.includes(skill));
          const matchPercentage = (matchedSkills.length / requiredSkills.length) * 100;
          return {
              jobId: job._id,
              CompanyName: job.CompanyName,
              Role: job.Role,
              SkillsRequired: job.SkillsRequired,
              Type: job.JobType,
              Experience: job.Experience,
              postedBy : job.postedBy,
              ApplyLinks : job.ApplyLinks,
              matchedSkills,
              matchPercentage: matchPercentage.toFixed(2),
          };
      });
      res.json(jobMatches);
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
  }
});
module.exports = router;
