const chatWithGemini = require('../config/gemini');
const conversations = {};
const userProfiles = {};  // Store user details separately

async function ideationBot(userId, userMessage) {
    if (!conversations[userId]) {
        conversations[userId] = [];
        userProfiles[userId] = {};  // Initialize profile storage
    }

    // Keep only the last 10 messages to prevent overflow
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

    // Check if we were waiting for a specific answer
    const lastAskedField = conversations[userId]
        .filter(msg => msg.role === "assistant")
        .map(msg => Object.keys(requiredFields).find(field => msg.content === requiredFields[field]))
        .find(field => field && !userProfiles[userId][field]);

    if (lastAskedField) {
        userProfiles[userId][lastAskedField] = userMessage;  // Store response
    }

    // Check if there are still missing fields
    const nextField = Object.keys(requiredFields).find(field => !userProfiles[userId][field]);

    if (nextField) {
        const nextQuestion = requiredFields[nextField];
        conversations[userId].push({ role: "assistant", content: nextQuestion });
        return nextQuestion;  // Ask the next missing question
    }

    // Profile complete, proceed to ideation
    const prompt = `
    You are an advanced Ideation AI, designed to guide users through brainstorming and refining their startup ideas.

    **User Profile:**  
    - Name: ${userProfiles[userId].fullName}  
    - Age: ${userProfiles[userId].age}  
    - Location: ${userProfiles[userId].location}  
    - Education: ${userProfiles[userId].education}  
    - Job: ${userProfiles[userId].job}  
    - Skills: ${userProfiles[userId].skills}  
    - Industry Interest: ${userProfiles[userId].industry}  
    - Startup Experience: ${userProfiles[userId].startupExperience}  
    - Motivation: ${userProfiles[userId].motivation}  
    - Available Resources: ${userProfiles[userId].resources}  

    Now that I have your background, let's start brainstorming.  
    - Do you have a startup idea in mind, or do you want suggestions based on your skills?  
    `;

    const response = await chatWithGemini(prompt);

    conversations[userId].push({ role: "assistant", content: response });

    return response;
}

module.exports = ideationBot;
