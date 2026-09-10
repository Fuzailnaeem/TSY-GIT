import React, { useState, useCallback } from 'react';
import Navbar from '../components/homepage/navbar.jsx';
import Footer from '../components/homepage/fottor/Footer.jsx';
import TSYEnquiryForm from '../components/homepage/TSYEnquiryForm/TSYEnquiryForm.jsx';
import GuidanceBanner from '../components/Steps to study abroad/GuidanceBanner.jsx';
import { useNavigate } from 'react-router-dom';

import HeroImage from '../assets/Gemini_Generated_Image_rdmyy6rdmyy6rdmy.jpg';

const SUB_NAV_ITEMS = [
  { label: 'Discover why travellers choose TSY', active: true },
  { label: 'Related guides' },
  { label: 'Frequently asked questions' },
];

const HERO_IMAGE = HeroImage;
const VIDEO_THUMBNAIL_IMAGE =
  'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=600&q=80';
const YOUTUBE_EMBED_URL = 'https://www.youtube.com/embed/hUV6hHwvJSY?autoplay=1';

const INTRO_TEXT =
  "Thinking about your next trip? You're not alone — more travellers than ever are turning to a trusted agent instead of piecing a trip together themselves. Why? Because the right travel partner doesn't just book flights — they handle the visa paperwork, the fine print, and the parts that go wrong if nobody's watching. TSY has been doing exactly that since 1985, for leisure trips, honeymoons, corporate travel, and Umrah alike";

// --- FAQ Data Configuration ---
const FAQ_DATA = {
  title: 'Frequently asked questions',
  items: [
    {
      question: 'What does TSY actually do for me?',
      answer: [
        'TSY provides end-to-end support for your travel journey. From choosing the right destination to visa guidance, travel arrangements, accommodation, and pre-departure support, we help simplify the process and make sure you are prepared at every stage.',
      ],
    },
    {
      question: 'How is booking through TSY different from booking online myself?',
      answer: [
        'Booking through TSY gives you personalised guidance and support throughout the process. Instead of managing everything yourself, our team can help you compare suitable options, understand requirements, avoid common mistakes, and coordinate your travel arrangements based on your needs.',
      ],
    },
    {
      question: "What's included in a TSY package?",
      answer: [
        'A TSY package can include services such as travel planning, flight assistance, visa support, accommodation guidance, airport transfer arrangements, and pre-departure assistance. The exact services included depend on the package you choose and your destination.',
      ],
    },
    {
      question: 'How does the visa tier system work?',
      answer: [
        'Our visa tier system is designed to make our visa services easier to understand. Different tiers offer different levels of support, from essential application guidance to more comprehensive assistance. The right tier depends on your visa type, destination, and the level of support you require.',
      ],
    },
    {
      question: 'Is using a travel agent more expensive?',
      answer: [
        'Not necessarily. While some services may include an additional professional fee, working with TSY can help you save time, avoid costly mistakes, and find suitable travel options. We aim to provide transparent pricing and practical support so you can make informed decisions without unnecessary expenses.',
      ],
    },
  ],
};

// --- Main Benefits Data ---
const MAIN_BENEFITS_DATA = {
  title: 'Main benefits of travelling with TSY',
  items: [
    {
      id: 'trusted-expertise',
      title: 'Trusted expertise',
      content: [
        'Forty years in the business means TSY has handled almost every kind of trip and every kind of complication. That experience shows up in smoother bookings, fewer surprises, and faster answers when something needs sorting.',
      ],
    },
    {
      id: 'visa-clarity',
      title: 'Visa clarity',
      content: [
        'Visa paperwork is where most independent travel plans stall. TSY\'s three-tier visa system — full documentation, a visa bundled into your package, or visa-file assistance only — means you choose exactly how much of the process you want handled for you.',
      ],
    },
    {
      id: 'planning-built-around-you',
      title: 'Planning built around your trip',
      content: [
        'A honeymoon isn\'t planned the same way as a corporate delegation or an Umrah group. TSY consultants specialise across leisure, honeymoon, corporate/MICE, and Umrah travel, so your itinerary is shaped by someone who knows that specific kind of trip.',
      ],
    },
    {
      id: 'peace-of-mind',
      title: 'Peace of mind, start to finish',
      content: [
        'Insurance, transfers, accommodation, forex — TSY coordinates the pieces that are easy to forget until you\'re standing at an airport without them.',
      ],
    },
  ],
};

