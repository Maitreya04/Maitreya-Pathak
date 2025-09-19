import Link from "next/link";
import styles from './styles/home.module.css';
import { instrumentSerif } from './fonts';
import { Component as AnimatedBackground } from '@/components/ui/open-ai-codex-animated-background';

export default function Home() {
  // Add your prototypes to this array
  const prototypes = [
    {
      title: 'Getting started',
      description: 'How to create a prototype',
      path: '/prototypes/example',
      icon: '📁'
    },
    {
      title: 'Confetti button',
      description: 'An interactive button that creates a colorful confetti explosion',
      path: '/prototypes/confetti-button',
      icon: '🎉'
    },
    {
      title: 'Magic 8-Ball Pool',
      description: 'Realistic 3D pool game with physics and mystical answers',
      path: '/prototypes/magic-8ball',
      icon: '🎱'
    },
    // Add your new prototypes here like this:
    // {
    //   title: 'Your new prototype',
    //   description: 'A short description of what this prototype does',
    //   path: '/prototypes/my-new-prototype',
    //   icon: '🚀'
    // },
  ];

  return (
    <div className={`${styles.desktop} ${instrumentSerif.className}`}>
      <AnimatedBackground />
      {/* Vista-style Taskbar */}
      <div className={styles.taskbar}>
        <div className={styles.startButton}>
          <span className={styles.startIcon}>⚡</span>
          <span>START</span>
        </div>
        <div className={styles.taskbarItems}>
          <div className={styles.taskbarItem}>🌐</div>
          <div className={styles.taskbarItem}>📁</div>
          <div className={styles.taskbarItem}>⚙️</div>
        </div>
        <div className={styles.systemTray}>
          <div className={styles.time}>12:34</div>
        </div>
      </div>

      {/* Main Window */}
      <div className={styles.window}>
        <div className={styles.titleBar}>
          <div className={styles.titleBarLeft}>
            <div className={styles.windowIcon}>💻</div>
            <span className={styles.windowTitle}>Maitreya's Prototype Lab</span>
          </div>
          <div className={styles.titleBarButtons}>
            <button className={styles.minimize}>_</button>
            <button className={styles.maximize}>□</button>
            <button className={styles.close}>×</button>
          </div>
        </div>

        <div className={styles.windowContent}>
          <div className={styles.header}>
            <h1 className={styles.mainTitle}>
              <span className={styles.holographicText} data-text="MAITREYA'S">MAITREYA'S</span>
              <span className={styles.subtitle}>PROTOTYPE MATRIX</span>
            </h1>
            <div className={styles.statusBar}>
              <span className={styles.status}>SYSTEM STATUS: ONLINE</span>
              <span className={styles.protocol}>PROTOCOL: CYBER-VISTA v2.0</span>
            </div>
          </div>

          <main className={styles.main}>
            <section className={styles.grid}>
              {prototypes.map((prototype, index) => (
                <Link 
                  key={index}
                  href={prototype.path} 
                  className={styles.card}
                >
                  <div className={styles.cardIcon}>{prototype.icon}</div>
                  <div className={styles.cardContent}>
                    <h3 className={styles.cardTitle}>{prototype.title}</h3>
                    <p className={styles.cardDescription}>{prototype.description}</p>
                  </div>
                  <div className={styles.cardGlow}></div>
                </Link>
              ))}
            </section>
          </main>
        </div>
      </div>

      {/* Cyberpunk Background Effects */}
      <div className={styles.cyberGrid}></div>
      <div className={styles.scanLines}></div>
    </div>
  );
}
