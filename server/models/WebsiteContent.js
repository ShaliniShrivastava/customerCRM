const mongoose = require("mongoose");

const websiteContentSchema = new mongoose.Schema(
  {
    home: {
      title: {
        type: String,
        default: "CustomerCRM",
      },
      description: {
        type: String,
        default:
          "Smartly manage leads, build stronger customer relationships, and grow your business with ease.",
      },
    },

    about: {
      title: {
        type: String,
        default: "About CustomerCRM",
      },
      description: {
        type: String,
        default:
          "CustomerCRM is a modern customer relationship management platform designed to help businesses organize leads, manage customer information and make better decisions using data.",
      },
    },

    features: [
      {
        title: String,
        description: String,
      },
    ],
  },
  { timestamps: true },
);

module.exports =
  mongoose.models.WebsiteContent ||
  mongoose.model("WebsiteContent", websiteContentSchema);