// --- Other Reasons Data ---
const OTHER_REASONS_DATA = {
  title: 'Other reasons to travel with TSY',
  items: [
    {
      id: 'local-knowledge',
      title: 'Local knowledge, real relationships',
      content: [
        'Decades in Lahore\'s travel market means established relationships with airlines, hotels, and visa authorities — relationships that can smooth out delays or last-minute changes.',
      ],
    },
    {
      id: 'group-corporate-travel',
      title: 'Group and corporate travel, done properly',
      content: [
        'Corporate and MICE trips involve more moving parts — multiple travellers, shared itineraries, invoicing. TSY manages group logistics as a single coordinated booking, not a stack of individual tickets.',
      ],
    },
    {
      id: 'umrah-handled-with-care',
      title: 'Umrah, handled with care',
      content: [
        'Umrah travel comes with its own logistics — accommodation near the holy sites, group transport, and timing around religious obligations. TSY\'s Umrah packages are built around those specifics.',
      ],
    },
    {
      id: 'support-doesnt-end',
      title: 'Support that doesn\'t end at booking',
      content: [
        'Questions after you\'ve paid don\'t go unanswered. Your TSY consultant remains reachable before and during your trip.',
      ],
    },
  ],
};

// --- Related Guides Data ---
const RELATED_GUIDES_DATA = {
  title: 'Related guides',
  subtitle: 'Placeholder titles — developer/content team to fill in real articles',
  viewAllLink: '#',
  articles: [
    {
      id: 'visa-documentation',
      title: 'Visa documentation: what to prepare before you apply',
      excerpt: 'Essential visa documentation guide for international students and travellers. Learn what documents you need...',
      readTime: '8 min',
      published: '15 August 2026',
      updated: '20 August 2026',
      image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=400&h=250&q=80',
    },
    {
      id: 'umrah-packages',
      title: 'Umrah packages: what\'s included and what to check',
      excerpt: 'Comprehensive guide to Umrah packages, including what\'s typically included and key things to check before booking...',
      readTime: '10 min',
      published: '10 August 2026',
      updated: '18 August 2026',
      image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=400&h=250&q=80',
    },
    {
      id: 'corporate-travel',
      title: 'Corporate travel: booking for groups without the back-and-forth',
      excerpt: 'Streamline corporate travel booking for groups with our comprehensive guide. Learn how to manage multiple...',
      readTime: '12 min',
      published: '5 August 2026',
      updated: '16 August 2026',
      image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=400&h=250&q=80',
    },
    {
      id: 'currency-forex-tips',
      title: 'Currency and forex tips before you travel',
      excerpt: 'Essential currency exchange and forex tips for international travellers. Learn how to get the best exchange rates...',
      readTime: '7 min',
      published: '1 August 2026',
      updated: '14 August 2026',
      image: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=400&h=250&q=80',
    },
  ],
};

