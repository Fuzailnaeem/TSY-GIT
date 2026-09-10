import React, { useState, useCallback, useRef } from 'react';
import Navbar from '../components/homepage/navbar.jsx';
import Footer from '../components/homepage/fottor/Footer.jsx';
import TSYEnquiryForm from '../components/homepage/TSYEnquiryForm/TSYEnquiryForm.jsx';
import HeroImage from '../assets/Gemini_Generated_Image_rdmyy6rdmyy6rdmy.jpg';
import Umrah from '../assets/umrah.jpg';
import Corporate from '../assets/corporate.jpg';
import { useNavigate, useLocation } from 'react-router-dom';
import { Link } from "react-router-dom";


const INTRO_TEXT =
  "Tsy Travel and tour services takes the hassle out of planning by handling your flights, handpicked hotels, and custom holiday packages from start to finish. Whether it's a relaxing family getaway, a romantic escape, or a corporate trip, our dedicated team manages every detail so you can simply pack your bags and enjoy a smooth, unforgettable journey.";

const VIDEO_THUMBNAIL_IMAGE =
  'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=600&q=80';
const YOUTUBE_EMBED_URL = 'https://www.youtube.com/embed/hUV6hHwvJSY?autoplay=1';

const HERO_STOCK_IMAGE =
  'https://images.unsplash.com/photo-1521292270410-a8c4d716d518?auto=format&fit=crop&w=800&q=80';

const TRAVEL_FEATURES = [
  'Flights and hotel bookings across popular international and domestic routes',
  'Tours, activities, and airport transfers arranged in advance',
  'Travel insurance included as part of your package',
  'Visa processing handled at whichever level of support you choose',
];

const UMRAH_FEATURES = [
  'Accommodation close to the holy sites',
  'Coordinated group transport throughout the trip',
  'Visa documentation and paperwork handled for you',
  'Guidance on timing and logistics around religious obligations',
];

const CORPORATE_FEATURES = [
  'Group flight and hotel bookings under one itinerary',
  'Destination management services for events and conferences',
  'Single point of contact for the whole travelling group',
  'Consolidated invoicing for company accounts',
];

const VISA_SERVICES = [
  {
    title: 'Full documentation',
    description: 'TSY handles the entire visa process for you, start to finish.',
    features: [
      'Document checklist and review',
      'Application submitted on your behalf',
      'Progress updates throughout'
    ],
    badge: 'Most chosen',
    color: '#1A64D2',
    bgColor: '#EBF3FC',
    borderColor: '#1A64D2'
  },
  {
    title: 'Bundled with your package',
    description: 'Visa support included directly alongside your flights, hotel, and transfers.',
    features: [
      'One booking covers travel and visa together',
      'Single consultant for the whole trip',
      'Simplified payment, one invoice'
    ],
    badge: null,
    color: '#059669',
    bgColor: '#D1FAE5',
    borderColor: '#059669'
  },
  {
    title: 'Visa-file assistance only',
    description: 'For travellers handling most of their own booking who just need visa guidance.',
    features: [
      'Document review and advice',
      'Guidance on the application process',
      'No package booking required'
    ],
    badge: null,
    color: '#7c3aed',
    bgColor: '#EDE9FE',
    borderColor: '#7c3aed'
  }
];

