const mongoose = require('mongoose');

const counselorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  specialization: {
    type: String,
    required: true
  },
  qualification: {
    type: String,
    required: true
  },
  experience: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        return /^\+91\d{10}$/.test(v);
      },
      message: props => `${props.value} is not a valid Indian phone number! Use format: +91XXXXXXXXXX`
    }
  },
  availableDays: {
    type: [String],
    required: true
  },
  rating: {
    type: Number,
    default: 4.5
  },
  bio: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    default: 'https://via.placeholder.com/150'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Counselor', counselorSchema);