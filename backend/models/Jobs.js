const mongoose = require("mongoose");
const JobsSchema = new mongoose.Schema({
  CompanyName: {
    type: String,
  },
  JobDescription: {
    type: String,
  },
  Role: {
    type: String,
  },
  JobType: {
    type: String,
  },
  JobSalary: {
    type: String,
  },
  JobLocation: {
    type: String,
  },
  Experience: {
    type: String,
  },
  SkillsRequired: {
    type: String,
  },
  ApplyLinks: {
    type: String,
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
const Jobs = mongoose.models.Jobs || mongoose.model("Jobs", JobsSchema, "jobschemas");
async function createTTLIndex() {
  try {
    await Jobs.collection.createIndex(
      { createdAt: 1 },
      { expireAfterSeconds: 2592000 } 
    );
    console.log("TTL index created successfully.");
  } catch (error) {
    console.error("Error creating TTL index:", error);
  }
}
createTTLIndex();
module.exports = Jobs;
