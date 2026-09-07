import React, { useState, useEffect } from 'react';
import './StudyAbroadScroll.css';

const sectionsData = [
  {
    id: 'step-1',
    title: '1. Research',
    content: [
      'It helps to do a little research before you speak to us. Once you do some research, you will get an idea of the subject areas that interest you the most.',
      'You could look at some course descriptions, university reviews and their locations. You can also start a wish list of your preferences and begin to narrow down your selection.',
      'Research can also include you asking your friends and family if they have they studied abroad.',
      'You can ask them about their experiences - where they studied and what they liked about it?',
      'You can also get in touch with your friends who are studying abroad and get their feedback and advice from them.',
      'Post a message on your timeline on Facebook and you may be surprised at how many people have experience of an international education.',
      'What if you don’t know where to start? Don’t worry. You can come in to one of our offices and our counsellors will help you get started.',
      'Also, don’t trust everything you read online. Some reviews from students might have been influenced by a single negative personal experience or choosing a course that wasn’t right for them. It doesn’t always mean you will feel the same way.',
      'We will ensure that you get accurate and non-biased advice.'
    ]
  },
  {
    id: 'step-2',
    title: '2. Speak to one of our TSY counsellors',
    content: [
      'When you are ready, make an appointment with an TSY counsellor.',
      'Our counsellors are professionally certified and many of them were international students themselves. They have a wealth of first-hand professional advice and personal experience from different study locations across the world.',
      'You can take your wish-list and course preferences along with you to your appointment as a starting point.',
      'Your counsellor will work through all the big and small details to ensure the best possible fit between you and your future university.',
      'You can also browse different universities and track your application progress through the TSY Live app.'
    ]
  },
  {
    id: 'step-3',
    title: '3. Make your application',
    content: [
      'After you have chosen your course and university or school, it’s time to apply.',
      'Your counsellor will support you during your university and course applications.',
      'You needn\'t worry about anything since we take our job very seriously and follow the strictest legal and ethical standards.',
      'Your counsellor will personally contact your chosen university or school to make sure they support your application to improve your chances of acceptance.',
      'If you need to take an English language test to qualify for your course, you must practice a lot.',
      'In a test such as IELTS, you will need good grammar and spelling, as well as vocabulary.',
      'As a proud co-owner of IELTS, we can help you with the test as well.'
    ]
  },
  {
    id: 'step-4',
    title: '4. Accepting your offer',
    content: [
      'Once the university or school receives your application it will be assessed and you will be notified of the result.',
      'It can take a few weeks, or longer for postgraduate courses, for your application to be processed.',
      'If your application is successful, you will receive a letter of offer and an acceptance form. Before accepting your offer, your counsellor will read it carefully with you and check any conditions that may apply.',
      'If you are accepted for more than one course or school, and you are confused, we will help you decide which option is best for you.',
      'It is natural to be nervous as you wait for the outcome of your course applications.',
      'If you are feeling anxious, we want you to tell us. This is perfectly normal and we can help you feel more confident.'
    ]
  },
  {
    id: 'step-5',
    title: '5. Practise your English skills',
    content: [
      'It is always a good idea to brush up your English language skills to ensure you can keep up with what your lecturers are saying. This will be helpful, especially if English is not your first language.',
      'You can try watching English TV news and talk shows, reading books or listening to podcasts where the language is more formal.',
      'You can also have some fun learning the local slang in your study destination.',
      'For example, Australians, or ‘Aussies’ as they call themselves, have lots of different words and accents when compared with the British who call themselves Brits, even though they all speak English.',
      'There are plenty of websites that list the slang from different regions and some of these words will help you understand the local people in your new country.'
    ]
  },
  {
    id: 'step-6',
    title: '6. Student visa',
    content: [
      'Now that you have been accepted, it’s time to apply for your student visa. TSY can provide you with some information to help make sure you are well positioned to navigate this process with the authorised migration departments.'
    ]
  },
  {
    id: 'step-7',
    title: '7. Ready, steady, go',
    content: [
      'Congratulations! You’re off on a huge adventure. There are lots of things to think about during this time and your TSY counsellor will help out along the way with advice on matters such as exchanging money, insurance, SIM cards and opening a bank account.',
      'We host regular pre-departure sessions throughout the year to help prepare you for student life in your new country.'
    ]
  }
];

export default function StudyAbroadScroll() {
  const [activeId, setActiveId] = useState('step-1');

  // Handle clicking a tab: scroll smoothly to the element
  const handleTabClick = (id) => {
    setActiveId(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Optional: Update active tab on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 150;
      for (const section of sectionsData) {
        const el = document.getElementById(section.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveId(section.id);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="study-container">
      {/* Sticky Top Navigation Bar */}
      <div className="steps-nav-wrapper">
        <div className="steps-nav">
          {sectionsData.map((section) => (
            <button
              key={section.id}
              className={`step-tab ${activeId === section.id ? 'active' : ''}`}
              onClick={() => handleTabClick(section.id)}
            >
              {section.title}
            </button>
          ))}
        </div>
        <div className="progress-bar-container">
          <div
            className="progress-bar-fill"
            style={{
              width: `${((sectionsData.findIndex(s => s.id === activeId) + 1) / sectionsData.length) * 100}%`
            }}
          ></div>
        </div>
      </div>

      {/* Intro Section */}
      <div className="intro-section">
        <p className="intro-main">
          TSY has been helping students like you to study abroad for over 50 years.
        </p>
        <p>We know for sure what it takes to set you up for success.</p>
        <p>
          We provide you with assistance on course and visa applications, travel and feeling at home in your new destination.
        </p>
        <p className="intro-bold">Best of all, most of TSY’s advice services are free.</p>
      </div>

      {/* All Sections rendered vertically */}
      <div className="sections-list">
        {sectionsData.map((section) => (
          <div key={section.id} id={section.id} className="step-content-section">
            <h2 className="step-heading">{section.title}</h2>
            <div className="step-paragraphs">
              {section.content.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}