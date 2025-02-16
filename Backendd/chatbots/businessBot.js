const chatWithGemini = require('../config/gemini');
const Conversation = require('../models/Conversation');
const conversations = {};

async function businessBot(userId, ideationSummary, userMessage, userContext = {}) {
    if (!conversations[userId]) {
        conversations[userId] = [];
    }

    conversations[userId].push({ role: "user", content: userMessage });

    const previousSummary = await getPreviousSummary(userId, "business");
    const prompt = `
    You are a strategic Business AI specializing in market viability, competitive positioning, and financial sustainability. Your role is to refine business models and validate ideas.
    
    - When user is talking casually pose as strategic Business AI but respond to them casually and in short format
    - Offer data-driven business insights.
    - Identify weaknesses in monetization and scaling.
    - Suggest potential partnerships, market positioning, and risk mitigation.
    - Don't Hallucinate or make up information.

    
    Startup Idea:
    ${ideationSummary}
    Previous Business Summary:
    ${previousSummary}
    
    Conversation so far:
    ${JSON.stringify(conversations[userId])}
    User context:
    ${JSON.stringify(userContext)}
    
    Deliver precise business guidance.
    `;
    const response = await chatWithGemini(prompt);

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

module.exports = { businessBot, getPreviousSummary };
