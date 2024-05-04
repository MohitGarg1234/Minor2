const mongoose = require('mongoose');
const JobsSchema = new mongoose.Schema({
    CompanyName:{
        type : String,
    },
    JobDescription:{
        type : String,
    },
    Role:{
        type : String,
    },
    JobType:{
        type : String,
    },
    JobSalary:{
        type : String,
    },
    JobLocation:{
        type : String,
    },
    Experience:{
        type : String,
    },
    SkillsRequired:{
        type : String,
    },
    ApplyLinks:{
        type: String,
    },
    postedBy: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});
module.exports = mongoose.model('JobSchema',JobsSchema);
