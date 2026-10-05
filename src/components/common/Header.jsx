import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ShoppingBag, User, LogIn, LogOut, Sparkles } from 'lucide-react';

export default function Header() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="site-header">
      <div className="header-container">
        {/* Brand / Logo */}
        <Link to="/" className="brand-logo">
          <div className="logo-icon-wrapper">
            <Sparkles className="logo-icon" size={20} />
          </div>
          <div className="brand-text">
            <span className="brand-title">DummyJSON</span>
            <span className="brand-tag">StarterKit</span>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className="nav-links">
          <NavLink
            to="/"
            end
            className={({ isActive }) => `nav-link ${isActive ? 'nav-link-active' : ''}`}
          >
            <ShoppingBag size={18} />
            <span>Products</span>
          </NavLink>

          <NavLink
            to="/profile"
            className={({ isActive }) => `nav-link ${isActive ? 'nav-link-active' : ''}`}
          >
            <User size={18} />
            <span>User Profile</span>
          </NavLink>
        </nav>

        {/* User Auth Section */}
        <div className="header-actions">
          {isAuthenticated && user ? (
            <div className="user-profile-badge">
              <img
                src={user.image || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.username}`}
                alt={user.firstName || user.username}
                className="user-avatar-small"
              />
              <div className="user-info-text">
                <span className="user-name">
                  {user.firstName} {user.lastName}
                </span>
                <span className="user-role">@{user.username}</span>
              </div>
              <button
                onClick={handleLogout}
                className="btn-icon btn-logout"
                title="Log Out"
                aria-label="Log Out"
              >
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <Link to="/login" className="btn btn-primary btn-sm">
              <LogIn size={16} />
              <span>Sign In</span>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
