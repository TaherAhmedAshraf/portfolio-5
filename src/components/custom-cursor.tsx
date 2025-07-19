"use client";

import { useEffect, useRef } from "react";
import { MousePointer2 } from "lucide-react";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const positionRef = useRef({ x: 0, y: 0 });
  const isVisibleRef = useRef(true);
  const cursorStateRef = useRef({
    isHovering: false,
    isVideoHover: false,
    isClicking: false
  });
  const rafRef = useRef<number>();

  useEffect(() => {
    // Initial cursor position
    if (typeof window !== 'undefined') {
      positionRef.current = {
        x: window.innerWidth / 2,
        y: window.innerHeight / 2
      };
    }

    const updateCursorPosition = () => {
      if (!cursorRef.current) return;
      
      cursorRef.current.style.transform = `translate3d(${positionRef.current.x}px, ${positionRef.current.y}px, 0)`;
      cursorRef.current.style.opacity = isVisibleRef.current ? '1' : '0';
      
      rafRef.current = requestAnimationFrame(updateCursorPosition);
    };
    
    rafRef.current = requestAnimationFrame(updateCursorPosition);

    const onMouseMove = (e: MouseEvent) => {
      positionRef.current = { x: e.clientX, y: e.clientY };
      if (!isVisibleRef.current) {
        isVisibleRef.current = true;
      }
    };

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
      
      const isVideoItem = target.classList.contains('video-item') || 
                         target.closest('.video-item') !== null;
      
      if (cursorRef.current) {
        cursorStateRef.current = {
          ...cursorStateRef.current,
          isHovering: isInteractive,
          isVideoHover: isVideoItem
        };
        
        // Update classes efficiently
        const classes = ['cursor-hover', 'cursor-video'];
        classes.forEach(className => {
          if (className === 'cursor-hover' && isInteractive) {
            cursorRef.current?.classList.add(className);
          } else if (className === 'cursor-video' && isVideoItem) {
            cursorRef.current?.classList.add(className);
          } else {
            cursorRef.current?.classList.remove(className);
          }
        });
      }
    };

    const onVisibilityChange = (visible: boolean) => {
      isVisibleRef.current = visible;
    };

    const onMouseDown = () => {
      cursorStateRef.current.isClicking = true;
      cursorRef.current?.classList.add('cursor-clicking');
    };

    const onMouseUp = () => {
      cursorStateRef.current.isClicking = false;
      cursorRef.current?.classList.remove('cursor-clicking');
    };

    // Add event listeners with passive option for better performance
    document.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseover', onMouseOver, { passive: true });
    document.addEventListener('mouseleave', () => onVisibilityChange(false), { passive: true });
    document.addEventListener('mouseenter', () => onVisibilityChange(true), { passive: true });
    document.addEventListener('mousedown', onMouseDown, { passive: true });
    document.addEventListener('mouseup', onMouseUp, { passive: true });

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseleave', () => onVisibilityChange(false));
      document.removeEventListener('mouseenter', () => onVisibilityChange(true));
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mouseup', onMouseUp);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  return (
    <div 
      ref={cursorRef}
      className="custom-cursor"
    >
      <div className="cursor-dot">
        <MousePointer2 
          size={20}
          strokeWidth={1.5} 
          className="transition-transform duration-300 text-primary/80"
        />
      </div>
      <div className="cursor-outline"></div>
    </div>
  );
} 