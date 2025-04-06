"use client";

import { useEffect, useState, useRef } from "react";
import { MousePointer2 } from "lucide-react";

export function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVideoHover, setIsVideoHover] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initial cursor position in the center of the viewport
    setPosition({ 
      x: typeof window !== 'undefined' ? window.innerWidth / 2 : 0, 
      y: typeof window !== 'undefined' ? window.innerHeight / 2 : 0 
    });

    // Function to handle mouse movement
    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    // Function to handle hovering over interactive elements
    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = 
        target.tagName.toLowerCase() === 'a' || 
        target.tagName.toLowerCase() === 'button' || 
        target.role === 'button' ||
        target.tagName.toLowerCase() === 'input' ||
        target.tagName.toLowerCase() === 'textarea' ||
        target.tagName.toLowerCase() === 'select' ||
        target.classList.contains('interactive');
      
      // Check if hovering over a video item
      const isVideoItem = target.classList.contains('video-item') || 
                          target.closest('.video-item') !== null;
      
      setIsHovering(isInteractive);
      setIsVideoHover(isVideoItem);
    };

    // Function to handle mouse leaving the window
    const onMouseLeave = () => {
      setIsVisible(false);
    };

    // Function to handle mouse entering the window
    const onMouseEnter = () => {
      setIsVisible(true);
    };

    // Function to handle mouse down for clicking effect
    const onMouseDown = () => {
      setIsClicking(true);
    };

    // Function to handle mouse up
    const onMouseUp = () => {
      setIsClicking(false);
    };

    // Add event listeners
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseover', onMouseOver);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);
    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mouseup', onMouseUp);

    // Remove event listeners on cleanup
    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mouseup', onMouseUp);
    };
  }, [isVisible]);

  // Style to position the cursor
  const cursorStyle = {
    transform: `translate(${position.x}px, ${position.y}px)`,
    opacity: isVisible ? 1 : 0
  };

  // Dynamic class based on cursor state
  const cursorClass = `
    custom-cursor 
    ${isHovering ? 'cursor-hover' : ''} 
    ${isClicking ? 'cursor-clicking' : ''} 
    ${isVideoHover ? 'cursor-video' : ''}
  `.trim();

  return (
    <div 
      ref={cursorRef}
      className={cursorClass} 
      style={cursorStyle}
    >
      <div className="cursor-dot">
        <MousePointer2 
          size={isHovering ? 24 : 20} 
          strokeWidth={1.5} 
          className={`transition-all duration-300 ${
            isClicking 
              ? "text-white" 
              : isHovering 
                ? "text-primary"
                : "text-primary/80"
          }`}
          style={{
            transform: isClicking ? "scale(0.9) rotate(-10deg)" : isHovering ? "scale(1.1)" : "scale(1)",
            filter: isClicking 
              ? "drop-shadow(0 0 8px rgba(var(--primary-rgb), 0.8))" 
              : "drop-shadow(0 0 5px rgba(var(--primary-rgb), 0.5))"
          }}
        />
      </div>
      <div className="cursor-outline"></div>
    </div>
  );
} 