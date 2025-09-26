'use client';

import { useEffect, useRef, useState } from 'react';
import p5 from 'p5';
import Link from 'next/link';
import styles from './styles.module.css';

export default function TypeGenerator2() {
  const canvasRef = useRef<HTMLDivElement>(null);
  const p5InstanceRef = useRef<p5 | null>(null);
  
  // State for animation control
  const [isAnimated, setIsAnimated] = useState(true);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Particle class for floating text
    class TextParticle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      text: string;
      size: number;
      color: any;
      alpha: number;
      p5Instance: p5;

      constructor(x: number, y: number, p: p5) {
        this.p5Instance = p;
        this.x = x;
        this.y = y;
        this.vx = p.random(-1, 1);
        this.vy = p.random(-1, 1);
        this.text = this.getRandomText();
        this.size = p.random(12, 24);
        this.alpha = p.random(100, 255);
        
        // Gradient colors from blue to purple
        const colors = [
          p.color(100, 150, 255),   // Light blue
          p.color(150, 100, 255),   // Purple
          p.color(255, 100, 200),   // Pink
          p.color(100, 255, 200),   // Cyan
          p.color(255, 200, 100)    // Orange
        ];
        this.color = colors[p.floor(p.random(colors.length))];
      }

      getRandomText(): string {
        const words = [
          'TYPE', 'TEXT', 'FONT', 'DESIGN', 'CREATIVE', 'ART', 'STYLE',
          'BOLD', 'ITALIC', 'SERIF', 'SANS', 'DISPLAY', 'SCRIPT', 'MONO',
          'SPACE', 'KERN', 'LEAD', 'TRACK', 'WEIGHT', 'SIZE', 'COLOR'
        ];
        return words[p.floor(p.random(words.length))];
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        
        // Add some floating motion
        this.vx += p.sin(this.p5Instance.frameCount * 0.01 + this.x * 0.01) * 0.01;
        this.vy += p.cos(this.p5Instance.frameCount * 0.01 + this.y * 0.01) * 0.01;
        
        // Limit velocity
        this.vx = p.constrain(this.vx, -2, 2);
        this.vy = p.constrain(this.vy, -2, 2);
        
        // Wrap around screen
        if (this.x < 0) this.x = this.p5Instance.width;
        if (this.x > this.p5Instance.width) this.x = 0;
        if (this.y < 0) this.y = this.p5Instance.height;
        if (this.y > this.p5Instance.height) this.y = 0;
      }

      render() {
        this.p5Instance.push();
        this.p5Instance.translate(this.x, this.y);
        
        // Create glow effect
        this.p5Instance.fill(this.color.levels[0], this.color.levels[1], this.color.levels[2], this.alpha * 0.3);
        this.p5Instance.textSize(this.size * 1.5);
        this.p5Instance.text(this.text, 0, 0);
        
        this.p5Instance.fill(this.color.levels[0], this.color.levels[1], this.color.levels[2], this.alpha * 0.6);
        this.p5Instance.textSize(this.size * 1.2);
        this.p5Instance.text(this.text, 0, 0);
        
        // Main text
        this.p5Instance.fill(this.color.levels[0], this.color.levels[1], this.color.levels[2], this.alpha);
        this.p5Instance.textSize(this.size);
        this.p5Instance.text(this.text, 0, 0);
        
        this.p5Instance.pop();
      }
    }

    const sketch = (p: p5) => {
      let particles: TextParticle[] = [];
      let playing = true;

      p.setup = () => {
        p.createCanvas(800, 400);
        p.pixelDensity(2);
        p.textAlign(p.CENTER, p.CENTER);
        p.noStroke();
        p.colorMode(p.RGB);

        // Create initial particles
        for (let i = 0; i < 25; i++) {
          particles.push(new TextParticle(
            p.random(p.width),
            p.random(p.height),
            p
          ));
        }

        p.background(0);
      };

      p.draw = () => {
        if (!playing) return;

        // Fade background for trail effect
        p.fill(0, 0, 0, 20);
        p.rect(0, 0, p.width, p.height);

        // Update and render particles
        for (let particle of particles) {
          particle.update();
          particle.render();
        }
      };

      // Mouse interaction - add particles on click
      p.mousePressed = () => {
        for (let i = 0; i < 3; i++) {
          particles.push(new TextParticle(p.mouseX, p.mouseY, p));
        }
      };

      // Keyboard controls
      p.keyPressed = () => {
        if (p.key === ' ') {
          playing = !playing;
        } else if (p.key === 'r' || p.key === 'R') {
          // Reset particles
          particles = [];
          for (let i = 0; i < 25; i++) {
            particles.push(new TextParticle(
              p.random(p.width),
              p.random(p.height),
              p
            ));
          }
        } else if (p.key === 'c' || p.key === 'C') {
          // Clear all particles
          particles = [];
        }
      };
    };

    p5InstanceRef.current = new p5(sketch, canvasRef.current);

    return () => {
      if (p5InstanceRef.current) {
        p5InstanceRef.current.remove();
      }
    };
  }, [isAnimated]);

  const toggleAnimation = () => {
    setIsAnimated(!isAnimated);
  };

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div className={styles.header}>
          <Link href="/" className={styles.backLink}>← Back to Home</Link>
          <h1>Type Generator 2</h1>
          <p>Floating typography particles with glow effects - Click to add particles, press Space to pause/play</p>
        </div>

        <div className={styles.controls}>
          <div className={styles.controlGroup}>
            <h3>Interactive Controls</h3>
            <p><strong>Click mouse</strong> to add floating text particles</p>
            <p><strong>Press Space</strong> key to pause/play the animation</p>
            <p><strong>Press R</strong> key to reset all particles</p>
            <p><strong>Press C</strong> key to clear all particles</p>
          </div>

          <div className={styles.controlGroup}>
            <button 
              className={`${styles.animationButton} ${isAnimated ? styles.active : ''}`}
              onClick={toggleAnimation}
            >
              {isAnimated ? 'Stop Animation' : 'Start Animation'}
            </button>
          </div>

          <div className={styles.controlGroup}>
            <h3>About This Type Generator</h3>
            <p>This is a floating typography particle system featuring:</p>
            <ul>
              <li>25 floating text particles with typography terms</li>
              <li>Multi-layer glow effects with transparency</li>
              <li>Organic floating motion with sine/cosine waves</li>
              <li>Interactive particle addition via mouse clicks</li>
              <li>Trail effects with background fading</li>
            </ul>
          </div>
        </div>

        <div className={styles.canvasContainer}>
          <div ref={canvasRef} className={styles.canvas}></div>
        </div>

        <div className={styles.info}>
          <h3>Technical Features:</h3>
          <ul>
            <li>Floating particle system with 25+ text particles</li>
            <li>Multi-layer glow rendering for visual depth</li>
            <li>Organic motion using sine/cosine wave functions</li>
            <li>Interactive mouse click to add new particles</li>
            <li>Trail effects with background color fading</li>
            <li>Screen wrapping for continuous movement</li>
            <li>Typography-focused vocabulary and terms</li>
            <li>Gradient color palette from blue to purple</li>
          </ul>
          
          <h3>Learning Objectives:</h3>
          <ul>
            <li>Understanding particle systems in p5.js</li>
            <li>Working with transparency and alpha blending</li>
            <li>Creating organic motion with mathematical functions</li>
            <li>Interactive mouse events and particle spawning</li>
            <li>Typography and design terminology</li>
            <li>Visual effects and glow rendering</li>
          </ul>
        </div>
      </main>
    </div>
  );
}


