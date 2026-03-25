import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import apiService from '../services/apiService';
import T from '../tokens/theme';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const data = await apiService.login({ email, password });
      login(data.token, data.role);

      navigate(data.role === 'admin' ? '/admin' : '/employee');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
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
        maxWidth: 400,
        width: '100%',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
      }}>
        <h1 style={{ textAlign: 'center', marginBottom: 30, color: T.text }}>Login to Fairflow</h1>
        
        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', marginBottom: 8, color: T.text }}>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
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
            <label style={{ display: 'block', marginBottom: 8, color: T.text }}>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
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
          
          {error && <p style={{ color: 'red', marginBottom: 20 }}>{error}</p>}
          
          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: 8,
              background: T.primary,
              color: 'white',
              border: 'none',
              cursor: loading ? 'not-allowed' : 'pointer',
              fontSize: 16,
              fontWeight: 600
            }}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        
        <p style={{ textAlign: 'center', color: T.textMid, marginTop: 20 }}>
          Don't have an account? <a href="/register" style={{ color: T.primary }}>Register</a>
        </p>
      </div>
    </div>
  );
};

export default Login;