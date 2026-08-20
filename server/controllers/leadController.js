const Lead = require("../models/Lead");
const User = require("../models/User");
const fs = require("fs");
const path = require("path");
const csv = require("csv-parser");
const XLSX = require("xlsx");
const pdfParse = require("pdf-parse");
const Tesseract = require("tesseract.js");

const buildLead = (row, userId) => {
  if (!row.name || !row.email || !row.requirement) {
    return null;
  }

  const email = String(row.email).toLowerCase().trim();

  if (!email.includes("@")) {
    return null;
  }

  return {
    name: String(row.name).trim(),
    email,
    phone: row.phone ? String(row.phone).trim() : "",
    company: row.company ? String(row.company).trim() : "",
    requirement: String(row.requirement).trim(),
    budget: row.budget ? String(row.budget).trim() : "",
    expectedTimeline: row.expectedTimeline
      ? String(row.expectedTimeline).trim()
      : "",
    status: row.status ? String(row.status).trim() : "new",
    createdBy: userId,
  };
};

// CREATE LEAD

const createLead = async (req, res) => {
  try {
    const {
      phone,
      company,
      requirement,
      budget,
      expectedTimeline,
      status,
      assignedTo,
    } = req.body;

    if (!requirement) {
      return res.status(400).json({
        success: false,
        message: "Requirement is required",
      });
    }

    let leadName;
    let leadEmail;

    if (req.user.role === "admin") {
      leadName = req.body.name;
      leadEmail = req.body.email;

      if (!leadName || !leadEmail) {
        return res.status(400).json({
          success: false,
          message: "Name and email are required",
        });
      }

      leadEmail = leadEmail.toLowerCase().trim();

      const existingLead = await Lead.findOne({
        email: leadEmail,
      });

      if (existingLead) {
        return res.status(409).json({
          success: false,
          message: "Lead with this email already exists",
        });
      }
    } else {
      const user = await User.findById(req.user.id).select("name email");

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      leadName = user.name;
      leadEmail = user.email;
    }

    const lead = await Lead.create({
      name: leadName,
      email: leadEmail,
      phone,
      company,
      requirement,
      budget,
      expectedTimeline,
      status,
      assignedTo,
      createdBy: req.user.id,
    });

    res.status(201).json({
      success: true,
      message: "Requirement submitted successfully",
      data: lead,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// READ CSV

const readCSV = (filePath) => {
  return new Promise((resolve, reject) => {
    const rows = [];

    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (row) => {
        rows.push(row);
      })
      .on("end", () => resolve(rows))
      .on("error", reject);
  });
};

// READ EXCEL

const readExcel = (filePath) => {
  const workbook = XLSX.readFile(filePath);

  const firstSheet = workbook.Sheets[workbook.SheetNames[0]];

  if (!firstSheet) {
    return [];
  }

  return XLSX.utils.sheet_to_json(firstSheet, {
    defval: "",
  });
};

// READ PDF

const readPDF = async (filePath) => {
  const buffer = fs.readFileSync(filePath);

  const pdfData = await pdfParse(buffer);

  return pdfData.text || "";
};

// READ IMAGE USING OCR

const readImage = async (filePath) => {
  const result = await Tesseract.recognize(filePath, "eng");

  return result?.data?.text || "";
};

// CONVERT PDF / IMAGE TEXT TO LEAD

const textToLead = (text, userId) => {
  const lines = text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  const emailMatch = text.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i);

  if (!emailMatch) {
    return null;
  }

  const email = emailMatch[0].toLowerCase().trim();

  let name = "";
  let phone = "";
  let company = "";
  let requirement = "";

  const phoneMatch = text.match(/(?:\+?\d[\d\s().-]{7,}\d)/);

  if (phoneMatch) {
    phone = phoneMatch[0].trim();
  }

  const nameLine = lines.find((line) => /^name\s*:/i.test(line));

  const companyLine = lines.find((line) => /^company\s*:/i.test(line));

  const requirementLine = lines.find((line) =>
    /^(requirement|require|need)\s*:/i.test(line),
  );

  if (nameLine) {
    name = nameLine.replace(/^name\s*:/i, "").trim();
  }

  if (companyLine) {
    company = companyLine.replace(/^company\s*:/i, "").trim();
  }

  if (requirementLine) {
    requirement = requirementLine
      .replace(/^(requirement|require|need)\s*:/i, "")
      .trim();
  }

  if (!name) {
    const possibleName = lines.find(
      (line) =>
        !line.includes("@") &&
        !/^phone\s*:/i.test(line) &&
        !/^company\s*:/i.test(line) &&
        !/^requirement\s*:/i.test(line) &&
        !/^email\s*:/i.test(line) &&
        line.length > 2 &&
        line.length < 80,
    );

    name = possibleName || "";
  }

  if (!requirement) {
    const possibleRequirement = lines.find(
      (line) =>
        line.length > 10 &&
        !line.includes("@") &&
        !line.match(/^\+?\d[\d\s().-]{7,}\d$/) &&
        !/^name\s*:/i.test(line) &&
        !/^email\s*:/i.test(line) &&
        !/^phone\s*:/i.test(line) &&
        !/^company\s*:/i.test(line),
    );

    requirement = possibleRequirement || "";
  }

  if (!name || !requirement) {
    return null;
  }

  return {
    name,
    email,
    phone,
    company,
    requirement,
    status: "new",
    createdBy: userId,
  };
};

// IMPORT LEADS FROM FILE
// CSV + EXCEL + PDF + IMAGE

const importLeads = async (req, res) => {
  let filePath = null;

  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload a CSV, Excel, PDF or image file.",
      });
    }

    filePath = req.file.path;

    const extension = path.extname(req.file.originalname).toLowerCase();

    let rawRows = [];
    let extractedLead = null;

    if (extension === ".csv") {
      rawRows = await readCSV(filePath);
    } else if (extension === ".xlsx") {
      rawRows = readExcel(filePath);
    } else if (extension === ".pdf") {
      const text = await readPDF(filePath);

      extractedLead = textToLead(text, req.user.id);
    } else if (
      extension === ".jpg" ||
      extension === ".jpeg" ||
      extension === ".png" ||
      extension === ".webp"
    ) {
      const text = await readImage(filePath);

      extractedLead = textToLead(text, req.user.id);
    } else {
      return res.status(400).json({
        success: false,
        message:
          "Unsupported file type. Use CSV, XLSX, PDF, JPG, JPEG, PNG or WEBP.",
      });
    }

    const leads = [];
    let invalid = 0;

    if (extractedLead) {
      leads.push(extractedLead);
    } else if (
      extension === ".pdf" ||
      extension === ".jpg" ||
      extension === ".jpeg" ||
      extension === ".png" ||
      extension === ".webp"
    ) {
      invalid = 1;
    }

    if (rawRows.length > 0) {
      for (const row of rawRows) {
        const lead = buildLead(row, req.user.id);

        if (!lead) {
          invalid++;
          continue;
        }

        leads.push(lead);
      }
    }

    if (leads.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No valid lead data found in the uploaded file.",
        imported: 0,
        skipped: 0,
        invalid,
      });
    }

    const importedLeads = [];
    let skipped = 0;

    for (const lead of leads) {
      const existingLead = await Lead.findOne({
        email: lead.email,
      });

      if (existingLead) {
        skipped++;
        continue;
      }

      const alreadyAdded = importedLeads.some(
        (item) => item.email === lead.email,
      );

      if (alreadyAdded) {
        skipped++;
        continue;
      }

      importedLeads.push(lead);
    }

    if (importedLeads.length > 0) {
      await Lead.insertMany(importedLeads);
    }

    res.status(201).json({
      success: true,
      message: "Leads imported successfully.",
      imported: importedLeads.length,
      skipped,
      invalid,
      fileType: extension.replace(".", ""),
    });
  } catch (error) {
    console.error("Import leads error:", error);

    res.status(500).json({
      success: false,
      message: error.message || "Failed to import leads.",
    });
  } finally {
    if (filePath && fs.existsSync(filePath)) {
      try {
        fs.unlinkSync(filePath);
      } catch (deleteError) {
        console.error("Failed to delete uploaded file:", deleteError.message);
      }
    }
  }
};

