'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import styles from './styles.module.css';

// Game of Life Text Generator
// This prototype allows users to input text and watch it form using Conway's Game of Life patterns

interface GameOfLifeProps {}

export default function GameOfLifeText({}: GameOfLifeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const animationRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const [isRunning, setIsRunning] = useState(false);
  const [text, setText] = useState('HELLO');
  const [cellSize, setCellSize] = useState(8);
  const [speed, setSpeed] = useState(10);
  const [useCamera, setUseCamera] = useState(false);
  const [showInputText, setShowInputText] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [useTextMode, setUseTextMode] = useState(true);
  
  // Game state
  const [currentCells, setCurrentCells] = useState<number[][]>([]);
  const [nextCells, setNextCells] = useState<number[][]>([]);
  const [columnCount, setColumnCount] = useState(0);
  const [rowCount, setRowCount] = useState(0);

  // Initialize canvas and grid
  const initializeGrid = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size to fill most of the screen
    const maxWidth = Math.min(window.innerWidth - 40, 1200);
    const maxHeight = Math.min(window.innerHeight - 120, 800);
    
    canvas.width = maxWidth;
    canvas.height = maxHeight;

    // Calculate grid dimensions
    const cols = Math.floor(canvas.width / cellSize);
    const rows = Math.floor(canvas.height / cellSize);
    
    setColumnCount(cols);
    setRowCount(rows);

    // Initialize cell arrays
    const current = Array(cols).fill(null).map(() => Array(rows).fill(0));
    const next = Array(cols).fill(null).map(() => Array(rows).fill(0));
    
    setCurrentCells(current);
    setNextCells(next);
  }, [cellSize]);

  // Convert text to initial pattern
  const textToPattern = useCallback((inputText: string) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Set font properties
    const fontSize = Math.min(cellSize * 8, 64);
    ctx.font = `bold ${fontSize}px monospace`;
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Draw text
    ctx.fillText(inputText, canvas.width / 2, canvas.height / 2);

    // Get image data and convert to pattern
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    const cols = Math.floor(canvas.width / cellSize);
    const rows = Math.floor(canvas.height / cellSize);
    
    const pattern = Array(cols).fill(null).map(() => Array(rows).fill(0));

    // Sample pixels and create pattern
    for (let col = 0; col < cols; col++) {
      for (let row = 0; row < rows; row++) {
        const x = col * cellSize + Math.floor(cellSize / 2);
        const y = row * cellSize + Math.floor(cellSize / 2);
        
        if (x < canvas.width && y < canvas.height) {
          const pixelIndex = (y * canvas.width + x) * 4;
          const alpha = data[pixelIndex + 3];
          
          // If pixel is not transparent, make it alive
          if (alpha > 128) {
            pattern[col][row] = 1;
          }
        }
      }
    }

    return pattern;
  }, [cellSize]);

  // Convert camera feed to pattern
  const cameraToPattern = useCallback(() => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    if (!canvas || !video) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw video frame to canvas
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Get image data and convert to pattern
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    const cols = Math.floor(canvas.width / cellSize);
    const rows = Math.floor(canvas.height / cellSize);
    
    const pattern = Array(cols).fill(null).map(() => Array(rows).fill(0));

    // Sample pixels and create pattern based on brightness
    for (let col = 0; col < cols; col++) {
      for (let row = 0; row < rows; row++) {
        const x = col * cellSize + Math.floor(cellSize / 2);
        const y = row * cellSize + Math.floor(cellSize / 2);
        
        if (x < canvas.width && y < canvas.height) {
          const pixelIndex = (y * canvas.width + x) * 4;
          const r = data[pixelIndex];
          const g = data[pixelIndex + 1];
          const b = data[pixelIndex + 2];
          
          // Calculate brightness
          const brightness = (r + g + b) / 3;
          
          // If pixel is dark enough, make it alive
          if (brightness < 100) {
            pattern[col][row] = 1;
          }
        }
      }
    }

    return pattern;
  }, [cellSize]);

  // Start camera
  const startCamera = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          width: 800, 
          height: 400,
          facingMode: 'user'
        } 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      alert('Unable to access camera. Please check permissions.');
    }
  }, []);

  // Stop camera
  const stopCamera = useCallback(() => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
  }, []);

  // Game of Life rules
  const generateNextGeneration = useCallback((current: number[][]) => {
    const next = Array(columnCount).fill(null).map(() => Array(rowCount).fill(0));

    for (let col = 0; col < columnCount; col++) {
      for (let row = 0; row < rowCount; row++) {
        // Calculate neighbor positions with wrapping
        const left = (col - 1 + columnCount) % columnCount;
        const right = (col + 1) % columnCount;
        const above = (row - 1 + rowCount) % rowCount;
        const below = (row + 1) % rowCount;

        // Count living neighbors
        const neighbors =
          current[left][above] +
          current[col][above] +
          current[right][above] +
          current[left][row] +
          current[right][row] +
          current[left][below] +
          current[col][below] +
          current[right][below];

        // Apply Game of Life rules
        if (neighbors < 2 || neighbors > 3) {
          next[col][row] = 0; // Dies
        } else if (neighbors === 3) {
          next[col][row] = 1; // Becomes alive
        } else {
          next[col][row] = current[col][row]; // Stays the same
        }
      }
    }

    return next;
  }, [columnCount, rowCount]);

  // Draw the grid with text characters or cells
  const drawGrid = useCallback((cells: number[][]) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (useTextMode) {
      // Text mode - draw characters
      const fontSize = Math.max(cellSize * 0.8, 8);
      ctx.font = `bold ${fontSize}px monospace`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      // Draw text characters instead of cells
      for (let col = 0; col < columnCount; col++) {
        for (let row = 0; row < rowCount; row++) {
          const cell = cells[col][row];
          
          const x = col * cellSize + cellSize / 2;
          const y = row * cellSize + cellSize / 2;
          
          if (cell === 1) {
            // Alive cell - show a character from the input text in black
            const charIndex = (col + row) % text.length;
            const char = text[charIndex] || '●';
            
            ctx.fillStyle = '#000000';
            ctx.fillText(char, x, y);
          } else {
            // Dead cell - show a subtle dot in light gray
            ctx.fillStyle = '#f0f0f0';
            ctx.fillText('·', x, y);
          }
        }
      }
    } else {
      // Cell mode - draw traditional squares
      for (let col = 0; col < columnCount; col++) {
        for (let row = 0; row < rowCount; row++) {
          const cell = cells[col][row];
          
          // Set color: black for alive (1), white for dead (0)
          ctx.fillStyle = cell ? '#000000' : '#ffffff';
          ctx.strokeStyle = '#cccccc';
          ctx.lineWidth = 0.5;
          
          const x = col * cellSize;
          const y = row * cellSize;
          
          ctx.fillRect(x, y, cellSize, cellSize);
          ctx.strokeRect(x, y, cellSize, cellSize);
        }
      }
    }
  }, [columnCount, rowCount, cellSize, text, useTextMode]);

  // Animation loop
  const animate = useCallback(() => {
    if (!isRunning) return;

    setCurrentCells(prev => {
      const next = generateNextGeneration(prev);
      setNextCells(next);
      return next;
    });

    animationRef.current = setTimeout(() => {
      animate();
    }, 1000 / speed);
  }, [isRunning, generateNextGeneration, speed]);

  // Start animation
  useEffect(() => {
    if (isRunning) {
      animate();
    } else {
      if (animationRef.current) {
        clearTimeout(animationRef.current);
      }
    }

    return () => {
      if (animationRef.current) {
        clearTimeout(animationRef.current);
      }
    };
  }, [isRunning, animate]);

  // Initialize grid when component mounts or cellSize changes
  useEffect(() => {
    initializeGrid();
  }, [initializeGrid]);

  // Cleanup camera on unmount
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, [stopCamera]);

  // Draw grid when cells change
  useEffect(() => {
    if (currentCells.length > 0) {
      drawGrid(currentCells);
    }
  }, [currentCells, drawGrid]);

  // Handle text input and create pattern
  const handleTextSubmit = () => {
    setIsGenerating(true);
    setShowInputText(true);
    
    // Add a 3 second delay before generating the pattern
    setTimeout(() => {
      const pattern = useCamera ? cameraToPattern() : textToPattern(text);
      if (pattern) {
        setCurrentCells(pattern);
        setNextCells(Array(columnCount).fill(null).map(() => Array(rowCount).fill(0)));
      }
      setIsGenerating(false);
      setShowInputText(false);
    }, 3000);
  };

  // Handle camera toggle
  const handleCameraToggle = () => {
    if (useCamera) {
      stopCamera();
      setUseCamera(false);
    } else {
      startCamera();
      setUseCamera(true);
    }
  };

  // Randomize board
  const randomizeBoard = () => {
    const random = Array(columnCount).fill(null).map(() => 
      Array(rowCount).fill(null).map(() => Math.random() < 0.3 ? 1 : 0)
    );
    setCurrentCells(random);
    setNextCells(Array(columnCount).fill(null).map(() => Array(rowCount).fill(0)));
  };

  // Clear board
  const clearBoard = () => {
    const empty = Array(columnCount).fill(null).map(() => Array(rowCount).fill(0));
    setCurrentCells(empty);
    setNextCells(Array(columnCount).fill(null).map(() => Array(rowCount).fill(0)));
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.heart}></div>
        <h1 className={styles.title}>Game of Life Text Generator</h1>
      </div>

      <div className={styles.controls}>
        <button 
          onClick={handleTextSubmit} 
          className={styles.button}
          disabled={isGenerating}
        >
          {isGenerating ? 'Generating...' : 'Generate'}
        </button>
        <button 
          onClick={handleCameraToggle} 
          className={`${styles.button} ${useCamera ? styles.cameraActive : styles.cameraInactive}`}
        >
          {useCamera ? 'Stop Camera' : 'Camera'}
        </button>
        <button 
          onClick={() => setUseTextMode(!useTextMode)} 
          className={`${styles.button} ${useTextMode ? styles.textModeActive : styles.cellModeActive}`}
        >
          {useTextMode ? 'Text' : 'Cells'}
        </button>
        <button
          onClick={() => setIsRunning(!isRunning)}
          className={`${styles.button} ${isRunning ? styles.stopButton : styles.startButton}`}
        >
          {isRunning ? 'Stop' : 'Start'}
        </button>
        <Link href="/" className={styles.button}>
          Back to Home
        </Link>
      </div>

      <div className={styles.canvasContainer}>
        <div className={styles.canvasWrapper}>
          <canvas
            ref={canvasRef}
            className={styles.canvas}
          />
          {useCamera && (
            <video
              ref={videoRef}
              className={styles.video}
              width={800}
              height={400}
              style={{ display: 'none' }}
            />
          )}
          {showInputText && (
            <div className={styles.inputTextDisplay}>
              <div className={styles.inputTextContent}>
                {text}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className={styles.info}>
        <ul>
          <li>Enter text and click "Generate" to create patterns</li>
          <li>Click "Start" to begin the Game of Life simulation</li>
          <li>Toggle between Text and Cell modes for different visualizations</li>
          <li>Use camera to convert live video into patterns</li>
        </ul>
      </div>
    </div>
  );
} 