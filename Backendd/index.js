require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken'); // Import jwt

const chatbotRoutes = require('./routes/chatbotRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();
app.use(express.json()); // Ensure request body is parsed
app.use(cors());
 
// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    // Remove deprecated options
}).then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Middleware to verify JWT
function authenticateToken(req, res, next) {
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) return res.sendStatus(401);
 
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}

app.use('/auth', authRoutes);
app.use('/chatbot', authenticateToken, chatbotRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