// --- Static styles ---
// NOTE: fixed px values that need to shrink on smaller screens (headings, hero,
// grid columns, section padding) were moved to CSS classes below, defined in
// <ResponsiveStyles/>, since inline style objects can't hold media queries.
const styles = {
  page: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    backgroundColor: '#f9f9f9',
    minHeight: '100vh',
    margin: 0,
    overflowX: 'hidden',
  },
  heroTabsBar: {
    backgroundColor: '#1A365D',
    color: '#ffffff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0 20px',
    position: 'relative',
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
    padding: '18px 24px',
    fontWeight: 'bold',
    fontSize: '15px',
    position: 'relative',
    borderTop: '4px solid #1A365D',
  },
  tabActiveArrow: {
    position: 'absolute',
    bottom: '-8px',
    left: '50%',
    transform: 'translateX(-50%)',
    width: 0,
    height: 0,
    borderLeft: '8px solid transparent',
    borderRight: '8px solid transparent',
    borderTop: '8px solid #ffffff',
  },
  tabInactive: {
    padding: '18px 16px',
    color: '#cbd5e1',
    fontSize: '14px',
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    background: 'none',
    border: 'none',
  },
  tabInactiveArrow: { marginRight: '12px', fontSize: '12px' },
  heroContent: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '40px 20px 20px 20px',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  heroText: { flex: '1 1 500px', paddingRight: '20px', marginBottom: '30px', textAlign: 'left' },
  breadcrumb: { fontSize: '13px', color: '#64748b', marginBottom: '24px', textAlign: 'left' },
  breadcrumbCurrent: { color: '#0f172a' },
  heroSubtitle: { fontSize: '18px', color: '#475569', fontWeight: '500', margin: 0, textAlign: 'left' },
  heroImageWrap: {
    flex: '1 1 400px',
    display: 'flex',
    justifyContent: 'center',
    position: 'relative',
    minHeight: '300px',
  },
  heroImage: { width: '100%', height: '100%', objectFit: 'cover' },
  heroImageAccent: {
    position: 'absolute',
    bottom: '0',
    right: '10px',
    width: '120px',
    height: '120px',
    backgroundColor: '#f97316',
    borderTopLeftRadius: '60px',
    zIndex: 1,
  },
  mainSection: { maxWidth: '1200px', margin: '0 auto', padding: '40px 20px 60px 20px' },
  subNav: {
    display: 'flex',
    gap: '32px',
    borderBottom: '1px solid #e2e8f0',
    paddingBottom: '12px',
    marginBottom: '40px',
    overflowX: 'auto',
    whiteSpace: 'nowrap',
    justifyContent: 'center',
  },
  faqSection: {
    maxWidth: '900px',
    margin: '0 auto',
    padding: '50px 20px',
  },
  faqTitleUnderline: {
    width: '48px',
    height: '4px',
    backgroundColor: '#f97316',
    marginBottom: '30px',
  },
  accordionItem: {
    borderTop: '1px solid #e2e8f0',
    padding: '22px 0',
  },
  accordionItemLast: {
    borderTop: '1px solid #e2e8f0',
    borderBottom: '1px solid #e2e8f0',
    padding: '22px 0',
  },
  accordionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    cursor: 'pointer',
    background: 'none',
    border: 'none',
    width: '100%',
    padding: 0,
    textAlign: 'left',
  },
  accordionTitle: {
    fontSize: '17px',
    fontWeight: '700',
    color: '#1e293b',
    margin: 0,
  },
  accordionToggle: {
    fontSize: '20px',
    fontWeight: '400',
    color: '#1e293b',
    lineHeight: 1,
    flexShrink: 0,
    marginLeft: '16px',
  },
  accordionBody: {
    marginTop: '14px',
  },
  accordionText: {
    fontSize: '15px',
    lineHeight: '1.7',
    color: '#475569',
    margin: '0 0 10px 0',
    textAlign: 'left',
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
  },
  intro: { maxWidth: '900px', margin: '0 auto 40px auto', textAlign: 'left' },
  introText: { fontSize: '16px', lineHeight: '1.7', color: '#334155', margin: 0, textAlign: 'left' },
  contentRow: { display: 'flex', flexWrap: 'wrap', gap: '24px', alignItems: 'stretch', justifyContent: 'center' },
  videoCard: {
    flex: '1 1 540px',
    borderRadius: '12px',
    overflow: 'hidden',
    display: 'flex',
    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
    backgroundColor: '#1d3581',
    minHeight: '260px',
  },
  videoIframe: { flex: 1, border: 'none', minHeight: '260px' },
  videoImageWrap: { flex: 1, minHeight: '260px' },
  videoImage: { width: '100%', height: '100%', objectFit: 'cover' },
  videoOverlay: {
    flex: 1,
    backgroundColor: '#1d3581',
    color: '#ffffff',
    padding: '32px 24px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    textAlign: 'center',
    position: 'relative',
  },
  videoBrand: { fontSize: '16px', fontWeight: 'bold', marginBottom: '4px', letterSpacing: '1px' },
  videoBadge: {
    fontSize: '12px',
    color: '#93c5fd',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  playButton: {
    width: '56px',
    height: '56px',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
    transition: 'transform 0.2s',
    border: 'none',
    padding: 0,
  },
  playIcon: {
    width: 0,
    height: 0,
    borderTop: '8px solid transparent',
    borderBottom: '8px solid transparent',
    borderLeft: '14px solid #1d3581',
    marginLeft: '3px',
  },
  videoTitle: { fontSize: '22px', fontWeight: 'bold', margin: '0 0 6px 0', lineHeight: '1.2' },
  videoCaption: { fontSize: '11px', color: '#cbd5e1' },
  signupCard: {
    flex: '1 1 340px',
    backgroundColor: '#f0f9ff',
    border: '1px solid #e0f2fe',
    borderRadius: '12px',
    padding: '32px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    boxShadow: '0 4px 12px rgba(0,0,0,0.04)',
    textAlign: 'left',
  },
  signupTitle: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#0f172a',
    marginBottom: '12px',
    lineHeight: '1.3',
    textAlign: 'left',
  },
  signupText: { fontSize: '14px', color: '#475569', lineHeight: '1.6', margin: 0, textAlign: 'left' },
  signupButton: {
    width: '100%',
    backgroundColor: '#1d3581',
    color: '#ffffff',
    border: 'none',
    padding: '14px',
    borderRadius: '8px',
    fontSize: '15px',
    fontWeight: 'bold',
    cursor: 'pointer',
    marginTop: '24px',
    transition: 'background-color 0.2s',
  },
  section: {
    backgroundColor: '#f9f9f9',
    color: '#333333',
    padding: '40px 20px',
    width: '100%',
    boxSizing: 'border-box',
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    gap: '20px',
  },
  paragraph: {
    fontSize: '16px',
    lineHeight: '1.7',
    color: '#334155',
    margin: 0,
    textAlign: 'left',
  },
  link: {
    color: '#2563eb',
    textDecoration: 'none',
  },
  buttonContainer: {
    paddingTop: '10px',
    display: 'flex',
    justifyContent: 'flex-start',
    width: '100%',
  },
  button: {
    backgroundColor: '#0066ff',
    color: '#ffffff',
    fontWeight: '600',
    fontSize: '15px',
    padding: '12px 32px',
    borderRadius: '30px',
    border: 'none',
    cursor: 'pointer',
    boxShadow: '0 4px 12px rgba(0, 102, 255, 0.3)',
    transition: 'background-color 0.2s ease',
  },
  availButton: {
    backgroundColor: '#0066ff',
    color: '#ffffff',
    fontWeight: '600',
    fontSize: '15px',
    padding: '12px 28px',
    borderRadius: '30px',
    border: 'none',
    cursor: 'pointer',
    boxShadow: '0 4px 12px rgba(0, 102, 255, 0.3)',
    transition: 'background-color 0.2s ease',
  },
  discoverSection: {
    marginTop: '20px',
    marginBottom: '20px',
  },
  relatedArticlesHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '8px',
    gap: '12px',
  },
  viewAllLink: {
    color: '#2563eb',
    textDecoration: 'none',
    fontSize: '15px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'color 0.2s',
    flexShrink: 0,
  },
  relatedSubtitle: {
    fontSize: '14px',
    color: '#64748b',
    fontStyle: 'italic',
    margin: '0 0 20px 0',
  },
  articleCard: {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    overflow: 'hidden',
    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
    border: '1px solid #e2e8f0',
    cursor: 'pointer',
    transition: 'transform 0.2s, box-shadow 0.2s',
    display: 'flex',
    flexDirection: 'column',
  },
  articleImage: {
    width: '100%',
    height: '180px',
    objectFit: 'cover',
    backgroundColor: '#f1f5f9',
  },
  articleContent: {
    padding: '16px 18px 18px 18px',
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
  },
  articleTitle: {
    fontSize: '15px',
    fontWeight: '700',
    color: '#1e293b',
    margin: '0 0 8px 0',
    lineHeight: '1.4',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
  },
  articleExcerpt: {
    fontSize: '13px',
    color: '#64748b',
    margin: '0 0 12px 0',
    lineHeight: '1.5',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    flex: 1,
  },
  articleMeta: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '11px',
    color: '#94a3b8',
    flexWrap: 'wrap',
    marginTop: 'auto',
    paddingTop: '10px',
    borderTop: '1px solid #f1f5f9',
  },
  articleMetaItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '3px',
  },
  articleMetaSeparator: {
    color: '#cbd5e1',
  },
  otherReasonsSection: {
    maxWidth: '900px',
    margin: '0 auto',
    padding: '50px 20px',
  },
  otherReasonsTitleUnderline: {
    width: '48px',
    height: '4px',
    backgroundColor: '#f97316',
    marginBottom: '30px',
  },
  reasonItem: {
    borderTop: '1px solid #e2e8f0',
    padding: '22px 0',
  },
  reasonItemLast: {
    borderTop: '1px solid #e2e8f0',
    borderBottom: '1px solid #e2e8f0',
    padding: '22px 0',
  },
  reasonHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    cursor: 'pointer',
    background: 'none',
    border: 'none',
    width: '100%',
    padding: 0,
    textAlign: 'left',
  },
  reasonTitle: {
    fontSize: '17px',
    fontWeight: '700',
    color: '#1e293b',
    margin: 0,
  },
  reasonToggle: {
    fontSize: '20px',
    fontWeight: '400',
    color: '#1e293b',
    lineHeight: 1,
    flexShrink: 0,
    marginLeft: '16px',
  },
  reasonBody: {
    marginTop: '14px',
  },
  reasonText: {
    fontSize: '15px',
    lineHeight: '1.7',
    color: '#475569',
    margin: '0 0 10px 0',
    textAlign: 'left',
  },
};

