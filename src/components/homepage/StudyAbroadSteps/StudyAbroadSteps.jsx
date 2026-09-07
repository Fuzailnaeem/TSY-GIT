import React, { useState } from 'react';
import './StudyAbroadSteps.css';

const stepsData = [
  "Why study abroad?",
  "Where and what to study?",
  "How do I apply?",
  "After receiving an offer",
  "Prepare to depart",
  "Arrive and thrive"
];

const coursesData = [
  "Social Science",
  "Accounting",
  "Engineering",
  "Pharmacy"
];

export default function StudyAbroadSteps() {
  const handleTabClick = (title) => {
    // Opens a blank link/new tab when any tab is clicked
    window.open('about:blank', '_blank');
  };

  return (
    <div className="study-abroad">
      <div className="study-abroad-container">
        {/* Top Section */}
        <h2 className="section-title">
          Your study abroad steps
          <span className="title-underline"></span>
      </h2>

      <div className="steps-content-wrapper">
        <div className="image-wrapper">
          <img 
            src="https://images.ctfassets.net/8bbwomjfix8m/iJ8Mapw8gi6rX3rlSn8RA/28f6005203aa0483ba10687ef0dc2889/steps-bannerr.png?fit=fill&w=470&q=80&fm=webp" 
            alt="Student with laptop" 
          />
        </div>

        <div className="steps-list">
          {stepsData.map((step, index) => (
            <div 
              key={index} 
              className="step-card" 
              onClick={() => handleTabClick(step)}
            >
              <span className="step-text">{step}</span>
              <span className="chevron">›</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Section: Popular courses */}
      <div className="courses-section">
        <h3 className="section-title">
          Popular courses among Pakistani students
          <span className="title-underline"></span>
        </h3>

        <div className="courses-grid">
          {coursesData.map((course, index) => (
            <div 
              key={index} 
              className="course-card" 
              onClick={() => handleTabClick(course)}
            >
              <span className="course-text">{course}</span>
              <span className="chevron">›</span>
            </div>
          ))}
        </div>

        <div className="view-all-container">
          <a href="#all-courses" onClick={(e) => { e.preventDefault(); window.open('about:blank', '_blank'); }}>
            View all courses ›
          </a>
        </div>
      </div>
    </div>
    </div>
  );
}