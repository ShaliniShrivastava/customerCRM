const express = require("express");

const { analyzeLead } = require("../controllers/aiController");
const authMiddleware = require("../middleware/authMiddleware");
const { adminOnly } = require("../middleware/roleMiddleware");

const router = express.Router();

router.get(
  "/lead/:id/analyze",
  authMiddleware,
  adminOnly,
  analyzeLead
);

module.exports = router;