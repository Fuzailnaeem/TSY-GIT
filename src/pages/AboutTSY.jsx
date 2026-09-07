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

      {/* --- Hero Section --- */}
      <section
        style={{
          background: "#f8f8f8",
          minHeight: "420px",
          overflow: "hidden",
          borderBottom: "1px solid #e0e0e0",
        }}
      >
        <div
          style={{
            maxWidth: "1400px",
            margin: "0 auto",
            padding: "30px 40px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "80px",
          }}
        >
          {/* Left Content */}
          <div style={{ flex: 1 }}>
            {/* Breadcrumb */}
            <div
              style={{
                fontSize: "16px",
                color: "#777",
                marginBottom: "100px",
                fontWeight: "500",
              }}
            >
              Home / About TSY Travel & Tours
            </div>

            <h1
              style={{
                fontSize: "64px",
                fontWeight: "700",
                color: "#1a1a1a",
                marginBottom: "20px",
                lineHeight: "1.1",
              }}
            >
              About TSY Travel & Tours
            </h1>

            <p
              style={{
                fontSize: "22px",
                fontWeight: "400",
                color: "#333",
                maxWidth: "650px",
                lineHeight: "1.4",
              }}
            >
              Discover a trusted travel partner built around experience,
              professional service, and a commitment to making every journey
              easier.
            </p>
          </div>

          {/* Right Image */}
          <div
            style={{
              position: "relative",
              width: "520px",
              height: "380px",
              flexShrink: 0,
            }}
          >
            <img
              src={Screenshot}
              alt="TSY Travel & Tours"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
                objectPosition: "center",
                borderTopLeftRadius: "220px",
                borderTopRightRadius: "220px",
                position: "relative",
                zIndex: 2,
                display: "block",
              }}
            />
            <div
              style={{
                position: "absolute",
                right: "-120px",
                bottom: "-60px",
                width: "220px",
                height: "220px",
                background: "#e67e00",
                borderTopLeftRadius: "80px",
                zIndex: 1,
              }}
            />
          </div>
        </div>
      </section>

      {/* --- Main Content --- */}
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "60px 40px" }}>
        
        {/* Who We Are */}
        <section style={{ marginBottom: "60px" }}>
          <h2
            style={{
              fontSize: "36px",
              fontWeight: "700",
              color: "#1a1a1a",
              marginBottom: "20px",
              borderBottom: "4px solid #e67e00",
              paddingBottom: "10px",
              display: "inline-block",
            }}
          >
            Who We Are
          </h2>
          <p style={{ fontSize: "18px", lineHeight: "1.8", color: "#444", marginTop: "20px" }}>
            <strong>TSY Travel & Tours</strong> is an established travel company based in Lahore,
            Pakistan, providing professional travel and tourism solutions for individuals,
            families, students, and corporate clients.
          </p>
          <p style={{ fontSize: "18px", lineHeight: "1.8", color: "#444", marginTop: "15px" }}>
            With a focus on reliable service and customer convenience, TSY Travel & Tours helps
            clients with their travel requirements, from ticketing and travel arrangements to
            personalized assistance throughout their journey.
          </p>
          <p
            style={{
              fontSize: "20px",
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
        <section style={{ marginBottom: "60px", background: "#f5f5f5", padding: "40px", borderRadius: "12px" }}>
          <h2
            style={{
              fontSize: "36px",
              fontWeight: "700",
              color: "#1a1a1a",
              marginBottom: "20px",
            }}
          >
            Our Leadership
          </h2>
          <p style={{ fontSize: "18px", lineHeight: "1.8", color: "#444" }}>
            TSY Travel & Tours is led by <strong>Mr. Syed Yousaf Jamil Hussain Rizvi</strong>, an
            experienced professional in Pakistan's travel industry.
          </p>
          <p style={{ fontSize: "18px", lineHeight: "1.8", color: "#444", marginTop: "15px" }}>
            Mr. Syed Yousaf Jamil Hussain Rizvi has also served as{" "}
            <strong>Vice Chairman (North Zone) of the Travel Agents Association of Pakistan (TAAP)</strong>,
            reflecting his involvement and standing within the country's travel-agent community.
          </p>
        </section>

        {/* What We Do */}
        <section style={{ marginBottom: "60px" }}>
          <h2
            style={{
              fontSize: "36px",
              fontWeight: "700",
              color: "#1a1a1a",
              marginBottom: "20px",
              borderBottom: "4px solid #e67e00",
              paddingBottom: "10px",
              display: "inline-block",
            }}
          >
            What We Do
          </h2>
          <p style={{ fontSize: "18px", lineHeight: "1.8", color: "#444", marginTop: "20px" }}>
            At TSY Travel & Tours, we focus on providing practical and reliable travel solutions
            tailored to our customers' needs.
          </p>
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              marginTop: "20px",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "15px",
            }}
          >
            {[
              "Domestic and international air ticketing",
              "Travel planning and assistance",
              "Tourism and travel arrangements",
              "Corporate travel support",
              "Personalized travel consultation",
              "Assistance with travel-related requirements",
            ].map((item, index) => (
              <li
                key={index}
                style={{
                  background: "#f9f9f9",
                  padding: "15px 20px",
                  borderRadius: "8px",
                  borderLeft: "4px solid #e67e00",
                  fontSize: "16px",
                  fontWeight: "500",
                  color: "#333",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
                }}
              >
                {item}
              </li>
            ))}
          </ul>
          <p style={{ fontSize: "18px", lineHeight: "1.8", color: "#444", marginTop: "25px" }}>
            We work to provide customers with a smooth experience from the initial enquiry to the
            completion of their travel arrangements.
          </p>
        </section>

        {/* Why Choose Us */}
        <section style={{ marginBottom: "60px", background: "#fff8f0", padding: "40px", borderRadius: "12px" }}>
          <h2
            style={{
              fontSize: "36px",
              fontWeight: "700",
              color: "#1a1a1a",
              marginBottom: "30px",
              textAlign: "center",
            }}
          >
            Why Choose TSY Travel & Tours?
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: "30px",
            }}
          >
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
              <div
                key={index}
                style={{
                  background: "#ffffff",
                  padding: "25px",
                  borderRadius: "12px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
                  borderTop: "4px solid #e67e00",
                }}
              >
                <h3 style={{ fontSize: "22px", fontWeight: "700", color: "#1a1a1a", marginBottom: "10px" }}>
                  {item.title}
                </h3>
                <p style={{ fontSize: "16px", lineHeight: "1.6", color: "#555" }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Our Presence in Lahore */}
        <section style={{ marginBottom: "60px" }}>
          <h2
            style={{
              fontSize: "36px",
              fontWeight: "700",
              color: "#1a1a1a",
              marginBottom: "20px",
              borderBottom: "4px solid #e67e00",
              paddingBottom: "10px",
              display: "inline-block",
            }}
          >
            Our Presence in Lahore
          </h2>
          <p style={{ fontSize: "18px", lineHeight: "1.8", color: "#444", marginTop: "20px" }}>
            TSY Travel & Tours has its presence in <strong>Lahore, Pakistan</strong>, serving
            customers with professional travel assistance.
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "30px",
              marginTop: "25px",
            }}
          >
            <div
              style={{
                background: "#f5f5f5",
                padding: "25px",
                borderRadius: "12px",
                borderLeft: "4px solid #e67e00",
              }}
            >
              <h3 style={{ fontSize: "20px", fontWeight: "700", color: "#1a1a1a" }}>Gulberg Office</h3>
              <p style={{ fontSize: "16px", color: "#555", marginTop: "8px" }}>
                3-Gulberg Heights, 6/H Gulberg-II, Lahore, Pakistan
              </p>
            </div>
            <div
              style={{
                background: "#f5f5f5",
                padding: "25px",
                borderRadius: "12px",
                borderLeft: "4px solid #e67e00",
              }}
            >
              <h3 style={{ fontSize: "20px", fontWeight: "700", color: "#1a1a1a" }}>Davis Road Office</h3>
              <p style={{ fontSize: "16px", color: "#555", marginTop: "8px" }}>
                1st Floor, Grand Hotel & Towers, 9-A Davis Road, Lahore, Pakistan
              </p>
            </div>
          </div>
        </section>

        {/* Google Maps */}
        <section style={{ marginBottom: "60px" }}>
          <h2
            style={{
              fontSize: "36px",
              fontWeight: "700",
              color: "#1a1a1a",
              marginBottom: "20px",
              borderBottom: "4px solid #e67e00",
              paddingBottom: "10px",
              display: "inline-block",
            }}
          >
            Find Us
          </h2>
          <div
            style={{
              marginTop: "20px",
              borderRadius: "12px",
              overflow: "hidden",
              boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
            }}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3399.669779510642!2d74.33780449999999!3d31.560675999999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391904cae0e55555%3A0x78f5fdd8d0f5ce99!2sTSY%20Travel%20%26%20Tours!5e0!3m2!1sen!2s!4v1788268920440!5m2!1sen!2s"
              width="100%"
              height="400"
              style={{ border: 0 }}
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
  );
}