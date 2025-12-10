const mongoose = require('mongoose');

const moodSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  rating: {
    type: String,
    enum: ['very sad', 'sad', 'neutral', 'happy', 'very happy'],
    required: true
  },
  dayDescription: {
    type: String,
    required: true
  },
  majorEmotion: {
    type: String,
    enum: ['happy', 'sad', 'depressed', 'lonely', 'nervous', 'anxious', 'excited', 'calm'],
    required: true
  },
  suggestions: [{
    type: String
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Mood', moodSchema);