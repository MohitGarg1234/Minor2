const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
  {
    recipient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      enum: ["like"],
      required: true,
    },
    article: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Articles",
    },
    read: { 
      type: Boolean,
      default: false
    },
    createdAt: {
      type: Date, 
      default: Date.now 
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Notification", notificationSchema);
