import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/homepage/navbar';
import Footer from '../components/homepage/fottor/Footer';
import WhatsAppBanner from '../components/homepage/TSYEnquiryForm/TSYEnquiryForm';
import Screenshot from "../assets/Screenshot_2026-09-01_071141-removebg-preview.png";

export default function AboutTSY() {
  return (
    <div>
      <Navbar />

      {/* --- Responsive styles --- */}
      <style>{`
        * { box-sizing: border-box; }

        .tsy-page {
          overflow-x: hidden;
        }

        .tsy-hero {
          background: #f8f8f8;
          min-height: 420px;
          overflow: hidden;
          border-bottom: 1px solid #e0e0e0;
        }
        .tsy-hero-inner {
          max-width: 1400px;
          margin: 0 auto;
          padding: 30px clamp(20px, 4vw, 40px);
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: clamp(24px, 6vw, 80px);
        }
        .tsy-hero-left {
          flex: 1;
          min-width: 0;
        }
        .tsy-breadcrumb {
          font-size: clamp(13px, 1.6vw, 16px);
          color: #777;
          margin-bottom: clamp(20px, 8vw, 100px);
          font-weight: 500;
        }
        .tsy-hero-title {
          font-size: clamp(28px, 6vw, 64px);
          font-weight: 700;
          color: #1a1a1a;
          margin-bottom: 20px;
          line-height: 1.1;
          word-wrap: break-word;
        }
        .tsy-hero-sub {
          font-size: clamp(15px, 2.2vw, 22px);
          font-weight: 400;
          color: #333;
          max-width: 650px;
          line-height: 1.4;
        }
        .tsy-hero-right {
          position: relative;
          width: clamp(200px, 40vw, 520px);
          height: clamp(200px, 34vw, 380px);
          flex-shrink: 0;
        }
        .tsy-hero-img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          object-position: center;
          border-top-left-radius: 220px;
          border-top-right-radius: 220px;
          position: relative;
          z-index: 2;
          display: block;
        }
        .tsy-hero-blob {
          position: absolute;
          right: -120px;
          bottom: -60px;
          width: 220px;
          height: 220px;
          background: #e67e00;
          border-top-left-radius: 80px;
          z-index: 1;
        }

        .tsy-main {
          max-width: 1200px;
          margin: 0 auto;
          padding: clamp(30px, 6vw, 60px) clamp(20px, 4vw, 40px);
        }

        .tsy-section {
          margin-bottom: clamp(32px, 6vw, 60px);
        }
        .tsy-heading {
          font-size: clamp(24px, 4vw, 36px);
          font-weight: 700;
          color: #1a1a1a;
          margin-bottom: 20px;
          border-bottom: 4px solid #e67e00;
          padding-bottom: 10px;
          display: inline-block;
        }
        .tsy-heading-center {
          font-size: clamp(24px, 4vw, 36px);
          font-weight: 700;
          color: #1a1a1a;
          margin-bottom: 30px;
          text-align: center;
        }
        .tsy-body {
          font-size: clamp(15px, 1.8vw, 18px);
          line-height: 1.8;
          color: #444;
        }

        .tsy-leadership {
          margin-bottom: clamp(32px, 6vw, 60px);
          background: #f5f5f5;
          padding: clamp(20px, 4vw, 40px);
          border-radius: 12px;
        }
        .tsy-leadership-heading {
          font-size: clamp(24px, 4vw, 36px);
          font-weight: 700;
          color: #1a1a1a;
          margin-bottom: 20px;
        }

        .tsy-services-list {
          list-style: none;
          padding: 0;
          margin-top: 20px;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(min(100%, 230px), 1fr));
          gap: 15px;
        }
        .tsy-services-item {
          background: #f9f9f9;
          padding: 15px 20px;
          border-radius: 8px;
          border-left: 4px solid #e67e00;
          font-size: clamp(14px, 1.6vw, 16px);
          font-weight: 500;
          color: #333;
          box-shadow: 0 2px 4px rgba(0,0,0,0.05);
        }

        .tsy-why {
          margin-bottom: clamp(32px, 6vw, 60px);
          background: #fff8f0;
          padding: clamp(20px, 4vw, 40px);
          border-radius: 12px;
        }
        .tsy-why-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(min(100%, 220px), 1fr));
          gap: clamp(16px, 3vw, 30px);
        }
        .tsy-why-card {
          background: #ffffff;
          padding: clamp(18px, 3vw, 25px);
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.06);
          border-top: 4px solid #e67e00;
        }
        .tsy-why-card-title {
          font-size: clamp(18px, 2.4vw, 22px);
          font-weight: 700;
          color: #1a1a1a;
          margin-bottom: 10px;
        }
        .tsy-why-card-desc {
          font-size: clamp(14px, 1.6vw, 16px);
          line-height: 1.6;
          color: #555;
        }

        .tsy-offices-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(min(100%, 260px), 1fr));
          gap: clamp(16px, 3vw, 30px);
          margin-top: 25px;
        }
        .tsy-office-card {
          background: #f5f5f5;
          padding: clamp(18px, 3vw, 25px);
          border-radius: 12px;
          border-left: 4px solid #e67e00;
        }
        .tsy-office-title {
          font-size: clamp(17px, 2.2vw, 20px);
          font-weight: 700;
          color: #1a1a1a;
        }
        .tsy-office-addr {
          font-size: clamp(14px, 1.6vw, 16px);
          color: #555;
          margin-top: 8px;
        }

        .tsy-map-wrap {
          margin-top: 20px;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(0,0,0,0.1);
        }
        .tsy-map-frame {
          width: 100%;
          height: 400px;
          border: 0;
          display: block;
        }

        /* --- Large tablet / small desktop (<=1024px) --- */
        @media (max-width: 1024px) {
          .tsy-hero-right {
            width: clamp(220px, 34vw, 340px);
            height: clamp(220px, 28vw, 260px);
          }
          .tsy-why-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .tsy-offices-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        /* --- Tablet (<=900px) --- */
        @media (max-width: 900px) {
          .tsy-hero-inner {
            gap: 30px;
          }
          .tsy-breadcrumb {
            margin-bottom: 32px;
          }
        }

        /* --- Mobile / small tablet (<=768px) --- */
        @media (max-width: 768px) {
          .tsy-hero {
            min-height: unset;
          }
          .tsy-hero-inner {
            flex-direction: column-reverse;
            align-items: center;
            text-align: center;
            padding: 24px 20px;
            gap: 20px;
          }
          .tsy-hero-left {
            width: 100%;
          }
          .tsy-hero-sub {
            max-width: 100%;
            margin: 0 auto;
          }
          .tsy-breadcrumb {
            margin-bottom: 12px;
          }
          .tsy-hero-right {
            width: min(70vw, 260px);
            height: min(60vw, 220px);
          }
          .tsy-hero-blob {
            width: 120px;
            height: 120px;
            right: -40px;
            bottom: -24px;
          }

          .tsy-leadership,
          .tsy-why {
            padding: 20px;
          }
          .tsy-services-list {
            grid-template-columns: 1fr;
          }
          .tsy-why-grid {
            grid-template-columns: 1fr;
          }
          .tsy-offices-grid {
            grid-template-columns: 1fr;
          }
          .tsy-map-frame {
            height: 260px;
          }
        }

        /* --- Small mobile (<=480px) --- */
        @media (max-width: 480px) {
          .tsy-main {
            padding: 24px 16px;
          }
          .tsy-hero-inner {
            padding: 20px 16px;
          }
          .tsy-hero-right {
            width: 100%;
            height: 200px;
            max-width: 260px;
          }
          .tsy-map-frame {
            height: 220px;
          }
          .tsy-heading,
          .tsy-heading-center,
          .tsy-leadership-heading {
            padding-bottom: 8px;
          }
        }
      `}</style>

      <div className="tsy-page">
        {/* --- Hero Section --- */}
        <section className="tsy-hero">
          <div className="tsy-hero-inner">
            {/* Left Content */}
            <div className="tsy-hero-left">
              {/* Breadcrumb */}
              <div className="tsy-breadcrumb">Home / About TSY Travel & Tours</div>

              <h1 className="tsy-hero-title">About TSY Travel & Tours</h1>

              <p className="tsy-hero-sub">
                Discover a trusted travel partner built around experience,
                professional service, and a commitment to making every journey
                easier.
              </p>
            </div>

            {/* Right Image */}
            <div className="tsy-hero-right">
              <img src={Screenshot} alt="TSY Travel & Tours" className="tsy-hero-img" />
              <div className="tsy-hero-blob" />
            </div>
          </div>
        </section>

        {/* --- Main Content --- */}
        <div className="tsy-main">

          {/* Who We Are */}
          <section className="tsy-section">
            <h2 className="tsy-heading">Who We Are</h2>
            <p className="tsy-body" style={{ marginTop: "20px" }}>
              <strong>TSY Travel & Tours</strong> is an established travel company based in Lahore,
              Pakistan, providing professional travel and tourism solutions for individuals,
              families, students, and corporate clients.
            </p>
            <p className="tsy-body" style={{ marginTop: "15px" }}>
              With a focus on reliable service and customer convenience, TSY Travel & Tours helps
              clients with their travel requirements, from ticketing and travel arrangements to
              personalized assistance throughout their journey.
            </p>
            <p
              style={{
                fontSize: "clamp(16px, 2vw, 20px)",
                fontWeight: "600",
                color: "#1a1a1a",
                marginTop: "20px",
                fontStyle: "italic",
              }}
            >
              Our aim is simple: <span style={{ color: "#e67e00" }}>to make travel easier, more accessible, and more dependable for every customer.</span>
            </p>
          </section>

          {/* Our Leadership */}
          <section className="tsy-leadership">
            <h2 className="tsy-leadership-heading">Our Leadership</h2>
            <p className="tsy-body">
              TSY Travel & Tours is led by <strong>Mr. Syed Yousaf Jamil Hussain Rizvi</strong>, an
              experienced professional in Pakistan's travel industry.
            </p>
            <p className="tsy-body" style={{ marginTop: "15px" }}>
              Mr. Syed Yousaf Jamil Hussain Rizvi has also served as{" "}
              <strong>Vice Chairman (North Zone) of the Travel Agents Association of Pakistan (TAAP)</strong>,
              reflecting his involvement and standing within the country's travel-agent community.
            </p>
          </section>

          {/* What We Do */}
          <section className="tsy-section">
            <h2 className="tsy-heading">What We Do</h2>
            <p className="tsy-body" style={{ marginTop: "20px" }}>
              At TSY Travel & Tours, we focus on providing practical and reliable travel solutions
              tailored to our customers' needs.
            </p>
            <ul className="tsy-services-list">
              {[
                "Domestic and international air ticketing",
                "Travel planning and assistance",
                "Tourism and travel arrangements",
                "Corporate travel support",
                "Personalized travel consultation",
                "Assistance with travel-related requirements",
              ].map((item, index) => (
                <li key={index} className="tsy-services-item">
                  {item}
                </li>
              ))}
            </ul>
            <p className="tsy-body" style={{ marginTop: "25px" }}>
              We work to provide customers with a smooth experience from the initial enquiry to the
              completion of their travel arrangements.
            </p>
          </section>

          {/* Why Choose Us */}
          <section className="tsy-why">
            <h2 className="tsy-heading-center">Why Choose TSY Travel & Tours?</h2>
            <div className="tsy-why-grid">
              {[
                {
                  title: "Experience",
                  desc: "Our team brings professional experience and knowledge of the travel industry.",
                },
                {
                  title: "Personalized Service",
                  desc: "Every traveller has different requirements, so we focus on providing solutions according to individual needs.",
                },
                {
                  title: "Reliable Assistance",
                  desc: "We aim to make the travel process straightforward by providing guidance and support throughout the journey.",
                },
                {
                  title: "Customer First",
                  desc: "Our priority is to understand our customers' requirements and help them travel with confidence.",
                },
              ].map((item, index) => (
                <div key={index} className="tsy-why-card">
                  <h3 className="tsy-why-card-title">{item.title}</h3>
                  <p className="tsy-why-card-desc">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Our Presence in Lahore */}
          <section className="tsy-section">
            <h2 className="tsy-heading">Our Presence in Lahore</h2>
            <p className="tsy-body" style={{ marginTop: "20px" }}>
              TSY Travel & Tours has its presence in <strong>Lahore, Pakistan</strong>, serving
              customers with professional travel assistance.
            </p>
            <div className="tsy-offices-grid">
              <div className="tsy-office-card">
                <h3 className="tsy-office-title">Gulberg Office</h3>
                <p className="tsy-office-addr">3-Gulberg Heights, 6/H Gulberg-II, Lahore, Pakistan</p>
              </div>
              <div className="tsy-office-card">
                <h3 className="tsy-office-title">Davis Road Office</h3>
                <p className="tsy-office-addr">1st Floor, Grand Hotel & Towers, 9-A Davis Road, Lahore, Pakistan</p>
              </div>
            </div>
          </section>

          {/* Google Maps */}
          <section className="tsy-section">
            <h2 className="tsy-heading">Find Us</h2>
            <div className="tsy-map-wrap">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3399.669779510642!2d74.33780449999999!3d31.560675999999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391904cae0e55555%3A0x78f5fdd8d0f5ce99!2sTSY%20Travel%20%26%20Tours!5e0!3m2!1sen!2s!4v1788268920440!5m2!1sen!2s"
                className="tsy-map-frame"
                allowFullScreen
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                title="TSY Travel & Tours Location"
              />
            </div>
          </section>

        </div>

        <WhatsAppBanner />
        <Footer />
      </div>
    </div>
  );
}