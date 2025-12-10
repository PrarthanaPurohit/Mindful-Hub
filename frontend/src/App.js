import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Journal from './pages/Journal';
import MoodTracker from './pages/MoodTracker';
import Testimonials from './pages/Testimonials';
import Counselors from './pages/Counselors';
import Feedback from './pages/Feedback';
import './App.css';

const PrivateRoute = ({ children }) => {
  const { token, loading } = React.useContext(AuthContext);
  
  if (loading) {
    return <div className="loading">Loading...</div>;
  }
  
  return token ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route 
              path="/dashboard" 
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/journal" 
              element={
                <PrivateRoute>
                  <Journal />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/mood" 
              element={
                <PrivateRoute>
                  <MoodTracker />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/testimonials" 
              element={
                <PrivateRoute>
                  <Testimonials />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/counselors" 
              element={
                <PrivateRoute>
                  <Counselors />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/feedback" 
              element={
                <PrivateRoute>
                  <Feedback />
                </PrivateRoute>
              } 
            />
            <Route path="/" element={<Navigate to="/dashboard" />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;


