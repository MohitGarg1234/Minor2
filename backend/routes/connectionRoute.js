const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Notification = require("../models/Notifications");
// Routes
router.post("/users/connect", async (req, res) => {
  try {
    const { userId, targetUserId } = req.body;
    // Find the target user
    const targetUser = await User.findById(targetUserId);
    if (!targetUser) {
      return res.status(404).json({ message: "Target user not found" });
    }
    // Add connection request to the target user
    targetUser.connections.push(userId);
    await targetUser.save();
    // Create notification for the target user
    await Notification.create({
      recipient: targetUserId,
      sender: userId,
      type: "connectionRequest",
    });
    // Update the requesting user's connections as well
    const user = await User.findById(userId);
    user.connections.push(targetUserId);
    await user.save();
    res.json({ message: "Connection request sent successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});
router.get("/notification", async (req, res) => {
  try {
    console.log("Received request:", req.url); 
    const notifications = await Notification.find({
      recipient: req.query.userId,
    }).populate("sender");
    res.json(notifications);
    console.log(notifications);
  } catch (err) {
    console.error(err.message);
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

router.put("/notifications/:id/accept", async (req, res) => {
  try {
    const notification = await Notification.findByIdAndUpdate(
      req.params.id,
      { status: "accepted" },
      { new: true }
    );
    res.json(notification);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.put("/notifications/:id/reject", async (req, res) => {
  try {
    const notification = await Notification.findByIdAndUpdate(
      req.params.id,
      { status: "rejected" },
      { new: true }
    );
    res.json(notification);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});
module.exports = router;
