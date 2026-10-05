import React from 'react';

/**
 * Reusable HeroSection component demonstrating Parent-to-Child props passing.
 *
 * @param {Object} props
 * @param {string} [props.badge] - Small pill badge at the top
 * @param {string} props.title - Primary heading
 * @param {string} props.subtitle - Descriptive sub-heading
 * @param {Array<{ label: string, value: string | number, icon?: React.ReactNode }>} [props.stats] - Quick summary metrics
 * @param {React.ReactNode} [props.actions] - Action buttons or interactive elements
 * @param {React.ReactNode} [props.children] - Additional child content
 */
export default function HeroSection({
  badge,
  title,
  subtitle,
  stats = [],
  actions,
  children,
}) {
  return (
    <section className="hero-section">
      <div className="hero-content">
        {badge && <span className="hero-badge">{badge}</span>}
        <h1 className="hero-title">{title}</h1>
        {subtitle && <p className="hero-subtitle">{subtitle}</p>}

        {actions && <div className="hero-actions">{actions}</div>}

        {stats.length > 0 && (
          <div className="hero-stats-grid">
            {stats.map((stat, idx) => (
              <div key={idx} className="hero-stat-card">
                <div className="hero-stat-value">
                  {stat.icon && <span className="hero-stat-icon">{stat.icon}</span>}
                  <span>{stat.value}</span>
                </div>
                <div className="hero-stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        )}

        {children}
      </div>
    </section>
  );
}
