const express = require('express');
const Notification = require('../models/Notifications');
const User = require('../models/User');
const Articles = require('../models/Articles');
const router = express.Router();

// Route to fetch notifications for a specific recipient and count unread notifications
router.get("/notifications/:recipientId", async (req, res) => {
  const { recipientId } = req.params;
  try {
    // Fetch the notifications, populate sender and article information
    const notifications = await Notification.find({ recipient: recipientId })
      .populate("sender", "name email") // Populate sender's name and email
      .populate({
        path: "article", // Populate article data
        select: "content likes dislikes author", // Select relevant fields from the article
        populate: { path: 'author', select: 'name email' } // Populate the author of the article
      })
      .sort({ createdAt: -1 }); // Sort by latest notification

    if (!notifications || notifications.length === 0) {
      return res.status(404).json({ message: "No notifications found." });
    }

    // Respond with notifications and unread count
    res.json({
      notifications // Return the populated notifications
    });
  } catch (error) {
    console.error("Error fetching notifications:", error.message);
    res.status(500).json({ error: "Server error" });
  }
});

router.get(`/notifications/read/:userId`, async (req, res) => {
  const {userId} = req.params;
  console.log(userId);
  try {
    // Mark all notifications for this user as read
    await Notification.updateMany(
      { recipient: userId, read: false },
      { $set: { read: true } }
    );

    // Reset the unread notification count for the user
    await User.findByIdAndUpdate(
      userId,
      { unreadNotifications: 0 }
    );

    res.json({ message: "Notifications marked as read" });
  } catch (error) {
    console.error("Error marking notifications as read:", error.message);
    res.status(500).json({ error: "Server error" });
  }
});

// Get unread notification count
router.get(`/notifications/unread-count/:userId` , async (req, res) => {
  const {userId} = req.params;
  try {
    const count = await Notification.countDocuments({ recipient: userId, read: false });
    res.json({ unreadCount: count });
  } catch (error) {
    console.error("Error fetching unread count:", error.message);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
