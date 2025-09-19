'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './styles.module.css';

export default function LiquidChromeCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);
  const blobRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef({ x: 0, y: 0 });
  const [isTabbing, setIsTabbing] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(true);

  // Handle keyboard navigation for accessibility
  useEffect(() => {
    const handleFirstTab = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        setIsTabbing(true);
        window.removeEventListener('keydown', handleFirstTab);
      }
    };

    window.addEventListener('keydown', handleFirstTab);
    return () => window.removeEventListener('keydown', handleFirstTab);
  }, []);

  // Mouse movement tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      targetRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, []);

  // Animation loop
  useEffect(() => {
    if (!cursorRef.current || !trailRef.current || !blobRef.current) return;

    const cursor = cursorRef.current;
    const trailRoot = trailRef.current;
    const blob = blobRef.current;

    // Create trail elements
    const TRAIL_LENGTH = 6;
    const trailItems: Array<{ el: HTMLDivElement; x: number; y: number }> = [];
    
    // Clear existing trail items
    trailRoot.innerHTML = '';
    
    for (let i = 0; i < TRAIL_LENGTH; i++) {
      const trailElement = document.createElement('div');
      trailElement.className = styles.trailBlob;
      trailElement.style.position = 'absolute';
      trailElement.style.left = '0';
      trailElement.style.top = '0';
      trailElement.style.width = 'var(--cursor-size)';
      trailElement.style.height = 'var(--cursor-size)';
      trailElement.style.borderRadius = '50%';
      trailElement.style.opacity = String(0.4 - (i * 0.05));
      trailElement.style.transform = `scale(${0.8 - i * 0.05})`;
      trailRoot.appendChild(trailElement);
      trailItems.push({
        el: trailElement,
        x: window.innerWidth / 2,
        y: window.innerHeight / 2
      });
    }

    let pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    let tick = 0;
    let animationId: number;

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const animate = () => {
      tick += 1;
      
      // Get current target position from ref
      const target = targetRef.current;
      
      // Lead blob movement with smooth interpolation
      pos.x = lerp(pos.x, target.x, 0.22);
      pos.y = lerp(pos.y, target.y, 0.22);
      
      const size = 36; // --cursor-size
      cursor.style.transform = `translate(${pos.x - size / 2}px, ${pos.y - size / 2}px)`;

      // Gentle iridescent spin: shift the hue
      const hueShift = (tick % 360);
      blob.style.filter = `contrast(220%) saturate(130%) hue-rotate(${hueShift / 10}deg)`;

      // Trail follow with smooth interpolation
      let prevX = pos.x;
      let prevY = pos.y;
      trailItems.forEach((t, i) => {
        t.x = lerp(t.x, prevX - (i * 1.5), 0.18);
        t.y = lerp(t.y, prevY - (i * 1.5), 0.18);
        t.el.style.transform = `translate(${t.x - size / 2}px, ${t.y - size / 2}px) scale(${0.85 - i * 0.05})`;
        prevX = t.x;
        prevY = t.y;
      });

      animationId = requestAnimationFrame(animate);
    };

    // Start animation
    animate();

    // Cleanup function
    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, []); // Remove mousePosition dependency


  // Handle hover interactions for clickable elements
  useEffect(() => {
    const shrink = () => {
      document.documentElement.style.setProperty('--cursor-size', '22px');
    };
    const grow = () => {
      document.documentElement.style.setProperty('--cursor-size', '36px');
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as Element;
      if (target.closest('a, button, [role="button"], input, textarea, select, label')) {
        shrink();
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as Element;
      if (target.closest('a, button, [role="button"], input, textarea, select, label')) {
        grow();
      }
    };

    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, []);

  return (
    <div className={`${styles.demo} ${isTabbing ? styles.userIsTabbing : ''}`}>
      <div>
        <h1>Liquid Chrome Cursor</h1>
        <p>
          This cursor mimics the Daft Punk chrome logo vibes (liquid metal + rainbow glints). 
          Move your mouse around to see the effect. The cursor features a chrome-like appearance 
          with trailing blobs and iridescent color shifts.
        </p>
        <p>
          <a href="#" onClick={(e) => e.preventDefault()}>
            Try hovering over this link
          </a>{' '}
          to see the cursor shrink, or{' '}
          <button onClick={() => alert('Button clicked!')}>
            click this button
          </button>{' '}
          to test interactions.
        </p>
        <p>
          <strong>Accessibility:</strong> The custom cursor automatically hides when using 
          keyboard navigation (Tab key) to maintain accessibility standards.
        </p>
      </div>

      {/* Custom cursor elements */}
      {!isTabbing && (
        <>
          <div 
            ref={cursorRef}
            className={styles.chromeCursor}
            style={{ display: isVisible ? 'block' : 'none' }}
            aria-hidden="true"
          >
            <div ref={blobRef} className={styles.chromeCursorBlob}></div>
            <div className={styles.chromeCursorSpark}></div>
          </div>

          <div 
            ref={trailRef}
            className={styles.chromeCursorTrail}
            style={{ display: isVisible ? 'block' : 'none' }}
            aria-hidden="true"
          ></div>
        </>
      )}
    </div>
  );
}
