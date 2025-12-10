const express = require('express');
const Mood = require('../models/Mood');
const auth = require('../middleware/auth');

const router = express.Router();

// Get all mood entries for user
router.get('/', auth, async (req, res) => {
  try {
    const moods = await Mood.find({ user: req.user.id })
      .sort({ createdAt: -1 });
    res.json(moods);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching moods', error: error.message });
  }
});

// Create new mood entry
router.post('/', auth, async (req, res) => {
  try {
    const { rating, dayDescription, majorEmotion, suggestions } = req.body;
    
    const mood = new Mood({
      user: req.user.id,
      rating,
      dayDescription,
      majorEmotion,
      suggestions: suggestions || []
    });

    await mood.save();
    res.status(201).json(mood);
  } catch (error) {
    res.status(500).json({ message: 'Error creating mood entry', error: error.message });
  }
});

// Get single mood entry
router.get('/:id', auth, async (req, res) => {
  try {
    const mood = await Mood.findOne({
      _id: req.params.id,
      user: req.user.id
    });
    
    if (!mood) {
      return res.status(404).json({ message: 'Mood entry not found' });
    }
    
    res.json(mood);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching mood', error: error.message });
  }
});

module.exports = router;