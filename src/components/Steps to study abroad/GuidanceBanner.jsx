import React from 'react';
import './GuidanceBanner.css';

export default function GuidanceBanner({ 
  onBookNow = () => {}, 
  imageUrl = "https://images.ctfassets.net/8bbwomjfix8m/7h8mV2Get53sFQgENyiYG5/f4b83014e2726f214d2d59af745fbd20/latest-highlights-1.png",
  title = "Free guidance. Smarter decisions.",
  description = "Talk to our expert counsellors about courses, universities, scholarships, and more - at no cost.",
  buttonText = "Book now"
}) {
  return (
    <div className="guidance-banner">
    <div className="guidance-banner-wrapper">
      <div className="guidance-banner-card">
        
        {/* Inner light-blue section */}
        <div className="guidance-banner-inner">
          
          {/* Circular image container with orange background */}
          <div className="guidance-avatar-container">
            <div className="guidance-avatar-bg">
              <img 
                src={imageUrl} 
                alt="Expert counsellor" 
                className="guidance-avatar-img"
              />
            </div>
          </div>

          {/* Text Content */}
          <div className="guidance-text-content">
            <h3 className="guidance-title">{title}</h3>
            <p className="guidance-description">{description}</p>
          </div>
        </div>

        {/* Action Button */}
        <div className="guidance-action">
          <button onClick={onBookNow} className="guidance-btn">
            <span>{buttonText}</span>
            <svg className="guidance-btn-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

      </div>
    </div>
    </div>  
  );
}