const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
  enrollmentNumber: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    isPrivateEmail: Boolean,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  YearOfGraduation: {
    type: Number,
    required: true,
  },
  MobileNumber: {
    type: Number,
    required: true,
    isPrivateMN: Boolean,
  },
  LinkedIn: {
    type: String,
    required: true,
    isPrivateLinkedinId: Boolean,
  },
  CurrentCompany: {
    type: String,
  },
  Role: {
    type: String,
  },
  Experience: {
    type: String,
  },
  Education: {
    type: String,
  },
  mobileVisibility: {
    type: Boolean,
    default: true,
  },
  emailVisibility: {
    type: Boolean,
    default: true,
  },
  LinkedInVisibility: {
    type: Boolean,
    default: true,
  },
  isAlumni: {
    type: Boolean,
    default: false,
  },
  connections: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  // image: String,
});
module.exports = mongoose.model("User", UserSchema);