// --- Responsive CSS (media queries can't live in inline style objects) ---
function ResponsiveStyles() {
  return (
    <style>{`
      .tsy-hero-title {
        font-size: 42px;
        font-weight: 800;
        color: #1e293b;
        margin-bottom: 16px;
        line-height: 1.2;
        text-align: left;
      }
      .tsy-hero-image-frame {
        width: 280px;
        height: 320px;
        border-top-left-radius: 140px;
        border-top-right-radius: 140px;
        overflow: hidden;
        position: relative;
        z-index: 2;
        box-shadow: 0 10px 25px rgba(0,0,0,0.1);
      }
      .tsy-main-heading {
        font-size: 32px;
        font-weight: 800;
        color: #1e293b;
        margin-top: 10px;
        margin-bottom: 0;
        letter-spacing: -0.5px;
        text-align: left;
      }
      .tsy-sub-heading {
        font-size: 22px;
        font-weight: 700;
        color: #1e293b;
        margin-top: 10px;
        margin-bottom: 0;
        text-align: left;
      }
      .tsy-faq-title, .tsy-other-reasons-title {
        font-size: 28px;
        font-weight: 800;
        color: #1e293b;
        margin-bottom: 10px;
        text-align: left;
      }
      .tsy-related-title {
        font-size: 32px;
        font-weight: 800;
        color: #1e293b;
        margin: 0;
      }
      .tsy-articles-grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 20px;
      }

      /* Tablet / small laptop */
      @media (max-width: 1024px) {
        .tsy-articles-grid {
          grid-template-columns: repeat(2, 1fr);
        }
        .tsy-hero-title { font-size: 36px; }
        .tsy-hero-image-frame {
          width: 240px;
          height: 270px;
          border-top-left-radius: 120px;
          border-top-right-radius: 120px;
        }
        .tsy-content-row {
          gap: 20px !important;
        }
        .tsy-hero-content {
          padding: 32px 20px 16px 20px !important;
        }
        .tsy-main-section {
          padding: 32px 20px 50px 20px !important;
        }
      }

      /* Mobile */
      @media (max-width: 768px) {
        .tsy-hero-title { font-size: 28px; }
        .tsy-hero-image-frame {
          width: 200px;
          height: 230px;
          border-top-left-radius: 100px;
          border-top-right-radius: 100px;
        }
        .tsy-main-heading { font-size: 24px; }
        .tsy-sub-heading { font-size: 19px; }
        .tsy-faq-title, .tsy-other-reasons-title, .tsy-related-title {
          font-size: 22px;
        }
        .tsy-articles-grid {
          grid-template-columns: 1fr;
        }
        .tsy-hero-content {
          padding: 24px 16px 12px 16px !important;
        }
        .tsy-hero-subtitle {
          font-size: 15px !important;
        }
        .tsy-main-section {
          padding: 24px 16px 40px 16px !important;
        }
        .tsy-intro-text {
          font-size: 14.5px !important;
        }
        .tsy-sub-nav {
          gap: 20px !important;
          justify-content: flex-start !important;
        }
        .tsy-section {
          padding: 28px 16px !important;
        }
        .tsy-faq-section, .tsy-other-reasons-section {
          padding: 32px 16px !important;
        }
        .tsy-signup-card, .tsy-video-card {
          flex-basis: 100% !important;
        }
        .tsy-signup-card {
          padding: 24px !important;
        }
        .tsy-video-overlay {
          padding: 24px 18px !important;
        }
        .tsy-video-title {
          font-size: 18px !important;
        }
        .tsy-article-image {
          height: 160px !important;
        }
        .tsy-related-articles-header {
          flex-direction: column;
          align-items: flex-start !important;
          gap: 4px;
        }
      }

      /* Small phones */
      @media (max-width: 480px) {
        .tsy-hero-title { font-size: 24px; }
        .tsy-hero-image-wrap { display: none; }
      }
    `}</style>
  );
}