// --- Responsive overrides ---------------------------------------------
// Inline `style` objects win over plain CSS specificity, so these rules
// use !important to reliably override them at the breakpoints below.
// Breakpoints: <=1024px (tablet/small laptop), <=768px (large phone/
// small tablet), <=480px (phone).
const RESPONSIVE_CSS = `
  .tsy-page { overflow-x: hidden; }

  @media (max-width: 1024px) {
    .tsy-hero-section {
      grid-template-columns: 1fr !important;
      max-height: none !important;
      min-height: 0 !important;
    }
    .tsy-hero-image-wrapper {
      min-height: 220px !important;
      max-height: 260px !important;
      order: -1;
      border-radius: 20px 20px 0 0 !important;
    }
    .tsy-hero-content { padding: 24px !important; }
    .tsy-feature-section,
    .tsy-umrah-section,
    .tsy-corporate-section {
      grid-template-columns: 1fr !important;
    }
    .tsy-blue-card, .tsy-umrah-card, .tsy-corporate-card {
      height: 260px !important;
      order: -1;
    }
    .tsy-umrah-section-reversed .tsy-umrah-card { order: -1; }
  }

  @media (max-width: 768px) {
    .tsy-hero-title { font-size: 22px !important; }
    .tsy-hero-description { font-size: 13px !important; }
    .tsy-hero-stats { gap: 18px !important; }
    .tsy-hero-stat-number { font-size: 18px !important; }

    .tsy-sub-nav { gap: 20px !important; justify-content: flex-start !important; }
    .tsy-tabs-inner { justify-content: flex-start !important; }

    .tsy-main-heading,
    .tsy-umrah-heading,
    .tsy-corporate-heading,
    .tsy-visa-main-heading { font-size: 22px !important; }

    .tsy-feature-section,
    .tsy-umrah-section,
    .tsy-umrah-section-reversed,
    .tsy-corporate-section,
    .tsy-visa-section {
      padding: 24px 16px !important;
    }

    .tsy-intro-banner { padding: 16px 18px !important; }
    .tsy-intro-text { font-size: 14px !important; }

    .tsy-content-row { flex-direction: column !important; padding: 16px !important; }
    .tsy-video-card { min-height: 220px !important; }
    .tsy-signup-card { padding: 20px !important; }

    .tsy-visa-header p { font-size: 13px !important; }
  }

  @media (max-width: 480px) {
    .tsy-hero-content { padding: 18px !important; }
    .tsy-hero-title { font-size: 19px !important; }
    .tsy-hero-image-wrapper { min-height: 180px !important; max-height: 200px !important; }

    .tsy-main-heading,
    .tsy-umrah-heading,
    .tsy-corporate-heading,
    .tsy-visa-main-heading { font-size: 19px !important; }

    .tsy-description,
    .tsy-umrah-description,
    .tsy-corporate-description { font-size: 13px !important; }

    .tsy-blue-card, .tsy-umrah-card, .tsy-corporate-card { height: 200px !important; }

    .tsy-cta-button,
    .tsy-cta-button-green,
    .tsy-cta-button-purple {
      width: 100% !important;
      text-align: center !important;
    }

    .tsy-video-overlay { padding: 16px 12px !important; }
    .tsy-hero-tabs-bar { padding: 0 12px !important; }
  }
`;

