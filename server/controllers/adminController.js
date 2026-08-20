const User = require("../models/User");
const WebsiteContent = require("../models/WebsiteContent");
const Contact = require("../models/Contact");

// GET ALL USERS
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password").sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET WEBSITE CONTENT
const getWebsiteContent = async (req, res) => {
  try {
    let content = await WebsiteContent.findOne();

    if (!content) {
      content = await WebsiteContent.create({
        features: [
          {
            title: "Lead Management",
            description: "Track and manage customer leads easily.",
          },
          {
            title: "AI Lead Analysis",
            description: "Get AI-powered lead scores and recommendations.",
          },
          {
            title: "Analytics Dashboard",
            description: "Monitor important CRM statistics in real time.",
          },
          {
            title: "CSV Import",
            description: "Import multiple leads quickly using a CSV file.",
          },
        ],
      });
    }

    res.status(200).json({
      success: true,
      data: content,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to load website content",
    });
  }
};

// UPDATE WEBSITE CONTENT
const updateWebsiteContent = async (req, res) => {
  try {
    const content = await WebsiteContent.findOneAndUpdate({}, req.body, {
      new: true,
      upsert: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      message: "Website content updated successfully",
      data: content,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update website content",
    });
  }
};

// ADD FEATURE
const addFeature = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title?.trim() || !description?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Title and description are required.",
      });
    }

    let content = await WebsiteContent.findOne();

    if (!content) {
      content = await WebsiteContent.create({
        features: [],
      });
    }

    content.features.push({
      title: title.trim(),
      description: description.trim(),
    });

    await content.save();

    res.status(201).json({
      success: true,
      message: "Feature added successfully.",
      data: content,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to add feature.",
    });
  }
};

// UPDATE FEATURE
const updateFeature = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title?.trim() || !description?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Title and description are required.",
      });
    }

    const content = await WebsiteContent.findOne();

    if (!content) {
      return res.status(404).json({
        success: false,
        message: "Website content not found.",
      });
    }

    const feature = content.features.id(req.params.id);

    if (!feature) {
      return res.status(404).json({
        success: false,
        message: "Feature not found.",
      });
    }

    feature.title = title.trim();
    feature.description = description.trim();

    await content.save();

    res.status(200).json({
      success: true,
      message: "Feature updated successfully.",
      data: content,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update feature.",
    });
  }
};

// DELETE FEATURE
const deleteFeature = async (req, res) => {
  try {
    const content = await WebsiteContent.findOne();

    if (!content) {
      return res.status(404).json({
        success: false,
        message: "Website content not found.",
      });
    }

    const feature = content.features.id(req.params.id);

    if (!feature) {
      return res.status(404).json({
        success: false,
        message: "Feature not found.",
      });
    }

    feature.deleteOne();

    await content.save();

    res.status(200).json({
      success: true,
      message: "Feature deleted successfully.",
      data: content,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete feature.",
    });
  }
};

// CREATE CONTACT
const createContact = async (req, res) => {
  try {
    const contact = await Contact.create({
      user: req.user._id,
      name: req.user.name,
      email: req.user.email,
      message: req.body.message,
    });

    res.status(201).json({
      success: true,
      message: "Message sent successfully.",
      data: contact,
    });
  } catch (error) {
    console.error("Create contact error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET ALL CONTACTS
const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: contacts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to load messages.",
    });
  }
};

// GET MY CONTACTS
const getMyContacts = async (req, res) => {
  try {
    const contacts = await Contact.find({
      user: req.user._id,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: contacts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to load your messages.",
    });
  }
};

// REPLY TO CONTACT
const replyToContact = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      {
        reply: req.body.reply,
        status: "replied",
      },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: "Message not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Reply sent successfully.",
      data: contact,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to send reply.",
    });
  }
};

// BLOCK / UNBLOCK USER
const toggleUserBlock = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (user.role === "admin") {
      return res.status(403).json({
        success: false,
        message: "Admin cannot be blocked",
      });
    }

    user.isBlocked = !user.isBlocked;
    await user.save();

    res.status(200).json({
      success: true,
      message: user.isBlocked ? "User blocked" : "User unblocked",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// DELETE USER
const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (user.role === "admin") {
      return res.status(403).json({
        success: false,
        message: "Admin cannot be deleted",
      });
    }

    await User.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
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
};
