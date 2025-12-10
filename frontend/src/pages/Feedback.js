import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeft, MessageSquare, Star } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

function Feedback() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: '',
    rating: 0,
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  React.useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        name: user.name || '',
        email: user.email || ''
      }));
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post('http://localhost:5000/api/feedback', formData);
      
      setSubmitted(true);
      setTimeout(() => {
        navigate('/dashboard');
      }, 3000);
    } catch (error) {
      alert('Error submitting feedback. Please try again.');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="mood-container">
        <div style={{ 
          maxWidth: '600px', 
          margin: '100px auto',
          background: 'rgba(255, 255, 255, 0.95)',
          padding: '48px',
          borderRadius: '20px',
          textAlign: 'center',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)'
        }}>
          <div style={{ fontSize: '4rem', marginBottom: '20px' }}>✅</div>
          <h2 style={{ fontSize: '2rem', color: '#1f2937', marginBottom: '12px', fontWeight: 700 }}>
            Thank You!
          </h2>
          <p style={{ color: '#6b7280', fontSize: '1.1rem', lineHeight: 1.6 }}>
            Your feedback has been submitted successfully. We appreciate you taking 
            the time to help us improve!
          </p>
          <p style={{ color: '#9ca3af', fontSize: '0.9rem', marginTop: '20px' }}>
            Redirecting to dashboard...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mood-container">
      <div className="page-header">
        <h1 className="page-title">Send Feedback 💬</h1>
        <button 
          onClick={() => navigate('/dashboard')} 
          className="btn btn-secondary"
        >
          <ArrowLeft size={18} style={{ marginRight: '8px', display: 'inline' }} />
          Back
        </button>
      </div>

      <div className="mood-form">
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <MessageSquare size={48} color="#667eea" style={{ marginBottom: '16px' }} />
          <h2 style={{ fontSize: '1.5rem', color: '#1f2937', marginBottom: '8px', fontWeight: 600 }}>
            We'd Love to Hear From You
          </h2>
          <p style={{ color: '#6b7280', fontSize: '0.95rem' }}>
            Your feedback helps us create a better experience for everyone.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Your Name</label>
            <input
              type="text"
              className="form-input"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              placeholder="John Doe"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              className="form-input"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              placeholder="you@example.com"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Feedback Category</label>
            <select
              className="form-select"
              value={formData.category}
              onChange={(e) => setFormData({...formData, category: e.target.value})}
              required
            >
              <option value="">Select a category</option>
              <option value="bug">🐛 Bug Report</option>
              <option value="feature">💡 Feature Request</option>
              <option value="improvement">⚡ Improvement Suggestion</option>
              <option value="general">💬 General Feedback</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">How would you rate your experience?</label>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={36}
                  fill={star <= formData.rating ? '#fbbf24' : 'none'}
                  color={star <= formData.rating ? '#fbbf24' : '#d1d5db'}
                  style={{ cursor: 'pointer', transition: 'all 0.2s ease' }}
                  onClick={() => setFormData({...formData, rating: star})}
                />
              ))}
            </div>
            {formData.rating > 0 && (
              <small style={{ color: '#667eea', fontWeight: 600 }}>
                {formData.rating === 5 && "Excellent! 🌟"}
                {formData.rating === 4 && "Great! 😊"}
                {formData.rating === 3 && "Good 👍"}
                {formData.rating === 2 && "Fair 😐"}
                {formData.rating === 1 && "Needs Improvement 😔"}
              </small>
            )}
          </div>

          <div className="form-group">
            <label className="form-label">Your Feedback</label>
            <textarea
              className="form-textarea"
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
              placeholder="Tell us what's on your mind. Be as detailed as you'd like..."
              required
              rows="6"
            />
          </div>

          <div style={{ 
            background: 'linear-gradient(135deg, #e0f2fe 0%, #bae6fd 100%)',
            padding: '16px',
            borderRadius: '12px',
            marginBottom: '24px'
          }}>
            <p style={{ margin: 0, fontSize: '0.9rem', color: '#0c4a6e', lineHeight: 1.5 }}>
              💡 <strong>Tip:</strong> The more specific you are, the better we can address your feedback!
            </p>
          </div>

          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Submit Feedback'}
          </button>
        </form>
      </div>

      <div style={{ 
        maxWidth: '700px',
        margin: '40px auto 0',
        background: 'rgba(255, 255, 255, 0.95)',
        padding: '24px',
        borderRadius: '16px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
      }}>
        <h3 style={{ fontSize: '1.2rem', color: '#1f2937', marginBottom: '12px', fontWeight: 600 }}>
          🎯 What We're Looking For
        </h3>
        <ul style={{ color: '#4b5563', lineHeight: 1.8, paddingLeft: '20px' }}>
          <li>Bugs or technical issues you've encountered</li>
          <li>Features you'd like to see added</li>
          <li>Ways we can improve the user experience</li>
          <li>General thoughts about the app</li>
        </ul>
      </div>
    </div>
  );
}

export default Feedback;