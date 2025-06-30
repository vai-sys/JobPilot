const express = require("express");
const router = express.Router();

const {
  createJob,
  getAllJobs,
  getJobById,
  updateJob,
  deleteJob
} = require("../controllers/jobController");

const authMiddleware = require("../middleware/authMiddleware");
const upload =require("../middleware/uploadMiddleware")

router.post("/", authMiddleware,upload.single("resume"), createJob);


router.get("/", authMiddleware, getAllJobs);


router.get("/:id", authMiddleware, getJobById);


router.put("/:id", authMiddleware,upload.single("resume"), updateJob);

router.delete("/:id", authMiddleware, deleteJob);

module.exports = router;
