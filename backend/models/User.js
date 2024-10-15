const mongoose = require("mongoose");
const ExperienceSchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  years: {
    type: String,
    required: true,
  }
});
const SkillSchema = new mongoose.Schema({
  skillName: {
    type: String,
    required: true,
  },
});

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
  Experience: [ExperienceSchema],
  Education: {
    type: String,
  },
  Skill: [SkillSchema],
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
  image :{
    type : String,
  },
  unreadNotifications :{
    type : Number,
  }
});
module.exports = mongoose.model("User", UserSchema);
