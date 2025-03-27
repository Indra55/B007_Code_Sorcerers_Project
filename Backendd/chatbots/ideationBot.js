const chatWithGemini = require('../config/gemini');
const conversations = {};
const userProfiles = {};  // Store user details separately
const userStates = {};    // Track conversation state

async function ideationBot(userId, userMessage) {
    if (!conversations[userId]) {
        conversations[userId] = [];
        userProfiles[userId] = {};
        userStates[userId] = 'collecting_profile'; // Initial state
    }

    // Keep only the last 10 messages
    if (conversations[userId].length > 10) {
        conversations[userId] = conversations[userId].slice(-5);
    }

    conversations[userId].push({ role: "user", content: userMessage });

    // Required profile fields
    const requiredFields = {
        fullName: "What is your full name?",
        age: "How old are you?",
        location: "Where are you currently based (City & Country)?",
        education: "What is your educational background?",
        job: "What is your current job or role?",
        skills: "What skills or expertise do you have?",
        industry: "Which industries interest you?",
        startupExperience: "Have you built a startup before?",
        motivation: "Why do you want to start a business?",
        resources: "What resources do you have (money, time, connections, team)?"
    };

    if (userStates[userId] === 'collecting_profile') {
        // Check if we were waiting for a specific answer
        const lastAskedField = conversations[userId]
            .filter(msg => msg.role === "assistant")
            .map(msg => Object.keys(requiredFields).find(field => msg.content === requiredFields[field]))
            .find(field => field && !userProfiles[userId][field]);

        if (lastAskedField) {
            userProfiles[userId][lastAskedField] = userMessage;
        }

        // Check if there are still missing fields
        const nextField = Object.keys(requiredFields).find(field => !userProfiles[userId][field]);

        if (nextField) {
            const nextQuestion = requiredFields[nextField];
            conversations[userId].push({ role: "assistant", content: nextQuestion });
            return nextQuestion;
        } else {
            // All profile fields are collected, move to ideation state
            userStates[userId] = 'ideation';
            const initiateIdeation = "Great! Now that I know about you, do you have a specific startup idea in mind? If yes, please describe it. If not, I can help you brainstorm based on your background and interests.";
            conversations[userId].push({ role: "assistant", content: initiateIdeation });
            return initiateIdeation;
        }
    }

    // If we're in ideation state, handle the conversation
    if (userStates[userId] === 'ideation') {
        const prompt = `
        You are an advanced Ideation AI, continuing a conversation about startup ideas.
        
        Context about the user:
        ${Object.entries(userProfiles[userId]).map(([key, value]) => `${key}: ${value}`).join('\n')}
        
        Previous messages:
        ${conversations[userId].slice(-3).map(msg => `${msg.role}: ${msg.content}`).join('\n')}
        
        Based on their profile and the conversation so far, provide relevant guidance about their startup idea or help them develop one.
        Be concise and actionable in your response.
        If they haven't shared an idea yet, help them brainstorm based on their skills and interests.
        If they have shared an idea, help them refine it and consider key aspects they might have missed.
        `;

        const response = await chatWithGemini(prompt);
        conversations[userId].push({ role: "assistant", content: response });
        return response;
    }
}

module.exports = ideationBot;
