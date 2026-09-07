import React, { useRef } from 'react';
import './RelatedArticles.css';

const articlesData = [
  {
    id: 1,
    title: 'Best courses for permanent residency in Australia for international students in 2026',
    description: 'Discover the best courses for permanent residency in Australia and learn how study choices may align wit...',
    image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=600&q=80',
    readTime: '10 min',
    published: '17 August 2026',
    updated: '20 August 2026',
  },
  {
    id: 2,
    title: 'Top 5 universities in Australia for international students',
    description: 'Students who move to Australia to study love the change in lifestyle and possibilities—going to the beach in th...',
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=600&q=80',
    readTime: '10 min',
    published: '5 October 2022',
    updated: '9 July 2026',
  },
  {
    id: 3,
    title: 'Online banking for international students: Stay alert and avoid scams',
    description: 'Learn how international students can bank safely, avoid common scams, spot fraud warning signs, and protect their...',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=600&q=80',
    readTime: '10 min',
    published: '7 July 2026',
    updated: '6 July 2026',
  },
  {
    id: 4,
    title: 'What are the top-ranked universities in Australia for research?',
    description: 'Sustainable research choices and institutions that are leading the way forward in innovation...',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80',
    readTime: '10 min',
    published: '12 June 2026',
    updated: '15 June 2026',
  },
  {
    id: 5,
    title: 'Part-time work rights and minimum wages for students in Australia',
    description: 'Understand your rights, legal working hours during study sessions, and how to manage your finances...',
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=600&q=80',
    readTime: '8 min',
    published: '1 May 2026',
    updated: '3 May 2026',
  },
  {
    id: 6,
    title: 'Healthcare and OSHC insurance coverage guide for newcomers',
    description: 'Everything you need to know about Overseas Student Health Cover (OSHC), medical claims, and finding local clinics...',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=600&q=80',
    readTime: '12 min',
    published: '20 April 2026',
    updated: '25 April 2026',
  },
];

export default function RelatedArticles() {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    const { current } = scrollRef;
    if (current) {
      const scrollAmount = 340; // Card width + gap
      current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className="related-articles-section">
      <div className="header-wrapper">
        <h2 className="section-title">Related articles</h2>
        <div className="title-underline"></div>
      </div>

      <div className="slider-container">
        <div className="articles-grid" ref={scrollRef}>
          {articlesData.map((article) => (
            <article className="article-card" key={article.id}>
              <div className="card-image-wrapper">
                <img src={article.image} alt={article.title} />
              </div>
              <div className="card-content">
                <h3 className="article-title">{article.title}</h3>
                <p className="article-description">{article.description}</p>
                <div className="article-meta">
                  <div className="meta-item">
                    <span className="icon">⏱</span> {article.readTime}
                  </div>
                  <div className="meta-text">
                    <strong>Published:</strong> {article.published}
                  </div>
                  <div className="meta-text">
                    <strong>Updated:</strong> {article.updated}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="section-footer">
        <a href="#view-all" className="view-all-link">
          View all <span className="arrow">&gt;</span>
        </a>
        <div className="carousel-controls">
          <button className="control-btn" onClick={() => scroll('left')} aria-label="Previous slide">
            &larr;
          </button>
          <button className="control-btn" onClick={() => scroll('right')} aria-label="Next slide">
            &rarr;
          </button>
        </div>
      </div>
    </section>
  );
}