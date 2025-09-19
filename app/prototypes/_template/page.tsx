// Template for creating a new prototype
// To use this template:
// 1. Create a new folder in app/prototypes with your prototype name
// 2. Copy this file and styles.module.css into your new folder
// 3. Create an 'images' folder for your prototype's images
// 4. Rename and customize the component and styles as needed

import Link from 'next/link';
import styles from './styles.module.css';

export default function PrototypeTemplate() {
  // Available prototypes in the lab
  const prototypes = [
    {
      title: 'Getting Started',
      description: 'Learn how to create a prototype',
      path: '/prototypes/example',
      icon: '📁'
    },
    {
      title: 'Confetti Button',
      description: 'Interactive button with colorful confetti explosion',
      path: '/prototypes/confetti-button',
      icon: '🎉'
    },
    {
      title: 'Magic 8-Ball Pool',
      description: 'Realistic 3D pool game with physics and mystical answers',
      path: '/prototypes/magic-8ball',
      icon: '🎱'
    },
    {
      title: 'Typography Generator',
      description: 'Interactive typography generator with p5.js animations',
      path: '/prototypes/typography-generator',
      icon: '✨'
    },
    {
      title: 'Liquid Chrome Cursor',
      description: 'Smooth liquid chrome cursor effects',
      path: '/prototypes/liquid-chrome-cursor',
      icon: '💧'
    }
  ];

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div className={styles.welcome}>
          <h1>Prototype Template</h1>
          <p>This template shows you how to add interactive elements and lists all available prototypes.</p>
        </div>

        <button className={styles.simpleButton}>
          Click me
        </button>

        <div className={styles.card}>
          <h3>Simple Card</h3>
          <p>This is a basic card without animations.</p>
        </div>

        {/* Prototype Gallery */}
        <div className={styles.prototypeGallery}>
          <h3>Available Prototypes</h3>
          <p>Explore all the prototypes in the lab:</p>
          
          <div className={styles.prototypeGrid}>
            {prototypes.map((prototype, index) => (
              <div key={index} className={styles.prototypeCard}>
                <Link href={prototype.path} className={styles.prototypeLink}>
                  <div className={styles.prototypeIcon}>{prototype.icon}</div>
                  <div className={styles.prototypeContent}>
                    <h4>{prototype.title}</h4>
                    <p>{prototype.description}</p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
} 