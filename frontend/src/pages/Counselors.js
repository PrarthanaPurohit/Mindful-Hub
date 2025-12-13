import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeft, Star, Mail, Phone, Calendar, Award, Briefcase } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

function Counselors() {
  const [counselors, setCounselors] = useState([]);
  const [selectedCounselor, setSelectedCounselor] = useState(null);
  const [showAppointmentForm, setShowAppointmentForm] = useState(false);
  const [formData, setFormData] = useState({
    userName: '',
    userEmail: '',
    userPhone: '',
    preferredDate: '',
    preferredTime: '',
    reason: ''
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetchCounselors();
    if (user) {
      setFormData(prev => ({
        ...prev,
        userName: user.name || '',
        userEmail: user.email || ''
      }));
    }
  }, [user]);

  const fetchCounselors = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/counselors`);
      setCounselors(response.data);
    } catch (error) {
      console.error('Error fetching counselors:', error);
    }
  };

  const handleBookAppointment = (counselor) => {
    setSelectedCounselor(counselor);
    setShowAppointmentForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/api/appointments`, {
        counselor: selectedCounselor._id,
        ...formData
      });
      
      alert('Appointment request submitted successfully! 📅\nThe counselor will contact you soon.');
      setShowAppointmentForm(false);
      setSelectedCounselor(null);
      setFormData({
        userName: user?.name || '',
        userEmail: user?.email || '',
        userPhone: '',
        preferredDate: '',
        preferredTime: '',
        reason: ''
      });
    } catch (error) {
      alert('Error booking appointment');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={16}
        fill={i < Math.floor(rating) ? '#fbbf24' : 'none'}
        color={i < Math.floor(rating) ? '#fbbf24' : '#d1d5db'}
      />
    ));
  };

  if (showAppointmentForm && selectedCounselor) {
    return (
      <div className="mood-container">
        <div className="page-header">
          <h1 className="page-title">Book Appointment 📅</h1>
          <button 
            onClick={() => {
              setShowAppointmentForm(false);
              setSelectedCounselor(null);
            }} 
            className="btn btn-secondary"
          >
            <ArrowLeft size={18} style={{ marginRight: '8px', display: 'inline' }} />
            Back to Counselors
          </button>
        </div>

        <div className="mood-form">
          <div style={{ 
            background: 'linear-gradient(135deg, #e0f2fe 0%, #bae6fd 100%)',
            padding: '20px',
            borderRadius: '12px',
            marginBottom: '24px'
          }}>
            <h3 style={{ fontSize: '1.3rem', color: '#0369a1', marginBottom: '8px' }}>
              {selectedCounselor.name}
            </h3>
            <p style={{ color: '#0c4a6e', margin: 0 }}>
              {selectedCounselor.specialization}
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Your Name</label>
              <input
                type="text"
                className="form-input"
                value={formData.userName}
                onChange={(e) => setFormData({...formData, userName: e.target.value})}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input
                type="email"
                className="form-input"
                value={formData.userEmail}
                onChange={(e) => setFormData({...formData, userEmail: e.target.value})}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Phone Number</label>
              <input
                type="tel"
                className="form-input"
                value={formData.userPhone}
                onChange={(e) => setFormData({...formData, userPhone: e.target.value})}
                placeholder="+1 (555) 123-4567"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Preferred Date</label>
              <input
                type="date"
                className="form-input"
                value={formData.preferredDate}
                onChange={(e) => setFormData({...formData, preferredDate: e.target.value})}
                min={new Date().toISOString().split('T')[0]}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Preferred Time</label>
              <select
                className="form-select"
                value={formData.preferredTime}
                onChange={(e) => setFormData({...formData, preferredTime: e.target.value})}
                required
              >
                <option value="">Select a time</option>
                <option value="09:00 AM">09:00 AM</option>
                <option value="10:00 AM">10:00 AM</option>
                <option value="11:00 AM">11:00 AM</option>
                <option value="12:00 PM">12:00 PM</option>
                <option value="02:00 PM">02:00 PM</option>
                <option value="03:00 PM">03:00 PM</option>
                <option value="04:00 PM">04:00 PM</option>
                <option value="05:00 PM">05:00 PM</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Reason for Consultation</label>
              <textarea
                className="form-textarea"
                value={formData.reason}
                onChange={(e) => setFormData({...formData, reason: e.target.value})}
                placeholder="Briefly describe what you'd like to discuss..."
                required
                rows="4"
              />
            </div>

            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? 'Booking...' : 'Submit Appointment Request'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="journal-container">
      <div className="page-header">
        <h1 className="page-title">Professional Counselors 👨‍⚕️</h1>
        <button 
          onClick={() => navigate('/dashboard')} 
          className="btn btn-secondary"
        >
          <ArrowLeft size={18} style={{ marginRight: '8px', display: 'inline' }} />
          Back
        </button>
      </div>

      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        {counselors.length === 0 ? (
          <div style={{ 
            background: 'rgba(255, 255, 255, 0.95)', 
            padding: '32px', 
            borderRadius: '16px',
            textAlign: 'center',
            color: '#6b7280'
          }}>
            Loading counselors... 🔄
          </div>
        ) : (
          <div style={{ display: 'grid', gap: '24px' }}>
            {counselors.map((counselor) => (
              <div 
                key={counselor._id} 
                style={{
                  background: 'rgba(255, 255, 255, 0.95)',
                  borderRadius: '20px',
                  padding: '32px',
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
                  transition: 'all 0.3s ease'
                }}
              >
                <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
                  <div style={{ 
                    width: '120px', 
                    height: '120px', 
                    borderRadius: '50%', 
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '3rem',
                    color: 'white',
                    fontWeight: 'bold',
                    flexShrink: 0
                  }}>
                    {counselor.name.charAt(0)}
                  </div>
                  
                  <div style={{ flex: 1, minWidth: '250px' }}>
                    <h3 style={{ fontSize: '1.8rem', fontWeight: 700, color: '#1f2937', marginBottom: '8px' }}>
                      {counselor.name}
                    </h3>
                    
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                      <div style={{ display: 'flex', gap: '2px' }}>
                        {renderStars(counselor.rating)}
                      </div>
                      <span style={{ color: '#6b7280', fontSize: '0.9rem', fontWeight: 600 }}>
                        {counselor.rating}
                      </span>
                    </div>

                    <div style={{ 
                      display: 'inline-block',
                      background: 'linear-gradient(135deg, #667eea20, #764ba220)',
                      padding: '6px 16px',
                      borderRadius: '20px',
                      marginBottom: '16px'
                    }}>
                      <span style={{ color: '#667eea', fontWeight: 600, fontSize: '0.9rem' }}>
                        {counselor.specialization}
                      </span>
                    </div>

                    <p style={{ color: '#4b5563', lineHeight: 1.6, marginBottom: '16px' }}>
                      {counselor.bio}
                    </p>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px', marginBottom: '16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Award size={18} color="#667eea" />
                        <span style={{ fontSize: '0.9rem', color: '#6b7280' }}>
                          {counselor.qualification}
                        </span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Briefcase size={18} color="#667eea" />
                        <span style={{ fontSize: '0.9rem', color: '#6b7280' }}>
                          {counselor.experience} experience
                        </span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Mail size={18} color="#667eea" />
                        <span style={{ fontSize: '0.9rem', color: '#6b7280' }}>
                          {counselor.email}
                        </span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Phone size={18} color="#667eea" />
                        <span style={{ fontSize: '0.9rem', color: '#6b7280' }}>
                          {counselor.phone}
                        </span>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
                      <Calendar size={18} color="#667eea" />
                      <span style={{ fontSize: '0.9rem', color: '#6b7280' }}>
                        Available: {counselor.availableDays.join(', ')}
                      </span>
                    </div>

                    <button 
                      onClick={() => handleBookAppointment(counselor)}
                      className="btn btn-primary"
                      style={{ width: 'auto', padding: '12px 32px' }}
                    >
                      Book Appointment
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Counselors;