// IMPORT LEADS FROM API
// ADMIN ONLY

const importLeadsFromAPI = async (req, res) => {
  try {
    const { apiUrl } = req.body;

    if (!apiUrl) {
      return res.status(400).json({
        success: false,
        message: "API URL is required",
      });
    }

    let parsedUrl;

    try {
      parsedUrl = new URL(apiUrl);
    } catch {
      return res.status(400).json({
        success: false,
        message: "Invalid API URL",
      });
    }

    if (!["http:", "https:"].includes(parsedUrl.protocol)) {
      return res.status(400).json({
        success: false,
        message: "Only HTTP and HTTPS API URLs are allowed",
      });
    }

    const response = await fetch(parsedUrl.toString());

    if (!response.ok) {
      return res.status(400).json({
        success: false,
        message: `API request failed with status ${response.status}`,
      });
    }

    const apiData = await response.json();

    const rows = Array.isArray(apiData)
      ? apiData
      : Array.isArray(apiData.data)
        ? apiData.data
        : [];

    if (rows.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No lead data found in API response",
        imported: 0,
        skipped: 0,
        invalid: 0,
      });
    }

    const leads = [];
    let invalid = 0;

    for (const row of rows) {
      const lead = buildLead(row, req.user.id);

      if (!lead) {
        invalid++;
        continue;
      }

      leads.push(lead);
    }

    if (leads.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No valid lead data found in API response",
        imported: 0,
        skipped: 0,
        invalid,
      });
    }

    const importedLeads = [];
    let skipped = 0;

    for (const lead of leads) {
      const existingLead = await Lead.findOne({
        email: lead.email,
      });

      if (existingLead) {
        skipped++;
        continue;
      }

      const alreadyAdded = importedLeads.some(
        (item) => item.email === lead.email,
      );

      if (alreadyAdded) {
        skipped++;
        continue;
      }

      importedLeads.push(lead);
    }

    if (importedLeads.length > 0) {
      await Lead.insertMany(importedLeads);
    }

    return res.status(201).json({
      success: true,
      message: "Leads imported from API successfully.",
      imported: importedLeads.length,
      skipped,
      invalid,
    });
  } catch (error) {
    console.error("API lead import error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Failed to import leads from API.",
    });
  }
};

