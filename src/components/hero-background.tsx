"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";

export function HeroBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isClient, setIsClient] = useState(false);
  
  // Set isClient to true after initial render
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  // Canvas grid animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions to match parent
    const updateCanvasSize = () => {
      if (canvas && canvas.parentElement) {
        canvas.width = canvas.parentElement.offsetWidth;
        canvas.height = canvas.parentElement.offsetHeight;
      }
    };
    
    // Initial size
    updateCanvasSize();
    
    // Update on resize
    window.addEventListener('resize', updateCanvasSize);
    
    // Grid properties
    const gridSpacing = 40;
    const dotSize = 1;
    let angle = 0;
    
    // Animation
    const animate = () => {
      if (!ctx || !canvas) return;
      
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Create gradient for dots with new cyan/teal color
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, 'rgba(0, 210, 255, 0.15)');
      gradient.addColorStop(0.5, 'rgba(58, 123, 213, 0.15)');
      gradient.addColorStop(1, 'rgba(0, 255, 200, 0.15)');
      
      // Set styles
      ctx.fillStyle = gradient;
      
      // Calculate grid size with some perspective distortion
      const perspectiveOffset = Math.sin(angle * 0.2) * 5;
      
      // Draw grid dots
      for (let x = 0; x < canvas.width; x += gridSpacing) {
        for (let y = 0; y < canvas.height; y += gridSpacing) {
          const distanceFromCenter = Math.sqrt(
            Math.pow((x - canvas.width / 2) / canvas.width, 2) + 
            Math.pow((y - canvas.height / 2) / canvas.height, 2)
          );
          
          const dotScale = 1 - distanceFromCenter + (Math.sin(angle + distanceFromCenter * 10) * 0.2);
          const currentDotSize = Math.max(0, dotSize * dotScale);
          
          // Apply perspective distortion
          const offsetX = Math.sin(angle * 0.5 + y * 0.01) * perspectiveOffset;
          const offsetY = Math.cos(angle * 0.5 + x * 0.01) * perspectiveOffset;
          
          ctx.beginPath();
          ctx.arc(x + offsetX, y + offsetY, currentDotSize, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      
      // Update angle for animation
      angle += 0.005;
      
      // Continue animation
      requestAnimationFrame(animate);
    };
    
    // Start animation
    animate();
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', updateCanvasSize);
    };
  }, []);
  
  // Define shapes with fixed values to avoid hydration issues
  const shapes = [
    {
      type: "triangle",
      style: {
        top: '20%',
        left: '10%',
        width: '32px',
        height: '32px',
        background: 'linear-gradient(45deg, #00d2ff, transparent)',
        clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
      },
      animation: {
        y: [0, -20, 0],
        rotate: [0, 10, 0],
        scale: [1, 1.05, 1],
      },
      transition: {
        duration: 12,
        repeat: Infinity,
        ease: "easeInOut",
      }
    },
    {
      type: "circle",
      style: {
        top: '60%',
        right: '15%',
        width: '40px',
        height: '40px', 
        background: 'radial-gradient(circle, #3a7bd5, transparent)',
        borderRadius: '50%',
      },
      animation: {
        y: [0, 30, 0],
        x: [0, -20, 0],
        scale: [1, 1.1, 1],
      },
      transition: {
        duration: 18,
        repeat: Infinity,
        ease: "easeInOut",
      }
    },
    {
      type: "square",
      style: {
        top: '30%',
        right: '30%',
        width: '24px',
        height: '24px',
        background: 'linear-gradient(135deg, #00d2ff, transparent)',
      },
      animation: {
        y: [0, 40, 0],
        rotate: [0, 45, 0],
        scale: [1, 0.9, 1],
      },
      transition: {
        duration: 15,
        repeat: Infinity,
        ease: "easeInOut",
      }
    },
    {
      type: "rectangle",
      style: {
        bottom: '20%',
        left: '25%',
        width: '64px',
        height: '16px',
        background: 'linear-gradient(90deg, #00d2ff, transparent)',
      },
      animation: {
        x: [0, 50, 0],
        skewX: [0, 10, 0],
        scale: [1, 1.05, 1],
      },
      transition: {
        duration: 20,
        repeat: Infinity,
        ease: "easeInOut",
      }
    },
    {
      type: "pentagon",
      style: {
        top: '45%',
        left: '40%',
        width: '36px',
        height: '36px',
        background: 'linear-gradient(135deg, #00ccb4, transparent)',
        clipPath: 'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)',
      },
      animation: {
        y: [0, -30, 0],
        rotate: [0, 30, 0],
        scale: [1, 0.95, 1],
      },
      transition: {
        duration: 17,
        repeat: Infinity,
        ease: "easeInOut",
      }
    }
  ];
  
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      {/* Canvas-based animated grid */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full opacity-40"
      />
      
      {/* Floating geometric shapes */}
      {isClient && (
        <div className="absolute inset-0">
          {shapes.map((shape, index) => (
            <motion.div
              key={`shape-${index}`}
              className="absolute opacity-10"
              style={shape.style}
              animate={shape.animation}
              transition={shape.transition}
            />
          ))}
        </div>
      )}
      
      {/* Gradient halo */}
      <motion.div
        className="absolute top-1/2 left-1/2 w-[150%] h-[150%] rounded-full opacity-5"
        style={{
          background: `radial-gradient(circle at center, #00d2ff, transparent 70%)`,
          transform: 'translate(-50%, -50%)',
        }}
        animate={{
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
      />
      
      {/* Animated glow effect */}
      <motion.div
        className="absolute top-0 left-0 w-full h-full"
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: [0, 0.03, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
        style={{
          background: 'var(--primary-gradient)',
          mixBlendMode: 'overlay',
        }}
      />
    </div>
  );
} 