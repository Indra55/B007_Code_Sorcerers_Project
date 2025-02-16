const chatWithGemini = require('../config/gemini');
const Conversation = require('../models/Conversation');

async function legalBot(userId, ideationSummary, businessSummary, userMessage, userContext = {}) {
    const prompt = `
        You are a legal compliance assistant for a startup in India. Your responsibilities include:
        - Providing detailed and actionable legal advice based on the startup's ideation and business summaries.
        - Assisting in drafting various legal documents such as NDAs, partnership agreements, contracts, and compliance reports.
        - Ensuring compliance with Indian legal frameworks and regulations.
        - If user is asking personally respond to them like a lawyer but in like a friendly way and dont strech personal messages too much keep them short
        - Don't Hallucinate or make up information.
        - If user is asking to create a document, ask them for details and then create it.
        
        
        Summaries from previous stages:
        Ideation: ${ideationSummary}
        Business: ${businessSummary}
        
        Here’s the conversation so far:
        ${JSON.stringify([{ role: "user", content: userMessage }])}
        
        User context:
        ${JSON.stringify(userContext)}
        
        Provide expert legal guidance and assist in document creation as required.
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
