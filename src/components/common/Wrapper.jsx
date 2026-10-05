import React from 'react';
import Header from './Header';
import Footer from './Footer';

/**
 * Reusable Wrapper component demonstrating the use of the `children` prop.
 * Enforces consistent page layout, responsive max-width, header, and footer.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Child elements passed to this layout wrapper
 * @param {string} [props.maxWidth='1280px'] - Optional max-width constraint
 * @param {string} [props.className=''] - Additional custom class names
 * @param {boolean} [props.showHeader=true] - Whether to show the header
 * @param {boolean} [props.showFooter=true] - Whether to show the footer
 */
export default function Wrapper({
  children,
  maxWidth = '1280px',
  className = '',
  showHeader = true,
  showFooter = true,
}) {
  return (
    <div className="app-layout">
      {showHeader && <Header />}

      <main
        className={`main-content ${className}`}
        style={{ maxWidth, margin: '0 auto', width: '100%' }}
      >
        {children}
      </main>

      {showFooter && <Footer />}
    </div>
  );
}
