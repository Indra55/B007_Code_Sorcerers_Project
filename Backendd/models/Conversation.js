// models/Conversation.js
const mongoose = require('mongoose');

const ConversationSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    stage: {
        type: String,
        required: true,
        enum: ['ideation', 'business', 'legal', 'execution', 'final-report']
    },
    messages: [{
        role: {
            type: String,
            required: true
        },
        content: {
            type: String,
            required: true
        },
        timestamp: {
            type: Date,
            default: Date.now
        }
    }],
    summary: {
        type: String,
        default: ""
    },
    previousStageSummary: {
        type: String,
        default: ""
    },
    userContext: {
        type: mongoose.Schema.Types.Mixed,
        default: {}
    }
}, {
    timestamps: true
});

// Create compound index for faster queries
ConversationSchema.index({ userId: 1, stage: 1 });

module.exports = mongoose.model('Conversation', ConversationSchema);