// --- Complete Inline CSS Styles ---
const styles = {
  page: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    backgroundColor: '#ffffff',
    minHeight: '100vh',
    margin: 0,
  },
  heroTabsBar: {
    backgroundColor: '#1A365D',
    color: '#ffffff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0 20px',
    overflowX: 'auto',
  },
  heroTabsInner: {
    display: 'flex',
    alignItems: 'center',
    whiteSpace: 'nowrap',
    width: '100%',
    maxWidth: '1200px',
    justifyContent: 'center',
    gap: '8px',
  },
  tabActive: {
    backgroundColor: '#ffffff',
    color: '#1A365D',
    padding: '14px 24px',
    fontWeight: 'bold',
    fontSize: '15px',
    position: 'relative',
    borderTop: '4px solid #1A365D',
  },
  tabInactive: {
    padding: '14px 16px',
    color: '#cbd5e1',
    fontSize: '14px',
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    background: 'none',
    border: 'none',
  },
  subNav: {
    display: 'flex',
    gap: '32px',
    borderBottom: '1px solid #e2e8f0',
    paddingBottom: '12px',
    margin: '20px auto',
    maxWidth: '1200px',
    paddingLeft: '20px',
    paddingRight: '20px',
    overflowX: 'auto',
    whiteSpace: 'nowrap',
    justifyContent: 'center',
  },
  subNavActive: {
    color: '#1e293b',
    fontWeight: 'bold',
    fontSize: '15px',
    cursor: 'pointer',
    position: 'relative',
    background: 'none',
    border: 'none',
    padding: 0,
  },
  subNavActiveUnderline: {
    position: 'absolute',
    bottom: '-13px',
    left: 0,
    width: '100%',
    height: '3px',
    backgroundColor: '#2563eb',
  },
  subNavInactive: {
    color: '#64748b',
    fontSize: '15px',
    cursor: 'pointer',
    background: 'none',
    border: 'none',
    padding: 0,
    position: 'relative',
  },
  heroSection: {
    maxWidth: '1200px',
    margin: '0 auto 30px auto',
    padding: '0 20px',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '0',
    alignItems: 'stretch',
    backgroundColor: '#f8fafc',
    borderRadius: '20px',
    overflow: 'hidden',
    border: '1px solid #e2e8f0',
    minHeight: '300px',
    maxHeight: '360px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
  },
  heroContent: {
    padding: '28px 32px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  heroTagline: {
    fontSize: '11px',
    fontWeight: '600',
    color: '#1A64D2',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    marginBottom: '6px',
  },
  heroTitle: {
    fontSize: '26px',
    fontWeight: '800',
    color: '#0f172a',
    lineHeight: '1.2',
    marginBottom: '10px',
  },
  heroDescription: {
    fontSize: '14px',
    color: '#475569',
    lineHeight: '1.5',
    marginBottom: '14px',
  },
  heroStats: {
    display: 'flex',
    gap: '24px',
    flexWrap: 'wrap',
  },
  heroStat: {
    display: 'flex',
    flexDirection: 'column',
  },
  heroStatNumber: {
    fontSize: '20px',
    fontWeight: '800',
    color: '#1A64D2',
  },
  heroStatLabel: {
    fontSize: '11px',
    color: '#64748b',
  },
  heroImageWrapper: {
    width: '100%',
    height: '100%',
    minHeight: '300px',
    maxHeight: '360px',
    overflow: 'hidden',
    position: 'relative',
    borderRadius: '0 20px 20px 0',
  },
  heroImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    display: 'block',
  },
  introBanner: {
    maxWidth: '1200px',
    margin: '0 auto 20px auto',
    padding: '18px 24px',
    backgroundColor: '#f8fafc',
    borderRadius: '16px',
    textAlign: 'left',
  },
  introText: {
    fontSize: '16px',
    color: '#334155',
    lineHeight: '1.6',
    margin: 0,
    fontWeight: '700',
  },
  featureSection: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '30px 20px',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '32px',
    alignItems: 'center',
  },
  badge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    backgroundColor: '#EBF3FC',
    color: '#1D63B8',
    fontSize: '12px',
    fontWeight: '600',
    padding: '4px 12px',
    borderRadius: '20px',
    marginBottom: '12px',
  },
  mainHeading: {
    fontSize: '28px',
    fontWeight: '800',
    color: '#0f172a',
    lineHeight: '1.25',
    marginBottom: '12px',
    textAlign: 'left',
  },
  description: {
    fontSize: '14px',
    color: '#475569',
    lineHeight: '1.6',
    marginBottom: '18px',
    textAlign: 'left',
  },
  featureList: {
    listStyle: 'none',
    padding: 0,
    margin: '0 0 20px 0',
  },
  featureItem: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '10px',
    marginBottom: '10px',
  },
  checkIcon: {
    width: '18px',
    height: '18px',
    borderRadius: '50%',
    backgroundColor: '#1A64D2',
    color: '#ffffff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '10px',
    fontWeight: 'bold',
    flexShrink: 0,
    marginTop: '2px',
  },
  featureText: {
    fontSize: '13px',
    color: '#334155',
    lineHeight: '1.5',
  },
  ctaButton: {
    border: '2px solid #1A64D2',
    color: '#1A64D2',
    backgroundColor: 'transparent',
    fontWeight: '600',
    padding: '8px 20px',
    borderRadius: '30px',
    fontSize: '12px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  },
  ctaButtonGreen: {
    border: '2px solid #059669',
    color: '#059669',
    backgroundColor: 'transparent',
    fontWeight: '600',
    padding: '8px 20px',
    borderRadius: '30px',
    fontSize: '12px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  },
  ctaButtonPurple: {
    border: '2px solid #7c3aed',
    color: '#7c3aed',
    backgroundColor: 'transparent',
    fontWeight: '600',
    padding: '8px 20px',
    borderRadius: '30px',
    fontSize: '12px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  },
  blueCard: {
    width: '100%',
    height: '320px',
    background: 'linear-gradient(180deg, #0f52ba 0%, #0a2e65 100%)',
    borderRadius: '20px',
    overflow: 'hidden',
    position: 'relative',
    boxShadow: '0 8px 20px rgba(10, 46, 101, 0.12)',
  },
  cardImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  contentRow: {
    maxWidth: '1200px',
    margin: '0 auto 30px auto',
    padding: '20px',
    display: 'flex',
    flexWrap: 'wrap',
    gap: '20px',
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  videoCard: {
    flex: '1 1 400px',
    borderRadius: '12px',
    overflow: 'hidden',
    display: 'flex',
    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
    backgroundColor: '#1d3581',
    minHeight: '200px',
  },
  videoIframe: { flex: 1, border: 'none', minHeight: '200px' },
  videoImageWrap: { flex: 1, minHeight: '200px' },
  videoImage: { width: '100%', height: '100%', objectFit: 'cover' },
  videoOverlay: {
    flex: 1,
    backgroundColor: '#1d3581',
    color: '#ffffff',
    padding: '20px 16px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    textAlign: 'center',
  },
  playButton: {
    width: '44px',
    height: '44px',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    border: 'none',
  },
  playIcon: {
    width: 0,
    height: 0,
    borderTop: '8px solid transparent',
    borderBottom: '8px solid transparent',
    borderLeft: '14px solid #1d3581',
    marginLeft: '3px',
  },
  signupCard: {
    flex: '1 1 260px',
    backgroundColor: '#f0f9ff',
    border: '1px solid #e0f2fe',
    borderRadius: '12px',
    padding: '24px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    textAlign: 'left',
  },
  signupButton: {
    width: '100%',
    backgroundColor: '#1d3581',
    color: '#ffffff',
    border: 'none',
    padding: '10px',
    borderRadius: '8px',
    fontSize: '13px',
    fontWeight: 'bold',
    cursor: 'pointer',
    marginTop: '16px',
  },
  umrahSection: {
    maxWidth: '1200px',
    margin: '0 auto 30px auto',
    padding: '30px 20px',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '32px',
    alignItems: 'center',
    backgroundColor: '#f0fdf4',
    borderRadius: '20px',
    border: '1px solid #bbf7d0',
  },
  umrahSectionReversed: {
    maxWidth: '1200px',
    margin: '0 auto 30px auto',
    padding: '30px 20px',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '32px',
    alignItems: 'center',
    backgroundColor: '#f0fdf4',
    borderRadius: '20px',
    border: '1px solid #bbf7d0',
  },
  umrahBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    backgroundColor: '#d1fae5',
    color: '#065f46',
    fontSize: '12px',
    fontWeight: '600',
    padding: '4px 12px',
    borderRadius: '20px',
    marginBottom: '12px',
  },
  umrahHeading: {
    fontSize: '28px',
    fontWeight: '800',
    color: '#064e3b',
    lineHeight: '1.25',
    marginBottom: '12px',
    textAlign: 'left',
  },
  umrahDescription: {
    fontSize: '14px',
    color: '#064e3b',
    lineHeight: '1.6',
    marginBottom: '18px',
    textAlign: 'left',
  },
  umrahFeatureList: {
    listStyle: 'none',
    padding: 0,
    margin: '0 0 20px 0',
  },
  umrahFeatureItem: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '10px',
    marginBottom: '10px',
  },
  umrahCheckIcon: {
    width: '18px',
    height: '18px',
    borderRadius: '50%',
    backgroundColor: '#059669',
    color: '#ffffff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '10px',
    fontWeight: 'bold',
    flexShrink: 0,
    marginTop: '2px',
  },
  umrahCard: {
    width: '100%',
    height: '320px',
    borderRadius: '20px',
    overflow: 'hidden',
    position: 'relative',
    boxShadow: '0 8px 20px rgba(6, 95, 70, 0.12)',
  },
  umrahCardImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  umrahCardOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: '20px',
    background: 'linear-gradient(transparent, rgba(6, 95, 70, 0.8))',
    color: '#ffffff',
  },
  corporateSection: {
    maxWidth: '1200px',
    margin: '0 auto 30px auto',
    padding: '30px 20px',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '32px',
    alignItems: 'center',
    backgroundColor: '#f5f3ff',
    borderRadius: '20px',
    border: '1px solid #ddd6fe',
  },
  corporateBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    backgroundColor: '#ede9fe',
    color: '#5b21b6',
    fontSize: '12px',
    fontWeight: '600',
    padding: '4px 12px',
    borderRadius: '20px',
    marginBottom: '12px',
  },
  corporateHeading: {
    fontSize: '28px',
    fontWeight: '800',
    color: '#4c1d95',
    lineHeight: '1.25',
    marginBottom: '12px',
    textAlign: 'left',
  },
  corporateDescription: {
    fontSize: '14px',
    color: '#4c1d95',
    lineHeight: '1.6',
    marginBottom: '18px',
    textAlign: 'left',
  },
  corporateFeatureList: {
    listStyle: 'none',
    padding: 0,
    margin: '0 0 20px 0',
  },
  corporateFeatureItem: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '10px',
    marginBottom: '10px',
  },
  corporateCheckIcon: {
    width: '18px',
    height: '18px',
    borderRadius: '50%',
    backgroundColor: '#7c3aed',
    color: '#ffffff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '10px',
    fontWeight: 'bold',
    flexShrink: 0,
    marginTop: '2px',
  },
  corporateCard: {
    width: '100%',
    height: '320px',
    borderRadius: '20px',
    overflow: 'hidden',
    position: 'relative',
    boxShadow: '0 8px 20px rgba(124, 58, 237, 0.12)',
  },
  corporateCardImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  corporateCardOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: '20px',
    background: 'linear-gradient(transparent, rgba(124, 58, 237, 0.8))',
    color: '#ffffff',
  },
  visaSection: {
    maxWidth: '1200px',
    margin: '0 auto 30px auto',
    padding: '32px 20px',
    backgroundColor: '#ffffff',
    borderRadius: '20px',
    border: '1px solid #e2e8f0',
  },
  visaHeader: {
    textAlign: 'center',
    marginBottom: '28px',
  },
  visaMainHeading: {
    fontSize: '28px',
    fontWeight: '800',
    color: '#0f172a',
    lineHeight: '1.25',
    marginBottom: '8px',
  },
  visaSubHeading: {
    fontSize: '15px',
    color: '#64748b',
    fontWeight: '400',
    marginBottom: '0',
  },
  visaGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '20px',
    marginTop: '16px',
  },
  visaCard: {
    backgroundColor: '#f8fafc',
    borderRadius: '16px',
    padding: '20px 18px',
    border: '2px solid #e2e8f0',
    transition: 'all 0.2s ease',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
  },
  visaCardMostChosen: {
    backgroundColor: '#f8fafc',
    borderRadius: '16px',
    padding: '20px 18px',
    border: '2px solid #1A64D2',
    transition: 'all 0.2s ease',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
  },
  visaBadge: {
    display: 'inline-block',
    backgroundColor: '#1A64D2',
    color: '#ffffff',
    fontSize: '10px',
    fontWeight: '700',
    padding: '2px 10px',
    borderRadius: '20px',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    marginBottom: '8px',
    alignSelf: 'flex-start',
  },
  visaCardTitle: {
    fontSize: '17px',
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: '6px',
  },
  visaCardDescription: {
    fontSize: '13px',
    color: '#475569',
    lineHeight: '1.5',
    marginBottom: '14px',
  },
  visaFeatureList: {
    listStyle: 'none',
    padding: 0,
    margin: '0 0 14px 0',
    flex: 1,
  },
  visaFeatureItem: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '8px',
    marginBottom: '6px',
    fontSize: '12px',
    color: '#334155',
    lineHeight: '1.4',
  },
  visaFeatureCheck: {
    color: '#1A64D2',
    fontWeight: 'bold',
    fontSize: '13px',
    flexShrink: 0,
    marginTop: '1px',
  },
  visaCardButton: {
    width: '100%',
    border: '2px solid #1A64D2',
    color: '#1A64D2',
    backgroundColor: 'transparent',
    fontWeight: '600',
    padding: '8px 14px',
    borderRadius: '30px',
    fontSize: '12px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    marginTop: 'auto',
  },
  visaCardButtonGreen: {
    width: '100%',
    border: '2px solid #059669',
    color: '#059669',
    backgroundColor: 'transparent',
    fontWeight: '600',
    padding: '8px 14px',
    borderRadius: '30px',
    fontSize: '12px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    marginTop: 'auto',
  },
  visaCardButtonPurple: {
    width: '100%',
    border: '2px solid #7c3aed',
    color: '#7c3aed',
    backgroundColor: 'transparent',
    fontWeight: '600',
    padding: '8px 14px',
    borderRadius: '30px',
    fontSize: '12px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    marginTop: 'auto',
  },
};

