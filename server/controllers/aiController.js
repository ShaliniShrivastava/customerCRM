const { GoogleGenAI } = require("@google/genai");
const Lead = require("../models/Lead");

console.log("Gemini API Key loaded:", !!process.env.GEMINI_API_KEY);

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const analyzeLead = async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: "Lead not found",
      });
    }

    const prompt = `
You are a CRM assistant helping an admin understand a customer requirement.

Analyze ONLY the information provided below.

Customer:
Name: ${lead.name}
Email: ${lead.email}
Phone: ${lead.phone || "Not provided"}
Company / Business Type: ${lead.company || "Not provided"}
Requirement: ${lead.requirement || "Not provided"}
Budget: ${lead.budget || "Not provided"}
Expected Timeline: ${lead.expectedTimeline || "Not provided"}
Status: ${lead.status}

Return ONLY valid JSON:

{
  "summary": "",
  "needSummary": "",
  "requirementClarity": "",
  "missingInformation": [],
  "recommendedFollowUp": ""
}

Rules:

1. summary:
Give a short summary using only the provided customer information.

2. needSummary:
Clearly describe what the customer wants based ONLY on the Requirement field.
Do not invent anything.

3. requirementClarity:
Choose exactly one:
"Clear"
"Partially Clear"
"Unclear"

Clear = the requirement clearly explains what the customer needs.
Partially Clear = the general need is understandable but some useful details are missing.
Unclear = the requirement does not explain the customer's need clearly.

Do NOT judge technical knowledge.

4. missingInformation:
Only mention genuinely useful missing information from these fields:
- Phone Number
- Company / Business Type
- Requirement
- Budget
- Expected Timeline

Do NOT mention Source or Notes.
Do NOT invent additional fields.

5. recommendedFollowUp:
Give ONE practical next step for the admin.

If the requirement is unclear, suggest asking the customer to explain what they need.

If the requirement is partially clear, suggest asking only for the important missing details.

If the requirement is clear, suggest a useful next step based on the available information.

Keep all responses concise and practical.
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash-lite",
      contents: prompt,
    });

    const text = response.text.trim();

    const cleanedText = text
      .replace(/^```json\s*/i, "")
      .replace(/\s*```$/i, "");

    const analysis = JSON.parse(cleanedText);

    res.status(200).json({
      success: true,
      data: {
        summary: analysis.summary || "No sufficient information available.",

        needSummary:
          analysis.needSummary ||
          "Customer requirement is not clearly provided.",

        requirementClarity: analysis.requirementClarity || "Unclear",

        missingInformation: Array.isArray(analysis.missingInformation)
          ? analysis.missingInformation
          : [],

        recommendedFollowUp:
          analysis.recommendedFollowUp ||
          "Contact the customer to understand their requirement.",
      },
    });
  } catch (error) {
    console.error("Gemini AI Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  analyzeLead,
};
