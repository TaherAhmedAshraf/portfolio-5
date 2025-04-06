"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";

interface SectionBackgroundProps {
  variant?: "default" | "gradient" | "dots" | "grid" | "minimal";
  className?: string;
  intensity?: "low" | "medium" | "high";
}

export function SectionBackground({ 
  variant = "default", 
  intensity = "medium",
  className = "" 
}: SectionBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isClient, setIsClient] = useState(false);
  
  // Set isClient to true after initial render
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  // Grid or dots canvas animation effect
  useEffect(() => {
    if (variant !== "grid" && variant !== "dots") return;
    
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
    
    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);
    
    // Grid properties based on variant
    const isGrid = variant === "grid";
    const gridSpacing = isGrid ? 40 : 60; 
    const dotSize = isGrid ? 1 : 1.5;
    let angle = 0;
    
    // Define opacity based on intensity
    let opacityValue = 0.15;
    if (intensity === "low") opacityValue = 0.08;
    if (intensity === "high") opacityValue = 0.25;
    
    // Animation
    const animate = () => {
      if (!ctx || !canvas) return;
      
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Create gradient for dots
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, `rgba(0, 210, 255, ${opacityValue})`);
      gradient.addColorStop(0.5, `rgba(58, 123, 213, ${opacityValue})`);
      gradient.addColorStop(1, `rgba(0, 255, 200, ${opacityValue})`);
      
      ctx.fillStyle = gradient;
      
      // Calculate perspective distortion
      const perspectiveOffset = Math.sin(angle * 0.2) * 3;
      
      // Draw grid dots
      for (let x = 0; x < canvas.width; x += gridSpacing) {
        for (let y = 0; y < canvas.height; y += gridSpacing) {
          // For dots, skip some dots to create a pattern
          if (variant === "dots" && (x % (gridSpacing * 2) === 0 || y % (gridSpacing * 2) === 0)) continue;
          
          const distanceFromCenter = Math.sqrt(
            Math.pow((x - canvas.width / 2) / canvas.width, 2) + 
            Math.pow((y - canvas.height / 2) / canvas.height, 2)
          );
          
          const dotScale = 1 - distanceFromCenter + (Math.sin(angle + distanceFromCenter * 8) * 0.2);
          const currentDotSize = Math.max(0, dotSize * dotScale);
          
          // Apply subtle perspective distortion
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
    
    return () => {
      window.removeEventListener('resize', updateCanvasSize);
    };
  }, [variant, intensity, isClient]); // Add isClient to dependencies to ensure animation runs after client render
  
  // Calculate opacity based on intensity
  const getOpacity = () => {
    switch (intensity) {
      case "low": return "opacity-5";
      case "high": return "opacity-20";
      default: return "opacity-10";
    }
  };

  // Define gradient animation props with fixed values to avoid hydration mismatches
  const gradientAnimations = [
    {
      className: `absolute w-96 h-96 rounded-full blur-3xl mix-blend-soft-light ${getOpacity()}`,
      style: {
        background: "radial-gradient(circle at center, rgba(0, 210, 255, 0.2), transparent 70%)",
        top: "10%",
        right: "5%",
      },
      animate: { 
        y: [0, -30, 0],
        x: [0, 20, 0],
        scale: [1, 1.1, 1],
      },
      transition: {
        duration: 15,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
      }
    },
    {
      className: `absolute w-80 h-80 rounded-full blur-3xl mix-blend-soft-light ${getOpacity()}`,
      style: {
        background: "radial-gradient(circle at center, rgba(0, 255, 200, 0.2), transparent 70%)",
        bottom: "10%",
        left: "5%",
      },
      animate: { 
        y: [0, 30, 0],
        x: [0, -20, 0],
        scale: [1, 1.2, 1],
      },
      transition: {
        duration: 18,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
        delay: 2
      }
    }
  ];

  return (
    <div className={`absolute inset-0 -z-10 overflow-hidden pointer-events-none ${className}`}>
      {/* Canvas for grid or dots variant */}
      {(variant === "grid" || variant === "dots") && (
        <canvas 
          ref={canvasRef} 
          className={`absolute inset-0 w-full h-full ${getOpacity()}`}
        />
      )}
      
      {isClient && (variant === "default" || variant === "gradient") && (
        <>
          {/* Floating gradients */}
          {gradientAnimations.map((item, index) => (
            <motion.div
              key={`gradient-${index}`}
              className={item.className}
              style={item.style}
              animate={item.animate}
              transition={item.transition}
            />
          ))}
          
          {variant === "gradient" && (
            <motion.div
              className={`absolute w-[140%] h-[140%] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl mix-blend-soft-light ${getOpacity()}`}
              style={{
                background: `radial-gradient(circle at center, rgba(0, 210, 255, 0.1), transparent 70%)`,
              }}
              animate={{ 
                scale: [1, 1.1, 1],
                opacity: [0.05, 0.1, 0.05]
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              }}
            />
          )}
        </>
      )}
      
      {/* Minimal variant - just a subtle glow */}
      {isClient && variant === "minimal" && (
        <motion.div
          className="absolute inset-0 opacity-5"
          style={{
            background: "linear-gradient(45deg, rgba(0, 210, 255, 0.05), rgba(0, 255, 200, 0.05))"
          }}
          animate={{ 
            opacity: [0.03, 0.07, 0.03] 
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />
      )}
      
      {/* Scanline effect for all variants */}
      <motion.div 
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{ 
          backgroundImage: 'linear-gradient(to bottom, transparent 50%, rgba(0, 0, 0, 0.05) 50%)',
          backgroundSize: '100% 4px'
        }}
        animate={{ 
          backgroundPosition: ['0px 0px', '0px 4px'],
        }}
        transition={{ 
          duration: 0.3, 
          repeat: Infinity,
          ease: "linear"
        }}
      />
    </div>
  );
} 