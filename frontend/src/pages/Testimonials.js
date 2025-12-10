import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeft, Star } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [userName, setUserName] = useState('');
  const [rating, setRating] = useState(5);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetchTestimonials();
    if (user) {
      setUserName(user.name || '');
    }
  }, [user]);

  const fetchTestimonials = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/testimonials');
      setTestimonials(response.data);
    } catch (error) {
      console.error('Error fetching testimonials:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post('http://localhost:5000/api/testimonials', {
        userName,
        rating,
        message
      });
      
      alert('Thank you for your testimonial! 🌟');
      setShowForm(false);
      setMessage('');
      setRating(5);
      fetchTestimonials();
    } catch (error) {
      alert('Error submitting testimonial');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderStars = (count) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={16}
        fill={i < count ? '#fbbf24' : 'none'}
        color={i < count ? '#fbbf24' : '#d1d5db'}
      />
    ));
  };

  return (
    <div className="journal-container">
      <div className="page-header">
        <h1 className="page-title">Community Stories ⭐</h1>
        <div style={{ display: 'flex', gap: '12px' }}>
          {!showForm && (
            <button 
              onClick={() => setShowForm(true)} 
              className="btn btn-secondary"
              style={{ 
                background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
                border: 'none'
              }}
            >
              Share Your Story
            </button>
          )}
          <button 
            onClick={() => navigate('/dashboard')} 
            className="btn btn-secondary"
          >
            <ArrowLeft size={18} style={{ marginRight: '8px', display: 'inline' }} />
            Back
          </button>
        </div>
      </div>

      {showForm && (
        <div className="journal-form" style={{ marginBottom: '40px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <h2 style={{ fontSize: '1.5rem', color: '#1f2937', fontWeight: 600, margin: 0 }}>
              Share Your Experience
            </h2>
            <button 
              onClick={() => setShowForm(false)}
              style={{ 
                background: 'none', 
                border: 'none', 
                fontSize: '1.5rem', 
                cursor: 'pointer',
                color: '#9ca3af'
              }}
            >
              ✕
            </button>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Your Name</label>
              <input
                type="text"
                className="form-input"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="How should we call you?"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Rating</label>
              <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={32}
                    fill={star <= rating ? '#fbbf24' : 'none'}
                    color={star <= rating ? '#fbbf24' : '#d1d5db'}
                    style={{ cursor: 'pointer' }}
                    onClick={() => setRating(star)}
                  />
                ))}
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Your Story</label>
              <textarea
                className="form-textarea"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Share how this app has helped you in your wellness journey..."
                required
                maxLength="500"
                rows="5"
              />
              <small style={{ color: '#9ca3af', fontSize: '0.875rem' }}>
                {message.length}/500 characters
              </small>
            </div>

            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? 'Submitting...' : 'Submit Testimonial'}
            </button>
          </form>
        </div>
      )}

      <div className="journal-entries">
        <h2 className="entries-title">What Our Community Says</h2>
        
        {testimonials.length === 0 ? (
          <div style={{ 
            background: 'rgba(255, 255, 255, 0.95)', 
            padding: '32px', 
            borderRadius: '16px',
            textAlign: 'center',
            color: '#6b7280'
          }}>
            No testimonials yet. Be the first to share your story! 💫
          </div>
        ) : (
          <div style={{ display: 'grid', gap: '20px' }}>
            {testimonials.map((testimonial) => (
              <div 
                key={testimonial._id} 
                className="journal-entry"
                style={{ 
                  background: 'linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)',
                  border: '2px solid #fbbf24'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '12px' }}>
                  <h3 className="entry-title" style={{ fontSize: '1.2rem', marginBottom: 0 }}>
                    {testimonial.userName}
                  </h3>
                  <div style={{ display: 'flex', gap: '4px' }}>
                    {renderStars(testimonial.rating)}
                  </div>
                </div>
                <p className="entry-date" style={{ marginBottom: '12px' }}>
                  {new Date(testimonial.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
                <p className="entry-content" style={{ fontStyle: 'italic' }}>
                  "{testimonial.message}"
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Testimonials;