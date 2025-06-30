const multer = require("multer");
const path = require("path");
const fs = require("fs");


const uploadPath = "uploads/resumes";
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname).toLowerCase(); 
    cb(null, uniqueSuffix + ext); 
  }
});


const fileFilter = (req, file, cb) => {
  const allowedTypes = /pdf|doc|docx/;

  const ext = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mime = allowedTypes.test(file.mimetype.toLowerCase());

  if (ext && mime) {
    cb(null, true);
  } else {
    cb(new Error("Only PDF and DOC/DOCX files are allowed"));
  }
};

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, 
  fileFilter
});

module.exports = upload;
