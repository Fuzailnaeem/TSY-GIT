import React, { useState } from 'react';

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const faqs = [
    {
      question: 'What is studying abroad?',
      answer:
        "Studying abroad is the experience of living overseas in order to acquire a foreign education. It can take many forms – from a few weeks in a short course, to a four years' program of full-time study.",
    },
    {
      question: 'How is it different from studying locally?',
      answer:
        'While studying locally is the easier option, in the longer run studying abroad offers unique opportunities and experiences that cannot be found at home. For more information, read this article about whether to study abroad or locally.',
    },
    {
      question: 'What are the main benefits of studying overseas?',
      answer:
        'Studying abroad offers a wide range of benefits, from inspiring a global mindset to helping you learn new skills and enhancing your career prospects. To read all about it, check our article about the benefits of studying abroad.',
    },
    {
      question: "What's the experience like?",
      answer:
        "Studying abroad is a transformative experience of personal growth that helps you broaden your perspective, develop independence, self-confidence and a greater understanding and appreciation of different cultures. To see what it's like, meet some students who have made the move to study abroad with TSY.",
    },
    {
      question: 'Will I be able to afford it?',
      answer:
        'Studying abroad is not as expensive as you may think! Use our cost of living calculator to estimate how much you will need to cover all your expenses as an international student. We connect you to over 5,100 scholarships across our partner university network. Reach out to us to explore your options.',
    },
  ];

  return (
    <div style={styles.cont}>
      <section style={styles.container}>
        <h2 style={styles.mainTitle}>Frequently asked questions</h2>

        <div style={styles.underline}></div>

        <div style={styles.faqList}>
          {faqs.map((faq, index) => {
            const isOpen = activeIndex === index;

            return (
              <div key={index} style={styles.faqItem}>
                <button
                  type="button"
                  style={styles.questionButton}
                  onClick={() => toggleFAQ(index)}
                  aria-expanded={isOpen}
                >
                  <span style={styles.questionText}>
                    {faq.question}
                  </span>

                  <span style={styles.icon}>
                    {isOpen ? '−' : '+'}
                  </span>
                </button>

                {isOpen && (
                  <div style={styles.answerContainer}>
                    <p style={styles.answerText}>{faq.answer}</p>
                  </div>
                )}

                <div style={styles.divider}></div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

const styles = {
  cont: {
    width: '100%',
    backgroundColor: '#fff',
  },

  container: {
    width: '100%',
    maxWidth: '1050px',
    margin: '0 auto',
    padding: '60px 30px',
    boxSizing: 'border-box',
    fontFamily: 'Arial, sans-serif',
  },

  mainTitle: {
    fontSize: '36px',
    fontWeight: '700',
    color: '#222',
    margin: '0 0 12px 0',
    lineHeight: '1.2',
  },

  underline: {
    width: '45px',
    height: '5px',
    backgroundColor: '#e65100',
    borderRadius: '3px',
    marginBottom: '40px',
  },

  faqList: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },

  faqItem: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },

  questionButton: {
    background: 'transparent',
    border: 'none',
    outline: 'none',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    padding: '24px 0',
    cursor: 'pointer',
    textAlign: 'left',
    fontFamily: 'inherit',
  },

  questionText: {
    fontSize: '22px',
    fontWeight: '700',
    color: '#111',
    lineHeight: '1.4',
    paddingRight: '20px',
  },

  icon: {
    flexShrink: 0,
    fontSize: '28px',
    fontWeight: '400',
    color: '#333',
    lineHeight: '1',
    width: '30px',
    textAlign: 'center',
  },

  answerContainer: {
    padding: '0 45px 20px 0',
  },

  answerText: {
    fontSize: '17px',
    lineHeight: '1.7',
    color: '#444',
    margin: 0,
  },
cont:{
    backgroundColor: '#fff',
},
  divider: {
    height: '1px',
    backgroundColor: '#dcdcdc',
    width: '100%',
  },
};

export default FAQSection;