import "./RecommendedServices.css";

const recommendedServices = [
  {
    title: "Money transfer",
    description: "Safe, secure and fast payments to your institution and other key services.",
    icon: "https://images.ctfassets.net/8bbwomjfix8m/2L3c2YJ7a2inDGL5pNdVS8/36331d83bfed2985826bcecc64bc5861/money-transfer-v2.svg",
  },
  {
    title: "Health insurance",
    description: "Your choice, your health cover, your peace of mind abroad.",
    icon: "https://images.ctfassets.net/8bbwomjfix8m/3C9OayOyQ38icxMZcUDVEx/8db499d43e218de2388cba358ac696ac/health-cover-v2.svg",
  },
  {
    title: "Banking",
    description: "Open a bank account before you arrive.",
    icon: "https://images.ctfassets.net/8bbwomjfix8m/4NM2UkEWuiS46K1wHWH0FW/7d892d0ed8a1fe2779c233cf84163249/student-banking-v2.svg",
  },
  {
    title: "Accommodation",
    description: "Student apartment or homestay, the choice is yours.",
    icon: "https://images.ctfassets.net/8bbwomjfix8m/68OwblR563kSVjhAxP9OHW/7fbcfd5a0d6419f522451933085cade6/accommodation-v2.svg",
  },
  {
    title: "SIM Cards",
    description: "No SIM? No problem - We've got it covered.",
    icon: "https://images.ctfassets.net/8bbwomjfix8m/4tkDJ7mXPn7WygHZZqhH2k/98ed39e6d02f0d71731f7ef8568acec6/sim-card-v2.svg",
  },
  {
    title: "Guardianship",
    description: "If you're under 18, we'll find you a guardian.",
    icon: "https://images.ctfassets.net/8bbwomjfix8m/2IsOIY8sq7OxNrv4Y4flaN/f6b6f081e3abb32590aa23b4514f552e/guardianship-v2.svg",
  },
];
const helpServices = [
  {
    title: "Visa Eligibility Assessment",
    description:
      "Get a professional evaluation of your profile and discover the best visa options based on your goals and qualifications.",
    icon: "https://images.ctfassets.net/8bbwomjfix8m/4uqRdWJIt7qOuDQNYTfjTY/ad81dfdfec978e65a87fe8d2902e3b2c/get-instant-icon.jpg",
  },
  {
    title: "Document Preparation",
    description:
      "Receive expert guidance in preparing and organizing all required visa documents to ensure a smooth application process.",
    icon: "https://images.ctfassets.net/8bbwomjfix8m/1wtwf5yWfKi4GjuHbk9Pxl/a055e2bc91d033e9116ee954049f52ca/Scholarship_icon.png",
  },
  {
    title: "Visa Cost Estimator",
    description:
      "Plan your finances with confidence using our visa cost estimation and budgeting assistance services.",
    icon: "https://images.ctfassets.net/8bbwomjfix8m/1ponmIZiQiJaIoOAtpkgaI/884b67f75a01a0e17a16f8768229f919/Cost-calculator-icon.png",
  },
  {
    title: "Application Tracking",
    description:
      "Stay updated throughout the process with real-time application status tracking and personalized support.",
    icon: "https://images.ctfassets.net/8bbwomjfix8m/5OyrUKb92yN3xBi5oTE4yR/e0eef891da08c0cff5f5e6ed34aa31a8/app-icon.jpg",
  },
  {
    title: "Travel & Settlement Support",
    description:
      "From travel arrangements to accommodation guidance, we help you prepare for a successful move abroad.",
    icon: "https://images.ctfassets.net/8bbwomjfix8m/3cXnK4avcMHVXfeSvDyey/78a2c262966a181f88f1f6f95d4e3461/SES_Icon.png",
  },
  {
    title: "Expert Visa Consultants",
    description:
      "Our experienced visa advisors provide personalized guidance, helping maximize your chances of visa approval.",
    icon: "https://images.ctfassets.net/8bbwomjfix8m/6Q2jkX9an5OaEGktvlb4S2/8246e13526ace2b248290a3a7f82649c/Accept_icon.png",
  },
];
export default function RecommendedServices() {
  return (
    <div className="services-wrapper">
      {/* Section 1: Recommended Services */}
      <section className="recommended-services">
        <div className="services-container">
          <h2 className="services-title">
            Explore recommended services for your journey abroad
          </h2>
          <div className="services-title-line"></div>

          <div className="services-grid">
            {recommendedServices.map((service, index) => (
              <div key={index} className="service-card">
                <div className="service-content">
                  <div className="service-icon-wrapper">
                    <img src={service.icon} alt={service.title} className="service-icon-img" />
                  </div>
                  <h3 className="service-name">{service.title}</h3>
                  <p className="service-description">{service.description}</p>
                </div>
                <a href="#learn-more" className="learn-more-link">
                  Learn More <span className="arrow">&gt;</span>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 2: How TSY can help you */}
      <section className="recommended-services">
        <div className="services-container">
          <h2 className="services-title">
            How TSY can help you
          </h2>
          <div className="services-title-line"></div>

          <div className="services-grid">
            {helpServices.map((service, index) => (
              <div key={index} className="service-card">
                <div className="service-content">
                  <div className="service-icon-wrapper">
                    <img src={service.icon} alt={service.title} className="service-icon-img" />
                  </div>
                  <h3 className="service-name">{service.title}</h3>
                  <p className="service-description">{service.description}</p>
                </div>
                <a href="#learn-more" className="learn-more-link">
                  Learn More <span className="arrow">&gt;</span>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}