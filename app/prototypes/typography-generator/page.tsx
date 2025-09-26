'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import styles from './styles.module.css';

export default function TypographyGenerator() {
  const canvasRef = useRef<HTMLDivElement>(null);
  const p5InstanceRef = useRef<any | null>(null);
  
  // State for animation control
  const [isAnimated, setIsAnimated] = useState(true);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Flock class to manage the array of all the letters
    class Flock {
      letters: Letter[];

      constructor() {
        this.letters = [];
      }

      run() {
        for (let letter of this.letters) {
          letter.run(this.letters);
        }
      }

      addLetter(l: Letter) {
        this.letters.push(l);
      }
    }

    // Letter class (flocking behavior with letters)
    class Letter {
      acceleration: any;
      velocity: any;
      position: any;
      size: number;
      maxSpeed: number;
      maxForce: number;
      color: any;
      p5Instance: any;
      char: string;

      constructor(x: number, y: number, p: any) {
        this.p5Instance = p;
        this.acceleration = p.createVector(0, 0);
        this.velocity = p.createVector(p.random(-1, 1), p.random(-1, 1));
        this.position = p.createVector(x, y);
        this.size = 10.0; // Slightly smaller for better performance
        this.maxSpeed = 2.5; // Slightly slower for smoother animation
        this.maxForce = 0.03; // Reduced force for smoother movement
        // Fire color palette - random fire colors
        const fireColors = [
          p.color(255, 100, 0),   // Orange
          p.color(255, 150, 0),   // Yellow-orange
          p.color(255, 200, 0),   // Bright yellow
          p.color(255, 50, 0),    // Red-orange
          p.color(255, 255, 100)  // Light yellow
        ];
        this.color = fireColors[p.floor(p.random(fireColors.length))];
        
        // Random letter for this letter agent
        const ABC = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        this.char = ABC[p.floor(p.random(ABC.length))];
      }

      run(letters: Letter[]) {
        this.flock(letters);
        this.update();
        this.borders();
        this.render();
      }

      applyForce(force: any) {
        this.acceleration.add(force);
      }

      flock(letters: Letter[]) {
        let separation = this.separate(letters);
        let alignment = this.align(letters);
        let cohesion = this.cohesion(letters);

        separation.mult(1.5);
        alignment.mult(1.0);
        cohesion.mult(1.0);

        this.applyForce(separation);
        this.applyForce(alignment);
        this.applyForce(cohesion);
      }

      update() {
        this.velocity.add(this.acceleration);
        this.velocity.limit(this.maxSpeed);
        this.position.add(this.velocity);
        this.acceleration.mult(0);
      }

      seek(target: any) {
        const P5Ctor = (this.p5Instance as any).constructor;
        let desired = P5Ctor.Vector.sub(target, this.position);
        desired.normalize();
        desired.mult(this.maxSpeed);
        let steer = P5Ctor.Vector.sub(desired, this.velocity);
        steer.limit(this.maxForce);
        return steer;
      }

      render() {
        let theta = this.velocity.heading() + this.p5Instance.radians(90);
        
        // Create fire trail effect with multiple layers
        this.p5Instance.push();
        this.p5Instance.translate(this.position.x, this.position.y);
        this.p5Instance.rotate(theta);
        
        // Outer glow layer (larger, more transparent)
        this.p5Instance.fill(255, 100, 0, 30); // Orange glow
        this.p5Instance.textSize(this.size * 1.5);
        this.p5Instance.text(this.char, 0, 0);
        
        // Middle glow layer
        this.p5Instance.fill(255, 150, 0, 60); // Yellow-orange
        this.p5Instance.textSize(this.size * 1.2);
        this.p5Instance.text(this.char, 0, 0);
        
        // Inner core (brightest)
        this.p5Instance.fill(255, 200, 0, 120); // Bright yellow
        this.p5Instance.textSize(this.size);
        this.p5Instance.text(this.char, 0, 0);
        
        // White hot center
        this.p5Instance.fill(255, 255, 200, 180); // White-hot center
        this.p5Instance.textSize(this.size * 0.8);
        this.p5Instance.text(this.char, 0, 0);
        
        this.p5Instance.pop();
      }

      borders() {
        if (this.position.x < -this.size) {
          this.position.x = this.p5Instance.width + this.size;
        }
        if (this.position.y < -this.size) {
          this.position.y = this.p5Instance.height + this.size;
        }
        if (this.position.x > this.p5Instance.width + this.size) {
          this.position.x = -this.size;
        }
        if (this.position.y > this.p5Instance.height + this.size) {
          this.position.y = -this.size;
        }
      }

      separate(letters: Letter[]) {
        let desiredSeparation = 20.0; // Reduced for better performance
        let steer = this.p5Instance.createVector(0, 0);
        let count = 0;

        for (let letter of letters) {
          const P5Ctor = (this.p5Instance as any).constructor;
          let distanceToNeighbor = P5Ctor.Vector.dist(this.position, letter.position);
          if (distanceToNeighbor > 0 && distanceToNeighbor < desiredSeparation) {
            let diff = (this.p5Instance as any).constructor.Vector.sub(this.position, letter.position);
            diff.normalize();
            diff.div(distanceToNeighbor);
            steer.add(diff);
            count++;
            // Early exit for performance - limit to 5 neighbors
            if (count >= 5) break;
          }
        }

        if (count > 0) {
          steer.div(count);
        }

        if (steer.mag() > 0) {
          steer.normalize();
          steer.mult(this.maxSpeed);
          steer.sub(this.velocity);
          steer.limit(this.maxForce);
        }
        return steer;
      }

      align(letters: Letter[]) {
        let neighborDistance = 40; // Reduced for better performance
        let sum = this.p5Instance.createVector(0, 0);
        let count = 0;
        for (let i = 0; i < letters.length; i++) {
          let d = (this.p5Instance as any).constructor.Vector.dist(this.position, letters[i].position);
          if (d > 0 && d < neighborDistance) {
            sum.add(letters[i].velocity);
            count++;
            // Early exit for performance - limit to 5 neighbors
            if (count >= 5) break;
          }
        }
        if (count > 0) {
          sum.div(count);
          sum.normalize();
          sum.mult(this.maxSpeed);
          let steer = (this.p5Instance as any).constructor.Vector.sub(sum, this.velocity);
          steer.limit(this.maxForce);
          return steer;
        } else {
          return this.p5Instance.createVector(0, 0);
        }
      }

      cohesion(letters: Letter[]) {
        let neighborDistance = 40; // Reduced for better performance
        let sum = this.p5Instance.createVector(0, 0);
        let count = 0;
        for (let i = 0; i < letters.length; i++) {
          let d = (this.p5Instance as any).constructor.Vector.dist(this.position, letters[i].position);
          if (d > 0 && d < neighborDistance) {
            sum.add(letters[i].position);
            count++;
            // Early exit for performance - limit to 5 neighbors
            if (count >= 5) break;
          }
        }
        if (count > 0) {
          sum.div(count);
          return this.seek(sum);
        } else {
          return this.p5Instance.createVector(0, 0);
        }
      }
    }

    const sketch = (p: any) => {
      let flock: Flock;
      let playing = true;

      p.setup = () => {
        p.createCanvas(800, 400);
        p.pixelDensity(2);
        p.textAlign(p.CENTER, p.CENTER);
        p.noStroke();
        p.colorMode(p.RGB); // Use RGB for better fire colors

        flock = new Flock();

        // Add an initial set of letters into the system (reduced for performance)
        for (let i = 0; i < 30; i++) {
          let l = new Letter(p.width / 2, p.height / 2, p);
          flock.addLetter(l);
        }

        p.background(0);
      };

      p.draw = () => {
        if (!playing) return;

        p.background(0);
        flock.run();
      };

      // Mouse interaction creates fire trails
      p.mouseDragged = () => {
        // Create a fire trail effect with variable sizes
        for (let i = 0; i < 5; i++) {
          let offsetX = p.random(-15, 15);
          let offsetY = p.random(-15, 15);
          let trailLetter = new Letter(p.mouseX + offsetX, p.mouseY + offsetY, p);
          
          // Make trail letters smaller and more varied in size
          trailLetter.size = p.random(6, 14); // Variable size for fire trail effect
          trailLetter.maxSpeed = p.random(1.5, 3.5); // Variable speed
          
          flock.addLetter(trailLetter);
        }
      };

      // Add keyboard interaction
      p.keyPressed = () => {
        if (p.key === ' ') {
          playing = !playing;
        } else if (p.key === 'r' || p.key === 'R') {
          // Reset flock
          flock = new Flock();
          for (let i = 0; i < 30; i++) {
            let l = new Letter(p.width / 2, p.height / 2, p);
            flock.addLetter(l);
          }
        }
      };
    };

    (async () => {
      const mod = await import('p5');
      const P5 = mod.default as any;
      p5InstanceRef.current = new P5(sketch, canvasRef.current!);
    })();

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
          <h1>Typography Generator</h1>
          <p>Interactive fire trail letters with p5.js - Drag to create glowing fire trails, press Space to pause/play, press R to reset</p>
        </div>

        <div className={styles.controls}>
          <div className={styles.controlGroup}>
            <h3>Interactive Controls</h3>
            <p><strong>Drag mouse</strong> to create glowing fire trails</p>
            <p><strong>Press Space</strong> key to pause/play the animation</p>
            <p><strong>Press R</strong> key to reset the flock</p>
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
            <h3>About This Flocking System</h3>
            <p>This is a fire trail flocking simulation featuring:</p>
            <ul>
              <li>30 glowing letters that behave like birds</li>
              <li>Separation, alignment, and cohesion behaviors</li>
              <li>Multi-layer fire glow effect with RGB colors</li>
              <li>Variable-sized fire trail creation via mouse drag</li>
              <li>Real-time flocking physics simulation</li>
            </ul>
          </div>
        </div>

        <div className={styles.canvasContainer}>
          <div ref={canvasRef} className={styles.canvas}></div>
        </div>

        <div className={styles.info}>
          <h3>Technical Features:</h3>
          <ul>
            <li>Optimized flocking behavior simulation with 30 letters</li>
            <li>Separation, alignment, and cohesion algorithms</li>
            <li>Multi-layer fire glow effect with RGB color space</li>
            <li>Interactive mouse drag to create variable-sized fire trails</li>
            <li>Real-time physics simulation with 60fps performance</li>
            <li>Wraparound borders for continuous movement</li>
            <li>Vector-based movement and steering behaviors</li>
            <li>Performance optimizations: limited neighbors, reduced distances</li>
          </ul>
          
          <h3>Learning Objectives:</h3>
          <ul>
            <li>Understanding flocking behavior algorithms</li>
            <li>Working with p5.js vectors and physics</li>
            <li>HSB color space and dynamic color generation</li>
            <li>Interactive mouse events and canvas programming</li>
            <li>Object-oriented programming with classes</li>
            <li>Steering behaviors and autonomous agents</li>
          </ul>
        </div>
      </main>
    </div>
  );
} 