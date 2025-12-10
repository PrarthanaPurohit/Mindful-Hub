const express = require('express');
const axios = require('axios');
const auth = require('../middleware/auth');

const router = express.Router();

// Get AI suggestions
router.post('/', auth, async (req, res) => {
  try {
    const { emotion } = req.body;
    
    if (!emotion) {
      return res.status(400).json({ message: 'Emotion is required' });
    }

    const prompt = `List 5 practical and actionable activities to help manage feeling ${emotion}. Format each as a short, encouraging sentence starting with an action verb. Keep responses concise and positive.`;

    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are a compassionate mental wellness assistant. Provide helpful, practical advice in a warm and supportive tone.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: 300,
        temperature: 0.7
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const suggestions = response.data.choices[0].message.content
      .split('\n')
      .filter(line => line.trim().length > 0)
      .map(line => line.replace(/^\d+\.\s*/, '').trim())
      .slice(0, 5);

    res.json({ suggestions });
  } catch (error) {
    console.error('OpenAI Error:', error.response?.data || error.message);
    res.status(500).json({ 
      message: 'Error getting suggestions', 
      error: error.response?.data?.error?.message || error.message 
    });
  }
});

module.exports = router;