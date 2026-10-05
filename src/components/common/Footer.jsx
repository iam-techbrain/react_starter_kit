import React from 'react';
import { Database, ShieldCheck, Layers, ExternalLink } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-grid">
          {/* Col 1: About starter kit */}
          <div className="footer-col">
            <h4 className="footer-heading">React Learning Starter Kit</h4>
            <p className="footer-desc">
              Demonstrating parent-child props, asynchronous data fetching via useEffect,
              reusable component composition, and token-based client state.
            </p>
          </div>

          {/* Col 2: Learning Concepts */}
          <div className="footer-col">
            <h4 className="footer-heading">Architecture Concepts</h4>
            <ul className="footer-list">
              <li><Layers size={14} /> Modular Reusable Components</li>
              <li><Layers size={14} /> <code>children</code> Composition Pattern</li>
              <li><ShieldCheck size={14} /> Async POST Auth & State Management</li>
              <li><Database size={14} /> Async GET & Loading / Error Handling</li>
            </ul>
          </div>

          {/* Col 3: Public Endpoints */}
          <div className="footer-col">
            <h4 className="footer-heading">Live Public Endpoints</h4>
            <ul className="footer-list">
              <li>
                <a href="https://dummyjson.com/docs/auth" target="_blank" rel="noreferrer" className="footer-link">
                  POST /auth/login <ExternalLink size={12} />
                </a>
              </li>
              <li>
                <a href="https://dummyjson.com/docs/products" target="_blank" rel="noreferrer" className="footer-link">
                  GET /products <ExternalLink size={12} />
                </a>
              </li>
              <li>
                <a href="https://dummyjson.com/docs/users" target="_blank" rel="noreferrer" className="footer-link">
                  GET /users <ExternalLink size={12} />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} React Starter Kit • Powered by DummyJSON Public APIs</p>
        </div>
      </div>
    </footer>
  );
}