function SubNav() {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const navbarHeight = 80;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - navbarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <div style={styles.subNav} className="tsy-sub-nav">
      <button
        type="button"
        style={styles.subNavActive}
        onClick={() => scrollToSection('main-benefits-section')}
      >
        Discover why travellers choose TSY
        <span style={styles.subNavActiveUnderline} />
      </button>

      <button
        type="button"
        style={styles.subNavInactive}
        onClick={() => scrollToSection('related-guides-section')}
      >
        Related guides
      </button>

      <button
        type="button"
        style={styles.subNavInactive}
        onClick={() => scrollToSection('faq-section')}
      >
        Frequently asked questions
      </button>
    </div>
  );
}

function VideoCard({ isPlaying, onPlay }) {
  if (isPlaying) {
    return (
      <div style={styles.videoCard} className="tsy-video-card">
        <iframe
          width="100%"
          height="100%"
          src={YOUTUBE_EMBED_URL}
          title="Why travel with TSY?"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          style={styles.videoIframe}
        />
      </div>
    );
  }

  return (
    <div style={styles.videoCard} className="tsy-video-card">
      <div style={styles.videoImageWrap}>
        <img src={VIDEO_THUMBNAIL_IMAGE} alt="Students walking on campus" style={styles.videoImage} />
      </div>

      <div style={styles.videoOverlay} className="tsy-video-overlay">
        <div>
          <div style={styles.videoBrand}>&gt;TSY</div>
          <div style={styles.videoBadge}>Video #01</div>
        </div>

        <button
          type="button"
          onClick={onPlay}
          style={styles.playButton}
          aria-label="Play video:Why travel with TSY?"
        >
          <span style={styles.playIcon} />
        </button>

        <div>
          <h3 style={styles.videoTitle} className="tsy-video-title">Why travel with TSY</h3>
          <span style={styles.videoCaption}>Study abroad student journey</span>
        </div>
      </div>
    </div>
  );
}

