import React from 'react';
import './HeroSection.css';

export default function HeroSection() {
  return (
    <div className="hero-container">
      <div className="hero-overlay">
        <div className="hero-content">
          {/* Breadcrumbs */}
          <div className="hero-breadcrumbs">
            <span>TSY Pakistan</span>
            <span className="separator">/</span>
            <span>Study Abroad Destination</span>
            <span className="separator">/</span>
            <span className="current">Steps to study abroad</span>
          </div>

          {/* Main Title */}
          <h1 className="hero-title">Steps to study abroad</h1>

          {/* Action Buttons */}
          <div className="hero-actions">
            <button className="btn-primary">
              Speak with your TSY counsellor now
            </button>
            <button className="btn-share" aria-label="Share">
              <svg 
                width="18" 
                height="18" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <circle cx="18" cy="5" r="3"></circle>
                <circle cx="6" cy="12" r="3"></circle>
                <circle cx="18" cy="19" r="3"></circle>
                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}