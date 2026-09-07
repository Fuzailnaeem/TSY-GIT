import React from 'react';
import styles from './TrustSection.module.css';
import {
  Calendar,
  Compass,
  Briefcase,
  Navigation,
  Star,
  MapPin,
} from 'lucide-react';

const cards = [
  {
    icon: Calendar,
    title: '40+ Years',
    description: "Since 1985, we've been planning journeys for travellers across Pakistan.",
  },
  {
    icon: Compass,
    title: '14 Destinations',
    description: 'Complete visa documentation, bundled packages, or filing assistance — matched to where you\'re going.',
  },
  {
    icon: Briefcase,
    title: '4 Specialities',
    description: 'Leisure, honeymoon, corporate & MICE, and Umrah — all planned under one roof.',
  },
  {
    icon: Navigation,
    title: 'Thousands of Journeys',
    description: 'Guided from first enquiry to landing, with a dedicated consultant at every step.',
  },
  {
    icon: Star,
    title: '[Google rating]',
    description: 'Rated by our travellers — add your current review score and count here.',
  },
  {
    icon: MapPin,
    title: 'Lahore-Based',
    description: 'A proudly Pakistani travel house, headquartered on Davis Road, Lahore.',
  },
];

const TrustSection = () => {
  return (
    <div className={styles.container}>
      <div className={styles.headlineWrap}>
        <span className={styles.subheadline}>Why travellers trust us</span>
        <h2 className={styles.headline}>Why is TSY trusted by travellers?</h2>
        <div className={styles.headlineUnderline} />
      </div>

      {cards.map(({ icon: Icon, title, description }, i) => (
        <div className={styles.card} key={i}>
          <div className={styles.cardContent}>
            <div className={styles.cardIcon}>
              <Icon strokeWidth={2} />
            </div>
            <h3 className={styles.cardTitle}>{title}</h3>
            <p className={styles.cardDescription}>{description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TrustSection;