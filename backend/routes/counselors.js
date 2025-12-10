const express = require('express');
const Counselor = require('../models/Counselor');

const router = express.Router();

// Get all counselors
router.get('/', async (req, res) => {
  try {
    const counselors = await Counselor.find().sort({ rating: -1 });
    res.json(counselors);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching counselors', error: error.message });
  }
});

// Get single counselor
router.get('/:id', async (req, res) => {
  try {
    const counselor = await Counselor.findById(req.params.id);
    
    if (!counselor) {
      return res.status(404).json({ message: 'Counselor not found' });
    }
    
    res.json(counselor);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching counselor', error: error.message });
  }
});

// Create counselor (for admin/seeding)
router.post('/', async (req, res) => {
  try {
    const counselor = new Counselor(req.body);
    await counselor.save();
    res.status(201).json(counselor);
  } catch (error) {
    res.status(500).json({ message: 'Error creating counselor', error: error.message });
  }
});

module.exports = router;