function SubNav({ scrollToFeatureSection, scrollToUmrahSection, scrollToCorporateSection, scrollToVisaSection }) {
  return (
    <div className="tsy-sub-nav" style={styles.subNav}>
      <button type="button" style={styles.subNavActive} onClick={scrollToFeatureSection}>
        Holidays planned
        <span style={styles.subNavActiveUnderline} />
      </button>
      <button type="button" style={styles.subNavInactive} onClick={scrollToUmrahSection}>
        Umrah
      </button>
      <button type="button" style={styles.subNavInactive} onClick={scrollToCorporateSection}>
        Corporate
      </button>
      <button type="button" style={styles.subNavInactive} onClick={scrollToVisaSection}>
        Visa Services
      </button>
    </div>
  );
}

function HeroSection() {
  return (
    <div className="tsy-hero-section" style={styles.heroSection}>
      <div className="tsy-hero-content" style={styles.heroContent}>
        <div style={styles.heroTagline}>TSY Pakistan / Services</div>
        <h1 className="tsy-hero-title" style={styles.heroTitle}>Three kinds of travel, one team behind each</h1>
        <p className="tsy-hero-description" style={styles.heroDescription}>
          TSY doesn't try to cover every kind of trip — it's built real depth in the ones that matter most to its clients: leisure travel, Umrah, and corporate & MICE.
        </p>
        <div className="tsy-hero-stats" style={styles.heroStats}>
          <div style={styles.heroStat}>
            <span className="tsy-hero-stat-number" style={styles.heroStatNumber}>40+</span>
            <span style={styles.heroStatLabel}>Years of Experience</span>
          </div>
          <div style={styles.heroStat}>
            <span className="tsy-hero-stat-number" style={styles.heroStatNumber}>10K+</span>
            <span style={styles.heroStatLabel}>Happy Travellers</span>
          </div>
          <div style={styles.heroStat}>
            <span className="tsy-hero-stat-number" style={styles.heroStatNumber}>3</span>
            <span style={styles.heroStatLabel}>Specialised Services</span>
          </div>
        </div>
      </div>
      <div className="tsy-hero-image-wrapper" style={styles.heroImageWrapper}>
        <img
          src={HERO_STOCK_IMAGE}
          alt="TSY Travel - Three kinds of travel, one team behind each"
          style={styles.heroImage}
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1488085061387-422e29b40080?auto=format&fit=crop&w=800&q=80';
          }}
        />
      </div>
    </div>
  );
}

