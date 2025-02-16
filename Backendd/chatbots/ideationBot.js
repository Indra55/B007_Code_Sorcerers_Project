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
    You're an engaging AI assistant. Your goal is to keep conversations natural and interactive. 
    If the user starts a new topic, adjust your response accordingly.
    Use only the below when required dont use it always.
    Conversation so far:
    ${JSON.stringify(conversations[userId])}
    
    User context: ${JSON.stringify(userContext)}
    Respond to the last message appropriately.
    `;

    const response = await chatWithGemini(prompt);  // Use chatWithGemini

    conversations[userId].push({ role: "assistant", content: response });

    return response;
}

module.exports = ideationBot;
