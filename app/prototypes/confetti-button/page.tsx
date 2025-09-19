"use client";

import { useState, useEffect } from 'react';
import styles from './styles.module.css';
import Link from 'next/link';

export default function CyberpunkButtonPrototype() {
  const [isAnimating, setIsAnimating] = useState(false);
  const [matrixRain, setMatrixRain] = useState<Array<{id: number, x: number, y: number, speed: number, char: string}>>([]);
  const [glitchActive, setGlitchActive] = useState(false);

  const triggerCyberpunkEffect = () => {
    setIsAnimating(true);
    setGlitchActive(true);
    
    // Create matrix rain effect
    const newRain = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: -50,
      speed: Math.random() * 3 + 2,
      char: String.fromCharCode(0x30A0 + Math.random() * 96) // Katakana characters
    }));
    
    setMatrixRain(newRain);
    
    // Clear effects after animation
    setTimeout(() => {
      setIsAnimating(false);
      setGlitchActive(false);
      setMatrixRain([]);
    }, 3000);
  };

  // Animate matrix rain
  useEffect(() => {
    if (matrixRain.length === 0) return;
    
    const interval = setInterval(() => {
      setMatrixRain(prev => 
        prev.map(drop => ({
          ...drop,
          y: drop.y + drop.speed
        })).filter(drop => drop.y < window.innerHeight + 50)
      );
    }, 50);

    return () => clearInterval(interval);
  }, [matrixRain.length]);

  return (
    <div className={styles.container}>
      {/* Cyberpunk Background Effects */}
      <div className={styles.cyberGrid}></div>
      <div className={styles.scanLines}></div>
      
      {/* Matrix Rain Effect */}
      {matrixRain.map(drop => (
        <div
          key={drop.id}
          className={styles.matrixDrop}
          style={{
            left: drop.x,
            top: drop.y,
            animationDelay: `${drop.id * 0.1}s`
          }}
        >
          {drop.char}
        </div>
      ))}

      <div className={styles.buttonContainer}>
        <Link href="/" className={styles.backButton}>
          <span className={styles.backIcon}>◀</span>
          <span>MATRIX</span>
        </Link>
      </div>
      
      <div className={`${styles.window} ${glitchActive ? styles.glitchWindow : ''}`}>
        <div className={styles.windowTitle}>
          <div className={styles.windowIcon}>⚡</div>
          <span>CYBER-PROTOCOL v2.0</span>
          <div className={styles.windowButtons}>
            <button className={styles.minimize}>_</button>
            <button className={styles.maximize}>□</button>
            <button className={styles.close}>×</button>
          </div>
        </div>
        
        <div className={styles.windowContent}>
          <div className={styles.statusBar}>
            <span className={styles.status}>SYSTEM STATUS: ONLINE</span>
            <span className={styles.protocol}>PROTOCOL: NEURAL-LINK ACTIVE</span>
          </div>
          
          <h1 className={`${styles.title} ${glitchActive ? styles.glitchText : ''}`}>
            <span className={styles.glitch} data-text="NEURAL LINK ESTABLISHED">
              NEURAL LINK ESTABLISHED
            </span>
          </h1>
          
          <div className={styles.description}>
            <p>Connection to the prototype matrix has been successfully initialized.</p>
            <p>Ready for cyberpunk celebration sequence.</p>
          </div>
          
          <button 
            className={`${styles.cyberButton} ${isAnimating ? styles.animate : ''}`}
            onClick={triggerCyberpunkEffect}
          >
            <span className={styles.buttonGlow}></span>
            <span className={styles.buttonText}>
              <span className={styles.buttonIcon}>⚡</span>
              ACTIVATE MATRIX
            </span>
            <div className={styles.buttonParticles}></div>
          </button>
          
          {isAnimating && (
            <div className={styles.effectOverlay}>
              <div className={styles.energyBurst}></div>
              <div className={styles.dataStream}></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 