// --- Reusable FAQ Component ---
function FAQAccordion({ data = FAQ_DATA }) {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleItem = (index) => {
    setOpenIndex((prev) => (prev === index ? -1 : index));
  };

  return (
    <div id="faq-section" style={styles.faqSection} className="tsy-faq-section">
      <h2 className="tsy-faq-title">{data.title}</h2>
      <div style={styles.faqTitleUnderline} />

      {data.items.map((item, index) => {
        const isOpen = openIndex === index;
        const isLast = index === data.items.length - 1;

        return (
          <div
            key={item.question || index}
            style={isLast ? styles.accordionItemLast : styles.accordionItem}
          >
            <button
              type="button"
              style={styles.accordionHeader}
              onClick={() => toggleItem(index)}
              aria-expanded={isOpen}
            >
              <h3 style={styles.accordionTitle}>{item.question}</h3>
              <span style={styles.accordionToggle}>{isOpen ? '−' : '+'}</span>
            </button>

            {isOpen && (
              <div style={styles.accordionBody}>
                {Array.isArray(item.answer) ? (
                  item.answer.map((text, i) => (
                    <p key={i} style={styles.accordionText}>{text}</p>
                  ))
                ) : (
                  <p style={styles.accordionText}>{item.answer}</p>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// --- Other Reasons Accordion Component ---
function OtherReasonsAccordion({ data = OTHER_REASONS_DATA }) {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleItem = (index) => {
    setOpenIndex((prev) => (prev === index ? -1 : index));
  };

  return (
    <div style={styles.otherReasonsSection} className="tsy-other-reasons-section">
      <h2 className="tsy-other-reasons-title">{data.title}</h2>
      <div style={styles.otherReasonsTitleUnderline} />

      {data.items.map((item, index) => {
        const isOpen = openIndex === index;
        const isLast = index === data.items.length - 1;

        return (
          <div
            key={item.id || index}
            style={isLast ? styles.reasonItemLast : styles.reasonItem}
          >
            <button
              type="button"
              style={styles.reasonHeader}
              onClick={() => toggleItem(index)}
              aria-expanded={isOpen}
            >
              <h3 style={styles.reasonTitle}>{item.title}</h3>
              <span style={styles.reasonToggle}>{isOpen ? '−' : '+'}</span>
            </button>

            {isOpen && (
              <div style={styles.reasonBody}>
                {Array.isArray(item.content) ? (
                  item.content.map((text, i) => (
                    <p key={i} style={styles.reasonText}>{text}</p>
                  ))
                ) : (
                  <p style={styles.reasonText}>{item.content}</p>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function SignupCard() {
  const navigate = useNavigate();

  const handleConsultationClick = () => {
    navigate("/enquiry");
  };

  return (
    <div style={styles.signupCard} className="tsy-signup-card">
      <div>
        <h3 style={styles.signupTitle}>Free guidance, smarter bookings</h3>
        <p style={styles.signupText}>
          Talk to a TSY consultant about destinations, visa tiers, and package options — at no cost.
        </p>
      </div>

      <button
        type="button"
        style={styles.signupButton}
        onClick={handleConsultationClick}
      >
        Book a free consultation
      </button>
    </div>
  );
}

// --- Reusable Benefits Section Component ---
function BenefitsSection({ data }) {
  return (
    <div id="main-benefits-section" style={styles.discoverSection}>
      <h2 className="tsy-main-heading">{data.title}</h2>
      {data.items && data.items.map((item) => (
        <div key={item.id}>
          <h3 className="tsy-sub-heading">{item.title}</h3>
          {item.content && Array.isArray(item.content) && (
            item.content.map((paragraph, i) => (
              <p key={i} style={styles.paragraph}>{paragraph}</p>
            ))
          )}
        </div>
      ))}
    </div>
  );
}

// --- Related Guides Component ---
function RelatedGuidesSection({ data }) {
  return (
    <div id="related-guides-section" style={styles.discoverSection}>
      <div style={styles.relatedArticlesHeader} className="tsy-related-articles-header">
        <h2 className="tsy-related-title">{data.title}</h2>
        <a
          href={data.viewAllLink}
          style={styles.viewAllLink}
          onMouseOver={(e) => e.target.style.color = '#1d4ed8'}
          onMouseOut={(e) => e.target.style.color = '#2563eb'}
        >
          View all &gt;
        </a>
      </div>
      {data.subtitle && (
        <p style={styles.relatedSubtitle}>{data.subtitle}</p>
      )}

      <div className="tsy-articles-grid">
        {data.articles.map((article) => (
          <div
            key={article.id}
            style={styles.articleCard}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.1)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.06)';
            }}
            onClick={() => {
              console.log(`Navigating to guide: ${article.title}`);
            }}
          >
            <img
              src={article.image}
              alt={article.title}
              style={styles.articleImage}
              className="tsy-article-image"
              onError={(e) => {
                e.target.src = 'https://images.unsplash.com/photo-1523050854058-8df90110c7f1?auto=format&fit=crop&w=400&h=250&q=80';
              }}
            />
            <div style={styles.articleContent}>
              <h3 style={styles.articleTitle}>{article.title}</h3>
              <p style={styles.articleExcerpt}>{article.excerpt}</p>
              <div style={styles.articleMeta}>
                <span style={styles.articleMetaItem}>
                  ⏱ {article.readTime}
                </span>
                <span style={styles.articleMetaSeparator}>•</span>
                <span style={styles.articleMetaItem}>
                  {article.published}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function WhyTravelWithTSY() {
  const [isPlaying, setIsPlaying] = useState(false);
  const handlePlay = useCallback(() => setIsPlaying(true), []);

  return (
    <div style={styles.page}>
      <ResponsiveStyles />
      <Navbar />

      {/* --- Top Hero Section --- */}
      <div style={{ width: '100%' }}>
        <div style={styles.heroContent} className="tsy-hero-content">
          <div style={styles.heroText}>
            <div style={styles.breadcrumb}>
              TSY Pakistan / <span style={styles.breadcrumbCurrent}>Why travel with TSY</span>
            </div>
            <h1 className="tsy-hero-title">Why travel with TSY</h1>
            <p style={styles.heroSubtitle} className="tsy-hero-subtitle">40 years of getting Pakistani travellers where they're going — with less stress along the way</p>
          </div>

          <div style={styles.heroImageWrap} className="tsy-hero-image-wrap">
            <div className="tsy-hero-image-frame">
              <img src={HERO_IMAGE} alt="Students studying together" style={styles.heroImage} />
            </div>
            <div style={styles.heroImageAccent} />
          </div>
        </div>
      </div>

      {/* --- Main Content Section --- */}
      <div style={styles.mainSection} className="tsy-main-section">
        <SubNav />

        <div style={styles.intro}>
          <p style={styles.introText} className="tsy-intro-text">{INTRO_TEXT}</p>
        </div>

        <div style={styles.contentRow} className="tsy-content-row">
          <SignupCard />
        </div>
      </div>

      <GuidanceBanner />

      {/* --- Main Benefits Section --- */}
      <section style={styles.section} className="tsy-section">
        <div style={styles.container}>
          <BenefitsSection data={MAIN_BENEFITS_DATA} />
        </div>
      </section>

      {/* --- Other Reasons Section --- */}
      <OtherReasonsAccordion data={OTHER_REASONS_DATA} />

      {/* --- Related Guides Section --- */}
      <section style={styles.section} className="tsy-section">
        <div style={styles.container}>
          <RelatedGuidesSection data={RELATED_GUIDES_DATA} />
        </div>
      </section>

      {/* --- FAQ Section --- */}
      <FAQAccordion data={FAQ_DATA} />

      <TSYEnquiryForm />
      <Footer />
    </div>
  );
}