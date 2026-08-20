const express = require("express");

const {
  registerUser,
  createAdmin,
  loginUser,
  getProfile,
  logoutUser,
} = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", registerUser);

router.post("/create-admin", createAdmin);

router.post("/login", loginUser);

router.get("/profile", authMiddleware, getProfile);

router.post("/logout", logoutUser);

module.exports = router;
