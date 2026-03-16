const express = require("express");
const router  = express.Router();

const { loginAdmin, getMe } = require("../controllers/authController");
const { protect }  = require("../middlewares/authMiddleware");

// POST /api/admin/login  — public
router.post("/login", loginAdmin);

// GET  /api/admin/me     — verify token, returns admin info
router.get("/me", protect, getMe);

module.exports = router;