import React from 'react';
import { useNavigate } from 'react-router-dom';
import './GuidanceBanner.css';

export default function GuidanceBanner({ 
  imageUrl = "https://images.ctfassets.net/8bbwomjfix8m/7h8mV2Get53sFQgENyiYG5/f4b83014e2726f214d2d59af745fbd20/latest-highlights-1.png",
  title = "Expert Visa Guidance. Every Step of the Way.",
  description = "Get professional visa guidance, application support, and document assistance from our experienced visa consultants.",
  buttonText = "Book a Consultation"
}) {
  const navigate = useNavigate();

  const handleBookNow = () => {
    navigate('/enquiry');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="guidance-banner">
      <div className="guidance-banner-wrapper">
        <div className="guidance-banner-card">

          <div className="guidance-banner-inner">

            <div className="guidance-avatar-container">
              <div className="guidance-avatar-bg">
                <img 
                  src={imageUrl} 
                  alt="Expert visa consultant" 
                  className="guidance-avatar-img"
                />
              </div>
            </div>

            <div className="guidance-text-content">
              <h3 className="guidance-title">{title}</h3>
              <p className="guidance-description">{description}</p>
            </div>

          </div>

          <div className="guidance-action">
            <button 
              onClick={handleBookNow} 
              className="guidance-btn"
            >
              <span>{buttonText}</span>

              <svg 
                className="guidance-btn-arrow" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M9 5l7 7-7 7" 
                />
              </svg>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}