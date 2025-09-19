"use client";

import { Suspense, useState, useRef, useCallback } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Text, Html } from '@react-three/drei';
import { Physics, useBox, useSphere } from '@react-three/cannon';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import styles from './styles.module.css';

// Magic 8-ball answers
const answers = [
  "It is certain",
  "It is decidedly so", 
  "Without a doubt",
  "Yes definitely",
  "You may rely on it",
  "As I see it, yes",
  "Most likely",
  "Outlook good",
  "Yes",
  "Signs point to yes",
  "Reply hazy, try again",
  "Ask again later",
  "Better not tell you now",
  "Cannot predict now",
  "Concentrate and ask again",
  "Don't count on it",
  "My reply is no",
  "My sources say no",
  "Outlook not so good",
  "Very doubtful"
];

// Pool Table Component
function PoolTable() {
  const [tableRef] = useBox(() => ({
    position: [0, -0.5, 0],
    args: [4, 1, 8],
    type: 'Static'
  }));

  const [rail1Ref] = useBox(() => ({
    position: [0, 0, 4.5],
    args: [4.2, 0.2, 0.2],
    type: 'Static'
  }));

  const [rail2Ref] = useBox(() => ({
    position: [0, 0, -4.5],
    args: [4.2, 0.2, 0.2],
    type: 'Static'
  }));

  const [rail3Ref] = useBox(() => ({
    position: [2.1, 0, 0],
    args: [0.2, 0.2, 8.2],
    type: 'Static'
  }));

  const [rail4Ref] = useBox(() => ({
    position: [-2.1, 0, 0],
    args: [0.2, 0.2, 8.2],
    type: 'Static'
  }));

  return (
    <group>
      {/* Pool Table Surface */}
      <mesh ref={tableRef}>
        <boxGeometry args={[4, 1, 8]} />
        <meshStandardMaterial color="#0d4f3c" />
      </mesh>
      
      {/* Rails */}
      <mesh ref={rail1Ref}>
        <boxGeometry args={[4.2, 0.2, 0.2]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>
      
      <mesh ref={rail2Ref}>
        <boxGeometry args={[4.2, 0.2, 0.2]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>
      
      <mesh ref={rail3Ref}>
        <boxGeometry args={[0.2, 0.2, 8.2]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>
      
      <mesh ref={rail4Ref}>
        <boxGeometry args={[0.2, 0.2, 8.2]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>
    </group>
  );
}

// 8-Ball Component
function EightBall({ position, onShoot }: { position: [number, number, number], onShoot: () => void }) {
  const [ballRef, api] = useSphere(() => ({
    mass: 1,
    position,
    args: [0.15],
    material: { friction: 0.1, restitution: 0.8 }
  }));

  const shootBall = useCallback(() => {
    const force: [number, number, number] = [0, 0, -8];
    const position: [number, number, number] = [0, 0, 0];
    api.applyImpulse(force, position);
    onShoot();
  }, [api, onShoot]);

  return (
    <mesh ref={ballRef} onClick={shootBall}>
      <sphereGeometry args={[0.15, 32, 32]} />
      <meshStandardMaterial 
        color="#000000"
        metalness={0.8}
        roughness={0.2}
        envMapIntensity={1}
      />
      {/* 8 on the ball */}
      <Text
        position={[0, 0, 0.16]}
        fontSize={0.1}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        8
      </Text>
    </mesh>
  );
}

// Cue Ball Component
function CueBall({ position }: { position: [number, number, number] }) {
  const [ballRef, api] = useSphere(() => ({
    mass: 1,
    position,
    args: [0.15],
    material: { friction: 0.1, restitution: 0.8 }
  }));

  return (
    <mesh ref={ballRef}>
      <sphereGeometry args={[0.15, 32, 32]} />
      <meshStandardMaterial 
        color="#ffffff"
        metalness={0.1}
        roughness={0.1}
      />
    </mesh>
  );
}

// 3D Scene Component
function Scene({ onShoot }: { onShoot: () => void }) {
  return (
    <Physics gravity={[0, -9.81, 0]} defaultContactMaterial={{ friction: 0.1, restitution: 0.8 }}>
      <Environment preset="warehouse" />
      
      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
      <pointLight position={[0, 5, 0]} intensity={0.5} />
      
      {/* Pool Table */}
      <PoolTable />
      
      {/* Balls */}
      <EightBall position={[0, 0.2, 0]} onShoot={onShoot} />
      <CueBall position={[0, 0.2, 2]} />
    </Physics>
  );
}

export default function Magic8BallPrototype() {
  const [currentAnswer, setCurrentAnswer] = useState<string | null>(null);
  const [isShaking, setIsShaking] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);

  const generateAnswer = useCallback(() => {
    setIsShaking(true);
    setShowAnswer(false);
    
    setTimeout(() => {
      const randomAnswer = answers[Math.floor(Math.random() * answers.length)];
      setCurrentAnswer(randomAnswer);
      setIsShaking(false);
      setShowAnswer(true);
    }, 2000);
  }, []);

  const handleBallShoot = useCallback(() => {
    generateAnswer();
  }, [generateAnswer]);

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <Link href="/" className={styles.backButton}>
          <span className={styles.backIcon}>◀</span>
          <span>Back to Home</span>
        </Link>
        <h1 className={styles.title}>Magic 8-Ball Pool</h1>
      </div>

      {/* 3D Scene */}
      <div className={styles.sceneContainer}>
        <Canvas
          camera={{ position: [0, 3, 6], fov: 50 }}
          shadows
          className={styles.canvas}
        >
          <Suspense fallback={null}>
            <Scene onShoot={handleBallShoot} />
            <OrbitControls 
              enablePan={false}
              maxPolarAngle={Math.PI / 2}
              minDistance={4}
              maxDistance={10}
            />
          </Suspense>
        </Canvas>
      </div>

      {/* Magic 8-Ball Interface */}
      <div className={styles.interface}>
        {/* Classic Magic 8-Ball Design */}
        <div className={styles.magic8BallContainer}>
          <motion.div
            className={`${styles.magic8Ball} ${isShaking ? styles.shaking : ''}`}
            onClick={generateAnswer}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            animate={isShaking ? { 
              rotate: [0, -15, 15, -15, 15, 0],
              scale: [1, 1.1, 1, 1.1, 1]
            } : {}}
            transition={{ duration: 0.1, repeat: isShaking ? 20 : 0 }}
          >
            {/* 8-Ball Surface */}
            <div className={styles.ballSurface}>
              <div className={styles.ballNumber}>8</div>
            </div>
            
            {/* Answer Window */}
            <div className={styles.answerWindow}>
              <AnimatePresence>
                {showAnswer && currentAnswer ? (
                  <motion.div
                    className={styles.answerText}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                  >
                    {currentAnswer}
                  </motion.div>
                ) : (
                  <div className={styles.placeholderText}>
                    {isShaking ? 'Shaking...' : 'Ask a question'}
                  </div>
                )}
              </AnimatePresence>
            </div>
            
            {/* Ball Highlights */}
            <div className={styles.ballHighlight}></div>
            <div className={styles.ballShadow}></div>
          </motion.div>
        </div>

        {/* Question Input */}
        <div className={styles.questionInput}>
          <input
            type="text"
            placeholder="Ask the Magic 8-Ball a question..."
            className={styles.questionField}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                generateAnswer();
              }
            }}
          />
          <motion.button
            className={styles.askButton}
            onClick={generateAnswer}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={isShaking}
          >
            Ask
          </motion.button>
        </div>

        {/* Instructions */}
        <div className={styles.gameInstructions}>
          <h3>How to Play:</h3>
          <ul>
            <li>Type your question in the input field above</li>
            <li>Click the Magic 8-Ball or press Enter to ask</li>
            <li>Watch the ball shake and reveal your answer!</li>
            <li>Click the 8-ball in the 3D scene to shoot it</li>
            <li>Use mouse to rotate the camera view</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
