import React, { useState, useRef, useCallback, useEffect } from "react";

const API_URL = "http://localhost:5000/send-application";

const INDIVIDUAL_STEPS = [
  { key: "personal", label: "Personal Info" },
  { key: "visa", label: "Visa Information" },
  { key: "additional", label: "Additional Details" },
  { key: "flight", label: "Flight Preferences" },
];

const CORPORATE_STEPS = [
  { key: "company", label: "Company Information" },
  { key: "visa", label: "Visa Requirements" },
  { key: "additional", label: "Additional Details" },
  { key: "flight", label: "Flight Preferences" },
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

const COUNTRIES = [
  "United Kingdom",
  "United States",
  "Canada",
  "Australia",
  "Germany",
  "Ireland",
  "New Zealand",
];

const QUALIFICATIONS = [
  "Matric / O-Levels",
  "Intermediate / A-Levels",
  "Bachelor's Degree",
  "Master's Degree",
  "PhD",
];

const ENGLISH_TESTS = [
  "IELTS — Completed",
  "IELTS — Booked",
  "PTE — Completed",
  "PTE — Booked",
  "Not yet started",
  "Not required",
];

const BUDGET_RANGES = [
  "Under PKR 2,000,000",
  "PKR 2,000,000 – 4,000,000",
  "PKR 4,000,000 – 6,000,000",
  "PKR 6,000,000+",
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
const LAYOVER_OPTIONS = ["Any", "Non-stop", "1 Stop", "2+ Stops"]; // Changed from STOPS_OPTIONS
const CURRENCIES = ["USD", "PKR", "GBP", "EUR"];
const TRAVELER_COUNTS = ["1", "2", "3", "4", "5", "6+"];

function Field({ label, children, className = "" }) {
  return (
    <label className={`vf-field ${className}`}>
      <span className="vf-field-label">{label}</span>
      {children}
    </label>
  );
}

function TextInput({ value, onChange, placeholder, type = "text", inputRef, onEnter, min }) {
  return (
    <input
      ref={inputRef}
      className="vf-input"
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
    <div className="vf-select-wrap">
      <select className="vf-select" value={value} onChange={(e) => onChange(e.target.value)}>
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
      <svg className="vf-chevron" width="14" height="9" viewBox="0 0 14 9" fill="none">
        <path d="M1 1L7 7L13 1" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

function YesNo({ value, onChange }) {
  return (
    <div className="vf-yesno">
      {["Yes", "No"].map((opt) => (
        <button
          type="button"
          key={opt}
          className={"vf-yesno-btn" + (value === opt ? " vf-yesno-btn--active" : "")}
          onClick={() => onChange(opt)}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}

/* Pill-style segmented toggle used for trip type (Round Trip / One Way / Multi-City) */
function PillToggle({ value, onChange, options }) {
  return (
    <div className="vf-pilltoggle">
      {options.map((opt) => (
        <button
          type="button"
          key={opt}
          className={"vf-pilltoggle-btn" + (value === opt ? " vf-pilltoggle-btn--active" : "")}
          onClick={() => onChange(opt)}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}

const emptyIndividual = {
  fullName: "",
  email: "",
  phone: "",
  dateOfBirth: "",
  nationality: "",
  visaType: "",
  destinationCountry: "",
  travelDate: "",
  qualification: "",
  englishTest: "",
  passportAvailable: "Yes",
  previousRefusal: "No",
  currentCity: "",
  budgetRange: "",
  notes: "",
  tripType: "Round Trip",
  cabinClass: "Economy",
  travelerCount: "1",
  stops: "Any",
  currency: "USD",
  fromWhere: "",
  toWhere: "",
  departureDate: "",
  returningDate: "",
  flightContact: "",
};

const emptyCorporate = {
  companyName: "",
  contactPerson: "",
  businessEmail: "",
  phone: "",
  visaType: "",
  destinationCountry: "",
  travelers: "",
  travelDate: "",
  purpose: "",
  budgetRange: "",
  notes: "",
  tripType: "Round Trip",
  cabinClass: "Economy",
  travelerCount: "1",
  stops: "Any",
  currency: "USD",
  fromWhere: "",
  toWhere: "",
  departureDate: "",
  returningDate: "",
  flightContact: "",
};

export default function VisaApplicationForm() {
  const [appType, setAppType] = useState("individual"); // "individual" | "corporate"
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

  const isStepValid = useCallback(
    (idx) => {
      if (!isCorporate) {
        if (idx === 0)
          return data.fullName.trim() && data.email.trim() && data.phone.trim() && data.dateOfBirth.trim();
        if (idx === 1) return data.visaType && data.destinationCountry.trim() && data.travelDate; // Changed to trim() for manual input
        if (idx === 2) return true;
        if (idx === 3) return data.fromWhere.trim() && data.toWhere.trim() && data.departureDate.trim();
        return true;
      } else {
        if (idx === 0)
          return (
            data.companyName.trim() &&
            data.contactPerson.trim() &&
            data.businessEmail.trim() &&
            data.phone.trim()
          );
        if (idx === 1) return data.visaType && data.destinationCountry.trim() && data.travelers && data.travelDate; // Changed to trim() for manual input
        if (idx === 2) return true;
        if (idx === 3) return data.fromWhere.trim() && data.toWhere.trim() && data.departureDate.trim();
        return true;
      }
    },
    [data, isCorporate]
  );

  // Only let the user jump backward to a step they've already
  // completed (or forward one step at a time via validation).
  const goToStep = (idx) => {
    if (submitted) return;
    if (idx === stepIndex) return;
    if (idx < stepIndex) {
      setStepIndex(idx);
      return;
    }
    // trying to jump forward — only allow it if every step in
    // between (including current) is already valid
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

    // Last Step - Submit Form
    if (stepIndex === STEPS.length - 1) {
      setErrorMsg("");
      setSubmitting(true);
      try {
        const response = await fetch(API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            applicationType: isCorporate ? "Corporate" : "Individual",
            formData: data,
          }),
        });

        const result = await response.json();

        if (result.success) {
          setSubmitted(true);
        } else {
          setErrorMsg(result.message || "Application submit nahi ho saki. Please try again.");
        }
      } catch (error) {
        console.error("Submit Error:", error);
        setErrorMsg(
          "Application submit nahi ho saki — server tak connect nahi ho paya. Please check your connection and try again."
        );
      } finally {
        setSubmitting(false);
      }

      return;
    }

    // Next Step
    setErrorMsg("");
    setStepIndex((i) => Math.min(i + 1, STEPS.length - 1));
  };

  const contactName = isCorporate ? data.contactPerson : data.fullName;
  const contactEmail = isCorporate ? data.businessEmail : data.email;

  return (
    <div className="vf-page">
      <style>{CSS}</style>
      <div className="vf-outer">
        <div className="vf-card">
          {/* Tab strip */}
          <div className="vf-tabstrip">
            <div className="vf-tabs">
              {STEPS.map((s, idx) => (
                <button
                  type="button"
                  key={s.key}
                  className={
                    "vf-tab" +
                    (idx === stepIndex ? " vf-tab--active" : "") +
                    (idx < stepIndex ? " vf-tab--done" : "")
                  }
                  onClick={() => goToStep(idx)}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {/* Body */}
          <div className="vf-body">
            {submitted ? (
              <div className="vf-success">
                <div className="vf-success-badge">✓</div>
                <h2 className="vf-success-title">Application received</h2>
                <p className="vf-success-copy">
                  Thanks {contactName || "there"} — a consultant will reach out to you at{" "}
                  {contactEmail || "the email you provided"} shortly.
                </p>
                <button type="button" className="vf-btn" onClick={resetForm}>
                  Start a new application
                </button>
              </div>
            ) : (
              <>
                {!isCorporate && stepIndex === 0 && (
                  <div className="vf-grid">
                    <Field label="Full name">
                      <TextInput
                        inputRef={firstFieldRef}
                        value={data.fullName}
                        onChange={set("fullName")}
                        placeholder="Enter your full name"
                        onEnter={goNext}
                      />
                    </Field>
                    <Field label="Email address">
                      <TextInput
                        type="email"
                        value={data.email}
                        onChange={set("email")}
                        placeholder="name@example.com"
                        onEnter={goNext}
                      />
                    </Field>
                    <Field label="Phone number">
                      <TextInput
                        type="tel"
                        value={data.phone}
                        onChange={set("phone")}
                        placeholder="+92 300 1234567"
                        onEnter={goNext}
                      />
                    </Field>
                    <Field label="Date of birth">
                      <TextInput type="date" value={data.dateOfBirth} onChange={set("dateOfBirth")} onEnter={goNext} />
                    </Field>
                    <Field label="Nationality">
                      <TextInput
                        value={data.nationality}
                        onChange={set("nationality")}
                        placeholder="e.g. Pakistani"
                        onEnter={goNext}
                      />
                    </Field>
                  </div>
                )}

                {isCorporate && stepIndex === 0 && (
                  <div className="vf-grid">
                    <Field label="Company name">
                      <TextInput
                        inputRef={firstFieldRef}
                        value={data.companyName}
                        onChange={set("companyName")}
                        placeholder="Enter company name"
                        onEnter={goNext}
                      />
                    </Field>
                    <Field label="Contact person name">
                      <TextInput
                        value={data.contactPerson}
                        onChange={set("contactPerson")}
                        placeholder="Enter contact person's name"
                        onEnter={goNext}
                      />
                    </Field>
                    <Field label="Business email">
                      <TextInput
                        type="email"
                        value={data.businessEmail}
                        onChange={set("businessEmail")}
                        placeholder="name@company.com"
                        onEnter={goNext}
                      />
                    </Field>
                    <Field label="Phone number">
                      <TextInput
                        type="tel"
                        value={data.phone}
                        onChange={set("phone")}
                        placeholder="+92 300 1234567"
                        onEnter={goNext}
                      />
                    </Field>
                  </div>
                )}

                {!isCorporate && stepIndex === 1 && (
                  <div className="vf-grid">
                    <Field label="Visa type">
                      <Select value={data.visaType} onChange={set("visaType")} placeholder="Select visa type" options={VISA_TYPES} />
                    </Field>
                    <Field label="Destination country">
                      {/* Changed to TextInput for manual entry */}
                      <TextInput
                        value={data.destinationCountry}
                        onChange={set("destinationCountry")}
                        placeholder="Enter destination country"
                        onEnter={goNext}
                      />
                    </Field>
                    <Field label="Intended travel date">
                      <TextInput type="date" value={data.travelDate} onChange={set("travelDate")} onEnter={goNext} />
                    </Field>
                    <Field label="Current qualification">
                      <Select
                        value={data.qualification}
                        onChange={set("qualification")}
                        placeholder="Select qualification"
                        options={QUALIFICATIONS}
                      />
                    </Field>
                    
                  </div>
                )}

                {isCorporate && stepIndex === 1 && (
                  <div className="vf-grid">
                    <Field label="Visa type">
                      <Select
                        value={data.visaType}
                        onChange={set("visaType")}
                        placeholder="Select visa type"
                        options={CORPORATE_VISA_TYPES}
                      />
                    </Field>
                    <Field label="Destination country">
                      {/* Changed to TextInput for manual entry */}
                      <TextInput
                        value={data.destinationCountry}
                        onChange={set("destinationCountry")}
                        placeholder="Enter destination country"
                        onEnter={goNext}
                      />
                    </Field>
                    <Field label="Number of travelers">
                      <TextInput
                        type="number"
                        min="1"
                        value={data.travelers}
                        onChange={set("travelers")}
                        placeholder="e.g. 5"
                        onEnter={goNext}
                      />
                    </Field>
                    <Field label="Intended travel date">
                      <TextInput type="date" value={data.travelDate} onChange={set("travelDate")} onEnter={goNext} />
                    </Field>
                  </div>
                )}

                {!isCorporate && stepIndex === 2 && (
                  <div className="vf-grid vf-grid-step3">
                    <Field label="Passport available" className="vf-col-passport">
                      <YesNo value={data.passportAvailable} onChange={set("passportAvailable")} />
                    </Field>
                    <Field label="Previous visa refusal" className="vf-col-refusal">
                      <YesNo value={data.previousRefusal} onChange={set("previousRefusal")} />
                    </Field>
                    <Field label="Current city" className="vf-col-city">
                      <TextInput value={data.currentCity} onChange={set("currentCity")} placeholder="e.g. Lahore" onEnter={goNext} />
                    </Field>
                    <Field label="Budget range" className="vf-col-budget">
                      {/* Changed to TextInput for manual entry */}
                      <TextInput
                        value={data.budgetRange}
                        onChange={set("budgetRange")}
                        placeholder="e.g. PKR 3,000,000"
                        onEnter={goNext}
                      />
                    </Field>
                  </div>
                )}

                {isCorporate && stepIndex === 2 && (
                  <div className="vf-grid vf-grid-corp3">
                    <Field label="Purpose of travel" className="vf-col-purpose">
                      <Select
                        value={data.purpose}
                        onChange={set("purpose")}
                        placeholder="Select purpose of travel"
                        options={TRAVEL_PURPOSES}
                      />
                    </Field>
                    <Field label="Budget range" className="vf-col-budget-corp">
                      {/* Changed to TextInput for manual entry */}
                      <TextInput
                        value={data.budgetRange}
                        onChange={set("budgetRange")}
                        placeholder="e.g. PKR 5,000,000"
                        onEnter={goNext}
                      />
                    </Field>
                    <Field label="Message / requirements" className="vf-field--wide vf-col-notes-corp">
                      <textarea
                        ref={textareaRef}
                        className="vf-text"
                        rows={1}
                        value={data.notes}
                        placeholder="Any specific requirements the consultant should know?"
                        onChange={handleTextareaChange}
                      />
                    </Field>
                  </div>
                )}

                {stepIndex === 3 && (
                  <div className="vf-flight">
                    <div className="vf-flight-toprow">
                      <PillToggle value={data.tripType} onChange={set("tripType")} options={TRIP_TYPES} />
                      <span className="vf-flight-divider" />
                      <div className="vf-flight-chip">
                        <Select value={data.cabinClass} onChange={set("cabinClass")} placeholder="Class" options={CABIN_CLASSES} />
                      </div>
                      <div className="vf-flight-chip vf-flight-chip--narrow">
                        <Select value={data.travelerCount} onChange={set("travelerCount")} placeholder="Travellers" options={TRAVELER_COUNTS} />
                      </div>
                      <div className="vf-flight-chip vf-flight-chip--narrow">
                        {/* Changed label to Layover and options to LAYOVER_OPTIONS */}
                        <Select value={data.stops} onChange={set("stops")} placeholder="Layover" options={LAYOVER_OPTIONS} />
                      </div>
                      {/* Removed Currency dropdown - USD tab removed */}
                    </div>

                    <div className="vf-flight-bar">
                      <Field label="From where" className="vf-flight-from">
                        <TextInput value={data.fromWhere} onChange={set("fromWhere")} placeholder="Departure city" onEnter={goNext} />
                      </Field>
                      <button type="button" className="vf-flight-swap" onClick={swapFromTo} aria-label="Swap origin and destination">
                        <svg width="16" height="14" viewBox="0 0 16 14" fill="none">
                          <path d="M1 4H13.5M13.5 4L10 1M13.5 4L10 7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M15 10H2.5M2.5 10L6 7M2.5 10L6 13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </button>
                      <Field label="To where" className="vf-flight-to">
                        <TextInput value={data.toWhere} onChange={set("toWhere")} placeholder="Destination city" onEnter={goNext} />
                      </Field>
                      <Field label="Departure" className="vf-flight-date">
                        <TextInput type="date" value={data.departureDate} onChange={set("departureDate")} onEnter={goNext} />
                      </Field>
                      {data.tripType !== "One Way" && (
                        <Field label="Returning" className="vf-flight-date">
                          <TextInput type="date" value={data.returningDate} onChange={set("returningDate")} onEnter={goNext} />
                        </Field>
                      )}
                      <Field label="Contact no." className="vf-flight-contact">
                        <TextInput type="tel" value={data.flightContact} onChange={set("flightContact")} placeholder="+92 300 1234567" onEnter={goNext} />
                      </Field>
                    </div>
                  </div>
                )}

                {/* Inline error banner — replaces the old alert() calls, which
                    throw (and crash the app) in sandboxed preview environments */}
                {errorMsg && <div className="vf-error-banner">{errorMsg}</div>}

                {/* Footer / actions */}
                <div className="vf-footer">
                  <div className="vf-footer-left">
                    <div className="vf-progress">
                      Step {stepIndex + 1} of {STEPS.length}
                    </div>
                    <div className="vf-typeswitch vf-typeswitch--footer">
                      <button
                        type="button"
                        className={"vf-typebtn" + (!isCorporate ? " vf-typebtn--active" : "")}
                        onClick={() => switchAppType("individual")}
                      >
                        Individual
                      </button>
                      <button
                        type="button"
                        className={"vf-typebtn" + (isCorporate ? " vf-typebtn--active" : "")}
                        onClick={() => switchAppType("corporate")}
                      >
                        Corporate
                      </button>
                    </div>
                  </div>
                  <div className="vf-actions">
                    {stepIndex > 0 && (
                      <button type="button" className="vf-btn vf-btn--ghost" onClick={goBack} disabled={submitting}>
                        Back
                      </button>
                    )}
                    <button type="button" className="vf-btn" disabled={!isStepValid(stepIndex) || submitting} onClick={goNext}>
                      {submitting ? "Submitting…" : stepIndex === STEPS.length - 1 ? "Submit" : "Next"}
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const CSS = `
@media screen and (max-width: 480px) {
  .vf-page {
    padding: 6px;
    margin-top: 180px !important;
  }
  ._container_ggk7h_9 {
    margin-top: 420px;
  }
}

.vf-page {
  margin-top: -110px !important;
  min-height: 100%;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 20px;
  background: #eef0f3;
  overflow-y: auto;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  margin: 0;
}

.vf-outer {
  width: 100%;
  max-width: 1200px;
}

.vf-card {
  width: 100%;
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 1px 2px rgba(16, 24, 40, 0.06),
    0 8px 24px rgba(16, 24, 40, 0.06);
  overflow: hidden;
}

/* ============================================
   TYPE SWITCH
   ============================================ */
.vf-typeswitch-wrapper {
  padding: 16px 30px 0;
  border-bottom: 1px solid #e5e7eb;
}

.vf-typeswitch-wrapper .vf-typeswitch {
  margin-bottom: 12px;
}

.vf-typeswitch {
  display: inline-flex;
  background: #e2e4e9;
  border-radius: 999px;
  padding: 3px;
  margin-bottom: 12px;
  gap: 2px;
}

.vf-typebtn {
  appearance: none;
  border: none;
  background: transparent;
  color: #4b5563;
  font-size: 13.5px;
  font-weight: 600;
  padding: 8px 18px;
  border-radius: 999px;
  cursor: pointer;
  transition: background 0.15s ease, color 0.15s ease;
}

.vf-typebtn:hover {
  color: #1d4ed8;
}

.vf-typebtn--active {
  background: #ffffff;
  color: #1d4ed8;
  box-shadow: 0 1px 2px rgba(16, 24, 40, 0.08);
}

/* ============================================
   TAB STRIP
   ============================================ */
.vf-tabstrip {
  background: #f2f3f5;
  padding: 0 26px;
  border-bottom: 1px solid #e5e7eb;
}

.vf-tabs {
  display: flex;
  justify-content: space-between;
  overflow-x: auto;
  gap: 8px;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.vf-tabs::-webkit-scrollbar {
  display: none;
}

.vf-tab {
  appearance: none;
  border: none;
  background: transparent;
  color: #6b7280;
  font-size: 14.5px;
  font-weight: 500;
  padding: 15px 4px 12px;
  cursor: pointer;
  border-bottom: 2px solid transparent;
  white-space: nowrap;
  transition: color 0.15s ease, border-color 0.15s ease;
  flex-shrink: 0;
}

.vf-tab--done {
  color: #374151;
}

.vf-tab--active {
  color: #1d4ed8;
  border-bottom-color: #1d4ed8;
  font-weight: 600;
}

/* ============================================
   BODY
   ============================================ */
.vf-body {
  padding: 22px 26px;
}

/* ============================================
   GRID LAYOUTS
   ============================================ */
.vf-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
}

.vf-grid-step3 {
  grid-template-columns: 1fr 1fr 1.6fr;
}

.vf-col-passport {
  grid-column: 1 / 2;
}
.vf-col-refusal {
  grid-column: 2 / 3;
}
.vf-col-city {
  grid-column: 3 / 4;
}
.vf-col-budget {
  grid-column: 1 / 2;
}
.vf-col-notes {
  grid-column: 2 / 4;
}

.vf-grid-corp3 {
  grid-template-columns: 1fr 1fr 1fr;
}
.vf-col-purpose {
  grid-column: 1 / 2;
}
.vf-col-budget-corp {
  grid-column: 2 / 3;
}
.vf-col-notes-corp {
  grid-column: 1 / 4;
}

/* ============================================
   FIELD STYLES
   ============================================ */
.vf-field {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.vf-field--wide {
  grid-column: 1 / -1;
}

.vf-field-label {
  font-size: 12.5px;
  font-weight: 500;
  color: #4b5563;
}

.vf-input,
.vf-text {
  width: 100%;
  box-sizing: border-box;
  border: 1px solid #d1d5db;
  border-radius: 10px;
  padding: 10px 13px;
  font-size: 14.5px;
  color: #111827;
  background: #fff;
  outline: none;
  transition: border-color 0.15s ease, box-shadow 0.15s ease;
  font-family: inherit;
}

.vf-input::placeholder,
.vf-text::placeholder {
  color: #9ca3af;
}

.vf-input:focus,
.vf-text:focus,
.vf-select:focus {
  border-color: #1d4ed8;
  box-shadow: 0 0 0 3px rgba(29, 78, 216, 0.12);
}

.vf-text {
  resize: none;
  overflow: hidden;
  min-height: 44px;
}

/* ============================================
   SELECT STYLES
   ============================================ */
.vf-select-wrap {
  position: relative;
  display: flex;
  align-items: center;
}

.vf-select {
  appearance: none;
  width: 100%;
  box-sizing: border-box;
  border: 1px solid #d1d5db;
  border-radius: 10px;
  padding: 10px 36px 10px 13px;
  font-size: 14.5px;
  color: #111827;
  background: #fff;
  outline: none;
  cursor: pointer;
  font-family: inherit;
}

.vf-select:invalid {
  color: #9ca3af;
}

.vf-chevron {
  position: absolute;
  right: 14px;
  color: #6b7280;
  pointer-events: none;
}

/* ============================================
   YES/NO TOGGLE
   ============================================ */
.vf-yesno {
  display: flex;
  gap: 6px;
}

.vf-yesno-btn {
  flex: 1;
  border: 1px solid #d1d5db;
  border-radius: 10px;
  background: #fff;
  padding: 10px 0;
  font-size: 14.5px;
  color: #374151;
  cursor: pointer;
  transition: all 0.15s ease;
}

.vf-yesno-btn--active {
  border-color: #1d4ed8;
  background: #eff4ff;
  color: #1d4ed8;
  font-weight: 600;
}

/* ============================================
   FLIGHT PREFERENCES
   ============================================ */
.vf-flight {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.vf-flight-toprow {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}

.vf-pilltoggle {
  display: inline-flex;
  border: 1px solid #d1d5db;
  border-radius: 999px;
  padding: 3px;
  gap: 2px;
  flex-wrap: wrap;
}

.vf-pilltoggle-btn {
  appearance: none;
  border: none;
  background: transparent;
  color: #4b5563;
  font-size: 13.5px;
  font-weight: 500;
  padding: 7px 14px;
  border-radius: 999px;
  cursor: pointer;
  white-space: nowrap;
  transition: background 0.15s ease, color 0.15s ease;
}

.vf-pilltoggle-btn--active {
  background: #eff4ff;
  color: #1d4ed8;
  font-weight: 600;
}

.vf-flight-divider {
  width: 1px;
  height: 24px;
  background: #e5e7eb;
}

.vf-flight-chip {
  min-width: 120px;
}

.vf-flight-chip--narrow {
  min-width: 108px;
}

.vf-flight-chip .vf-select {
  border-radius: 999px;
  padding: 8px 32px 8px 14px;
  font-size: 13.5px;
}

.vf-flight-chip .vf-chevron {
  right: 12px;
}

.vf-flight-bar {
  display: grid;
  grid-template-columns: 1.3fr auto 1.3fr 1fr 1fr 1.1fr;
  align-items: end;
  gap: 10px;
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 14px;
  padding: 14px;
}

.vf-flight-swap {
  appearance: none;
  border: 1px solid #d1d5db;
  background: #fff;
  color: #1d4ed8;
  border-radius: 50%;
  width: 34px;
  height: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin-bottom: 1px;
  flex-shrink: 0;
  transition: background 0.15s ease;
}

.vf-flight-swap:hover {
  background: #eff4ff;
}

/* ============================================
   ERROR BANNER
   ============================================ */
.vf-error-banner {
  background: #fef2f2;
  border: 1px solid #fecaca;
  color: #b91c1c;
  border-radius: 10px;
  padding: 10px 14px;
  font-size: 13.5px;
  margin-top: 16px;
  line-height: 1.5;
}

/* ============================================
   FOOTER
   ============================================ */
.vf-footer {
  margin-top: 20px;
  padding-top: 16px;
  border-top: 1px solid #eef0f3;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 12px;
}

.vf-footer-left {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
}

.vf-progress {
  font-size: 12.5px;
  color: #9ca3af;
}

.vf-actions {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.vf-btn {
  appearance: none;
  border: none;
  border-radius: 999px;
  background: #1d4ed8;
  color: #fff;
  font-size: 14.5px;
  font-weight: 600;
  padding: 11px 26px;
  cursor: pointer;
  transition: background 0.15s ease, opacity 0.15s ease, transform 0.05s ease;
}

.vf-btn:hover:not(:disabled) {
  background: #1a43b8;
}

.vf-btn:active:not(:disabled) {
  transform: translateY(1px);
}

.vf-btn:disabled {
  opacity: 0.45;
  cursor: not-allowed;
}

.vf-btn--ghost {
  background: transparent;
  color: #374151;
  border: 1px solid #d1d5db;
}

.vf-btn--ghost:hover {
  background: #f9fafb;
}

/* ============================================
   SUCCESS STATE
   ============================================ */
.vf-success {
  text-align: center;
  padding: 26px 10px 8px;
}

.vf-success-badge {
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background: #ecfdf3;
  color: #16a34a;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 14px;
}

.vf-success-title {
  font-size: 19px;
  font-weight: 700;
  color: #111827;
  margin: 0 0 6px;
}

.vf-success-copy {
  font-size: 14px;
  color: #6b7280;
  margin: 0 0 18px;
  line-height: 1.5;
}

/* ============================================
   RESPONSIVE - TABLET (768px - 1024px)
   ============================================ */
@media screen and (max-width: 1024px) {
  .vf-page {
    margin: 0;
    padding: 16px;
  }

  .vf-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .vf-grid-step3 {
    grid-template-columns: repeat(2, 1fr);
  }

  .vf-grid-corp3 {
    grid-template-columns: repeat(2, 1fr);
  }

  .vf-col-passport,
  .vf-col-refusal,
  .vf-col-city,
  .vf-col-budget,
  .vf-col-notes,
  .vf-col-purpose,
  .vf-col-budget-corp,
  .vf-col-notes-corp {
    grid-column: auto;
  }

  .vf-col-notes-corp {
    grid-column: 1 / -1;
  }

  .vf-body {
    padding: 18px 20px;
  }

  .vf-tabstrip {
    padding: 0 18px;
  }

  .vf-tab {
    font-size: 13px;
    padding: 12px 2px 10px;
  }

  .vf-flight-bar {
    grid-template-columns: 1fr 1fr;
  }

  .vf-flight-swap {
    display: none;
  }

  .vf-flight-toprow {
    gap: 8px;
  }

  .vf-flight-chip {
    min-width: 100px;
  }

  .vf-flight-chip--narrow {
    min-width: 90px;
  }
}

/* ============================================
   RESPONSIVE - MOBILE (up to 767px)
   ============================================ */
@media screen and (max-width: 767px) {
  .vf-page {
    margin: 0;
    padding: 10px;
  }

  .vf-card {
    border-radius: 12px;
  }

  .vf-body {
    padding: 14px 16px;
  }

  .vf-tabstrip {
    padding: 0 12px;
  }

  .vf-tabs {
    gap: 4px;
  }

  .vf-tab {
    font-size: 11px;
    padding: 10px 2px 8px;
    letter-spacing: 0.3px;
  }

  .vf-grid,
  .vf-grid-step3,
  .vf-grid-corp3 {
    grid-template-columns: 1fr;
    gap: 10px;
  }

  .vf-col-passport,
  .vf-col-refusal,
  .vf-col-city,
  .vf-col-budget,
  .vf-col-notes,
  .vf-col-purpose,
  .vf-col-budget-corp,
  .vf-col-notes-corp {
    grid-column: 1 / -1;
  }

  .vf-field {
    gap: 3px;
  }

  .vf-field-label {
    font-size: 11.5px;
  }

  .vf-input,
  .vf-text,
  .vf-select {
    font-size: 13px;
    padding: 9px 12px;
    border-radius: 8px;
  }

  .vf-select {
    padding: 9px 32px 9px 12px;
  }

  .vf-yesno-btn {
    font-size: 13px;
    padding: 8px 0;
    border-radius: 8px;
  }

  .vf-typeswitch {
    padding: 2px;
    gap: 2px;
  }

  .vf-typebtn {
    font-size: 12px;
    padding: 6px 12px;
  }

  .vf-footer {
    flex-direction: column;
    align-items: stretch;
    gap: 10px;
    margin-top: 14px;
    padding-top: 12px;
  }

  .vf-footer-left {
    justify-content: center;
    gap: 10px;
  }

  .vf-actions {
    justify-content: center;
    width: 100%;
  }

  .vf-actions .vf-btn {
    flex: 1;
    text-align: center;
    justify-content: center;
    min-width: 80px;
  }

  .vf-btn {
    font-size: 13px;
    padding: 9px 18px;
  }

  .vf-progress {
    font-size: 11px;
  }

  .vf-flight {
    gap: 10px;
  }

  .vf-flight-toprow {
    gap: 6px;
  }

  .vf-pilltoggle {
    width: 100%;
    justify-content: center;
  }

  .vf-pilltoggle-btn {
    font-size: 12px;
    padding: 5px 10px;
    flex: 1;
    text-align: center;
  }

  .vf-flight-divider {
    display: none;
  }

  .vf-flight-chip {
    min-width: 80px;
    flex: 1;
  }

  .vf-flight-chip--narrow {
    min-width: 70px;
  }

  .vf-flight-chip .vf-select {
    font-size: 12px;
    padding: 6px 28px 6px 10px;
    border-radius: 20px;
  }

  .vf-flight-chip .vf-chevron {
    right: 10px;
    width: 12px;
    height: 8px;
  }

  .vf-flight-bar {
    grid-template-columns: 1fr;
    gap: 8px;
    padding: 12px;
    border-radius: 12px;
  }

  .vf-flight-from,
  .vf-flight-to,
  .vf-flight-date,
  .vf-flight-contact {
    grid-column: 1 / -1;
  }

  .vf-flight-swap {
    display: none;
  }

  .vf-flight-bar .vf-field-label {
    font-size: 11px;
  }

  .vf-flight-bar .vf-input {
    font-size: 13px;
    padding: 8px 11px;
  }

  .vf-success {
    padding: 20px 10px 6px;
  }

  .vf-success-badge {
    width: 44px;
    height: 44px;
    font-size: 20px;
  }

  .vf-success-title {
    font-size: 17px;
  }

  .vf-success-copy {
    font-size: 13px;
  }

  .vf-error-banner {
    font-size: 12.5px;
    padding: 8px 12px;
    margin-top: 12px;
  }
}

/* ============================================
   RESPONSIVE - SMALL MOBILE (up to 480px)
   ============================================ */
@media screen and (max-width: 480px) {
  .vf-page {
    margin: 0;
    padding: 6px;
  }

  .vf-body {
    padding: 12px;
  }

  .vf-tab {
    font-size: 10px;
    padding: 8px 2px 6px;
  }

  .vf-tabstrip {
    padding: 0 8px;
  }

  .vf-input,
  .vf-text,
  .vf-select {
    font-size: 12px;
    padding: 8px 10px;
    border-radius: 6px;
  }

  .vf-select {
    padding: 8px 28px 8px 10px;
  }

  .vf-chevron {
    right: 10px;
    width: 12px;
    height: 8px;
  }

  .vf-btn {
    font-size: 12px;
    padding: 8px 14px;
  }

  .vf-typebtn {
    font-size: 11px;
    padding: 5px 10px;
  }

  .vf-flight-chip {
    min-width: 60px;
  }

  .vf-flight-chip--narrow {
    min-width: 55px;
  }

  .vf-flight-chip .vf-select {
    font-size: 11px;
    padding: 5px 24px 5px 8px;
  }

  .vf-flight-chip .vf-chevron {
    right: 8px;
    width: 10px;
    height: 7px;
  }

  .vf-pilltoggle-btn {
    font-size: 11px;
    padding: 4px 8px;
  }

  .vf-flight-bar {
    padding: 10px;
    gap: 6px;
  }

  .vf-flight-bar .vf-input {
    font-size: 12px;
    padding: 7px 10px;
  }
}

/* ============================================
   RESPONSIVE - LANDSCAPE MOBILE
   ============================================ */
@media screen and (max-height: 600px) and (orientation: landscape) {
  .vf-page {
    margin: 0;
    padding: 8px;
  }

  .vf-body {
    padding: 10px 16px;
  }

  .vf-grid,
  .vf-grid-step3,
  .vf-grid-corp3 {
    grid-template-columns: repeat(2, 1fr);
    gap: 8px;
  }

  .vf-tab {
    font-size: 11px;
    padding: 8px 2px 6px;
  }

  .vf-footer {
    margin-top: 10px;
    padding-top: 8px;
  }

  .vf-btn {
    font-size: 12px;
    padding: 7px 14px;
  }

  .vf-flight-bar {
    grid-template-columns: repeat(2, 1fr);
    padding: 10px;
  }

  .vf-flight-swap {
    display: none;
  }
}
`;