function IntroTextSection() {
  return (
    <div className="tsy-intro-banner" style={styles.introBanner}>
      <p className="tsy-intro-text" style={styles.introText}>{INTRO_TEXT}</p>
    </div>
  );
}

// --- TravelFeatureSection: now receives navigate as a prop ---
const TravelFeatureSection = React.forwardRef(({ navigate }, ref) => {
  return (
    <section id="main-benefits-section" ref={ref} className="tsy-feature-section" style={styles.featureSection}>
      <div>
        <div style={styles.badge}>
          <span>✈</span> Leisure &amp; Family Travel
        </div>

        <h2 className="tsy-main-heading" style={styles.mainHeading}>
          Holidays planned around how you actually like to travel
        </h2>

        <p className="tsy-description" style={styles.description}>
          Whether it's a family holiday, a couple's getaway, or a trip with friends,
          TSY builds the itinerary around what you want to do — not a fixed package template.
        </p>

        <ul style={styles.featureList}>
          {TRAVEL_FEATURES.map((text, idx) => (
            <li key={idx} style={styles.featureItem}>
              <div style={styles.checkIcon}>✓</div>
              <span style={styles.featureText}>{text}</span>
            </li>
          ))}
        </ul>

        <div>
          <button className="tsy-cta-button" style={styles.ctaButton} onClick={() => { navigate("/enquiry"); window.scrollTo(0, 0); }}>
            Enquire about leisure travel
          </button>
        </div>
      </div>

      <div className="tsy-blue-card" style={styles.blueCard}>
        <img
          src={HeroImage}
          alt="Travel Planning"
          style={styles.cardImage}
          onError={(e) => { e.target.style.display = 'none'; }}
        />
      </div>
    </section>
  );
});

