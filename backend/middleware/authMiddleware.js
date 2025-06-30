const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) return res.status(401).json({ error: "Token required!" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded)
    req.user = decoded; 
    next(); 
  } catch (err) {
    return res.status(401).json({ error: "Invalid or expired token!" });
  }
};

module.exports = authMiddleware;
