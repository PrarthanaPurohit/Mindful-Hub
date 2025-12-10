import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { BookOpen, Heart, LogOut, Star, Users, MessageSquare } from 'lucide-react';

function Dashboard() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1 className="dashboard-title">
          Welcome back, {user?.name || 'Friend'} ✨
        </h1>
        <button onClick={handleLogout} className="btn btn-logout">
          <LogOut size={18} style={{ marginRight: '8px', display: 'inline' }} />
          Logout
        </button>
      </div>

      <div className="dashboard-content">
        <div className="cards-grid">
          <div 
            className="feature-card"
            onClick={() => navigate('/journal')}
          >
            <div 
              className="feature-icon" 
              style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}
            >
              <BookOpen size={28} color="white" />
            </div>
            <h2 className="feature-title">My Journal</h2>
            <p className="feature-description">
              Write your thoughts, feelings, and experiences. Reflect on your day 
              and keep track of your personal growth journey.
            </p>
          </div>

          <div 
            className="feature-card"
            onClick={() => navigate('/mood')}
          >
            <div 
              className="feature-icon" 
              style={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' }}
            >
              <Heart size={28} color="white" />
            </div>
            <h2 className="feature-title">Mood Tracker</h2>
            <p className="feature-description">
              Track your daily emotions and get personalized AI-powered suggestions 
              to improve your mental wellbeing.
            </p>
          </div>

          <div 
            className="feature-card"
            onClick={() => navigate('/testimonials')}
          >
            <div 
              className="feature-icon" 
              style={{ background: 'linear-gradient(135deg, #ffeaa7 0%, #fdcb6e 100%)' }}
            >
              <Star size={28} color="white" />
            </div>
            <h2 className="feature-title">Testimonials</h2>
            <p className="feature-description">
              Read inspiring stories from our community and share your own 
              wellness journey to motivate others.
            </p>
          </div>

          <div 
            className="feature-card"
            onClick={() => navigate('/counselors')}
          >
            <div 
              className="feature-icon" 
              style={{ background: 'linear-gradient(135deg, #74b9ff 0%, #0984e3 100%)' }}
            >
              <Users size={28} color="white" />
            </div>
            <h2 className="feature-title">Find a Counselor</h2>
            <p className="feature-description">
              Connect with professional counselors and therapists. Book appointments 
              and get expert mental health support.
            </p>
          </div>

          <div 
            className="feature-card"
            onClick={() => navigate('/feedback')}
          >
            <div 
              className="feature-icon" 
              style={{ background: 'linear-gradient(135deg, #55efc4 0%, #00b894 100%)' }}
            >
              <MessageSquare size={28} color="white" />
            </div>
            <h2 className="feature-title">Send Feedback</h2>
            <p className="feature-description">
              Help us improve! Share your thoughts, suggestions, or report 
              any issues you encounter.
            </p>
          </div>
        </div>

        <div style={{ 
          background: 'rgba(255, 255, 255, 0.95)', 
          padding: '32px', 
          borderRadius: '20px',
          textAlign: 'center',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)'
        }}>
          <h3 style={{ 
            fontSize: '1.5rem', 
            marginBottom: '12px', 
            color: '#1f2937',
            fontWeight: 600
          }}>
            🌱 Your Wellness Journey Starts Here
          </h3>
          <p style={{ color: '#6b7280', lineHeight: 1.6 }}>
            Take a moment each day to check in with yourself. Whether you're journaling 
            your thoughts or tracking your mood, every small step counts towards better 
            mental health and self-awareness.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;