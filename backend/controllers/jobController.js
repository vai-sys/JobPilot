// const Job = require("../models/Job");

// const createJob = async (req, res) => {
//   try {
//     const { company, role, status, deadline, notes, resume } = req.body;

//     if (!company || !role) {
//       return res.status(400).json({ error: "Company and role are required" });
//     }

//     const jobData = {
//       userId: req.user.id,
//       company,
//       role,
//       status: status || "applied",
//       deadline,
//       notes
//     };

   
//    if (req.file) {
//       jobData.resume = {
//         filename: req.file.filename,
//         url: `/uploads/resumes/${req.file.filename}`,
//         uploadedAt: new Date(),
//       };
//     }

//     const job = await Job.create(jobData);
//     console.log("job",job);

//     res.status(201).json({
//       success: true,
//       data: job
//     });
//   } catch (err) {
//     console.error("Create Job Error:", err);
//     res.status(500).json({ error: "Server error" });
//   }
// };

// const getAllJobs = async (req, res) => {
//   try {
//     const jobs = await Job.find({ userId: req.user.id }).sort({ createdAt: -1 });
    
//     res.status(200).json({
//       success: true,
//       count: jobs.length,
//       data: jobs
//     });
//   } catch (err) {
//     console.error("Get Jobs Error:", err);
//     res.status(500).json({ error: "Server error" });
//   }
// };

// const getJobById = async (req, res) => {
//   try {
//     const job = await Job.findOne({ _id: req.params.id, userId: req.user.id });
    
//     if (!job) {
//       return res.status(404).json({ error: "Job not found" });
//     }

//     res.status(200).json({
//       success: true,
//       data: job
//     });
//   } catch (err) {
//     console.error("Get Job Error:", err);
//     res.status(500).json({ error: "Server error" });
//   }
// };

// const updateJob = async (req, res) => {
//   try {
 
//     const updateData = { ...req.body };
    
//     if (req.body.resume) {
//       updateData.resume = {
//         filename: req.body.resume.filename,
//         url: req.body.resume.url,
//         uploadedAt: req.body.resume.uploadedAt || new Date()
//       };
//     }

//     const job = await Job.findOneAndUpdate(
//       { _id: req.params.id, userId: req.user.id },
//       updateData,
//       { new: true, runValidators: true }
//     );

//     if (!job) {
//       return res.status(404).json({ error: "Job not found or not authorized" });
//     }

//     res.status(200).json({
//       success: true,
//       data: job
//     });
//   } catch (err) {
//     console.error("Update Job Error:", err);
//     res.status(500).json({ error: "Server error" });
//   }
// };

// const deleteJob = async (req, res) => {
//   try {
//     const job = await Job.findOneAndDelete({ _id: req.params.id, userId: req.user.id });

//     if (!job) {
//       return res.status(404).json({ error: "Job not found or not authorized" });
//     }

//     res.status(200).json({
//       success: true,
//       message: "Job deleted successfully"
//     });
//   } catch (err) {
//     console.error("Delete Job Error:", err);
//     res.status(500).json({ error: "Server error" });
//   }
// };

// module.exports = {
//   createJob,
//   getAllJobs,
//   getJobById,
//   updateJob,
//   deleteJob
// };



const Job = require("../models/Job");

const createJob = async (req, res) => {
  try {
    const { 
      company, 
      role, 
      status, 
      salary,
      location,
      jobType,
      applicationSource,
      customSource,
      deadline, 
      appliedDate,
      notes,
      tags,
      links
    } = req.body;

   
    if (!company || !role || !applicationSource) {
      return res.status(400).json({ 
        error: "Company, role, and application source are required" 
      });
    }

   
    const validSources = ["Direct", "Referral", "LinkedIn", "Indeed", "Company Website", "Job Board", "Recruiter", "Other"];
    if (!validSources.includes(applicationSource)) {
      return res.status(400).json({ 
        error: "Invalid application source" 
      });
    }

    
    if (applicationSource === "Other" && !customSource) {
      return res.status(400).json({ 
        error: "Custom source is required when application source is 'Other'" 
      });
    }

    const jobData = {
      userId: req.user.id,
      company,
      role,
      status: status || "wishlist",
      applicationSource,
      ...(salary && { salary }),
      ...(location && { location }),
      ...(jobType && { jobType }),
      ...(customSource && { customSource }),
      ...(deadline && { deadline: new Date(deadline) }),
      ...(appliedDate && { appliedDate: new Date(appliedDate) }),
      ...(notes && { notes }),
      ...(tags && { tags: Array.isArray(tags) ? tags : [tags] }),
      ...(links && { links })
    };

   
    if (req.file) {
      jobData.resume = {
        filename: req.file.filename,
        url: `/uploads/resumes/${req.file.filename}`,
        uploadedAt: new Date(),
      };
    }

    const job = await Job.create(jobData);
    console.log("Created job:", job);

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
    const { status, jobType, applicationSource, sortBy = 'createdAt', order = 'desc' } = req.query;
    
   
    const filter = { userId: req.user.id };
    
    if (status) filter.status = status;
    if (jobType) filter.jobType = jobType;
    if (applicationSource) filter.applicationSource = applicationSource;

   
    const sortOrder = order === 'asc' ? 1 : -1;
    const sortObj = { [sortBy]: sortOrder };

    const jobs = await Job.find(filter).sort(sortObj);

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
 
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ error: "Job not found" });
    }
    
    res.status(500).json({ error: "Server error" });
  }
};

