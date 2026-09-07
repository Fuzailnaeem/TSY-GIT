import React, { useState } from "react";
import { ChevronDown, Globe, Heart, Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import "./navbar.css";
import logo from "../../assets/logo.png";

export default function Navbar() {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const navigate = useNavigate();

  const handleMouseEnter = (menu) => {
    setActiveDropdown(menu);
  };

  const handleMouseLeave = () => {
    setActiveDropdown(null);
  };

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  // Function to handle navigation to enquiry form with scroll to top
  const handleEnquiryClick = (e) => {
    e.preventDefault();
    navigate('/enquiry');
    window.scrollTo(0, 0);
  };

  return (
    <header className="TSY-navbar">
      {/* Top utility bar */}
      <div className="TSY-topbar">
        <div className="TSY-topbar-inner">
          <Link to="/" className="TSY-topbar-link TSY-join-link">
            Join TSY Community <span className="TSY-badge">New</span>
          </Link>
        </div>
      </div>

      {/* Main navbar */}
      <div className="TSY-mainbar">
        <div className="TSY-mainbar-inner">
          {/* Logo */}
          <Link to="/" className="TSY-logo">
            <img
              src={logo}
              alt="TSY logo"
              className="TSY-logo-img"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="TSY-main-links">
            <Link to="/" className="TSY-nav-link">
              Home
            </Link>

            <Link to="/gallery" className="TSY-nav-link">
              Gallery
            </Link>

            <Link
              to="/why-travel-with-tsy"
              className="TSY-nav-link"
            >
              Why Travel With TSY
            </Link>
            
            <Link to="/about-tsy" className="TSY-nav-link">
              About
            </Link>

            <Link to="/services" className="TSY-nav-link">
              Services
            </Link>
          </nav>

          {/* Actions */}
          <div className="TSY-actions">
            <a 
              href="#" 
              className="TSY-cta"
              onClick={handleEnquiryClick}
            >
              Take the next step
            </a>

            <button
              className="TSY-icon-btn"
              aria-label="Favorites"
            >
              <Heart size={20} />
            </button>

            {/* Mobile Menu Button */}
            <button
              className="TSY-mobile-menu-btn"
              onClick={toggleDrawer}
              aria-label="Toggle menu"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      {isDrawerOpen && (
        <div className="TSY-drawer-overlay" onClick={closeDrawer}>
          <div className="TSY-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="TSY-drawer-header">
              <Link to="/" className="TSY-drawer-logo" onClick={closeDrawer}>
                <img
                  src={logo}
                  alt="TSY logo"
                  className="TSY-logo-img"
                />
              </Link>
              <button
                className="TSY-drawer-close"
                onClick={closeDrawer}
                aria-label="Close menu"
              >
                <X size={24} />
              </button>
            </div>

            <nav className="TSY-drawer-nav">
              <Link to="/" className="TSY-drawer-link" onClick={closeDrawer}>
                Home
              </Link>

              <Link to="/gallery" className="TSY-drawer-link" onClick={closeDrawer}>
                Gallery
              </Link>

              <Link
                to="/why-travel-with-tsy"
                className="TSY-drawer-link"
                onClick={closeDrawer}
              >
                Why Travel With TSY
              </Link>

              <Link to="/about-tsy" className="TSY-drawer-link" onClick={closeDrawer}>
                About
              </Link>

              <Link to="/services" className="TSY-drawer-link" onClick={closeDrawer}>
                Services
              </Link>

              <div className="TSY-drawer-divider"></div>

              <Link to="/" className="TSY-drawer-link TSY-drawer-top-link" onClick={closeDrawer}>
                Join TSY Community <span className="TSY-badge">New</span>
              </Link>

              <Link to="/news" className="TSY-drawer-link TSY-drawer-top-link" onClick={closeDrawer}>
                News and articles
              </Link>

              <Link to="/events" className="TSY-drawer-link TSY-drawer-top-link" onClick={closeDrawer}>
                Events
              </Link>

              <a href="#" className="TSY-drawer-link TSY-drawer-top-link">
                Find us <ChevronDown size={14} />
              </a>

              <a href="#" className="TSY-drawer-link TSY-drawer-top-link">
                Social <ChevronDown size={14} />
              </a>

              <a href="#" className="TSY-drawer-link TSY-drawer-top-link">
                <Globe size={14} /> English
              </a>

              <div className="TSY-drawer-divider"></div>

              <a 
                href="#" 
                className="TSY-drawer-cta" 
                onClick={(e) => {
                  closeDrawer();
                  handleEnquiryClick(e);
                }}
              >
                Take the next step
              </a>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}