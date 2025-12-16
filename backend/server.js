const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.error('❌ MongoDB Connection Error:', err));

// Root route
app.get('/', (req, res) => {
  res.json({ 
    message: 'Mental Health Support API',
    status: 'running',
    endpoints: {
      auth: '/api/auth',
      journals: '/api/journals',
      moods: '/api/moods',
      suggestions: '/api/suggestions',
      testimonials: '/api/testimonials',
      counselors: '/api/counselors',
      appointments: '/api/appointments',
      feedback: '/api/feedback'
    }
  });
});

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/journals', require('./routes/journals'));
app.use('/api/moods', require('./routes/moods'));
app.use('/api/suggestions', require('./routes/suggestions'));
app.use('/api/testimonials', require('./routes/testimonials'));
app.use('/api/counselors', require('./routes/counselors'));
app.use('/api/appointments', require('./routes/appointments'));
app.use('/api/feedback', require('./routes/feedback'));

// For local development
if (require.main === module) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
}

module.exports = app;