// GET ALL LEADS

const getAllLeads = async (req, res) => {
  try {
    const {
      search,
      status,
      sort = "createdAt",
      order = "desc",
      page = 1,
      limit = 10,
    } = req.query;

    const query = {};

    if (search) {
      query.$or = [
        {
          name: {
            $regex: search,
            $options: "i",
          },
        },
        {
          email: {
            $regex: search,
            $options: "i",
          },
        },
        {
          company: {
            $regex: search,
            $options: "i",
          },
        },
        {
          requirement: {
            $regex: search,
            $options: "i",
          },
        },
      ];
    }

    if (status) {
      query.status = status;
    }

    const sortOrder = order === "asc" ? 1 : -1;

    const skip = (Number(page) - 1) * Number(limit);

    const leads = await Lead.find(query)
      .populate("assignedTo", "name email")
      .populate("createdBy", "name email")
      .sort({
        [sort]: sortOrder,
      })
      .skip(skip)
      .limit(Number(limit));

    const totalLeads = await Lead.countDocuments(query);

    res.status(200).json({
      success: true,
      data: leads,
      pagination: {
        currentPage: Number(page),
        totalPages: Math.ceil(totalLeads / Number(limit)),
        totalLeads,
        limit: Number(limit),
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET MY REQUIREMENTS

const getMyLeads = async (req, res) => {
  try {
    const leads = await Lead.find({
      createdBy: req.user.id,
    }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      data: leads,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET LEAD BY ID

const getLeadById = async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id)
      .populate("assignedTo", "name email")
      .populate("createdBy", "name email");

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: "Lead not found",
      });
    }

    res.status(200).json({
      success: true,
      data: lead,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// UPDATE LEAD

const updateLead = async (req, res) => {
  try {
    const lead = await Lead.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: "Lead not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Lead updated successfully",
      data: lead,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// DELETE LEAD

const deleteLead = async (req, res) => {
  try {
    const lead = await Lead.findByIdAndDelete(req.params.id);

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: "Lead not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Lead deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createLead,
  getAllLeads,
  getMyLeads,
  getLeadById,
  updateLead,
  deleteLead,
  importLeads,
  importLeadsFromAPI,
};
