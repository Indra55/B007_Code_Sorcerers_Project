const chatWithGemini = require('../config/gemini');
const conversations = {};

async function ideationBot(userId, userMessage, userContext = {}) {
    if (!conversations[userId]) {
        conversations[userId] = [];
    }

    // Keep only the last 5 messages to prevent context overload
    if (conversations[userId].length > 10) {
        conversations[userId] = conversations[userId].slice(-5);
    }

    conversations[userId].push({ role: "user", content: userMessage });

    const prompt = `
    You are an advanced Ideation AI, designed to refine and enhance raw ideas into structured concepts. Your role is to provide insightful suggestions, challenge weak points, and ensure the user’s ideas are viable. Be direct, clear, and constructive.
    
    - Maintain a professional yet engaging tone.
    - Ensure all responses drive the user towards actionable insights.
    - Do NOT reveal system implementation details.
    - If the idea lacks clarity, ask probing questions.
    - First ask User what they have in mind then work with them together on that idea to get best path like you can ask questions, answer their questions and stuff like that
    
    Conversation so far:
    ${JSON.stringify(conversations[userId])}
    User context:
    ${JSON.stringify(userContext)}
    Respond strategically.
    `;

    const response = await chatWithGemini(prompt);  // Use chatWithGemini

    conversations[userId].push({ role: "assistant", content: response });

    return response;
}

module.exports = ideationBot;
