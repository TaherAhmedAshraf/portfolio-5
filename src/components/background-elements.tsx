"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface DotProperties {
  r: number;
  x1: string;
  y1: string;
  x2: string;
  y2: string;
  x3: string;
  y3: string;
  x4: string;
  y4: string;
  fill: string;
  duration: number;
}

interface GradientElement {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  delay: number;
  duration: number;
}

export function BackgroundElements() {
  // Create random positions for the gradient elements
  const [elements, setElements] = useState<GradientElement[]>([]);
  const [dots, setDots] = useState<DotProperties[]>([]);
  const [isClient, setIsClient] = useState(false);
  
  // Initialize dots only on the client to avoid hydration mismatch
  useEffect(() => {
    setIsClient(true);
    
    // Generate random gradient elements when component mounts
    // Array of colors in the teal/cyan to blue palette
    const colors = [
      'radial-gradient(circle at center, rgba(0, 210, 255, 0.7), transparent)',
      'radial-gradient(circle at center, rgba(58, 123, 213, 0.7), transparent)',
      'radial-gradient(circle at center, rgba(0, 255, 200, 0.7), transparent)',
      'radial-gradient(circle at center, rgba(0, 180, 220, 0.7), transparent)',
      'radial-gradient(circle at center, rgba(100, 0, 255, 0.5), transparent)',
    ];
    
    const newElements = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      x: Math.random() * 100, // Random percentage across viewport width
      y: Math.random() * 100, // Random percentage across viewport height
      size: 100 + Math.random() * 300, // Random size between 100px and 400px
      color: colors[Math.floor(Math.random() * colors.length)], // Random color from our palette
      delay: i * 0.5, // Staggered animation delay
      duration: 15 + Math.floor(Math.random() * 10), // Fixed duration to avoid hydration mismatch
    }));
    
    setElements(newElements);
    
    // Generate random dot properties
    const newDots = Array.from({ length: 15 }, (_, i) => ({
      r: 1 + Math.random(),
      x1: `${Math.random() * 100}%`,
      y1: `${Math.random() * 100}%`,
      x2: `${Math.random() * 100}%`,
      y2: `${Math.random() * 100}%`,
      x3: `${Math.random() * 100}%`,
      y3: `${Math.random() * 100}%`,
      x4: `${Math.random() * 100}%`,
      y4: `${Math.random() * 100}%`,
      fill: `url(#${i % 2 === 0 ? 'dotGradient' : 'dotGradient2'})`,
      duration: 30 + Math.floor(Math.random() * 30) // Fixed random value
    }));
    
    setDots(newDots);
  }, []);
  
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Gradient Elements */}
      {isClient && elements.map((element) => (
        <motion.div
          key={element.id}
          className="absolute rounded-full blur-3xl opacity-15 mix-blend-soft-light"
          style={{
            background: element.color,
            width: `${element.size}px`,
            height: `${element.size}px`,
            left: `${element.x}%`,
            top: `${element.y}%`,
          }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ 
            opacity: [0.05, 0.10, 0.05],
            scale: [1, 1.2, 1],
            x: [0, 30, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: element.duration,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
            delay: element.delay,
          }}
        />
      ))}
      
      {/* Moving Particles */}
      <div className="absolute inset-0">
        <svg width="100%" height="100%" className="opacity-20">
          <defs>
            <radialGradient id="dotGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
              <stop offset="0%" stopColor="#00d2ff" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#00d2ff" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="dotGradient2" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
              <stop offset="0%" stopColor="#3a7bd5" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#3a7bd5" stopOpacity="0" />
            </radialGradient>
          </defs>
          {isClient && dots.map((dot, i) => (
            <motion.circle
              key={i}
              r={dot.r}
              fill={dot.fill}
              initial={{ x: dot.x1, y: dot.y1 }}
              animate={{
                x: [dot.x1, dot.x2, dot.x3, dot.x4],
                y: [dot.y1, dot.y2, dot.y3, dot.y4],
              }}
              transition={{
                duration: dot.duration,
                repeat: Infinity,
                repeatType: "loop",
                ease: "linear",
                times: [0, 0.33, 0.66, 1],
              }}
            />
          ))}
        </svg>
      </div>
      
      {/* Animated matrix rain effect */}
      <div className="absolute inset-0 opacity-5">
        <div className="matrix-rain"></div>
      </div>
      
      {/* Animated Noise Overlay */}
      <motion.div 
        className="absolute inset-0 opacity-[0.015]"
        style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 300 300' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%' height='100%' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundSize: '200px 200px',
        }}
        animate={{ 
          backgroundPosition: ['0px 0px', '200px 200px'],
        }}
        transition={{ 
          duration: 20, 
          repeat: Infinity, 
          ease: "linear" 
        }}
      />
    </div>
  );
} 