const mongoose = require('mongoose');
const express = require("express");
const router = express.Router();
const Message = require("../models/Messages");
const User = require("../models/User");

router.get("/messages/unreadCount/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const count = await Message.countDocuments({
      receiver: userId,
      isRead: false,
    });
    res.json({ unreadCount: count });
  } catch (error) {
    res.status(500).json({ error: "Error fetching unread message count" });
  }
});
// Route to get chat history between two users
router.get("/messages/:userId1/:userId2", async (req, res) => {
  const { userId1, userId2 } = req.params;
  try {
    const messages = await Message.find({
      $or: [
        { sender: userId1, receiver: userId2 },
        { sender: userId2, receiver: userId1 },
      ],
    }).sort({ createdAt: 1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: "Could not retrieve messages" });
  }
});

router.get("/chats/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    // Check if userId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: "Invalid user ID format" });
    }

    // Get contacts a user has messaged
    const messages = await Message.find({
      $or: [{ sender: userId }, { receiver: userId }],
    }).populate("sender receiver", "name _id image");

    const users = [];
    messages.forEach((message) => {
      if (
        message.sender._id.toString() !== userId &&
        !users.some((u) => u._id.toString() === message.sender._id.toString())
      ) {
        users.push({ ...message.sender.toObject(), unreadMessagesCount: 0 });
      }
      if (
        message.receiver._id.toString() !== userId &&
        !users.some((u) => u._id.toString() === message.receiver._id.toString())
      ) {
        users.push({ ...message.receiver.toObject(), unreadMessagesCount: 0 });
      }
    });

    // Calculate unread messages for each contact
    const unreadCounts = await Message.aggregate([
      {
        $match: {
          receiver: new mongoose.Types.ObjectId(userId), // Use 'new' to instantiate ObjectId
          isRead: false,
        },
      },
      {
        $group: {
          _id: "$sender",
          unreadMessagesCount: { $sum: 1 },
        },
      },
    ]);

    // Add unread count to each user in contacts
    users.forEach((user) => {
      const unreadData = unreadCounts.find((count) => count._id.toString() === user._id.toString());
      if (unreadData) {
        user.unreadMessagesCount = unreadData.unreadMessagesCount;
      }
    });

    res.json(users);
  } catch (error) {
    console.error("Error retrieving contacts with unread counts:", error);
    res.status(500).json({ error: "Could not retrieve contacts with unread counts" });
  }
});

// Route to mark all unread messages as read between sender and receiver
router.put('/messages/markAsRead/:userId/:chatId', async (req, res) => {
  const { userId, chatId } = req.params;

  try {
    // Update messages between userId and chatId to mark them as read
    await Message.updateMany(
      { sender: chatId, receiver: userId, isRead: false },
      { $set: { isRead: true } }
    );
    res.status(200).send({ message: 'Messages marked as read' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update messages as read' });
  }
});

module.exports = router;
