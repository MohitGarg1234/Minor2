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
async function createTTLIndex() {
  try {
    const Job = mongoose.model("JobSchema", JobsSchema);
    await Job.collection.dropIndex("createdAt_1");
    await Job.collection.createIndex(
      { createdAt: 1 },
      { expireAfterSeconds: 2592000 }
    );
  } catch (error) {
    console.error("Error creating TTL index:", error);
  }
}
createTTLIndex();
module.exports = mongoose.model("JobSchema", JobsSchema);
