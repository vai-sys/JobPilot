const Job = require("../models/Job");

const createJob = async (req, res) => {
  try {
    const { company, role, status, deadline, notes, resume } = req.body;

    if (!company || !role) {
      return res.status(400).json({ error: "Company and role are required" });
    }

    const jobData = {
      userId: req.user.id,
      company,
      role,
      status: status || "applied",
      deadline,
      notes
    };

   
    if (resume) {
      jobData.resume = {
        filename: resume.filename,
        url: resume.url,
        uploadedAt: resume.uploadedAt || new Date()
      };
    }

    const job = await Job.create(jobData);

    res.status(201).json({
      success: true,
      data: job
    });
  } catch (err) {
    console.error("Create Job Error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ userId: req.user.id }).sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: jobs.length,
      data: jobs
    });
  } catch (err) {
    console.error("Get Jobs Error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

const getJobById = async (req, res) => {
  try {
    const job = await Job.findOne({ _id: req.params.id, userId: req.user.id });
    
    if (!job) {
      return res.status(404).json({ error: "Job not found" });
    }

    res.status(200).json({
      success: true,
      data: job
    });
  } catch (err) {
    console.error("Get Job Error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

const updateJob = async (req, res) => {
  try {
 
    const updateData = { ...req.body };
    
    if (req.body.resume) {
      updateData.resume = {
        filename: req.body.resume.filename,
        url: req.body.resume.url,
        uploadedAt: req.body.resume.uploadedAt || new Date()
      };
    }

    const job = await Job.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      updateData,
      { new: true, runValidators: true }
    );

    if (!job) {
      return res.status(404).json({ error: "Job not found or not authorized" });
    }

    res.status(200).json({
      success: true,
      data: job
    });
  } catch (err) {
    console.error("Update Job Error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

const deleteJob = async (req, res) => {
  try {
    const job = await Job.findOneAndDelete({ _id: req.params.id, userId: req.user.id });

    if (!job) {
      return res.status(404).json({ error: "Job not found or not authorized" });
    }

    res.status(200).json({
      success: true,
      message: "Job deleted successfully"
    });
  } catch (err) {
    console.error("Delete Job Error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  createJob,
  getAllJobs,
  getJobById,
  updateJob,
  deleteJob
};