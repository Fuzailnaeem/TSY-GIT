import React, { useState } from 'react';
import './AbroadHelp.css';

const sectionsData = [
  {
    id: 1,
    title: '1. Benefits of studying abroad',
    description: 'From quality education, personal growth to career progression, discover how studying abroad can help you succeed through these helpful articles and videos.',
    links: [
      { text: 'What is studying abroad', url: '#' },
      { text: 'Why study abroad', url: '#' },
      { text: 'Study abroad vs study locally', url: '#' },
      { text: 'Benefits', url: '#' },
    ],
  },
  {
    id: 2,
    title: '2. The study abroad experience',
    description: "Learn all about what it's like to experience life in a different country.",
    links: [
      { text: "What's the experience like", url: '#' },
      { text: 'How much does it typically cost?', url: '#' },
    ],
  },
  {
    id: 3,
    title: '3. Breaking down the steps',
    description: 'Not sure where to start? Follow these simple steps.',
    links: [],
  },
  {
    id: 4,
    title: '4. Study abroad guide for parents',
    description: "Learn more about how you can support your child's overseas education journey with helpful resources such as articles and videos on what to expect and what it's like living in each country.",
    links: [
      { text: "Study abroad parent's guide", url: '#' },
      { text: 'Is it safe?', url: '#' },
    ],
  },
  {
    id: 5,
    title: '5. Hear from our students',
    description: 'If you’re interested in studying overseas, you can read and watch videos to hear first-hand experiences from our students to inform your study abroad decisions.',
    links: [],
  },
];

export default function AbroadHelp() {
  const [openItems, setOpenItems] = useState(
    sectionsData.reduce((acc, item) => ({ ...acc, [item.id]: true }), {})
  );

  const toggleItem = (id) => {
    setOpenItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="abroad-help">
    <section className="abroad-help-container">
      <h2 className="main-title">
        Discover how studying abroad can help you
        <span className="title-underline"></span>
      </h2>

      <div className="accordion-list">
        {sectionsData.map((item) => {
          const isOpen = openItems[item.id];
          return (
            <div key={item.id} className="accordion-item">
              <button 
                className="accordion-header" 
                onClick={() => toggleItem(item.id)}
                aria-expanded={isOpen}
              >
                <h3>{item.title}</h3>
                <span className="icon">{isOpen ? '−' : '+'}</span>
              </button>

              {isOpen && (
                <div className="accordion-content">
                  <p>{item.description}</p>
                  {item.links.length > 0 && (
                    <div className="link-group">
                      {item.links.map((link, index) => (
                        <React.Fragment key={index}>
                          <a href={link.url} className="content-link">
                            {link.text}
                          </a>
                          {index < item.links.length - 1 && (
                            <span className="separator"> | </span>
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
    </div>  
  );
}