const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getProfile,
  verify,
  logoutUser

} = require("../controllers/authController");
const  authMiddleware=require("../middleware/authMiddleware")



router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", authMiddleware,getProfile)
router.get("/verify",authMiddleware,verify)
router.post("/logout",authMiddleware,logoutUser)


module.exports = router;
