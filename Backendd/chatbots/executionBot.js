const chatWithGemini = require('../config/gemini');
const Conversation = require('../models/Conversation');
const conversations = {};

async function executionBot(userId, legalSummary, userMessage, userContext = {}) {
    if (!conversations[userId]) {
        conversations[userId] = [];
    }

    conversations[userId].push({ role: "user", content: userMessage });

    const prompt = `You're an execution assistant. The legal guidance summary is:\n${legalSummary}\nHere’s the conversation so far:\n${JSON.stringify(conversations[userId])}\nUser context: ${JSON.stringify(userContext)}\nRespond to the last message.`;
    const response = await chatWithGemini(prompt);  // Use chatWithGemini

    conversations[userId].push({ role: "assistant", content: response });

    return response; 
}

async function getPreviousSummary(userId, stage) {
    const previousStage = getPreviousStage(stage);
    if (!previousStage) return "";

    const previousConversation = await Conversation.findOne({ userId, stage: previousStage });
    return previousConversation ? previousConversation.summary : "";
}

function getPreviousStage(currentStage) {
    const stages = ["ideation", "business", "legal", "execution", "final-report"];
    const currentIndex = stages.indexOf(currentStage);
    return currentIndex > 0 ? stages[currentIndex - 1] : null;
}

module.exports = { executionBot, getPreviousSummary };
