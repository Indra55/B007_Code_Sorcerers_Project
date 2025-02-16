const Conversation = require('../models/Conversation');
const chatWithGemini = require('../config/gemini');
const ideationBot = require('../chatbots/ideationBot');
const { businessBot } = require('../chatbots/businessBot');
const { legalBot } = require('../analysis/legalBot');
const { executionBot } = require('../chatbots/executionBot');
const finalReportBot  = require('../analysis/finalReportBot');

// Internal function to generate and save summary
const generateSummary = async (userId, stage) => {
    const conversation = await Conversation.findOne({ userId, stage });
    if (!conversation) return "";

    const summaryPrompt = `
        Provide a comprehensive summary of this ${stage} discussion in 3-4 sentences. 
        Focus on key decisions and insights from this conversation:
        ${JSON.stringify(conversation.messages)}
    `;
    
    const summary = await chatWithGemini(summaryPrompt);
    
    // Save the summary
    conversation.summary = summary;
    await conversation.save();
    
    return summary;
};

// Get summary from previous stage
const getPreviousStageSummary = async (userId, currentStage) => {
    const stages = ["ideation", "business", "legal", "execution", "final-report"];
    const currentIndex = stages.indexOf(currentStage);
    
    if (currentIndex <= 0) return ""; // No previous stage for ideation
    
    const previousStage = stages[currentIndex - 1];
    
    // Generate and get summary from previous stage
    return await generateSummary(userId, previousStage);
};

const chatWithBot = async (req, res) => {
    const userId = req.user?.userId;
    if (!userId) {
        return res.status(400).json({ error: "User ID is required" });
    }

    const { message, stage, userContext } = req.body;
    if (!message || !stage) {
        return res.status(400).json({ error: "Message and stage are required" });
    }

    try {
        let conversation = await Conversation.findOne({ userId, stage });
        
        if (!conversation) {
            // Automatically get previous stage's summary when starting new stage
            const previousStageSummary = await getPreviousStageSummary(userId, stage);
            
            conversation = new Conversation({ 
                userId, 
                stage, 
                messages: [], 
                userContext,
                previousStageSummary
            });
        }

        conversation.messages.push({ role: "user", content: message });

        let response;
        switch (stage) {
            case "ideation":
                response = await ideationBot(userId, message, userContext);
                break;
            
            case "business":
                response = await businessBot(
                    userId, 
                    conversation.previousStageSummary || "", 
                    message, 
                    userContext
                );
                break;
            
            case "legal":
                response = await legalBot(
                    userId, 
                    conversation.previousStageSummary || "",
                    message, 
                    userContext
                );
                break;
            
            case "execution":
                response = await executionBot(
                    userId,
                    conversation.previousStageSummary || "",
                    message,
                    userContext
                );
                break;

            case "final-report":
                const ideationSummary = await getPreviousStageSummary(userId, "ideation");
                const businessSummary = await getPreviousStageSummary(userId, "business");
                const legalSummary = await getPreviousStageSummary(userId, "legal");
                const executionSummary = await getPreviousStageSummary(userId, "execution");

                response = await finalReportBot(
                    userId,
                    ideationSummary,
                    businessSummary,
                    legalSummary,
                    executionSummary,
                    message,
                    userContext
                );
                break;
            
            default:
                return res.status(400).json({ error: "Invalid stage" });
        }

        conversation.messages.push({ role: "assistant", content: response });
        await conversation.save();

        res.json({ 
            response,
            stage,
            hasStoredSummary: !!conversation.previousStageSummary
        });

    } catch (error) {
        console.error("Error in chatWithBot:", error);
        res.status(500).json({ error: "Something went wrong." });
    }
};

module.exports = { chatWithBot };