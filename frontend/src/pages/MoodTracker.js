import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeft, Sparkles } from 'lucide-react';

function MoodTracker() {
  const [rating, setRating] = useState('');
  const [dayDescription, setDayDescription] = useState('');
  const [majorEmotion, setMajorEmotion] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [gettingSuggestions, setGettingSuggestions] = useState(false);
  const navigate = useNavigate();

  const moodRatings = [
    { value: 'very sad', emoji: '😢', label: 'Very Sad' },
    { value: 'sad', emoji: '😔', label: 'Sad' },
    { value: 'neutral', emoji: '😐', label: 'Neutral' },
    { value: 'happy', emoji: '😊', label: 'Happy' },
    { value: 'very happy', emoji: '😄', label: 'Very Happy' }
  ];

  const emotions = [
    'happy', 'sad', 'depressed', 'lonely', 
    'nervous', 'anxious', 'excited', 'calm'
  ];

  const getSuggestions = async () => {
    if (!majorEmotion) {
      alert('Please select a major emotion first');
      return;
    }

    setGettingSuggestions(true);
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/suggestions`, {
        emotion: majorEmotion
      });
      setSuggestions(response.data.suggestions);
    } catch (error) {
      alert('Error getting suggestions. Make sure your OpenAI API key is configured.');
      console.error('Error:', error);
    } finally {
      setGettingSuggestions(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/api/moods`, {
        rating,
        dayDescription,
        majorEmotion,
        suggestions
      });
      
      alert('Mood entry saved successfully! 🌟');
      
      setRating('');
      setDayDescription('');
      setMajorEmotion('');
      setSuggestions([]);
    } catch (error) {
      alert('Error saving mood entry');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mood-container">
      <div className="page-header">
        <h1 className="page-title">Mood Tracker 💭</h1>
        <button 
          onClick={() => navigate('/dashboard')} 
          className="btn btn-secondary"
        >
          <ArrowLeft size={18} style={{ marginRight: '8px', display: 'inline' }} />
          Back to Dashboard
        </button>
      </div>

      <div className="mood-form">
        <h2 style={{ 
          fontSize: '1.5rem', 
          marginBottom: '24px', 
          color: '#1f2937',
          fontWeight: 600
        }}>
          How are you feeling today?
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Rate Your Day</label>
            <div className="mood-ratings">
              {moodRatings.map((mood) => (
                <div
                  key={mood.value}
                  className={`mood-rating ${rating === mood.value ? 'selected' : ''}`}
                  onClick={() => setRating(mood.value)}
                >
                  <div className="mood-emoji">{mood.emoji}</div>
                  <div className="mood-label">{mood.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Tell me about your day</label>
            <textarea
              className="form-textarea"
              value={dayDescription}
              onChange={(e) => setDayDescription(e.target.value)}
              placeholder="What happened today? How did it make you feel?"
              required
              rows="4"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Major emotion you felt</label>
            <select
              className="form-select"
              value={majorEmotion}
              onChange={(e) => setMajorEmotion(e.target.value)}
              required
            >
              <option value="">Select an emotion</option>
              {emotions.map((emotion) => (
                <option key={emotion} value={emotion}>
                  {emotion.charAt(0).toUpperCase() + emotion.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <button
            type="button"
            onClick={getSuggestions}
            className="btn btn-secondary"
            disabled={gettingSuggestions || !majorEmotion}
            style={{ 
              width: '100%', 
              marginBottom: '24px',
              background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
              color: 'white',
              border: 'none'
            }}
          >
            {gettingSuggestions ? (
              'Getting AI Suggestions...'
            ) : (
              <>
                <Sparkles size={18} style={{ marginRight: '8px', display: 'inline' }} />
                Get AI Suggestions to Improve Mood
              </>
            )}
          </button>

          {suggestions.length > 0 && (
            <div className="suggestions-box">
              <h3 className="suggestions-title">✨ Personalized Suggestions for You</h3>
              <ul className="suggestions-list">
                {suggestions.map((suggestion, index) => (
                  <li key={index} className="suggestion-item">
                    {suggestion}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={loading}
            style={{ marginTop: '16px' }}
          >
            {loading ? 'Saving...' : 'Save Mood Entry'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default MoodTracker;