import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Wrapper from '../components/common/Wrapper';
import { LogIn, Lock, User, AlertCircle, Key, CheckCircle2, ArrowRight } from 'lucide-react';

export default function LoginPage() {
  const [username, setUsername] = useState('emilys');
  const [password, setPassword] = useState('emilyspass');
  const [localError, setLocalError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login, isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  // Handle asynchronous login submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError('');

    if (!username.trim() || !password.trim()) {
      setLocalError('Please enter both username and password.');
      return;
    }

    setIsSubmitting(true);
    try {
      // Async POST https://dummyjson.com/auth/login
      const result = await login(username, password);

      if (result.success) {
        // Successfully saved token and user state, navigate to Products Dashboard
        navigate('/');
      } else {
        setLocalError(result.error || 'Authentication failed. Please verify credentials.');
      }
    } catch (err) {
      setLocalError(err.message || 'An unexpected error occurred during login.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Helper to quickly fill test credentials provided by DummyJSON
  const setQuickCreds = (u, p) => {
    setUsername(u);
    setPassword(p);
    setLocalError('');
  };

  return (
    <Wrapper maxWidth="1100px">
      <div className="login-page-container">
        {/* Left Side: Educational context & quick credentials */}
        <div className="login-info-card">
          <div className="badge badge-accent">Learning Goal 1 & 4</div>
          <h2 className="login-info-title">Asynchronous Authentication</h2>
          <p className="login-info-desc">
            This page demonstrates calling <code>POST https://dummyjson.com/auth/login</code> asynchronously using{' '}
            <code>async/await</code>, maintaining loading state, storing the bearer token, and navigating smoothly.
          </p>

          <div className="quick-credentials-box">
            <div className="quick-creds-header">
              <Key size={16} />
              <span>DummyJSON Test Credentials</span>
            </div>
            <p className="quick-creds-hint">Click any user below to auto-fill the login form:</p>

            <div className="quick-creds-list">
              <button
                type="button"
                className="cred-pill"
                onClick={() => setQuickCreds('emilys', 'emilyspass')}
              >
                <strong>emilys</strong> (Emily Johnson)
              </button>
              <button
                type="button"
                className="cred-pill"
                onClick={() => setQuickCreds('michaelw', 'michaelwpass')}
              >
                <strong>michaelw</strong> (Michael Williams)
              </button>
              <button
                type="button"
                className="cred-pill"
                onClick={() => setQuickCreds('sophiab', 'sophiabpass')}
              >
                <strong>sophiab</strong> (Sophia Brown)
              </button>
            </div>
          </div>

          {isAuthenticated && (
            <div className="already-authenticated-alert">
              <CheckCircle2 size={18} className="text-success" />
              <div>
                <strong>Currently logged in as @{user?.username}</strong>
                <p>You can proceed directly to the Dashboard or Profile page.</p>
                <Link to="/" className="btn btn-outline btn-sm mt-2">
                  Go to Dashboard <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Right Side: Clean Login Form */}
        <div className="login-card">
          <div className="login-header">
            <div className="login-icon-badge">
              <LogIn size={24} />
            </div>
            <h1 className="login-title">Sign In</h1>
            <p className="login-subtitle">Enter your DummyJSON credentials to continue</p>
          </div>

          {localError && (
            <div className="alert alert-error">
              <AlertCircle size={18} />
              <span>{localError}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <div className="input-with-icon">
                <User size={18} className="input-icon" />
                <input
                  id="username"
                  type="text"
                  className="form-input"
                  placeholder="e.g. emilys"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  disabled={isSubmitting}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <div className="input-with-icon">
                <Lock size={18} className="input-icon" />
                <input
                  id="password"
                  type="password"
                  className="form-input"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isSubmitting}
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-block btn-lg"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className="spinner-border spinner-border-sm" />
                  <span>Signing In...</span>
                </>
              ) : (
                <>
                  <LogIn size={18} />
                  <span>Authenticate with DummyJSON</span>
                </>
              )}
            </button>
          </form>

          <div className="login-card-footer">
            <span>Direct API endpoint: <code>POST /auth/login</code></span>
          </div>
        </div>
      </div>
    </Wrapper>
  );
}
