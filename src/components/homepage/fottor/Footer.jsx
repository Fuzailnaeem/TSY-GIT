import React from "react";
import { Link } from "react-router-dom";
import styles from "./Footer.module.css";
import logo from "../../../assets/logo.png";

export default function Footer() {
  return (
    <footer className={styles.siteFooter}>
      <div className={styles.footerContainer}>

        {/* Footer Top */}
        <div className={styles.footerTop}>

          {/* Logo */}
          <div className={styles.footerLogo}>
            <Link to="/">
              <img
                src={logo}
                alt="TSY International Education Specialists"
              />
            </Link>
          </div>

          {/* Head Office */}
          <div className={styles.footerOffice}>
            <h4>Head Office</h4>
            <p>
              1st Floor, Grand Hotel & Tower,
              <br />
              9-Davis Road,
              <br />
              Lahore, Pakistan.
            </p>
          </div>

          {/* Contact Us */}
          <div className={styles.footerContact}>
            <h4>Contact Us</h4>

            <a href="tel:+923111555395">
              +92 3 111 555 395
            </a>

            <a href="tel:04236362135">
              0423 6362135-37
            </a>

            <a href="mailto:info@mytsy.com">
              info@mytsy.com
            </a>

            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
            >
              www.mytsy.com
            </a>
          </div>
        </div>

        {/* Navigation */}
        <div className={styles.footerGrid}>

          {/* Main Pages */}
          <div className={styles.footerColumn}>
            <h4>Explore TSY</h4>

            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>

              <li>
                <Link to="/about-tsy">About TSY</Link>
              </li>

              <li>
                <Link to="/gallery">Gallery</Link>
              </li>

              <li>
                <Link to="/why-travel-with-tsy">
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
                <Link to="/about-tsy">About TSY</Link>
              </li>

              <li>
                <Link to="/why-travel-with-tsy">
                  Why Travel With TSY
                </Link>
              </li>

              <li>
                <Link to="/gallery">Our Gallery</Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className={styles.footerColumn}>
            <h4>Contact</h4>

            <ul>
              <li>
                <a href="tel:+923111555395">
                  +92 3 111 555 395
                </a>
              </li>

              <li>
                <a href="tel:04236362135">
                  0423 6362135-37
                </a>
              </li>

              <li>
                <a href="mailto:info@mytsy.com">
                  info@mytsy.com
                </a>
              </li>
            </ul>
          </div>

          {/* Website & Social */}
          <div className={styles.footerColumn}>
            <h4>Connect With Us</h4>

            <ul>
              {/* <li>
                <a
                  href="https://www.mytsy.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Visit Website
                </a>
              </li> */}

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
                <Link to="/gallery">
                  TSY Gallery
                </Link>
              </li>

              {/* Enquiry Form Button */}
              <li>
                <Link to="/enquiry" className={styles.enquiryLink}>
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
              href="https://www.mytsy.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TSY Website"
              className={styles.socialIcon}
            >
              🌐
            </a>

          </div>
        </div>

      </div>
    </footer>
  );
}