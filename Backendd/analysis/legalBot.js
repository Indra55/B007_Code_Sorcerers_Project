const chatWithGemini = require('../config/gemini');
const Conversation = require('../models/Conversation');

async function legalBot(userId, ideationSummary, businessSummary, userMessage, userContext = {}) {
    const prompt = `
        You are a legal compliance assistant for a startup. The summaries from previous stages are:
        Ideation: ${ideationSummary}
        Business: ${businessSummary}
        Here’s the conversation so far:
        ${JSON.stringify([{ role: "user", content: userMessage }])}
        User context:
        ${JSON.stringify(userContext)}
        Provide detailed and actionable legal advice based on the above summaries and user context.
    `;
    const response = await chatWithGemini(prompt);

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

module.exports = { legalBot, getPreviousSummary };
