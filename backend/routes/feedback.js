const express = require('express');
const Feedback = require('../models/Feedback');
const auth = require('../middleware/auth');

const router = express.Router();

// Create feedback (can be used by logged in or anonymous users)
router.post('/', async (req, res) => {
  try {
    const { name, email, category, rating, message } = req.body;
    
    const feedbackData = {
      name,
      email,
      category,
      rating,
      message
    };

    // Add user ID if authenticated
    if (req.header('Authorization')) {
      try {
        const jwt = require('jsonwebtoken');
        const token = req.header('Authorization').replace('Bearer ', '');
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        feedbackData.user = verified.id;
      } catch (err) {
        // Continue without user ID if token is invalid
      }
    }

    const feedback = new Feedback(feedbackData);
    await feedback.save();
    
    res.status(201).json({ 
      message: 'Feedback submitted successfully!',
      feedback 
    });
  } catch (error) {
    res.status(500).json({ message: 'Error submitting feedback', error: error.message });
  }
});

// Get user's feedback (protected)
router.get('/my-feedback', auth, async (req, res) => {
  try {
    const feedback = await Feedback.find({ user: req.user.id })
      .sort({ createdAt: -1 });
    res.json(feedback);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching feedback', error: error.message });
  }
});

module.exports = router;