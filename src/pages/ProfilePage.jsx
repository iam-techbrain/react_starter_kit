import React, { useState, useEffect } from 'react';
import Wrapper from '../components/common/Wrapper';
import HeroSection from '../components/common/HeroSection';
import { useAuth } from '../context/AuthContext';
import { fetchUsers, fetchUserById } from '../api/dummyJson';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  GraduationCap,
  Shield,
  CreditCard,
  Users,
  Search,
  CheckCircle,
  ExternalLink,
  LogIn,
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ProfilePage() {
  const { user: authUser, isAuthenticated } = useAuth();

  const [usersList, setUsersList] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userSearch, setUserSearch] = useState('');

  // Fetch users list and active profile asynchronously
  useEffect(() => {
    let isMounted = true;

    async function loadUserData() {
      setLoading(true);
      setError(null);
      try {
        // 1. Fetch Users directory from GET https://dummyjson.com/users
        const data = await fetchUsers({ limit: 12, skip: 0 });
        if (!isMounted) return;

        setUsersList(data.users || []);

        // 2. Select authenticated user, or load details of user #1 as default
        const targetUserId = authUser?.id || data.users?.[0]?.id || 1;
        const detailedUser = await fetchUserById(targetUserId);

        if (isMounted) {
          setSelectedUser(detailedUser);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || 'Failed to fetch user profiles');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadUserData();

    return () => {
      isMounted = false;
    };
  }, [authUser]);

  // Handle selecting a user from the directory to view details
  const handleSelectUser = async (id) => {
    try {
      setLoading(true);
      const userDetails = await fetchUserById(id);
      setSelectedUser(userDetails);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filteredUsers = usersList.filter(
    (u) =>
      u.firstName.toLowerCase().includes(userSearch.toLowerCase()) ||
      u.lastName.toLowerCase().includes(userSearch.toLowerCase()) ||
      u.email.toLowerCase().includes(userSearch.toLowerCase())
  );

  return (
    <Wrapper maxWidth="1280px">
      <HeroSection
        badge="GET /users • Profile & Directory"
        title="User Profile & Directory"
        subtitle="Asynchronously loads comprehensive user records from DummyJSON users API with deep profile data."
        stats={[
          {
            label: 'Total Users In DB',
            value: 208,
            icon: <Users size={16} />,
          },
          {
            label: 'Directory Preview',
            value: usersList.length,
            icon: <User size={16} />,
          },
          {
            label: 'Session Status',
            value: isAuthenticated ? 'Authenticated' : 'Guest Visitor',
            icon: <Shield size={16} />,
          },
        ]}
      />

      {/* Main Grid: Selected Profile Details & User Directory */}
      <div className="profile-layout-grid">
        {/* Left Column: Detailed Profile Card */}
        <div className="profile-details-column">
          {loading && !selectedUser ? (
            <div className="profile-skeleton-card">
              <div className="skeleton-avatar" />
              <div className="skeleton-line skeleton-title" />
              <div className="skeleton-line skeleton-desc" />
              <div className="skeleton-grid" />
            </div>
          ) : selectedUser ? (
            <div className="user-profile-card">
              {/* Header Banner */}
              <div className="profile-banner">
                {isAuthenticated && authUser?.id === selectedUser.id && (
                  <span className="current-user-badge">
                    <CheckCircle size={14} /> Active Session User
                  </span>
                )}
              </div>

              {/* Avatar & Core Info */}
              <div className="profile-header-content">
                <img
                  src={selectedUser.image}
                  alt={`${selectedUser.firstName} ${selectedUser.lastName}`}
                  className="profile-avatar-large"
                />
                <h2 className="profile-full-name">
                  {selectedUser.firstName} {selectedUser.lastName}
                </h2>
                <p className="profile-username">@{selectedUser.username}</p>
                <div className="profile-role-tag">
                  <Briefcase size={14} />
                  <span>
                    {selectedUser.company?.title || 'Team Member'} at{' '}
                    <strong>{selectedUser.company?.name || 'Acme Inc'}</strong>
                  </span>
                </div>
              </div>

              {/* Contact & Bio Info */}
              <div className="profile-section">
                <h3 className="section-heading">Contact Information</h3>
                <div className="info-list">
                  <div className="info-item">
                    <Mail size={16} className="info-icon" />
                    <div>
                      <span className="info-label">Email</span>
                      <a href={`mailto:${selectedUser.email}`} className="info-value">
                        {selectedUser.email}
                      </a>
                    </div>
                  </div>

                  <div className="info-item">
                    <Phone size={16} className="info-icon" />
                    <div>
                      <span className="info-label">Phone</span>
                      <span className="info-value">{selectedUser.phone}</span>
                    </div>
                  </div>

                  <div className="info-item">
                    <MapPin size={16} className="info-icon" />
                    <div>
                      <span className="info-label">Location</span>
                      <span className="info-value">
                        {selectedUser.address?.address}, {selectedUser.address?.city},{' '}
                        {selectedUser.address?.state} ({selectedUser.address?.country || 'USA'})
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Work & Academic Info */}
              <div className="profile-section">
                <h3 className="section-heading">Professional & Academic</h3>
                <div className="info-list">
                  <div className="info-item">
                    <GraduationCap size={16} className="info-icon" />
                    <div>
                      <span className="info-label">University</span>
                      <span className="info-value">
                        {selectedUser.university || 'State University'}
                      </span>
                    </div>
                  </div>

                  <div className="info-item">
                    <Briefcase size={16} className="info-icon" />
                    <div>
                      <span className="info-label">Department</span>
                      <span className="info-value">
                        {selectedUser.company?.department || 'Operations'}
                      </span>
                    </div>
                  </div>

                  {selectedUser.bank?.cardType && (
                    <div className="info-item">
                      <CreditCard size={16} className="info-icon" />
                      <div>
                        <span className="info-label">Payment Tier</span>
                        <span className="info-value">
                          {selectedUser.bank.cardType} (Expires: {selectedUser.bank.cardExpire})
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {!isAuthenticated && (
                <div className="profile-login-prompt">
                  <p>Want to log in as Emily Johnson or another DummyJSON user?</p>
                  <Link to="/login" className="btn btn-primary btn-sm">
                    <LogIn size={15} /> Go to Login Page
                  </Link>
                </div>
              )}
            </div>
          ) : error ? (
            <div className="alert alert-error">
              <span>{error}</span>
            </div>
          ) : null}
        </div>

        {/* Right Column: User Directory from GET /users */}
        <div className="users-directory-column">
          <div className="directory-header">
            <h3 className="directory-title">
              <Users size={18} /> DummyJSON User Directory
            </h3>
            <p className="directory-subtitle">
              Select any profile to inspect full asynchronous GET response details:
            </p>

            <div className="search-input-wrapper directory-search">
              <Search size={16} className="search-icon" />
              <input
                type="text"
                placeholder="Filter users by name or email..."
                value={userSearch}
                onChange={(e) => setUserSearch(e.target.value)}
                className="search-input"
              />
            </div>
          </div>

          <div className="directory-list">
            {filteredUsers.map((item) => {
              const isCurrent = selectedUser?.id === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleSelectUser(item.id)}
                  className={`directory-user-row ${isCurrent ? 'directory-user-active' : ''}`}
                >
                  <img
                    src={item.image}
                    alt={item.firstName}
                    className="directory-avatar"
                  />
                  <div className="directory-user-details">
                    <div className="directory-name">
                      {item.firstName} {item.lastName}
                    </div>
                    <div className="directory-email">{item.email}</div>
                  </div>
                  <div className="directory-user-tag">
                    {item.company?.department || item.gender}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </Wrapper>
  );
}
