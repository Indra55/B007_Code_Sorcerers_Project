const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');

const router = express.Router();

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !await bcrypt.compare(password, user.password)) {
        return res.status(400).json({ error: 'Invalid credentials' });
    }
 
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
});
 
router.post('/register', async (req, res) => {
    const { name, email, password } = req.body; 
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ name, email, password: hashedPassword });
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.post('/logout', (req, res) => {
    req.logout();
    res.json({ message: 'Logged out successfully' });
});

router.get('/google', (req, res) => {
    res.status(404).json({ error: 'Google authentication is not supported.' });
});

router.get('/google/callback', (req, res) => { 
    res.status(404).json({ error: 'Google authentication is not supported.' });
});

module.exports = router;
