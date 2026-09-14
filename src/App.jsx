import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/home';
import AboutTSY from './pages/AboutTSY';
import EnquiryForm from './pages/enquiryform';
import Gallery from './pages/Gallery';
import Scrolltop from './pages/Scrolltop';   // ✅ already imported
import Services from './pages/Servics';
import WhyTravelWithTSY from './pages/Why-Travel-With-TSY';

function App() {
  return (
    <BrowserRouter>
      <Scrolltop />   {/* ✅ yahan add karein - Routes ke upar */}
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about-tsy" element={<AboutTSY />} />
          <Route path="/enquiry" element={<EnquiryForm />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/services" element={<Services />} />
          <Route path="/why-travel-with-tsy" element={<WhyTravelWithTSY />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;