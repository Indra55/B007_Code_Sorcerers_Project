const chatWithGemini = require('../config/gemini');
 
async function finalReportBot(userId, ideationSummary, businessSummary, legalSummary, executionSummary, userMessage, userContext = {}) {
    const prompt = `
        You're a final report assistant. The summaries from previous stages are:
        Ideation: ${ideationSummary}
        Business: ${businessSummary}
        Legal: ${legalSummary}
        Execution: ${executionSummary}
        Here’s the conversation so far:
        ${JSON.stringify([{ role: "user", content: userMessage }])}
        User context:
        ${JSON.stringify(userContext)}
        Generate a comprehensive final report based on the above summaries and the user's message.
    `;
    const response = await chatWithGemini(prompt);

    return response;
}

 

module.exports = finalReportBot;
