const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  company: { type: String, required: true },
  role: { type: String, required: true },
  status: { 
    type: String, 
    enum: ["wishlist", "applied", "interviewing", "offer", "accepted", "rejected"], 
    default: "wishlist" 
  },
  salary: String, 
  location: String,
  jobType: { 
    type: String, 
    enum: ["Full-time", "Part-time", "Contract", "Internship", "Freelance"],
    default: "Full-time"
  },
  applicationSource: {
  type: String,
  enum: [
    "Direct",
    "Referral",
    "LinkedIn",
    "Indeed",
    "Company Website",
    "Job Board",
    "Recruiter",
    "Other"
  ],
  required: true
},
customSource: {
  type: String 
}
,
  deadline: Date,
  appliedDate: Date, 
  notes: String,
  tags: [String], 
  links: {
    jobDescription: String, 
    assignment: String,     
    companyWebsite: String, 
    other: [String]        
  },
  resume: {
    filename: String,      
    url: String,            
    uploadedAt: { type: Date, default: Date.now }
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});


jobSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model("Job", jobSchema);