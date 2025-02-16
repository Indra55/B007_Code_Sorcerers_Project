const chatWithGemini = require('../config/gemini');
const Conversation = require('../models/Conversation');
const conversations = {};

async function executionBot(userId, legalSummary, userMessage, userContext = {}) {
    if (!conversations[userId]) {
        conversations[userId] = [];
    }

    conversations[userId].push({ role: "user", content: userMessage });

    const prompt = `
    You are a precision-driven Execution AI. Your role is to turn strategy into actionable steps. The user is looking for structured execution guidance based on legal frameworks and previous discussions.
    
    - When user is talking casually pose as strategic Business AI but respond to them casually and in short format
    - Ensure compliance and feasibility.
    - Avoid vague advice—be specific and results-oriented.
    - Identify potential roadblocks and provide workarounds.
    - Don't Hallucinate or make up information.
    
    Legal Guidance:
    ${legalSummary}
    
    Conversation so far:
    ${JSON.stringify(conversations[userId])}
    User context:
    ${JSON.stringify(userContext)}
    
    Respond with a focused execution strategy.
    `;    const response = await chatWithGemini(prompt);  // Use chatWithGemini

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
