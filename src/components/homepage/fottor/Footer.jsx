import React from "react";
import { Link } from "react-router-dom";
import styles from "./Footer.module.css";
import logo from "../../../assets/logo.png";

// WhatsApp numbers (international format, no + or spaces)
const WHATSAPP_PRIMARY = "923111555395";
const WHATSAPP_SECONDARY = "923236362135"; // adjust if this line isn't a WhatsApp number

export default function Footer() {
  // Scroll to top whenever an internal link is clicked.
  // (For route changes to also auto-scroll on load, add a global
  // <ScrollToTop /> component that calls this on every location change
  // via useLocation() + useEffect in your app root — this handles
  // the click-triggered case from the footer itself.)
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className={styles.siteFooter}>
      <div className={styles.footerContainer}>

        {/* Footer Top */}
        <div
          className={styles.footerTop}
          style={{ display: "flex", justifyContent: "flex-start", alignItems: "flex-start", gap: "5rem" }}
        >

          {/* Logo */}
          <div className={styles.footerLogo} style={{ flex: "0 0 auto", width: "auto" }}>
            <Link to="/" onClick={scrollToTop}>
              <img
                src={logo}
                alt="TSY International Education Specialists"
              />
            </Link>
          </div>

          {/* Head Office — spaced nicely from the logo, not glued to it */}
          <div className={styles.footerOffice} style={{ flex: "0 0 auto", width: "auto", marginTop: "0.5rem" }}>
            <h4>Head Office</h4>
            <p>
              1st Floor, Grand Hotel & Tower,
              <br />
              9-Davis Road,
              <br />
              Lahore, Pakistan.
            </p>
          </div>
        </div>

        {/* Navigation */}
        <div className={styles.footerGrid}>

          {/* Main Pages */}
          <div className={styles.footerColumn}>
            <h4>Explore TSY</h4>

            <ul>
              <li>
                <Link to="/" onClick={scrollToTop}>Home</Link>
              </li>

              <li>
                <Link to="/about-tsy" onClick={scrollToTop}>About TSY</Link>
              </li>

              <li>
                <Link to="/gallery" onClick={scrollToTop}>Gallery</Link>
              </li>

              <li>
                <Link to="/why-travel-with-tsy" onClick={scrollToTop}>
                  Why Travel With TSY
                </Link>
              </li>
            </ul>
          </div>

          {/* TSY Information */}
          <div className={styles.footerColumn}>
            <h4>TSY</h4>

            <ul>
              <li>
                <Link to="/about-tsy" onClick={scrollToTop}>About TSY</Link>
              </li>

              <li>
                <Link to="/why-travel-with-tsy" onClick={scrollToTop}>
                  Why Travel With TSY
                </Link>
              </li>

              <li>
                <Link to="/gallery" onClick={scrollToTop}>Our Gallery</Link>
              </li>
            </ul>
          </div>

          {/* Contact Us — moved here, to the left of Connect With Us */}
          <div className={styles.footerColumn}>
            <h4>Contact Us</h4>

            <ul>
              <li>
                <a
                  href={`https://wa.me/${WHATSAPP_PRIMARY}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  +92 3 111 555 395
                </a>
              </li>

              <li>
                <a
                  href={`https://wa.me/${WHATSAPP_SECONDARY}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  0423 6362135-37
                </a>
              </li>

              <li>
                <a href="mailto:info@mytsy.com">
                  info@mytsy.com
                </a>
              </li>

              <li>
                <a
                  href="https://www.mytsy.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  www.mytsy.com
                </a>
              </li>
            </ul>
          </div>

          {/* Website & Social */}
          <div className={styles.footerColumn}>
            <h4>Connect With Us</h4>

            <ul>
              <li>
                <a
                  href="https://facebook.com/tsytravels"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Facebook
                </a>
              </li>

              <li>
                <a
                  href="https://www.instagram.com/tsytravelagency/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Instagram
                </a>
              </li>

              
              {/* Enquiry Form Button */}
              <li>
                <Link to="/enquiry" className={styles.enquiryLink} onClick={scrollToTop}>
                  Enquiry Form
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <hr className={styles.footerDivider} />

        {/* Bottom Footer */}
        <div className={styles.footerBottom}>

          <div className={styles.footerLegal}>
            <p>
              © 2026 TSY Education. All Rights Reserved.
            </p>

            <p>
              TSY International Education Specialists
            </p>
          </div>

          <div className={styles.footerSocials}>

            <a
              href="https://facebook.com/tsytravels"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className={styles.socialIcon}
            >
              f
            </a>

            <a
              href="https://www.instagram.com/tsytravelagency/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className={styles.socialIcon}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="2" />
                <circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth="2" />
                <circle cx="17.2" cy="6.8" r="1.2" fill="currentColor" />
              </svg>
            </a>

           

          </div>
        </div>

      </div>
    </footer>
  );
}