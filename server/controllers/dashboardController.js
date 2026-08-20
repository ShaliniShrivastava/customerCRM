const Lead = require("../models/Lead");
const User = require("../models/User");

// GET DASHBOARD STATS
const getDashboardStats = async (req, res) => {
  try {
    const totalLeads = await Lead.countDocuments();

    const newLeads = await Lead.countDocuments({
      status: "new",
    });

    const contactedLeads = await Lead.countDocuments({
      status: "contacted",
    });

    const qualifiedLeads = await Lead.countDocuments({
      status: "qualified",
    });

    const convertedLeads = await Lead.countDocuments({
      status: "converted",
    });

    const totalUsers = await User.countDocuments({
      role: "user",
    });

    res.status(200).json({
      success: true,
      data: {
        totalLeads,
        newLeads,
        contactedLeads,
        qualifiedLeads,
        convertedLeads,
        totalUsers,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getDashboardStats,
};