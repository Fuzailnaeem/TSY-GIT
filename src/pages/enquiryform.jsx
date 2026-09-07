// src/pages/EnquiryForm.jsx
import React, { useState, useRef, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/homepage/navbar';
import Footer from '../components/homepage/fottor/Footer';
import WhatsAppBanner from '../components/homepage/TSYEnquiryForm/TSYEnquiryForm';
import Award from '../assets/AWARD-removebg.png';

/* ---------------------------------------------------------
   Visa Application — Redesigned with Modern UI
   New design: Gradient headers, card-based layout,
   animated transitions, subtle shadows, rounded corners
--------------------------------------------------------- */

const API_URL = "http://localhost:5000/send-application";

const INDIVIDUAL_STEPS = [
  { key: "personal", label: "Personal Info", icon: "👤" },
  { key: "visa", label: "Visa Details", icon: "🛂" },
  { key: "additional", label: "Additional Info", icon: "📋" },
  { key: "flight", label: "Flight Preferences", icon: "✈️" },
];

const CORPORATE_STEPS = [
  { key: "company", label: "Company Info", icon: "🏢" },
  { key: "visa", label: "Visa Details", icon: "🛂" },
  { key: "additional", label: "Additional Info", icon: "📋" },
  { key: "flight", label: "Flight Preferences", icon: "✈️" },
];

const VISA_TYPES = [
  "Umrah Visa",
  "Work Visa",
  "Visitor / Tourist Visa",
  "Permanent Residency",
  "Dependent Visa",
];

const CORPORATE_VISA_TYPES = [
  "Business Visa",
  "Work Visa",
  "Corporate Visitor Visa",
  "Intra-Company Transfer",
  "Group / Delegation Visa",
];

const QUALIFICATIONS = [
  "Matric / O-Levels",
  "Intermediate / A-Levels",
  "Bachelor's Degree",
  "Master's Degree",
  "PhD",
];

const TRAVEL_PURPOSES = [
  "Client meetings",
  "Conference / Exhibition",
  "Staff deployment",
  "Training",
  "Site visit / Project work",
];

const TRIP_TYPES = ["Round Trip", "One Way", "Multi-City"];
const CABIN_CLASSES = ["Economy", "Premium Economy", "Business", "First"];
const LAYOVER_OPTIONS = ["Any", "Non-stop", "1 Stop", "2+ Stops"];
const TRAVELER_COUNTS = ["1", "2", "3", "4", "5", "6+"];

// ===== FORM COMPONENTS =====

function Field({ label, children, className = "", required = false }) {
  return (
    <div className={`rf-field ${className}`}>
      <label className="rf-label">
        {label}
        {required && <span className="rf-required">*</span>}
      </label>
      {children}
    </div>
  );
}

function TextInput({ value, onChange, placeholder, type = "text", inputRef, onEnter, min }) {
  return (
    <input
      ref={inputRef}
      className="rf-input"
      type={type}
      min={min}
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          onEnter && onEnter();
        }
      }}
    />
  );
}

