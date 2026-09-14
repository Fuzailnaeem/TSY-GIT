import React from "react";
import { Link } from "react-router-dom";
import styles from "./Footer.module.css";
import logo from "../../../assets/logo.png";

const WHATSAPP_PRIMARY = "923111555395";
const LANDLINE_SECONDARY = "923236362135";

const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "About TSY", to: "/about-tsy" },
  { label: "Gallery", to: "/gallery" },
  { label: "Why Travel With TSY", to: "/why-travel-with-tsy" },
];

const SOCIAL_LINKS = [
  { label: "Facebook", href: "https://facebook.com/tsytravels" },
  { label: "Instagram", href: "https://www.instagram.com/tsytravelagency/" },
];

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function InstagramIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
      xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5"
        stroke="currentColor" strokeWidth="2" />
      <circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth="2" />
      <circle cx="17.2" cy="6.8" r="1.2" fill="currentColor" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
      xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path
        d="M14 9h3V6h-3c-2.21 0-4 1.79-4 4v2H8v3h2v7h3v-7h3l1-3h-4v-2c0-.55.45-1 1-1z"
        fill="currentColor"
      />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className={styles.siteFooter}>
      <div className={styles.footerContainer}>

        {/* Footer Top: logo (left) + head office (right) */}
        <div className={styles.footerTop}>
          <div className={styles.footerLogo}>
            <Link to="/" onClick={scrollToTop}>
              <img src={logo} alt="TSY International Education Specialists" />
            </Link>
          </div>

          <div className={styles.footerOffice}>
            <h4>Head Office</h4>
            <p>
              1st Floor, Grand Hotel &amp; Tower,
              <br />
              9-Davis Road,
              <br />
              Lahore, Pakistan.
            </p>
          </div>
        </div>

        {/* Navigation grid: 3 columns */}
        <div className={styles.footerGrid}>

          <div className={styles.footerColumn}>
            <h4>Explore TSY</h4>
            <ul>
              {NAV_LINKS.map(({ label, to }) => (
                <li key={to}>
                  <Link to={to} onClick={scrollToTop}>{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.footerColumn}>
            <h4>Contact Us</h4>
            <ul>
              <li>
                <a href={`https://wa.me/${WHATSAPP_PRIMARY}`}
                  target="_blank" rel="noopener noreferrer">
                  +92 3 111 555 395
                </a>
              </li>
              <li>
                <a href={`tel:+${LANDLINE_SECONDARY}`}>0423 6362135-37</a>
              </li>
              <li>
                <a href="mailto:info@mytsy.com">info@mytsy.com</a>
              </li>   
            </ul>
          </div>

          <div className={styles.footerColumn}>
            <h4>Connect With Us</h4>
            <ul>
              {SOCIAL_LINKS.map(({ label, href }) => (
                <li key={label}>
                  <a href={href} target="_blank" rel="noopener noreferrer">
                    {label}
                  </a>
                </li>
              ))}
              <li>
                <Link to="/enquiry" className={styles.enquiryLink} onClick={scrollToTop}>
                  Enquiry Form
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <hr className={styles.footerDivider} />

        <div className={styles.footerBottom}>
          <div className={styles.footerLegal}>
            <p>© 2026 TSY Education. All Rights Reserved.</p>
            <p>TSY International Education Specialists</p>
          </div>

          <div className={styles.footerSocials}>
            {SOCIAL_LINKS.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className={styles.socialIcon}
              >
                {label === "Facebook" ? <FacebookIcon /> : <InstagramIcon />}
              </a>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
}