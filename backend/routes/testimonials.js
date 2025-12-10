const express = require('express');
const Testimonial = require('../models/Testimonial');
const auth = require('../middleware/auth');

const router = express.Router();

// Get all approved testimonials (public)
router.get('/', async (req, res) => {
  try {
    const testimonials = await Testimonial.find({ isApproved: true })
      .sort({ createdAt: -1 })
      .limit(20);
    res.json(testimonials);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching testimonials', error: error.message });
  }
});

// Create new testimonial (protected)
router.post('/', auth, async (req, res) => {
  try {
    const { userName, rating, message } = req.body;
    
    const testimonial = new Testimonial({
      user: req.user.id,
      userName,
      rating,
      message,
      isApproved: true // Auto-approve for now
    });

    await testimonial.save();
    res.status(201).json(testimonial);
  } catch (error) {
    res.status(500).json({ message: 'Error creating testimonial', error: error.message });
  }
});

// Get user's testimonials
router.get('/my-testimonials', auth, async (req, res) => {
  try {
    const testimonials = await Testimonial.find({ user: req.user.id })
      .sort({ createdAt: -1 });
    res.json(testimonials);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching testimonials', error: error.message });
  }
});

module.exports = router;