// --- UmrahSection: now receives navigate as a prop ---
const UmrahSection = React.forwardRef(({ navigate }, ref) => {
  return (
    <section id="umrah-section" ref={ref} className="tsy-umrah-section-reversed" style={styles.umrahSectionReversed}>
      <div className="tsy-umrah-card" style={styles.umrahCard}>
        <img
          src={Umrah}
          alt="Umrah Package"
          style={styles.umrahCardImage}
          onError={(e) => {
            e.target.style.display = 'none';
            e.target.parentElement.style.background = 'linear-gradient(180deg, #065f46 0%, #022c22 100%)';
          }}
        />
      </div>

      <div>
        <div style={styles.umrahBadge}>
          <span>🕋</span> Umrah
        </div>

        <h2 className="tsy-umrah-heading" style={styles.umrahHeading}>
          A guided pilgrimage, planned with genuine care
        </h2>

        <p className="tsy-umrah-description" style={styles.umrahDescription}>
          Umrah travel comes with its own logistics — TSY's packages are built specifically
          around what pilgrims need, so the focus stays on the journey itself.
        </p>

        <ul style={styles.umrahFeatureList}>
          {UMRAH_FEATURES.map((text, idx) => (
            <li key={idx} style={styles.umrahFeatureItem}>
              <div style={styles.umrahCheckIcon}>✓</div>
              <span style={styles.featureText}>{text}</span>
            </li>
          ))}
        </ul>

        <div>
          <button className="tsy-cta-button-green" style={styles.ctaButtonGreen} onClick={() => { navigate("/enquiry"); window.scrollTo(0, 0); }}>
            Enquire about Umrah travel
          </button>
        </div>
      </div>
    </section>
  );
});

