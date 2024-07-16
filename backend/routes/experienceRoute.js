const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.post("/:id/experience", async (req, res) => {
  const companyName = req.body.companyName;
  const role = req.body.role;
  const years = req.body.years;
  if (!companyName || !role || !years) {
    return res
      .status(400)
      .json({ error: "Please provide companyName, role, and years" });
  }
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    user.Experience.push({ companyName, role, years });
    await user.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});
router.put("/:id/experience/:expId", async (req, res) => {
  const companyName = req.body.companyName;
  const role = req.body.role;
  const years = req.body.years;
  if (!companyName || !role || !years) {
    return res
      .status(400)
      .json({ error: "Please provide companyName, role, and years" });
  }
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const experience = user.Experience.id(req.params.expId);
    if (!experience) {
      return res.status(404).json({ message: "Experience not found" });
    }
    if (companyName) experience.companyName = companyName;
    if (role) experience.role = role;
    if (years) experience.years = years;
    await user.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});
router.delete("/:id/experience/:experId", async (req, res) => {
  const { id, experId } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.Experience = user.Experience.filter(
      (exp) => exp._id.toString() !== experId
    );
    await user.save();
    res.status(200).json({ message: "Experience deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});
router.post("/:id/skills", async (req, res) => {
  const skillName = req.body.skillName;
  if (!skillName) {
    return res
      .status(400)
      .json({ error: "Please provide skillName" });
  }
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    user.Skill.push({ skillName});
    await user.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});
router.delete("/:id/skills/:sId", async (req, res) => {
  const { id, sId } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.Skill = user.Skill.filter(
      (skill) => skill._id.toString() !== sId
    );
    await user.save();
    res.status(200).json({ message: "Skill deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

module.exports = router;
