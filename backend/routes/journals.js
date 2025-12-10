const express = require('express');
const Journal = require('../models/Journal');
const auth = require('../middleware/auth');

const router = express.Router();

// Get all journals for user
router.get('/', auth, async (req, res) => {
  try {
    const journals = await Journal.find({ user: req.user.id })
      .sort({ createdAt: -1 });
    res.json(journals);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching journals', error: error.message });
  }
});

// Create new journal
router.post('/', auth, async (req, res) => {
  try {
    const { title, content } = req.body;
    
    const journal = new Journal({
      user: req.user.id,
      title,
      content
    });

    await journal.save();
    res.status(201).json(journal);
  } catch (error) {
    res.status(500).json({ message: 'Error creating journal', error: error.message });
  }
});

// Get single journal
router.get('/:id', auth, async (req, res) => {
  try {
    const journal = await Journal.findOne({
      _id: req.params.id,
      user: req.user.id
    });
    
    if (!journal) {
      return res.status(404).json({ message: 'Journal not found' });
    }
    
    res.json(journal);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching journal', error: error.message });
  }
});

// Update journal
router.put('/:id', auth, async (req, res) => {
  try {
    const { title, content } = req.body;
    
    const journal = await Journal.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      { title, content },
      { new: true }
    );
    
    if (!journal) {
      return res.status(404).json({ message: 'Journal not found' });
    }
    
    res.json(journal);
  } catch (error) {
    res.status(500).json({ message: 'Error updating journal', error: error.message });
  }
});

// Delete journal
router.delete('/:id', auth, async (req, res) => {
  try {
    const journal = await Journal.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id
    });
    
    if (!journal) {
      return res.status(404).json({ message: 'Journal not found' });
    }
    
    res.json({ message: 'Journal deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting journal', error: error.message });
  }
});

module.exports = router;