// --- CorporateSection: now receives navigate as a prop ---
const CorporateSection = React.forwardRef(({ navigate }, ref) => {
  return (
    <section id="corporate-section" ref={ref} className="tsy-corporate-section" style={styles.corporateSection}>
      <div>
        <div style={styles.corporateBadge}>
          <span>🏢</span> Corporate &amp; MICE
        </div>

        <h2 className="tsy-corporate-heading" style={styles.corporateHeading}>
          Group travel managed as one booking, not a stack of tickets
        </h2>

        <p className="tsy-corporate-description" style={styles.corporateDescription}>
          Conferences, incentive trips, and business delegations involve more moving parts —
          multiple travellers, shared itineraries, one invoice. TSY coordinates all of it as
          a single managed booking.
        </p>

        <ul style={styles.corporateFeatureList}>
          {CORPORATE_FEATURES.map((text, idx) => (
            <li key={idx} style={styles.corporateFeatureItem}>
              <div style={styles.corporateCheckIcon}>✓</div>
              <span style={styles.featureText}>{text}</span>
            </li>
          ))}
        </ul>

        <div>
          <button className="tsy-cta-button-purple" style={styles.ctaButtonPurple} onClick={() => { navigate("/enquiry"); window.scrollTo(0, 0); }}>
            Enquire about corporate travel
          </button>
        </div>
      </div>

      <div className="tsy-corporate-card" style={styles.corporateCard}>
        <img
          src={Corporate}
          alt="Corporate & MICE Travel"
          style={styles.corporateCardImage}
          onError={(e) => {
            e.target.style.display = 'none';
            e.target.parentElement.style.background = 'linear-gradient(180deg, #5b21b6 0%, #2e1065 100%)';
          }}
        />
      </div>
    </section>
  );
});

