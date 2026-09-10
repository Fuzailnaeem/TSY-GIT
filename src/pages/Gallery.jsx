// src/pages/Gallery.jsx
import React, { useState } from 'react';
import { useNavigate  } from 'react-router-dom';
import { Link } from "react-router-dom";
import Navbar from '../components/homepage/navbar';
import Footer from '../components/homepage/fottor/Footer';
import WhatsAppBanner from '../components/homepage/TSYEnquiryForm/TSYEnquiryForm';

// Importing all 36 assets files
import img1 from '../assets/1 (1).jpeg';
import img2 from '../assets/1 (2).jpeg';
import img3 from '../assets/1 (3).jpeg';
import img4 from '../assets/1 (4).jpeg';
import img5 from '../assets/1 (5).jpeg';
import img6 from '../assets/1 (6).jpeg';
import img7 from '../assets/1 (7).jpeg';
import img8 from '../assets/1 (8).jpeg';
import img9 from '../assets/1 (9).jpeg';
import img10 from '../assets/1 (10).jpeg';
import img11 from '../assets/1 (11).jpeg';
import img12 from '../assets/1 (12).jpeg';
import img13 from '../assets/1 (13).jpeg';
import img14 from '../assets/1 (14).jpeg';
import img15 from '../assets/1 (15).jpeg';
import img16 from '../assets/1 (16).jpeg';
import img17 from '../assets/1 (17).jpeg';
import img18 from '../assets/1 (18).jpeg';
import img19 from '../assets/1 (19).jpeg';
import img20 from '../assets/1 (20).jpeg';
import img21 from '../assets/1 (21).jpeg';
import img22 from '../assets/1 (22).jpeg';
import img23 from '../assets/1 (23).jpeg';
import img24 from '../assets/1 (24).jpeg';
import img25 from '../assets/1 (25).jpeg';
import img26 from '../assets/1 (26).jpeg';
import img27 from '../assets/1 (27).jpeg';

import Award from '../assets/AWARD-removebg.png';
import awardImg from '../assets/AWARD.jpeg';
import CertImg from '../assets/Certificate.jpeg';

const studyNavItems = [
  { label: 'Why Travel With TSY?', path: '/why-travel-with-tsy' },
  { label: 'Our Gallery', path: '/Gallery' },
  { label: 'Our Services', path: '/services' },
];

const tabContents = [
  {
    breadcrumb: { portal: 'IDP Pakistan', currentPage: 'Why study abroad?' },
    title: 'Why study abroad?',
    subtitle: 'Learn how studying abroad opens a world of opportunities',
    showButton: false,
    buttonText: '',
    image: awardImg,
  },
  {
    breadcrumb: { portal: 'IDP Pakistan', currentPage: 'Our Gallery?' },
    title: 'Our Gallery?',
    subtitle:
      "We're here to help you navigate through your study abroad options with ease. From choosing a destination through to course advice",
    showButton: true,
    buttonText: 'Contact TSY',
    image: awardImg,
  },
  {
    breadcrumb: { portal: 'IDP Pakistan', currentPage: 'How do I apply?' },
    title: 'How do I apply?',
    subtitle:
      'We make your application process smooth and straightforward from start to finish.',
    showButton: true,
    buttonText: 'Start Application',
    image: awardImg,
  },
  {
    breadcrumb: { portal: 'IDP Pakistan', currentPage: 'After receiving an offer' },
    title: 'After receiving an offer',
    subtitle: 'Got your offer? Here is what you need to do next to secure your place.',
    showButton: false,
    buttonText: '',
    image: awardImg,
  },
  {
    breadcrumb: { portal: 'IDP Pakistan', currentPage: 'Prepare to depart' },
    title: 'Prepare to depart',
    subtitle: 'Flights, accommodation, packing lists, and everything else before you fly.',
    showButton: false,
    buttonText: '',
    image: awardImg,
  },
  {
    breadcrumb: { portal: 'IDP Pakistan', currentPage: 'Arrive and thrive' },
    title: 'Arrive and thrive',
    subtitle:
      'Settle into your new home smoothly and make the most of your international student life.',
    showButton: false,
    buttonText: '',
    image: awardImg,
  },
];

