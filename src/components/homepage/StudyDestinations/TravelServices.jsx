import React from 'react';
import { Plane, Building2, FileText } from 'lucide-react';
import './TravelServices.css'; // Pure CSS import

const KaabaIcon = ({ className }) => (
  <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 4H5C3.89543 4 3 4.89543 3 6V18C3 19.1046 3.89543 20 5 20H19C20.1046 20 21 19.1046 21 18V6C21 4.89543 20.1046 4 19 4Z" opacity="0.3"/>
    <path d="M3 9H21M3 11H21" stroke="currentColor" strokeWidth="2"/>
  </svg>
);

const TravelServices = () => {
  const services = [
    {
      icon: <Plane size={20} className="ts-icon-blue" />,
      title: "Leisure escapes",
      description: "Holidays planned around what you actually want to do"
    },
    {
      icon: <KaabaIcon className="ts-icon-amber" />,
      title: "Umrah journeys",
      description: "Guided pilgrimages with every detail arranged"
    },
    {
      icon: <Building2 size={20} className="ts-icon-blue" />,
      title: "Corporate & MICE",
      description: "Group travel for teams, conferences, and incentives"
    },
    {
      icon: <FileText size={20} className="ts-icon-slate" />,
      title: "Visa guidance",
      description: "Documentation support matched to your trip"
    }
  ];

  const stats = [
    { value: "40+", label: "Years planning journeys, since 1985" },
    { value: "3", label: "Ways we support your visa application" },
    { value: "1000s", label: "Of travellers guided across Pakistan" },
    { value: "1:1", label: "A dedicated consultant for every query" }
  ];

  return (
    <div className="ts-container">
      {/* Top Section - Services */}
      <div className="ts-top-section">
        <div className="ts-green-accent" />

        <div className="ts-services-grid">
          {services.map((service, index) => (
            <div key={index} className="ts-service-card">
              <div className="ts-icon-wrapper">
                {service.icon}
              </div>
              <div>
                <h3 className="ts-service-title">
                  {service.title}
                </h3>
                <p className="ts-service-desc">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Section - Statistics */}
      <div className="ts-bottom-section">
        <div className="ts-stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className="ts-stat-item">
              <span className="ts-stat-value">
                {stat.value}
              </span>
              <p className="ts-stat-label">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TravelServices;