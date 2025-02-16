const chatWithGemini = require('../config/gemini');

async function startupHelpBot(userMessage) {
    const prompt = `You're a startup guidance bot. Answer the user's query in a simple way: ${userMessage}`;
    return await chatWithGemini(prompt);
}

module.exports = startupHelpBot;
