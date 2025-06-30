const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  company: String,
  role: String,
  status: { type: String, enum: ["wishlist", "applied", "interviewing", "offer", "rejected"] },
  deadline: Date,
  notes: String,
  resume: {
    filename: String,       
    url: String,            
    uploadedAt: { type: Date, default: Date.now }
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Job", jobSchema);