import React from "react";
import { ChevronRight } from "lucide-react";
import "./Tsysection.css";
export default function TsySection() {
  const cards = [
    {
      img: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=200&h=200&fit=crop",
      tag: "Corporate travel",
      title: "Corporate & MICE events",
      description: "Conferences, meetings and incentive trips, managed door to door.",
    },
    {
      img: "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=200&h=200&fit=crop",
      tag: "Umrah",
      title: "Fast-track Umrah booking",
      description: "Get your Umrah package and visa moving in one visit to our office.",
    },
    {
      img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=200&h=200&fit=crop",
      tag: "Visa assistance",
      title: "Visa application assistance",
      description: (
        <>
          Applying for a visa can be confusing — our team makes it clear, at every step.{" "}
          <a href="/services" className="tsy-link">
            visa assistance
          </a>
        </>
      ),
    },
  ];

  return (
    <div className="tsy">
      <div className="tsy-section">
        {/* Hero promo banner */}
        <div className="tsy-hero">
          <div className="tsy-hero-content">
            <span className="tsy-hero-tag">Good to know</span>
            <h2 className="tsy-hero-title">
              Explore our travel and visa services
            </h2>
            <p className="tsy-hero-text">
              From corporate events and fast-track Umrah packages to expert{" "}
              <a href="/services" className="tsy-link">
                visa assistance
              </a>
              , we make your travel planning completely seamless.
            </p>
            <a href="/why-travel-with-tsy">
              <button className="tsy-btn-outline">More details</button>
            </a>
          </div>

          <div className="tsy-phone-wrap">
            <img
              src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&q=80"
              alt="Travel and visa services"
              className="tsy-phone-img"
            />
          </div>
        </div>

        {/* You should also know - Horizontal List Section */}
        <div className="tsy-know">
          <div>
            <h3 className="tsy-know-heading">You should also know</h3>
            <div className="tsy-know-underline" />
          </div>

          <div className="tsy-horizontal-list">
            {cards.map((card, i) => (
              <div key={i} className="tsy-horizontal-card">
                <div className="tsy-horizontal-card-left">
                  <div className="tsy-horizontal-img-wrap">
                    <img src={card.img} alt={card.title} className="tsy-horizontal-img" />
                  </div>
                  <span className="tsy-horizontal-tag">{card.tag}</span>
                </div>
                
                <div className="tsy-horizontal-content">
                  <h4 className="tsy-horizontal-title">{card.title}</h4>
                  <p className="tsy-horizontal-desc">{card.description}</p>
                </div>

                {/* Learn More button removed */}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}