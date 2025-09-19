"use client";

// Template for creating a new prototype
// To use this template:
// 1. Create a new folder in app/prototypes with your prototype name
// 2. Copy this file and styles.module.css into your new folder
// 3. Create an 'images' folder for your prototype's images
// 4. Rename and customize the component and styles as needed

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState } from 'react';
import styles from './styles.module.css';

export default function PrototypeTemplate() {

  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={styles.welcome}
        >
          <h1>Welcome to Your Prototype!</h1>
          <p>This template shows you how to add interactive elements.</p>
        </motion.div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
          className={styles.interactiveButton}
        >
          <motion.span
            animate={{ 
              color: isHovered ? "#ff6b6b" : "#333",
              textShadow: isHovered ? "0 0 10px #ff6b6b" : "none"
            }}
          >
            Hover me!
          </motion.span>
        </motion.button>

        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className={styles.card}
        >
          <h3>Animated Card</h3>
          <p>This card slides in from the left with a delay.</p>
        </motion.div>
      </main>
    </div>
  );
} 