// All 36 gallery images
const allGalleryImages = [
  { id: 1, src: img1, title: 'Heritage Ride 2025' },
  { id: 2, src: img2, title: 'Heritage Ride 2025' },
  { id: 3, src: img3, title: 'Heritage Ride 2025' },
  { id: 4, src: img4, title: 'Heritage Ride 2025' },
  { id: 5, src: img5, title: 'Heritage Ride 2025' },
  { id: 6, src: img6, title: 'Heritage Ride 2025' },
  { id: 7, src: img7, title: 'Heritage Ride 2025' },
  { id: 8, src: img8, title: 'Heritage Ride 2025' },
  { id: 9, src: img9, title: 'Heritage Ride 2025' },
  { id: 10, src: img10, title: 'Heritage Ride 2025' },
  { id: 11, src: img11, title: 'Heritage Ride 2025' },
  { id: 12, src: img12, title: 'Heritage Ride 2025' },
  { id: 13, src: img13, title: 'Heritage Ride 2025' },
  { id: 14, src: img14, title: 'Heritage Ride 2025' },
  { id: 15, src: img15, title: 'Heritage Ride 2025' },
  { id: 16, src: img16, title: 'Heritage Ride 2025' },
  { id: 17, src: img17, title: 'Heritage Ride 2025' },
  { id: 18, src: img18, title: 'Heritage Ride 2025' },
  { id: 19, src: img19, title: 'Heritage Ride 2025' },
  { id: 20, src: img20, title: 'Heritage Ride 2025' },
  { id: 21, src: img21, title: 'Heritage Ride 2025' },
  { id: 22, src: img22, title: 'Heritage Ride 2025' },
  { id: 23, src: img23, title: 'Heritage Ride 2025' },
  { id: 24, src: img24, title: 'Heritage Ride 2025' },
  { id: 25, src: img25, title: 'Heritage Ride 2025' },
  { id: 26, src: img26, title: 'Heritage Ride 2025' },
  { id: 27, src: img27, title: 'Heritage Ride 2025' },
 
];

// Items per page - showing half (18) on first page
const ITEMS_PER_PAGE = 18;

