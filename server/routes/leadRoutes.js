const express = require("express");
const upload = require("../config/upload");

const {
  createLead,
  getAllLeads,
  getMyLeads,
  getLeadById,
  updateLead,
  deleteLead,
  importLeads,
  importLeadsFromAPI,
} = require("../controllers/leadController");

const authMiddleware = require("../middleware/authMiddleware");
const { adminOnly } = require("../middleware/roleMiddleware");

const router = express.Router();

// CREATE LEAD
router.post("/", authMiddleware, createLead);

// USER - MY REQUIREMENTS
router.get("/my", authMiddleware, getMyLeads);

// ADMIN - ALL LEADS
router.get("/", authMiddleware, adminOnly, getAllLeads);
router.get("/:id", authMiddleware, adminOnly, getLeadById);
router.put("/:id", authMiddleware, adminOnly, updateLead);
router.delete("/:id", authMiddleware, adminOnly, deleteLead);

// ADMIN - FILE IMPORT
// CSV + XLSX + PDF + IMAGES
router.post(
  "/import",
  authMiddleware,
  adminOnly,
  upload.single("file"),
  importLeads,
);

// ADMIN - API IMPORT
router.post("/import-api", authMiddleware, adminOnly, importLeadsFromAPI);

module.exports = router;