function Select({ value, onChange, placeholder, options }) {
  return (
    <div className="rf-select-wrap">
      <select className="rf-select" value={value} onChange={(e) => onChange(e.target.value)}>
        <option value="" disabled>{placeholder}</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
      <svg className="rf-chevron" width="12" height="8" viewBox="0 0 12 8">
        <path d="M1 1l5 5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

function YesNo({ value, onChange }) {
  return (
    <div className="rf-toggle-group">
      {["Yes", "No"].map((opt) => (
        <button
          type="button"
          key={opt}
          className={`rf-toggle-btn ${value === opt ? "rf-toggle-btn--active" : ""}`}
          onClick={() => onChange(opt)}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}

function PillToggle({ value, onChange, options }) {
  return (
    <div className="rf-pill-group">
      {options.map((opt) => (
        <button
          type="button"
          key={opt}
          className={`rf-pill-btn ${value === opt ? "rf-pill-btn--active" : ""}`}
          onClick={() => onChange(opt)}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}

// ===== INITIAL STATE =====

const emptyIndividual = {
  fullName: "", email: "", phone: "", dateOfBirth: "", nationality: "",
  visaType: "", destinationCountry: "", travelDate: "", qualification: "",
  passportAvailable: "Yes", previousRefusal: "No", currentCity: "", budgetRange: "", notes: "",
  tripType: "Round Trip", cabinClass: "Economy", travelerCount: "1", stops: "Any",
  fromWhere: "", toWhere: "", departureDate: "", returningDate: "", flightContact: "",
};

const emptyCorporate = {
  companyName: "", contactPerson: "", businessEmail: "", phone: "",
  visaType: "", destinationCountry: "", travelers: "", travelDate: "",
  purpose: "", budgetRange: "", notes: "",
  tripType: "Round Trip", cabinClass: "Economy", travelerCount: "1", stops: "Any",
  fromWhere: "", toWhere: "", departureDate: "", returningDate: "", flightContact: "",
};

// ===== MAIN FORM COMPONENT =====

function VisaApplicationForm({ formRef }) {
  const [appType, setAppType] = useState("individual");
  const [stepIndex, setStepIndex] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const firstFieldRef = useRef(null);
  const textareaRef = useRef(null);

  const [individualData, setIndividualData] = useState(emptyIndividual);
  const [corporateData, setCorporateData] = useState(emptyCorporate);

  const isCorporate = appType === "corporate";
  const STEPS = isCorporate ? CORPORATE_STEPS : INDIVIDUAL_STEPS;
  const data = isCorporate ? corporateData : individualData;
  const setDataFn = isCorporate ? setCorporateData : setIndividualData;

  const set = (key) => (val) => setDataFn((d) => ({ ...d, [key]: val }));

  const switchAppType = (type) => {
    if (type === appType) return;
    setAppType(type);
    setStepIndex(0);
    setSubmitted(false);
    setErrorMsg("");
  };

  const swapFromTo = () => {
    setDataFn((d) => ({ ...d, fromWhere: d.toWhere, toWhere: d.fromWhere }));
  };

  const handleTextareaChange = (e) => {
    const val = e.target.value;
    set("notes")(val);
    const node = textareaRef.current;
    if (node) {
      node.style.height = "auto";
      node.style.height = `${node.scrollHeight}px`;
    }
  };

  useEffect(() => {
    const node = textareaRef.current;
    if (node) {
      node.style.height = "auto";
      node.style.height = `${node.scrollHeight}px`;
    }
  }, [data.notes, stepIndex]);

  const isStepValid = useCallback((idx) => {
    if (!isCorporate) {
      if (idx === 0) return data.fullName.trim() && data.email.trim() && data.phone.trim() && data.dateOfBirth.trim();
      if (idx === 1) return data.visaType && data.destinationCountry.trim() && data.travelDate;
      if (idx === 2) return true;
      if (idx === 3) return data.fromWhere.trim() && data.toWhere.trim() && data.departureDate.trim();
      return true;
    } else {
      if (idx === 0) return data.companyName.trim() && data.contactPerson.trim() && data.businessEmail.trim() && data.phone.trim();
      if (idx === 1) return data.visaType && data.destinationCountry.trim() && data.travelers && data.travelDate;
      if (idx === 2) return true;
      if (idx === 3) return data.fromWhere.trim() && data.toWhere.trim() && data.departureDate.trim();
      return true;
    }
  }, [data, isCorporate]);

  const goToStep = (idx) => {
    if (submitted) return;
    if (idx === stepIndex) return;
    if (idx < stepIndex) { setStepIndex(idx); return; }
    for (let i = stepIndex; i < idx; i++) {
      if (!isStepValid(i)) return;
    }
    setStepIndex(idx);
  };

  const goBack = () => {
    setErrorMsg("");
    setStepIndex((i) => Math.max(i - 1, 0));
  };

  const resetForm = () => {
    setIndividualData(emptyIndividual);
    setCorporateData(emptyCorporate);
    setStepIndex(0);
    setSubmitted(false);
    setErrorMsg("");
  };

  const goNext = async () => {
    if (!isStepValid(stepIndex)) return;

    if (stepIndex === STEPS.length - 1) {
      setErrorMsg("");
      setSubmitting(true);
      try {
        const response = await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            applicationType: isCorporate ? "Corporate" : "Individual",
            formData: data,
          }),
        });
        const result = await response.json();
        if (result.success) {
          setSubmitted(true);
        } else {
          setErrorMsg(result.message || "Application submission failed. Please try again.");
        }
      } catch (error) {
        console.error("Submit Error:", error);
        setErrorMsg("Connection error. Please check your network and try again.");
      } finally {
        setSubmitting(false);
      }
      return;
    }

    setErrorMsg("");
    setStepIndex((i) => Math.min(i + 1, STEPS.length - 1));
  };

  const contactName = isCorporate ? data.contactPerson : data.fullName;
  const contactEmail = isCorporate ? data.businessEmail : data.email;

  return (
    <div className="rf-container" ref={formRef}>
      <style>{redesignedCSS}</style>
      
      <div className="rf-card">
        {/* Header */}
        <div className="rf-header">
          <div className="rf-header-content">
            <div className="rf-header-icon">✈️</div>
            <div>
              <h2 className="rf-header-title">Visa Application</h2>
              <p className="rf-header-subtitle">Fill in your details to get started</p>
            </div>
          </div>
          
          {/* App Type Switch */}
          <div className="rf-type-switch">
            <button
              className={`rf-type-btn ${!isCorporate ? "rf-type-btn--active" : ""}`}
              onClick={() => switchAppType("individual")}
            >
              <span className="rf-type-icon">👤</span> Individual
            </button>
            <button
              className={`rf-type-btn ${isCorporate ? "rf-type-btn--active" : ""}`}
              onClick={() => switchAppType("corporate")}
            >
              <span className="rf-type-icon">🏢</span> Corporate
            </button>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="rf-steps">
          {STEPS.map((s, idx) => (
            <button
              key={s.key}
              className={`rf-step ${idx === stepIndex ? "rf-step--active" : ""} ${idx < stepIndex ? "rf-step--completed" : ""}`}
              onClick={() => goToStep(idx)}
            >
              <span className="rf-step-number">{idx < stepIndex ? "✓" : idx + 1}</span>
              <span className="rf-step-label">{s.label}</span>
            </button>
          ))}
        </div>

        {/* Body */}
        <div className="rf-body">
          {submitted ? (
            <div className="rf-success">
              <div className="rf-success-icon">🎉</div>
              <h2 className="rf-success-title">Application Submitted!</h2>
              <p className="rf-success-text">
                Thanks {contactName || "there"}! A consultant will reach out to you at{" "}
                <strong>{contactEmail || "your email"}</strong> shortly.
              </p>
              <button className="rf-btn rf-btn--primary" onClick={resetForm}>
                Start New Application
              </button>
            </div>
          ) : (
            <>
              {/* Step Content */}
              <div className="rf-step-content">
                {/* Step 0: Personal/Company Info */}
                {!isCorporate && stepIndex === 0 && (
                  <div className="rf-grid rf-grid--2">
                    <Field label="Full Name" required>
                      <TextInput inputRef={firstFieldRef} value={data.fullName} onChange={set("fullName")} placeholder="John Doe" onEnter={goNext} />
                    </Field>
                    <Field label="Email Address" required>
                      <TextInput type="email" value={data.email} onChange={set("email")} placeholder="john@example.com" onEnter={goNext} />
                    </Field>
                    <Field label="Phone Number" required>
                      <TextInput type="tel" value={data.phone} onChange={set("phone")} placeholder="+92 300 1234567" onEnter={goNext} />
                    </Field>
                    <Field label="Date of Birth" required>
                      <TextInput type="date" value={data.dateOfBirth} onChange={set("dateOfBirth")} onEnter={goNext} />
                    </Field>
                    <Field label="Nationality">
                      <TextInput value={data.nationality} onChange={set("nationality")} placeholder="Pakistani" onEnter={goNext} />
                    </Field>
                  </div>
                )}

                {isCorporate && stepIndex === 0 && (
                  <div className="rf-grid rf-grid--2">
                    <Field label="Company Name" required>
                      <TextInput inputRef={firstFieldRef} value={data.companyName} onChange={set("companyName")} placeholder="ABC Corporation" onEnter={goNext} />
                    </Field>
                    <Field label="Contact Person" required>
                      <TextInput value={data.contactPerson} onChange={set("contactPerson")} placeholder="John Doe" onEnter={goNext} />
                    </Field>
                    <Field label="Business Email" required>
                      <TextInput type="email" value={data.businessEmail} onChange={set("businessEmail")} placeholder="john@company.com" onEnter={goNext} />
                    </Field>
                    <Field label="Phone Number" required>
                      <TextInput type="tel" value={data.phone} onChange={set("phone")} placeholder="+92 300 1234567" onEnter={goNext} />
                    </Field>
                  </div>
                )}

                {/* Step 1: Visa Information */}
                {!isCorporate && stepIndex === 1 && (
                  <div className="rf-grid rf-grid--2">
                    <Field label="Visa Type" required>
                      <Select value={data.visaType} onChange={set("visaType")} placeholder="Select visa type" options={VISA_TYPES} />
                    </Field>
                    <Field label="Destination Country" required>
                      <TextInput value={data.destinationCountry} onChange={set("destinationCountry")} placeholder="United Kingdom" onEnter={goNext} />
                    </Field>
                    <Field label="Travel Date" required>
                      <TextInput type="date" value={data.travelDate} onChange={set("travelDate")} onEnter={goNext} />
                    </Field>
                    <Field label="Qualification">
                      <Select value={data.qualification} onChange={set("qualification")} placeholder="Select qualification" options={QUALIFICATIONS} />
                    </Field>
                  </div>
                )}

                {isCorporate && stepIndex === 1 && (
                  <div className="rf-grid rf-grid--2">
                    <Field label="Visa Type" required>
                      <Select value={data.visaType} onChange={set("visaType")} placeholder="Select visa type" options={CORPORATE_VISA_TYPES} />
                    </Field>
                    <Field label="Destination Country" required>
                      <TextInput value={data.destinationCountry} onChange={set("destinationCountry")} placeholder="United Kingdom" onEnter={goNext} />
                    </Field>
                    <Field label="Number of Travelers" required>
                      <TextInput type="number" min="1" value={data.travelers} onChange={set("travelers")} placeholder="5" onEnter={goNext} />
                    </Field>
                    <Field label="Travel Date" required>
                      <TextInput type="date" value={data.travelDate} onChange={set("travelDate")} onEnter={goNext} />
                    </Field>
                  </div>
                )}

                {/* Step 2: Additional Details */}
                {!isCorporate && stepIndex === 2 && (
                  <div className="rf-grid rf-grid--2">
                    <Field label="Passport Available">
                      <YesNo value={data.passportAvailable} onChange={set("passportAvailable")} />
                    </Field>
                    <Field label="Previous Visa Refusal">
                      <YesNo value={data.previousRefusal} onChange={set("previousRefusal")} />
                    </Field>
                    <Field label="Current City">
                      <TextInput value={data.currentCity} onChange={set("currentCity")} placeholder="Lahore" onEnter={goNext} />
                    </Field>
                    <Field label="Budget Range">
                      <TextInput value={data.budgetRange} onChange={set("budgetRange")} placeholder="PKR 3,000,000" onEnter={goNext} />
                    </Field>
                    <Field label="Additional Notes" className="rf-field--full">
                      <textarea
                        ref={textareaRef}
                        className="rf-textarea"
                        rows={3}
                        value={data.notes}
                        placeholder="Any specific requirements or information?"
                        onChange={handleTextareaChange}
                      />
                    </Field>
                  </div>
                )}

                {isCorporate && stepIndex === 2 && (
                  <div className="rf-grid rf-grid--2">
                    <Field label="Purpose of Travel">
                      <Select value={data.purpose} onChange={set("purpose")} placeholder="Select purpose" options={TRAVEL_PURPOSES} />
                    </Field>
                    <Field label="Budget Range">
                      <TextInput value={data.budgetRange} onChange={set("budgetRange")} placeholder="PKR 5,000,000" onEnter={goNext} />
                    </Field>
                    <Field label="Additional Requirements" className="rf-field--full">
                      <textarea
                        ref={textareaRef}
                        className="rf-textarea"
                        rows={3}
                        value={data.notes}
                        placeholder="Any specific requirements the consultant should know?"
                        onChange={handleTextareaChange}
                      />
                    </Field>
                  </div>
                )}

                {/* Step 3: Flight Preferences */}
                {stepIndex === 3 && (
                  <div className="rf-flight-section">
                    <div className="rf-flight-controls">
                      <PillToggle value={data.tripType} onChange={set("tripType")} options={TRIP_TYPES} />
                      <div className="rf-flight-selects">
                        <Select value={data.cabinClass} onChange={set("cabinClass")} placeholder="Class" options={CABIN_CLASSES} />
                        <Select value={data.travelerCount} onChange={set("travelerCount")} placeholder="Travelers" options={TRAVELER_COUNTS} />
                        <Select value={data.stops} onChange={set("stops")} placeholder="Layover" options={LAYOVER_OPTIONS} />
                      </div>
                    </div>

                    <div className="rf-flight-details">
                      <Field label="From">
                        <TextInput value={data.fromWhere} onChange={set("fromWhere")} placeholder="Departure city" onEnter={goNext} />
                      </Field>
                      <button className="rf-swap-btn" onClick={swapFromTo} aria-label="Swap">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                          <path d="M2 6h12M14 6l-3-3M14 6l-3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M18 14H6M6 14l3-3M6 14l3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </button>
                      <Field label="To">
                        <TextInput value={data.toWhere} onChange={set("toWhere")} placeholder="Destination city" onEnter={goNext} />
                      </Field>
                      <Field label="Departure Date">
                        <TextInput type="date" value={data.departureDate} onChange={set("departureDate")} onEnter={goNext} />
                      </Field>
                      {data.tripType !== "One Way" && (
                        <Field label="Return Date">
                          <TextInput type="date" value={data.returningDate} onChange={set("returningDate")} onEnter={goNext} />
                        </Field>
                      )}
                      <Field label="Contact Number">
                        <TextInput type="tel" value={data.flightContact} onChange={set("flightContact")} placeholder="+92 300 1234567" onEnter={goNext} />
                      </Field>
                    </div>
                  </div>
                )}
              </div>

              {errorMsg && <div className="rf-error">{errorMsg}</div>}

              {/* Footer */}
              <div className="rf-footer">
                <div className="rf-footer-left">
                  <span className="rf-step-progress">
                    Step {stepIndex + 1} of {STEPS.length}
                  </span>
                </div>
                <div className="rf-actions">
                  {stepIndex > 0 && (
                    <button className="rf-btn rf-btn--ghost" onClick={goBack} disabled={submitting}>
                      Back
                    </button>
                  )}
                  <button
                    className="rf-btn rf-btn--primary"
                    disabled={!isStepValid(stepIndex) || submitting}
                    onClick={goNext}
                  >
                    {submitting ? "Submitting..." : stepIndex === STEPS.length - 1 ? "Submit Application" : "Continue →"}
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// ===== REDESIGNED CSS =====

const redesignedCSS = `
/* ===== CONTAINER - WIDTH INCREASED ===== */
.rf-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px 16px 40px;
}

/* ===== CARD ===== */
.rf-card {
  background: #ffffff;
  border-radius: 24px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08), 0 2px 8px rgba(0, 0, 0, 0.04);
  overflow: hidden;
}

/* ===== HEADER ===== */
.rf-header {
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
  padding: 32px 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
}

.rf-header-content {
  display: flex;
  align-items: center;
  gap: 16px;
}

.rf-header-icon {
  font-size: 36px;
  line-height: 1;
}

.rf-header-title {
  color: #fff;
  font-size: 24px;
  font-weight: 700;
  margin: 0;
  letter-spacing: -0.5px;
}

.rf-header-subtitle {
  color: rgba(255, 255, 255, 0.7);
  font-size: 15px;
  margin: 2px 0 0;
}

/* ===== TYPE SWITCH ===== */
.rf-type-switch {
  display: flex;
  background: rgba(255, 255, 255, 0.12);
  border-radius: 12px;
  padding: 4px;
}

.rf-type-btn {
  appearance: none;
  border: none;
  background: transparent;
  color: rgba(255, 255, 255, 0.6);
  padding: 10px 24px;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.25s ease;
  display: flex;
  align-items: center;
  gap: 8px;
}

.rf-type-btn--active {
  background: #ffffff;
  color: #16213e;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.rf-type-icon {
  font-size: 16px;
}

/* ===== STEPS ===== */
.rf-steps {
  display: flex;
  padding: 24px 40px 0;
  gap: 4px;
  border-bottom: 2px solid #f0f2f5;
}

.rf-step {
  appearance: none;
  border: none;
  background: transparent;
  padding: 14px 20px 16px;
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  position: relative;
  flex: 1;
  justify-content: center;
  color: #8c8f9c;
  transition: all 0.25s ease;
  border-bottom: 3px solid transparent;
  margin-bottom: -2px;
}

.rf-step:hover {
  color: #16213e;
}

.rf-step--active {
  color: #0f3460;
  border-bottom-color: #0f3460;
}

.rf-step--completed {
  color: #10b981;
}

.rf-step-number {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  font-size: 14px;
  font-weight: 700;
  background: #f0f2f5;
  color: #8c8f9c;
  transition: all 0.25s ease;
}

.rf-step--active .rf-step-number {
  background: #0f3460;
  color: #fff;
}

.rf-step--completed .rf-step-number {
  background: #10b981;
  color: #fff;
}

.rf-step-label {
  font-size: 14px;
  font-weight: 500;
  white-space: nowrap;
}

@media (max-width: 600px) {
  .rf-step-label {
    display: none;
  }
}

/* ===== BODY ===== */
.rf-body {
  padding: 28px 40px 32px;
}

/* ===== STEP CONTENT ===== */
.rf-step-content {
  min-height: 300px;
}

/* ===== GRID ===== */
.rf-grid {
  display: grid;
  gap: 18px;
}

.rf-grid--2 {
  grid-template-columns: 1fr 1fr;
}

.rf-grid--3 {
  grid-template-columns: 1fr 1fr 1fr;
}

.rf-field--full {
  grid-column: 1 / -1;
}

@media (max-width: 640px) {
  .rf-grid--2, .rf-grid--3 {
    grid-template-columns: 1fr;
  }
}

/* ===== FIELD ===== */
.rf-field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.rf-label {
  font-size: 14px;
  font-weight: 600;
  color: #374151;
}

.rf-required {
  color: #ef4444;
  margin-left: 2px;
}

/* ===== INPUTS ===== */
.rf-input {
  width: 100%;
  box-sizing: border-box;
  border: 1.5px solid #e5e7eb;
  border-radius: 10px;
  padding: 12px 16px;
  font-size: 15px;
  color: #111827;
  background: #fafbfc;
  outline: none;
  transition: all 0.2s ease;
  font-family: inherit;
}

.rf-input:focus {
  border-color: #0f3460;
  background: #ffffff;
  box-shadow: 0 0 0 4px rgba(15, 52, 96, 0.08);
}

.rf-input::placeholder {
  color: #9ca3af;
}

.rf-textarea {
  width: 100%;
  box-sizing: border-box;
  border: 1.5px solid #e5e7eb;
  border-radius: 10px;
  padding: 12px 16px;
  font-size: 15px;
  color: #111827;
  background: #fafbfc;
  outline: none;
  transition: all 0.2s ease;
  font-family: inherit;
  resize: vertical;
  min-height: 80px;
}

.rf-textarea:focus {
  border-color: #0f3460;
  background: #ffffff;
  box-shadow: 0 0 0 4px rgba(15, 52, 96, 0.08);
}

/* ===== SELECT ===== */
.rf-select-wrap {
  position: relative;
}

.rf-select {
  appearance: none;
  width: 100%;
  box-sizing: border-box;
  border: 1.5px solid #e5e7eb;
  border-radius: 10px;
  padding: 12px 40px 12px 16px;
  font-size: 15px;
  color: #111827;
  background: #fafbfc;
  outline: none;
  cursor: pointer;
  font-family: inherit;
  transition: all 0.2s ease;
}

.rf-select:focus {
  border-color: #0f3460;
  box-shadow: 0 0 0 4px rgba(15, 52, 96, 0.08);
}

.rf-chevron {
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: #6b7280;
  pointer-events: none;
}

/* ===== TOGGLE ===== */
.rf-toggle-group {
  display: flex;
  gap: 6px;
}

.rf-toggle-btn {
  flex: 1;
  border: 1.5px solid #e5e7eb;
  border-radius: 10px;
  background: #fafbfc;
  padding: 12px 0;
  font-size: 14px;
  font-weight: 500;
  color: #6b7280;
  cursor: pointer;
  transition: all 0.2s ease;
}

.rf-toggle-btn--active {
  border-color: #0f3460;
  background: #eef2f7;
  color: #0f3460;
  font-weight: 600;
}

/* ===== PILL TOGGLE ===== */
.rf-pill-group {
  display: inline-flex;
  border: 1.5px solid #e5e7eb;
  border-radius: 999px;
  padding: 3px;
  gap: 2px;
  background: #fafbfc;
}

.rf-pill-btn {
  appearance: none;
  border: none;
  background: transparent;
  color: #6b7280;
  font-size: 14px;
  font-weight: 500;
  padding: 8px 20px;
  border-radius: 999px;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
}

.rf-pill-btn--active {
  background: #0f3460;
  color: #fff;
}

/* ===== FLIGHT SECTION ===== */
.rf-flight-section {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.rf-flight-controls {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  align-items: center;
}

.rf-flight-selects {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  flex: 1;
}

.rf-flight-selects .rf-select-wrap {
  min-width: 120px;
  flex: 1;
}

.rf-flight-selects .rf-select {
  border-radius: 999px;
  padding: 10px 36px 10px 18px;
  font-size: 14px;
}

.rf-flight-details {
  display: grid;
  grid-template-columns: 1fr auto 1fr 1fr 1fr 1fr;
  gap: 12px;
  align-items: end;
  background: #f8fafc;
  border: 1.5px solid #e5e7eb;
  border-radius: 16px;
  padding: 20px 22px;
}

.rf-swap-btn {
  appearance: none;
  border: 1.5px solid #e5e7eb;
  background: #fff;
  color: #0f3460;
  border-radius: 50%;
  width: 42px;
  height: 42px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-bottom: 1px;
  flex-shrink: 0;
}

.rf-swap-btn:hover {
  background: #eef2f7;
  border-color: #0f3460;
}

@media (max-width: 768px) {
  .rf-flight-details {
    grid-template-columns: 1fr;
  }
  .rf-swap-btn {
    display: none;
  }
}

/* ===== ERROR ===== */
.rf-error {
  margin-top: 16px;
  padding: 14px 18px;
  background: #fef2f2;
  border: 1px solid #fecaca;
  color: #b91c1c;
  border-radius: 10px;
  font-size: 14px;
}

/* ===== FOOTER ===== */
.rf-footer {
  margin-top: 28px;
  padding-top: 22px;
  border-top: 2px solid #f0f2f5;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 14px;
}

.rf-step-progress {
  font-size: 14px;
  color: #8c8f9c;
  font-weight: 500;
}

.rf-actions {
  display: flex;
  gap: 12px;
}

/* ===== BUTTONS ===== */
.rf-btn {
  appearance: none;
  border: none;
  border-radius: 12px;
  font-size: 15px;
  font-weight: 600;
  padding: 12px 32px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: inherit;
}

.rf-btn--primary {
  background: linear-gradient(135deg, #0f3460 0%, #1a1a2e 100%);
  color: #fff;
}

.rf-btn--primary:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 8px 24px rgba(15, 52, 96, 0.25);
}

.rf-btn--primary:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.rf-btn--ghost {
  background: transparent;
  color: #6b7280;
  border: 1.5px solid #e5e7eb;
}

.rf-btn--ghost:hover:not(:disabled) {
  background: #f8fafc;
  border-color: #9ca3af;
}

/* ===== SUCCESS ===== */
.rf-success {
  text-align: center;
  padding: 40px 20px;
}

.rf-success-icon {
  font-size: 64px;
  margin-bottom: 16px;
}

.rf-success-title {
  font-size: 26px;
  font-weight: 700;
  color: #111827;
  margin: 0 0 8px;
}

.rf-success-text {
  font-size: 16px;
  color: #6b7280;
  max-width: 460px;
  margin: 0 auto 24px;
  line-height: 1.6;
}

/* ===== RESPONSIVE ===== */
@media (max-width: 640px) {
  .rf-header {
    padding: 20px;
    flex-direction: column;
    align-items: stretch;
  }
  .rf-header-content {
    justify-content: center;
  }
  .rf-type-switch {
    justify-content: center;
  }
  .rf-body {
    padding: 16px;
  }
  .rf-steps {
    padding: 14px 16px 0;
    overflow-x: auto;
  }
  .rf-step {
    padding: 10px 14px 12px;
    flex: 0 0 auto;
  }
  .rf-flight-controls {
    flex-direction: column;
    align-items: stretch;
  }
  .rf-flight-selects {
    flex-direction: column;
  }
  .rf-footer {
    flex-direction: column;
    align-items: stretch;
  }
  .rf-actions {
    justify-content: stretch;
  }
  .rf-actions .rf-btn {
    flex: 1;
    text-align: center;
  }
  .rf-btn {
    padding: 10px 20px;
    font-size: 14px;
  }
}
`;

// ===== TAB CONTENTS (Hero Section) =====

const tabContents = [
  {
    breadcrumb: { portal: 'IDP Pakistan', currentPage: 'Enquiry Form?' },
    title: 'Enquiry Form',
    subtitle: "Your study abroad journey starts here. Tell us your goals through the enquiry form below, and let our experts guide you every step of the way.",
    showButton: true,
    buttonText: 'Contact TSY',
  },
];

// ===== MAIN EXPORT =====

export default function EnquiryForm() {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(1);
  const formRef = useRef(null);

  const currentContent = tabContents[0];

  const handleTabClick = (index, path) => {
    setActiveIndex(index);
    navigate(path);
  };

  // Scroll to form function
  const scrollToForm = () => {
    if (formRef.current) {
      formRef.current.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
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
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem 1.25rem 3rem 1.25rem;
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

        /* ===== 320px SCREEN SIZE SPECIFIC STYLES ===== */
        @media (max-width: 320px) {
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
          .hero-action-btn {
            font-size: 0.75rem;
            padding: 0.4rem 1.2rem;
            width: 100%;
            justify-content: center;
          }
          .mobile-nav-dropdown {
            padding: 0.5rem 0.75rem;
          }
          .mobile-nav-select {
            font-size: 0.75rem;
            padding: 0.4rem 0.75rem;
          }
          .breadcrumb-text {
            font-size: 0.6rem;
          }
        }
      `}</style>

      <div className="gallery-wrapper">
        <Navbar />

        {/* ===== ACTIVE INDICATOR ===== */}
        <div className="active-indicator-wrapper">
          <div className="active-arrow-box">▼</div>
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
                <button className="hero-action-btn" onClick={scrollToForm}>
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

        {/* ===== VISA APPLICATION FORM ===== */}
        <VisaApplicationForm formRef={formRef} />

        <WhatsAppBanner />
        <Footer />
      </div>
    </>
  );
}