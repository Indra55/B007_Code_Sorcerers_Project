const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function chatWithGemini(prompt) {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent([prompt]);

        // Log the full API response for debugging
        console.log("Full Gemini Response:", JSON.stringify(result, null, 2));

        // Extract all response parts safely
        const responseParts = result?.response?.candidates?.[0]?.content?.parts;
        if (!responseParts || responseParts.length === 0) {
            return "Error: No response received from Gemini.";
        }

        return responseParts.map(part => part.text).join("\n");  // Join all parts for full response
    } catch (error) {
        console.error("Gemini API Error:", error);  // Log the error details
        return "Error: Failed to fetch response from Gemini.";
    }
}

module.exports = chatWithGemini;
