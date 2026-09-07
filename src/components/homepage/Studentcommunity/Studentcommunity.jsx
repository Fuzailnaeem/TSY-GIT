import React from "react";
import "./StudentCommunity.css";

/* ------------------------------------------------------------------ */
/*  Data — swap these out for real content / API data                  */
/* ------------------------------------------------------------------ */

const AMBASSADORS = [
  {
    name: "Dima Tokarenko",
    field: "Academic Stud...",
    avatar:
      "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=200&q=80",
  },
  {
    name: "Aastha Paudel",
    field: "Information Te...",
    avatar:
      "https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=200&q=80",
  },
  {
    name: "Geraldine Penarete Vaquiro",
    field: "Geology",
    avatar:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&q=80",
  },
  {
    name: "Yumi Wan",
    field: "Physiotherapy ...",
    avatar:
      "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=200&q=80",
  },
];

const STUDENT_LIFE = [
  {
    type: "video",
    thumb:
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&q=80",
    question:
      "What does a typical student day look like at CQU?",
    author: "Jean Manreal",
    authorAvatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&q=80",
  },
  {
    type: "video",
    thumb:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&q=80",
    question: "Fav spot in campus",
    author: "Nayla Hafwaza Putri",
    authorAvatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80",
  },
  {
    type: "locked",
    thumb:
      "https://images.unsplash.com/photo-1554797589-7241bb691973?w=400&q=80",
    question: "What kind of food options are there on campus?",
    author: "Xun Deng",
    authorAvatar:
      "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=100&q=80",
  },
  {
    type: "locked",
    thumb:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&q=80",
    question:
      "How are different cultures and events celebrated on campus?",
    author: "Toluwalase Arowolo",
    authorAvatar:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&q=80",
  },
];

/* ------------------------------------------------------------------ */
/*  Hero Banner                                                        */
/* ------------------------------------------------------------------ */

function HeroBanner({
  imageUrl = "https://images.ctfassets.net/8bbwomjfix8m/5kY90W7HUcSYbv1hIiawut/eaba97ee501f5d1bc0c5f6778f55e2d8/TSY_Community_promo_-_Homepage_Desktop.jpg",
  thought = "Creating my story...",
  name = "Kenneth",
}) {
  return (
    <div
      className="hero-banner"
      style={{ backgroundImage: `url(${imageUrl})` }}
    >
      <div className="hero-card">
        <h2>Have you discovered our TSY community?</h2>
        <p>
          Get to hear first hand experiences from past students, join groups
          and more with our new community feature
        </p>
        <button>View community now</button>
      </div>

      <div className="cloud-bubble">
        <svg viewBox="0 0 220 140" className="cloud-svg" aria-hidden="true">
          <path
            d="
              M45,95
              C15,95 0,72 15,52
              C5,28 32,8 55,18
              C62,2 92,-4 108,10
              C128,-4 160,4 165,26
              C190,28 198,58 178,72
              C188,92 165,108 145,100
              C132,116 100,116 88,102
              C65,116 40,110 45,95
              Z"
            fill="#fff"
            stroke="#f6c445"
            strokeWidth="6"
          />
          <circle cx="60" cy="122" r="10" fill="#fff" stroke="#f6c445" strokeWidth="5" />
          <circle cx="42" cy="138" r="5" fill="#fff" stroke="#f6c445" strokeWidth="4" />
        </svg>
        <span className="cloud-text">{thought}</span>
      </div>

      <div className="name-tag">
        <span className="tag-hello">HELLO</span>
        <span className="tag-sub">my name is...</span>
        <span className="tag-name">{name}</span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Ambassador cards                                                   */
/* ------------------------------------------------------------------ */

function AmbassadorPanel({ ambassadors }) {
  return (
    <>
      <h3>Chat to a student ambassador</h3>
      <p className="subtitle">Speak to TSY ambassadors today!</p>

      <div className="ambassador-row">
        {ambassadors.map((a) => (
          <div className="amb-card" key={a.name}>
            <img src={a.avatar} alt={a.name} />
            <div className="amb-name">{a.name}</div>
            <div className="amb-field">{a.field}</div>
            <a className="chat-link" href="#chat">
              Chat with me &rsaquo;
            </a>
          </div>
        ))}
        <a className="more-link" href="#more">
          +98 more! &rsaquo;
        </a>
      </div>
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Student life grid                                                  */
/* ------------------------------------------------------------------ */

function StudentLifeCard({ item }) {
  return (
    <div className="life-card">
      <div className="life-thumb">
        <img src={item.thumb} alt={item.question} />
        {item.type === "video" && <div className="play-btn">&#9658;</div>}
        {item.type === "locked" && (
          <div className="lock-overlay">
            <div className="lock-icon">&#128274;</div>
            <button className="join-btn">Join Community</button>
          </div>
        )}
      </div>
      <div className="life-caption">
        <div className="q">{item.question}</div>
        <div className="life-author">
          <img src={item.authorAvatar} alt={item.author} />
          <span>{item.author}</span>
        </div>
      </div>
    </div>
  );
}

function StudentLifeSection({ items }) {
  return (
    <div className="student-life">
      <h3>Student life</h3>
      <p className="subtitle">Hear from past students!</p>
      <div className="life-grid">
        {items.map((item) => (
          <StudentLifeCard item={item} key={item.question} />
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Top-level export                                                   */
/* ------------------------------------------------------------------ */

export default function StudentCommunity() {
  return (
    <div className="student-community-wrap">
      <h1 className="page-title">Student Community</h1>

      <HeroBanner />

      <div className="panel">
        <AmbassadorPanel ambassadors={AMBASSADORS} />
        <hr className="divider" />
        <StudentLifeSection items={STUDENT_LIFE} />
      </div>
    </div>
  );
}