const updateJob = async (req, res) => {
  try {
    const { 
      company, 
      role, 
      status, 
      salary,
      location,
      jobType,
      applicationSource,
      customSource,
      deadline, 
      appliedDate,
      notes,
      tags,
      links
    } = req.body;

    const updateData = {};

 
    if (company !== undefined) updateData.company = company;
    if (role !== undefined) updateData.role = role;
    if (status !== undefined) updateData.status = status;
    if (salary !== undefined) updateData.salary = salary;
    if (location !== undefined) updateData.location = location;
    if (jobType !== undefined) updateData.jobType = jobType;
    if (applicationSource !== undefined) updateData.applicationSource = applicationSource;
    if (customSource !== undefined) updateData.customSource = customSource;
    if (deadline !== undefined) updateData.deadline = deadline ? new Date(deadline) : null;
    if (appliedDate !== undefined) updateData.appliedDate = appliedDate ? new Date(appliedDate) : null;
    if (notes !== undefined) updateData.notes = notes;
    if (tags !== undefined) updateData.tags = Array.isArray(tags) ? tags : [tags];
    if (links !== undefined) updateData.links = links;

    
    if (req.file) {
      updateData.resume = {
        filename: req.file.filename,
        url: `/uploads/resumes/${req.file.filename}`,
        uploadedAt: new Date(),
      };
    }

   
    if (applicationSource) {
      const validSources = ["Direct", "Referral", "LinkedIn", "Indeed", "Company Website", "Job Board", "Recruiter", "Other"];
      if (!validSources.includes(applicationSource)) {
        return res.status(400).json({ 
          error: "Invalid application source" 
        });
      }
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
    
   
    if (err.name === 'ValidationError') {
      const errors = Object.values(err.errors).map(e => e.message);
      return res.status(400).json({ 
        error: "Validation error", 
        details: errors 
      });
    }
    
 
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ error: "Job not found" });
    }
    
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
    

    if (err.kind === 'ObjectId') {
      return res.status(404).json({ error: "Job not found" });
    }
    
    res.status(500).json({ error: "Server error" });
  }
};


const getJobStats = async (req, res) => {
  try {
    const stats = await Job.aggregate([
      { $match: { userId: req.user.id } },
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    const formattedStats = stats.reduce((acc, stat) => {
      acc[stat._id] = stat.count;
      return acc;
    }, {});

    res.status(200).json({
      success: true,
      data: formattedStats
    });
  } catch (err) {
    console.error("Get Job Stats Error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

const searchJobs = async (req, res) => {
  try {
    const { q, status, jobType } = req.query;
    
    const filter = { userId: req.user.id };
    
    if (status) filter.status = status;
    if (jobType) filter.jobType = jobType;
    
    if (q) {
      filter.$or = [
        { company: { $regex: q, $options: 'i' } },
        { role: { $regex: q, $options: 'i' } },
        { location: { $regex: q, $options: 'i' } },
        { notes: { $regex: q, $options: 'i' } }
      ];
    }

    const jobs = await Job.find(filter).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: jobs.length,
      data: jobs
    });
  } catch (err) {
    console.error("Search Jobs Error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  createJob,
  getAllJobs,
  getJobById,
  updateJob,
  deleteJob,
  getJobStats,
  searchJobs
};