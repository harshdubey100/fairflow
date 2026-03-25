import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import T from '../tokens/theme';

const Onboarding = () => {
  const navigate = useNavigate();
  const { role } = useAuth();
  const [languages, setLanguages] = useState('');
  const [expertise, setExpertise] = useState('');

  const handleSubmit = () => {
    // Navigate based on role after onboarding
    navigate(role === 'admin' ? '/admin' : '/employee');
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      background: T.bg,
      padding: 20
    }}>
      <div style={{
        background: T.bgCard,
        borderRadius: 12,
        padding: 40,
        maxWidth: 500,
        width: '100%',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
      }}>
        <h1 style={{ textAlign: 'center', marginBottom: 30, color: T.text }}>Welcome to Fairflow</h1>
        <p style={{ textAlign: 'center', marginBottom: 20, color: T.textMid }}>
          Let's get you set up with your profile.
        </p>
        
        <div style={{ marginBottom: 20 }}>
          <label style={{ display: 'block', marginBottom: 8, color: T.text }}>Languages you speak:</label>
          <input
            type="text"
            value={languages}
            onChange={(e) => setLanguages(e.target.value)}
            placeholder="e.g., English, Spanish"
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: 8,
              border: `1px solid ${T.border}`,
              background: T.bg,
              color: T.text
            }}
          />
        </div>
        
        <div style={{ marginBottom: 30 }}>
          <label style={{ display: 'block', marginBottom: 8, color: T.text }}>Technical expertise:</label>
          <input
            type="text"
            value={expertise}
            onChange={(e) => setExpertise(e.target.value)}
            placeholder="e.g., React, Python, DevOps"
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: 8,
              border: `1px solid ${T.border}`,
              background: T.bg,
              color: T.text
            }}
          />
        </div>
        
        <button
          onClick={handleSubmit}
          style={{
            width: '100%',
            padding: '12px',
            borderRadius: 8,
            background: T.primary,
            color: 'white',
            border: 'none',
            cursor: 'pointer',
            fontSize: 16,
            fontWeight: 600
          }}
        >
          Get Started
        </button>
      </div>
    </div>
  );
};

export default Onboarding;