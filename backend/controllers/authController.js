const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


exports.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists)
      return res.status(400).json({ error: "Email already registered" });

    const hashedPwd = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPwd });

    res.status(201).json({ message: "Registered successfully" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};


exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ error: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ error: "Invalid email or password" });

    const token = jwt.sign({ id: user._id ,email:user.email }, process.env.JWT_SECRET, {
      expiresIn: "7d"
    });

    res.cookie("token", token, {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "Lax", 
  maxAge: 7 * 24 * 60 * 60 * 1000 
});

    res.status(200).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const userId = req.user.id;
   
    const user = await User.findById(userId).select("-password");
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};


exports.verify = async (req, res) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    
    res.status(200).json(user);
  } catch (err) {
    console.error('Token verification error:', err);
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};
exports.logoutUser = (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    sameSite: 'Lax',  
    secure: process.env.NODE_ENV === 'production', 
  });

  return res.status(200).json({ message: 'Logged out successfully' });
};