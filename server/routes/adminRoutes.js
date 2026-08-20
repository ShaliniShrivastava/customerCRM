const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const { adminOnly } = require("../middleware/roleMiddleware");

const {
  getAllUsers,
  getWebsiteContent,
  updateWebsiteContent,
  addFeature,
  updateFeature,
  deleteFeature,
  createContact,
  getContacts,
  getMyContacts,
  replyToContact,
  toggleUserBlock,
  deleteUser,
} = require("../controllers/adminController");

const router = express.Router();

router.get("/users", authMiddleware, adminOnly, getAllUsers);

router.get("/website", getWebsiteContent);

router.put("/website", authMiddleware, adminOnly, updateWebsiteContent);

// Feature Management
router.post("/website/features", authMiddleware, adminOnly, addFeature);

router.put("/website/features/:id", authMiddleware, adminOnly, updateFeature);

router.delete(
  "/website/features/:id",
  authMiddleware,
  adminOnly,
  deleteFeature,
);

// Contact
router.post("/contact", authMiddleware, createContact);

router.get("/contact", authMiddleware, adminOnly, getContacts);

router.get("/contact/my", authMiddleware, getMyContacts);

router.put("/contact/:id/reply", authMiddleware, adminOnly, replyToContact);



router.patch(
  "/users/:id/block",
  authMiddleware,
  adminOnly,
  toggleUserBlock,
);

router.delete(
  "/users/:id",
  authMiddleware,
  adminOnly,
  deleteUser,
);

module.exports = router;
