const jwt   = require("jsonwebtoken");
const Admin = require("../models/admin.model.js");

const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });

// POST /api/admin/login
const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ message: "Email and password are required" });

  const admin = await Admin.findOne({ email });
  if (!admin || !(await admin.matchPassword(password)))
    return res.status(401).json({ message: "Invalid email or password" });

  res.json({
    _id:   admin._id,
    email: admin.email,
    token: generateToken(admin._id),
  });
};

// GET /api/admin/me
const getMe = async (req, res) => {
  res.json({ _id: req.admin._id, email: req.admin.email });
};

module.exports = { loginAdmin, getMe };