export default function Gallery() {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const currentContent = tabContents[activeIndex];

  // Calculate pagination
  const totalPages = Math.ceil(allGalleryImages.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentImages = allGalleryImages.slice(startIndex, endIndex);

  const handleTabClick = (index, path) => {
    setActiveIndex(index);
    navigate(path);
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      // Scroll to gallery section
      document.querySelector('.gallery-section')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <style>{`
        /* ===== GLOBAL RESET & BASE ===== */
        .gallery-wrapper {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          background-color: #f8f9fa;
        }

        .gallery-main {
          flex-grow: 1;
        }

        /* ===== STUDY NAVBAR (DESKTOP) ===== */
        .study-nav-wrapper {
          background-color: #122b50;
          width: 100%;
          overflow-x: auto;
          display: none;
        }

        @media (min-width: 769px) {
          .study-nav-wrapper {
            display: block;
          }
        }

        .study-nav-container {
          display: flex;
          align-items: center;
          justify-content: center;
          max-width: 1400px;
          margin: 0 auto;
          min-width: max-content;
        }

        .nav-item-active {
          background-color: #ffffff;
          color: #122b50;
          font-weight: 600;
          font-size: 0.85rem;
          padding: 0.75rem 1.25rem;
          display: flex;
          align-items: center;
          cursor: pointer;
          white-space: nowrap;
          height: 100%;
        }

        .nav-item-inactive {
          background-color: #122b50;
          color: #ffffff;
          font-weight: 400;
          font-size: 0.85rem;
          padding: 0.75rem 1rem;
          display: flex;
          align-items: center;
          cursor: pointer;
          white-space: nowrap;
          transition: background-color 0.2s;
        }

        .nav-item-inactive:hover {
          background-color: #1b3b6d;
        }

        .nav-arrow {
          margin-left: 0.5rem;
          color: #8fa6cb;
          font-size: 0.65rem;
        }

        /* ===== ACTIVE INDICATOR ===== */
        .active-indicator-wrapper {
          display: none;
          justify-content: center;
          position: relative;
          height: 0;
          z-index: 20;
        }

        @media (min-width: 769px) {
          .active-indicator-wrapper {
            display: flex;
          }
        }

        .active-arrow-box {
          background-color: #122b50;
          color: white;
          padding: 1px 6px;
          border-bottom-left-radius: 4px;
          border-bottom-right-radius: 4px;
          font-size: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
        }

        /* ===== MOBILE DROPDOWN NAV ===== */
        .mobile-nav-dropdown {
          display: block;
          background-color: #122b50;
          padding: 0.75rem 1rem;
        }

        @media (min-width: 769px) {
          .mobile-nav-dropdown {
            display: none;
          }
        }

        .mobile-nav-select {
          width: 100%;
          padding: 0.6rem 1rem;
          border-radius: 8px;
          border: none;
          background-color: #ffffff;
          color: #122b50;
          font-weight: 600;
          font-size: 0.9rem;
          cursor: pointer;
          outline: none;
          appearance: auto;
        }

        /* ===== HERO SECTION ===== */
        .hero-section-container {
          max-width: 980px;
          margin: 0 auto;
          padding: 1rem 1.25rem 2rem 1.25rem;
        }

        .breadcrumb-text {
          font-size: 0.7rem;
          color: #6b7280;
          margin-bottom: 1rem;
        }

        .breadcrumb-current {
          color: #1f2937;
          font-weight: 500;
        }

        .hero-grid-layout {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.5rem;
          align-items: center;
        }

        @media (min-width: 768px) {
          .hero-grid-layout {
            grid-template-columns: 1.2fr 0.8fr;
          }
        }

        .hero-text-content {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .hero-heading {
          font-size: 1.85rem;
          font-weight: 800;
          color: #111827;
          letter-spacing: -0.03em;
          line-height: 1.15;
        }

        @media (min-width: 768px) {
          .hero-heading {
            font-size: 2.25rem;
          }
        }

        .hero-description {
          font-size: 0.875rem;
          color: #374151;
          line-height: 1.45;
          max-width: 400px;
          font-weight: 400;
        }

        .hero-action-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background-color: #0055ff;
          color: white;
          font-weight: 600;
          padding: 0.5rem 1.5rem;
          border-radius: 9999px;
          font-size: 0.85rem;
          box-shadow: 0 3px 8px rgba(0, 85, 255, 0.2);
          cursor: pointer;
          transition: background-color 0.2s;
          width: max-content;
          margin-top: 0.25rem;
          border: none;
        }

        .hero-action-btn:hover {
          background-color: #0044cc;
        }

        /* ===== AWARD IMAGE ===== */
        .hero-visual-wrapper {
          position: relative;
          display: flex;
          justify-content: flex-end;
          align-items: center;
          min-height: 280px;
          width: 100%;
          padding: 20px 0;
        }

        .hero-curved-image-card {
          position: relative;
          width: 200px;
          height: 220px;
          border-top-left-radius: 110px;
          border-top-right-radius: 110px;
          border-bottom-left-radius: 110px;
          border-bottom-right-radius: 0px;
          overflow: visible;
          box-shadow: 0 10px 20px -5px rgba(0, 0, 0, 0.15);
          z-index: 10;
          background-color: #e5e7eb;
          flex-shrink: 0;
        }

        .hero-curved-image-card .award-image-wrapper {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 135%;
          display: flex;
          align-items: flex-end;
          justify-content: center;
          overflow: visible;
          pointer-events: none;
          z-index: 11;
        }

        .hero-curved-image-card .award-image-wrapper img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          object-position: bottom;
          display: block;
        }

        .hero-orange-blob-shape {
          position: absolute;
          right: -5px;
          bottom: -8px;
          width: 80px;
          height: 80px;
          background-color: #e67e22;
          border-top-left-radius: 40px;
          border-top-right-radius: 0px;
          border-bottom-left-radius: 0px;
          border-bottom-right-radius: 0px;
          z-index: 1;
        }

        /* ===== CERTIFICATE SECTION ===== */
        .certificate-section {
          width: 100%;
          background-color: #ffffff;
          margin: 1rem 50px 2.5rem auto;
          padding: 0 1.25rem;
        }

        .certificate-grid {
          max-width: 980px;
          margin: 0 ;
          margin-right: 30px !important;
          margin-left: 150px !important;
          display: grid;
          grid-template-columns: 1fr;
          gap: 2rem;
          align-items: center;
          background: transparent;
          padding: 2rem 1.5rem;
        }

        @media (min-width: 640px) {
          .certificate-grid {
            grid-template-columns: 1fr 1fr;
            padding: 2.5rem 2rem;
            gap: 2.5rem;
            margin-left: 30px;
          }
        }
/* ===== 320px SCREEN SIZE SPECIFIC STYLES ===== */
@media (max-width: 320px) {
  /* Hero Section */
  .hero-section-container {
    padding: 1rem 0.75rem 1.5rem 0.75rem;
  }

  .hero-heading {
    font-size: 1.4rem;
    line-height: 1.2;
  }

  .hero-description {
    font-size: 0.75rem;
    max-width: 100%;
  }

  .hero-visual-wrapper {
    min-height: 200px;
    padding: 10px 0;
  }

  .hero-curved-image-card {
    width: 140px;
    height: 160px;
    border-top-left-radius: 80px;
    border-top-right-radius: 80px;
    border-bottom-left-radius: 80px;
  }

  .hero-orange-blob-shape {
    width: 50px;
    height: 50px;
    right: -3px;
    bottom: -5px;
  }

  /* Certificate Section */
  .certificate-section {
    padding: 0 0.75rem;
    margin: 0.5rem 20px 1.5rem auto;
  }

  .certificate-grid {
    padding: 1.25rem 0.75rem;
    gap: 1.25rem;
  }

  .certificate-text h2 {
    font-size: 1.2rem;
  }uto

  .certificate-text p {
    font-size: 0.8rem;
    line-height: 1.5;
  }

  .certificate-text .badge {
    font-size: 0.55rem;
    padding: 0.15rem 0.6rem;
  }

  .certificate-text .cert-btn {
    font-size: 0.75rem;
    padding: 0.5rem 1.2rem;
    width: 100%;
    justify-content: center;
  }

  .certificate-image {
    padding: 0.5rem;
  }

  .certificate-image img {
    max-height: 140px;
  }

  /* About Section */
  .about-simple {
    padding: 1.25rem 0.75rem;
    margin: 0.5rem auto 1.5rem auto;
    border-radius: 10px;
  }

  .about-simple-grid {
    gap: 1.25rem;
  }

  .about-simple-text h2 {
    font-size: 1.3rem;
  }

  .about-simple-text .year {
    font-size: 0.75rem;
  }

  .about-simple-text p {
    font-size: 0.8rem;
    line-height: 1.5;
  }

  .about-simple-image img {
    max-height: 200px;
  }

  .about-simple-text .read-more {
    font-size: 0.8rem;
  }

  /* Gallery Section */
  .gallery-section {
    padding: 0 0.75rem;
    margin: 1.25rem auto 2.5rem auto;
  }

  .gallery-section-title {
    font-size: 1.2rem;
    margin-bottom: 1rem;
  }

  .gallery-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 0.75rem;
  }

  .gallery-item {
    border-radius: 8px;
    aspect-ratio: 3 / 4;
  }

  .gallery-item-overlay {
    padding: 0.75rem;
  }

  .gallery-item-title {
    font-size: 0.75rem;
  }

  /* Modal */
  .image-modal {
    padding: 0.75rem;
  }

  .modal-content {
    max-width: 100%;
  }

  .modal-close-btn {
    width: 28px;
    height: 28px;
    font-size: 0.9rem;
    top: 6px;
    right: 10px;
  }

  .modal-title {
    font-size: 0.8rem;
    padding: 0.6rem;
  }

  /* Mobile Dropdown */
  .mobile-nav-dropdown {
    padding: 0.5rem 0.75rem;
  }

  .mobile-nav-select {
    font-size: 0.75rem;
    padding: 0.4rem 0.75rem;
  }

  /* Breadcrumb */
  .breadcrumb-text {
    font-size: 0.6rem;
  }

  /* Action Button */
  .hero-action-btn {
    font-size: 0.75rem;
    padding: 0.4rem 1.2rem;
    width: 100%;
    justify-content: center;
  }

  /* WhatsApp Banner (if needed) */
  .whatsapp-banner {
    padding: 0.5rem !important;
    font-size: 0.75rem !important;
  }
}
        @media (min-width: 1024px) {
          .certificate-grid {
            padding: 2.5rem 3rem;
            gap: 3rem;
          }
        }

        .certificate-text {
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
        }

        .certificate-text .badge {
          display: inline-block;
          background: #eef3ff;
          color: #122b50;
          font-size: 0.65rem;
          font-weight: 600;
          padding: 0.2rem 0.8rem;
          border-radius: 20px;
          letter-spacing: 0.5px;
          width: fit-content;
          text-transform: uppercase;
        }

        .certificate-text h2 {
          font-size: 1.4rem;
          font-weight: 700;
          color: #0b1c38;
          margin: 0;
          line-height: 1.2;
        }

        @media (min-width: 640px) {
          .certificate-text h2 {
            font-size: 1.6rem;
          }
        }

        .certificate-text p {
          font-size: 0.9rem;
          color: #4a5568;
          line-height: 1.6;
          margin: 0.25rem 0 0.25rem 0;
        }

        @media (min-width: 640px) {
          .certificate-text p {
            font-size: 0.95rem;
          }
        }

        .certificate-text .cert-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background-color: #122b50;
          color: white;
          font-weight: 600;
          padding: 0.6rem 1.8rem;
          border-radius: 50px;
          font-size: 0.85rem;
          border: none;
          cursor: pointer;
          width: fit-content;
          transition: all 0.25s ease;
          margin-top: 0.5rem;
        }

        @media (max-width: 480px) {
          .certificate-text .cert-btn {
            width: 100%;
            justify-content: center;
            padding: 0.7rem 1.5rem;
            font-size: 0.9rem;
          }
        }

        .certificate-text .cert-btn:hover {
          background-color: #1b3b6d;
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(18, 43, 80, 0.2);
        }

        .certificate-image {
          display: flex;
          justify-content: center;
          align-items: center;
          background: #f7fafc;
          border-radius: 16px;
          padding: 0.75rem;
          border: 1px solid #edf2f7;
        }

        @media (min-width: 640px) {
          .certificate-image {
            padding: 1rem;
          }
        }

        .certificate-image img {
          max-width: 100%;
          height: auto;
          max-height: 200px;
          border-radius: 10px;
          object-fit: contain;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04);
        }

        @media (min-width: 640px) {
          .certificate-image img {
            max-height: 240px;
          }
        }

        @media (min-width: 1024px) {
          .certificate-image img {
            max-height: 280px;
          }
        }

        /* ===== ABOUT US SECTION ===== */
        .about-simple {
          max-width: 980px;
          margin: 1rem auto 2.5rem auto;
          padding: 2rem 1.5rem;
          background: #ffffff;
          border-radius: 12px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.06);
        }

        .about-simple-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2rem;
          align-items: center;
        }

        @media (min-width: 640px) {
          .about-simple-grid {
            grid-template-columns: 1fr 1fr;
            gap: 2.5rem;
          }
        }

        .about-simple-image img {
          width: 100%;
          max-height: 300px;
          object-fit: cover;
          border-radius: 10px;
        }

        .about-simple-text h2 {
          font-size: 1.6rem;
          font-weight: 700;
          color: #0b1c38;
          margin: 0 0 0.5rem 0;
        }

        .about-simple-text h2 span {
          color: #e67e22;
        }

        .about-simple-text .year {
          font-weight: 600;
          color: #122b50;
          font-size: 0.9rem;
          margin-bottom: 0.75rem;
        }

        .about-simple-text p {
          font-size: 0.95rem;
          color: #4a5568;
          line-height: 1.7;
          margin: 0.5rem 0;
        }

        .about-simple-text .read-more {
          display: inline-block;
          margin-top: 0.75rem;
          color: #122b50;
          font-weight: 600;
          text-decoration: none;
          border-bottom: 2px solid #122b50;
          padding-bottom: 2px;
          cursor: pointer;
        }

        .about-simple-text .read-more:hover {
          color: #e67e22;
          border-bottom-color: #e67e22;
        }

        /* ===== GALLERY SECTION ===== */
        .gallery-section {
          max-width: 1100px;
          margin: 2rem auto 4rem auto;
          padding: 0 1.25rem;
        }

        .gallery-section-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: #122b50;
          margin-bottom: 1.5rem;
          text-align: center;
        }

        .gallery-grid {
          display: grid;
          grid-template-columns: repeat(1, 1fr);
          gap: 1.25rem;
        }

        @media (min-width: 480px) {
          .gallery-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (min-width: 640px) {
          .gallery-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (min-width: 768px) {
          .gallery-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        @media (min-width: 1024px) {
          .gallery-grid {
            grid-template-columns: repeat(4, 1fr);
          }
        }

        .gallery-item {
          position: relative;
          border-radius: 12px;
          overflow: hidden;
          aspect-ratio: 3 / 4;
          box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
          background-color: #0f172a;
          cursor: pointer;
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }

        .gallery-item:hover {
          transform: translateY(-5px);
          box-shadow: 0 12px 25px rgba(0, 0, 0, 0.18);
        }

        .gallery-item img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.3s ease;
        }

        .gallery-item:hover img {
          transform: scale(1.03);
        }

        .gallery-item-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(18, 43, 80, 0.85) 0%, rgba(18, 43, 80, 0.3) 60%, transparent 100%);
          display: flex;
          align-items: flex-end;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.25s ease;
          padding: 1.25rem;
          text-align: center;
        }

        .gallery-item:hover .gallery-item-overlay {
          opacity: 1;
        }

        .gallery-item-title {
          color: white;
          font-weight: 700;
          font-size: 1.05rem;
          letter-spacing: 0.5px;
        }

        /* ===== PAGINATION ===== */
        .pagination-container {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 0.75rem;
          margin-top: 2.5rem;
          padding: 1rem 0;
          flex-wrap: wrap;
        }

        .pagination-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-width: 40px;
          height: 40px;
          padding: 0 1rem;
          border: 2px solid #122b50;
          border-radius: 8px;
          background: transparent;
          color: #122b50;
          font-weight: 600;
          font-size: 0.9rem;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .pagination-btn:hover:not(:disabled) {
          background: #122b50;
          color: white;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(18, 43, 80, 0.25);
        }

        .pagination-btn:disabled {
          opacity: 0.4;
          cursor: not-allowed;
          transform: none;
        }

        .pagination-btn.active {
          background: #122b50;
          color: white;
          border-color: #122b50;
        }

        .pagination-arrow {
          font-size: 1.2rem;
          line-height: 1;
        }

        .pagination-info {
          font-size: 0.85rem;
          color: #4a5568;
          font-weight: 500;
          padding: 0 0.5rem;
        }

        @media (max-width: 480px) {
          .pagination-btn {
            min-width: 32px;
            height: 32px;
            padding: 0 0.6rem;
            font-size: 0.75rem;
            border-radius: 6px;
          }
          .pagination-info {
            font-size: 0.7rem;
          }
        }

        /* ===== MODAL ===== */
        .image-modal {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.85);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 1.5rem;
        }

        .modal-content {
          position: relative;
          max-width: 600px;
          width: 100%;
          background: #111;
          border-radius: 10px;
          overflow: hidden;
        }

        .modal-content img {
          width: 100%;
          height: auto;
          max-height: 80vh;
          object-fit: contain;
          display: block;
        }

        .modal-close-btn {
          position: absolute;
          top: 10px;
          right: 15px;
          background: #122b50;
          color: white;
          border: none;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          font-weight: bold;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10;
        }

        .modal-title {
          padding: 1rem;
          text-align: center;
          font-weight: 600;
          color: #fff;
          background: #122b50;
        }
      `}</style>

      <div className="gallery-wrapper">
        <Navbar />

        <main className="gallery-main">
          {/* ===== DESKTOP NAV ===== */}
          <div className="study-nav-wrapper">
          </div>

          <div className="active-indicator-wrapper">
            <div className="active-arrow-box">▲</div>
          </div>

          {/* ===== HERO SECTION ===== */}
          <div className="hero-section-container">
            <div className="breadcrumb-text">
              {currentContent.breadcrumb.portal}{' '}
              <span style={{ margin: '0 4px' }}>/</span>{' '}
              <span className="breadcrumb-current">{currentContent.breadcrumb.currentPage}</span>
            </div>
<div className="hero-grid-layout">
  <div className="hero-text-content">
    <h1 className="hero-heading">{currentContent.title}</h1>
    <p className="hero-description">{currentContent.subtitle}</p>

    {currentContent.showButton && (
      <button
        className="hero-action-btn"
        onClick={() => navigate("/enquiry")}
      >
        {currentContent.buttonText}
      </button>
    )}
  </div>


              <div className="hero-visual-wrapper">
                <div className="hero-curved-image-card">
                  <div className="award-image-wrapper">
                    <img src={Award} alt="Award" />
                  </div>
                </div>
                <div className="hero-orange-blob-shape"></div>
              </div>
            </div>
          </div>

         <div className="CS">
  {/* ===== CERTIFICATE SECTION ===== */}
  <div className="certificate-section">
    <div className="certificate-grid">
      <div className="certificate-text">
        <span className="badge">🌟 Recognition</span>

        <h2>Our Recognized Certification</h2>

        <p>
          We are proud to hold this prestigious certificate that validates our
          commitment to excellence and quality service in the education
          consulting industry. This recognition underscores our dedication to
          helping students achieve their dreams of studying abroad.
        </p>

        <Link to="/about-tsy">
          <button className="cert-btn">
            Learn More
          </button>
        </Link>
      </div>

      <div className="certificate-image">
        <img src={CertImg} alt="Certificate" />
      </div>
    </div>
    </div>
            {/* ===== ABOUT US SECTION ===== */}
            <div className="about-simple">
              <div className="about-simple-grid">
                <div className="about-simple-image">
                  <img
                    src="https://mytsy.com/imgs/aboutImage.jpg"
                    alt="TSY Travel & Tour"
                  />
                </div>
                <div className="about-simple-text">
                  <h2>
                    About <span>Us</span>
                  </h2>
                  <div className="year">📅 Since March 1985</div>
                  <p>
                    In March 1985, <strong>Rizvi Group</strong> established{' '}
                    <strong>TSY</strong>, a premier travel and tour operator specializing in
                    international and domestic travel planning.
                  </p>
                  <p>
                    <strong>TSY Travel & Tour</strong> takes care of any travel and tour
                    requirement of our esteemed clients at a global level, providing the best
                    possible deals available.
                  </p>
                  
<span
  className="read-more"
  onClick={() => navigate("/about-tsy")}
  style={{ cursor: "pointer" }}
>
  Read More →
</span>
                </div>
              </div>
            </div>
          </div>

          {/* ===== GALLERY SECTION ===== */}
          <div className="gallery-section">
            <h2 className="gallery-section-title">Explore Our Gallery</h2>
            
            {/* Gallery Grid */}
            <div className="gallery-grid">
              {currentImages.map((photo) => (
                <div
                  key={photo.id}
                  className="gallery-item"
                  onClick={() => setSelectedImage(photo)}
                >
                  <img src={photo.src} alt={photo.title} />
                  <div className="gallery-item-overlay">
                    <span className="gallery-item-title">{photo.title}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* ===== PAGINATION ===== */}
            {totalPages > 1 && (
              <div className="pagination-container">
                <button
                  className="pagination-btn"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  <span className="pagination-arrow">‹</span>
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    className={`pagination-btn ${page === currentPage ? 'active' : ''}`}
                    onClick={() => handlePageChange(page)}
                  >
                    {page}
                  </button>
                ))}

                <button
                  className="pagination-btn"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  <span className="pagination-arrow">›</span>
                </button>

                <span className="pagination-info">
                  Page {currentPage} of {totalPages}
                </span>
              </div>
            )}
          </div>

          {/* ===== MODAL ===== */}
          {selectedImage && (
            <div className="image-modal" onClick={() => setSelectedImage(null)}>
              <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close-btn" onClick={() => setSelectedImage(null)}>
                  ×
                </button>
                <img src={selectedImage.src} alt={selectedImage.title} />
                <div className="modal-title">{selectedImage.title}</div>
              </div>
            </div>
          )}
        </main>

        <WhatsAppBanner />
        <Footer />
      </div>
    </>
  );
}