// --- VisaServicesSection: now receives navigate as a prop, onClick added ---
const VisaServicesSection = React.forwardRef(({ navigate }, ref) => {
  const getButtonStyle = (index) => {
    if (index === 0) return styles.visaCardButton;
    if (index === 1) return styles.visaCardButtonGreen;
    return styles.visaCardButtonPurple;
  };

  const getCardStyle = (index) => {
    if (index === 0) return styles.visaCardMostChosen;
    return styles.visaCard;
  };

  return (
    <section id="visa-section" ref={ref} className="tsy-visa-section" style={styles.visaSection}>
      <div className="tsy-visa-header" style={styles.visaHeader}>
        <h2 className="tsy-visa-main-heading" style={styles.visaMainHeading}>Across Every Service</h2>
        <p style={styles.visaSubHeading}>
          Visa support, matched to how much you want handled
        </p>
        <p style={{ fontSize: '13px', color: '#64748b', marginTop: '4px' }}>
          Every TSY package — leisure, Umrah, or corporate — comes with a choice of visa support level.
        </p>
      </div>

      <div style={styles.visaGrid}>
        {VISA_SERVICES.map((service, index) => (
          <div key={index} style={getCardStyle(index)}>
            {service.badge && (
              <span style={styles.visaBadge}>{service.badge}</span>
            )}
            <h3 style={styles.visaCardTitle}>{service.title}</h3>
            <p style={styles.visaCardDescription}>{service.description}</p>
            <ul style={styles.visaFeatureList}>
              {service.features.map((feature, idx) => (
                <li key={idx} style={styles.visaFeatureItem}>
                  <span style={styles.visaFeatureCheck}>✅</span>
                  {feature}
                </li>
              ))}
            </ul>
            <button style={getButtonStyle(index)} onClick={() => { navigate("/enquiry"); window.scrollTo(0, 0); }}>
              Enquire about visa support
            </button>
          </div>
        ))}
      </div>
    </section>
  );
});

function VideoCard({ isPlaying, onPlay }) {
  if (isPlaying) {
    return (
      <div className="tsy-video-card" style={styles.videoCard}>
        <iframe
          width="100%"
          height="100%"
          src={YOUTUBE_EMBED_URL}
          title="Why travel with TSY?"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={styles.videoIframe}
        />
      </div>
    );
  }

  return (
    <div className="tsy-video-card" style={styles.videoCard}>
      <div style={styles.videoImageWrap}>
        <img src={VIDEO_THUMBNAIL_IMAGE} alt="TSY Travel" style={styles.videoImage} />
      </div>

      <div className="tsy-video-overlay" style={styles.videoOverlay}>
        <div>
          <div style={{ fontWeight: 'bold' }}>&gt;TSY</div>
          <div style={{ fontSize: '12px', color: '#93c5fd' }}>Video #01</div>
        </div>

        <button type="button" onClick={onPlay} style={styles.playButton} aria-label="Play video">
          <span style={styles.playIcon} />
        </button>

        <div>
          <h3 style={{ fontSize: '16px', margin: '0 0 4px 0' }}>Why travel with TSY</h3>
          <span style={{ fontSize: '12px', color: '#cbd5e1' }}>Travel journey preview</span>
        </div>
      </div>
    </div>
  );
}

// --- Main Page Component ---
export default function WhyTravelWithTSY() {
  const navigate = useNavigate(); // 👈 single source of truth for navigate
  const [isPlaying, setIsPlaying] = useState(false);
  const featureSectionRef = useRef(null);
  const umrahSectionRef = useRef(null);
  const corporateSectionRef = useRef(null);
  const visaSectionRef = useRef(null);

  const handlePlay = useCallback(() => setIsPlaying(true), []);

  const scrollToFeatureSection = useCallback(() => {
    if (featureSectionRef.current) {
      featureSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  const scrollToUmrahSection = useCallback(() => {
    if (umrahSectionRef.current) {
      umrahSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  const scrollToCorporateSection = useCallback(() => {
    if (corporateSectionRef.current) {
      corporateSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  const scrollToVisaSection = useCallback(() => {
    if (visaSectionRef.current) {
      visaSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  return (
    <div className="tsy-page" style={styles.page}>
      <style>{RESPONSIVE_CSS}</style>

      <Navbar />

      <HeroSection />

      <SubNav
        scrollToFeatureSection={scrollToFeatureSection}
        scrollToUmrahSection={scrollToUmrahSection}
        scrollToCorporateSection={scrollToCorporateSection}
        scrollToVisaSection={scrollToVisaSection}
      />

      <IntroTextSection />

      <TravelFeatureSection ref={featureSectionRef} navigate={navigate} />

      <UmrahSection ref={umrahSectionRef} navigate={navigate} />

      <CorporateSection ref={corporateSectionRef} navigate={navigate} />

      <VisaServicesSection ref={visaSectionRef} navigate={navigate} />

      <TSYEnquiryForm />
      <Footer />
    </div>
  );
}