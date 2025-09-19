'use client';

import { useEffect, useRef, useState } from 'react';
import p5 from 'p5';
import Link from 'next/link';
import styles from './styles.module.css';

export default function TypographyGenerator() {
  const canvasRef = useRef<HTMLDivElement>(null);
  const p5InstanceRef = useRef<p5 | null>(null);
  
  // State for typography controls
  const [text, setText] = useState('Hello World');
  const [fontSize, setFontSize] = useState(48);
  const [fontWeight, setFontWeight] = useState(400);
  const [textColor, setTextColor] = useState('#000000');
  const [backgroundColor, setBackgroundColor] = useState('#ffffff');
  const [fontFamily, setFontFamily] = useState('Arial');
  const [textAlign, setTextAlign] = useState('center');
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    if (!canvasRef.current) return;

    const sketch = (p: p5) => {
      let animationOffset = 0;

      p.setup = () => {
        p.createCanvas(800, 400);
        p.background(backgroundColor);
      };

      p.draw = () => {
        // Clear canvas with background color
        p.background(backgroundColor);
        
        // Set text properties
        p.textAlign(textAlign as any);
        p.textSize(fontSize);
        p.fill(textColor);
        
        // Apply font family
        p.textFont(fontFamily);
        
        // Calculate text position
        let x = p.width / 2;
        let y = p.height / 2;
        
        if (textAlign === 'left') {
          x = 50;
        } else if (textAlign === 'right') {
          x = p.width - 50;
        }
        
        // Add animation effect if enabled
        if (isAnimated) {
          animationOffset += 0.05;
          const wave = p.sin(animationOffset) * 10;
          y += wave;
          
          // Add color animation
          const hue = (p.frameCount * 2) % 360;
          p.fill(`hsl(${hue}, 70%, 50%)`);
        }
        
        // Draw the text
        p.text(text, x, y);
        
        // Add some visual effects
        if (isAnimated) {
          // Add floating particles
          for (let i = 0; i < 5; i++) {
            const particleX = p.width / 2 + p.cos(animationOffset + i) * 100;
            const particleY = p.height / 2 + p.sin(animationOffset + i) * 50;
            p.fill(255, 100);
            p.noStroke();
            p.circle(particleX, particleY, 3);
          }
        }
      };
    };

    p5InstanceRef.current = new p5(sketch, canvasRef.current);

    return () => {
      if (p5InstanceRef.current) {
        p5InstanceRef.current.remove();
      }
    };
  }, [text, fontSize, textColor, backgroundColor, fontFamily, textAlign, isAnimated]);

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleFontSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFontSize(Number(e.target.value));
  };

  const handleFontWeightChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFontWeight(Number(e.target.value));
  };

  const handleTextColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTextColor(e.target.value);
  };

  const handleBackgroundColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBackgroundColor(e.target.value);
  };

  const handleFontFamilyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFontFamily(e.target.value);
  };

  const handleTextAlignChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTextAlign(e.target.value);
  };

  const toggleAnimation = () => {
    setIsAnimated(!isAnimated);
  };

  const resetToDefaults = () => {
    setText('Hello World');
    setFontSize(48);
    setFontWeight(400);
    setTextColor('#000000');
    setBackgroundColor('#ffffff');
    setFontFamily('Arial');
    setTextAlign('center');
    setIsAnimated(false);
  };

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div className={styles.header}>
          <Link href="/" className={styles.backLink}>← Back to Home</Link>
          <h1>Typography Generator</h1>
          <p>Create beautiful typography with interactive controls and animations</p>
        </div>

        <div className={styles.controls}>
          <div className={styles.controlGroup}>
            <label htmlFor="text">Text:</label>
            <input
              id="text"
              type="text"
              value={text}
              onChange={handleTextChange}
              placeholder="Enter your text here..."
            />
          </div>

          <div className={styles.controlGroup}>
            <label htmlFor="fontSize">Font Size: {fontSize}px</label>
            <input
              id="fontSize"
              type="range"
              min="12"
              max="120"
              value={fontSize}
              onChange={handleFontSizeChange}
            />
          </div>

          <div className={styles.controlGroup}>
            <label htmlFor="fontFamily">Font Family:</label>
            <select id="fontFamily" value={fontFamily} onChange={handleFontFamilyChange}>
              <option value="Arial">Arial</option>
              <option value="Helvetica">Helvetica</option>
              <option value="Times New Roman">Times New Roman</option>
              <option value="Georgia">Georgia</option>
              <option value="Verdana">Verdana</option>
              <option value="Courier New">Courier New</option>
              <option value="Impact">Impact</option>
              <option value="Comic Sans MS">Comic Sans MS</option>
            </select>
          </div>

          <div className={styles.controlGroup}>
            <label htmlFor="textAlign">Text Alignment:</label>
            <select id="textAlign" value={textAlign} onChange={handleTextAlignChange}>
              <option value="left">Left</option>
              <option value="center">Center</option>
              <option value="right">Right</option>
            </select>
          </div>

          <div className={styles.controlGroup}>
            <label htmlFor="textColor">Text Color:</label>
            <input
              id="textColor"
              type="color"
              value={textColor}
              onChange={handleTextColorChange}
            />
          </div>

          <div className={styles.controlGroup}>
            <label htmlFor="backgroundColor">Background Color:</label>
            <input
              id="backgroundColor"
              type="color"
              value={backgroundColor}
              onChange={handleBackgroundColorChange}
            />
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
            <button className={styles.resetButton} onClick={resetToDefaults}>
              Reset to Defaults
            </button>
          </div>
        </div>

        <div className={styles.canvasContainer}>
          <div ref={canvasRef} className={styles.canvas}></div>
        </div>

        <div className={styles.info}>
          <h3>Features:</h3>
          <ul>
            <li>Real-time typography preview with p5.js</li>
            <li>Customizable font size, family, and alignment</li>
            <li>Color picker for text and background</li>
            <li>Animated effects with floating particles</li>
            <li>Interactive controls for live editing</li>
          </ul>
        </div>
      </main>
    </div>
  );
}