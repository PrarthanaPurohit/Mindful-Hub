import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeft } from 'lucide-react';

function Journal() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [journals, setJournals] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchJournals();
  }, []);

  const fetchJournals = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/journals`);
      setJournals(response.data);
    } catch (error) {
      console.error('Error fetching journals:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/api/journals`, {
        title,
        content
      });
      
      setTitle('');
      setContent('');
      fetchJournals();
      alert('Journal entry saved successfully! 📝');
    } catch (error) {
      alert('Error saving journal entry');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="journal-container">
      <div className="page-header">
        <h1 className="page-title">My Journal 📖</h1>
        <button 
          onClick={() => navigate('/dashboard')} 
          className="btn btn-secondary"
        >
          <ArrowLeft size={18} style={{ marginRight: '8px', display: 'inline' }} />
          Back to Dashboard
        </button>
      </div>

      <div className="journal-form">
        <h2 style={{ 
          fontSize: '1.5rem', 
          marginBottom: '24px', 
          color: '#1f2937',
          fontWeight: 600
        }}>
          Write Your Entry
        </h2>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Title</label>
            <input
              type="text"
              className="form-input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="What's on your mind today?"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Journal Entry</label>
            <textarea
              className="form-textarea"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Pour your thoughts here... Write freely and honestly."
              required
              rows="8"
            />
          </div>

          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={loading}
          >
            {loading ? 'Saving...' : 'Save Journal Entry'}
          </button>
        </form>
      </div>

      <div className="journal-entries">
        <h2 className="entries-title">Your Previous Entries</h2>
        
        {journals.length === 0 ? (
          <div style={{ 
            background: 'rgba(255, 255, 255, 0.95)', 
            padding: '32px', 
            borderRadius: '16px',
            textAlign: 'center',
            color: '#6b7280'
          }}>
            No journal entries yet. Start writing your first entry above! ✍️
          </div>
        ) : (
          journals.map((journal) => (
            <div key={journal._id} className="journal-entry">
              <h3 className="entry-title">{journal.title}</h3>
              <p className="entry-date">
                {new Date(journal.createdAt).toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
              <p className="entry-content">{journal.content}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Journal;