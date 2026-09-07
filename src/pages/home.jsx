import Navbar from '../components/homepage/navbar.jsx'
import Hero from '../components/homepage/hero/hero.jsx'

import TsySection from '../components/homepage/tsySection/Tsysection.jsx'
import StudyDestinations from '../components/homepage/StudyDestinations/TravelServices.jsx'
import RecommendationSection from '../components/homepage/RecommendedServices/RecommendedServices.jsx'
import TSYEnquiryForm from '../components/homepage/TSYEnquiryForm/TSYEnquiryForm.jsx'
import Footer from "../components/homepage/fottor/Footer.jsx"

export default function Home() {
  return (
    <div>
      <Navbar />

      <Hero />

      {/* <TrustSection /> */}

      <TSYEnquiryForm />

      <TsySection />

      <StudyDestinations />

      {/* <RecommendationSection /> */}

      {/* <StudentCommunity /> 
      <StudyAbroadSteps /> */}

      <Footer />
    </div>
  )
}