import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom"; // Import Link
import "./hero.css";
import bannerImage from "../../../assets/ME_homepage_banner.webp";
import StudyForm from "../studyform/Studysearchform.jsx";
import TrustSection from '../trustsection/trustSection.jsx';

const slides = [
  {
    badge: "★ Trusted since 1985",
    title: "Your journey starts here.",
    description:
      "Planning a holiday, business trip, or pilgrimage? Tell us what you need, and our travel experts will take care of the rest.",
    buttonText: "Book now",
    buttonLink: "/enquiry", // Add link for this slide
  },
  {
    title: "Your visa journey starts here",
    description:
      "Planning to study, work, visit, or settle abroad? TSY helps make your visa process simple and stress-free.",
    buttonText: "Talk to an expert",
    buttonLink: "/enquiry", // Add link
  },
  {
    title: "Find the right visa for you",
    description:
      "Explore visa options for your destination and get expert guidance on requirements, documents, and applications.",
    buttonText: "Explore visa options",
    buttonLink: "/enquiry", // Add link
  },
  {
    title: "Guidance at every step",
    description:
      "From choosing the right visa to submitting your application, our experts are here to guide you every step of the way.",
    buttonText: "Get started",
    buttonLink: "/enquiry", // Add link
  },
];

const AUTO_ROTATE_MS = 10000; // 10 seconds

export default function Hero() {
  const [activeSlide, setActiveSlide] = useState(0);

  const goToSlide = useCallback((index) => {
    setActiveSlide(index);
  }, []);

  // Auto-rotate every 10 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, AUTO_ROTATE_MS);
    return () => clearInterval(timer);
  }, []);

  const slide = slides[activeSlide];

  // Manual slide navigation
  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <>
      <section className="hero">
        <img
          src={bannerImage}
          alt="Hero banner"
          className="hero-bg"
        />

        <div className="hero-overlay"></div>

        <div className="hero-inner">
          <div className="hero-text">
            {slide.badge && <span className="hero-badge">{slide.badge}</span>}
            <h1 className="hero-title">{slide.title}</h1>
            <p className="hero-description">{slide.description}</p>
            {/* Replace button with Link */}
            <Link to={slide.buttonLink} className="hero-cta">
              {slide.buttonText}
            </Link>
          </div>
        </div>
<div className="study-form-container">

        <StudyForm />
</div>
      </section>
<div className="trustSection-container">
      <TrustSection />

</div>
    </>
  );
}