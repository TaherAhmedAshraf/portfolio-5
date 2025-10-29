"use client";

import { useEffect, useRef } from "react";
import { MousePointer2 } from "lucide-react";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const positionRef = useRef({ x: 0, y: 0 });
  const isVisibleRef = useRef(true);
  const lastClassStateRef = useRef({ hover: false, video: false });
  const throttleTimeoutRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    // Initial cursor position
    if (typeof window !== 'undefined') {
      positionRef.current = {
        x: window.innerWidth / 2,
        y: window.innerHeight / 2
      };
    }

    const updateCursorPosition = (x: number, y: number) => {
      if (!cursorRef.current) return;
      cursorRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    };

    const onMouseMove = (e: MouseEvent) => {
      positionRef.current = { x: e.clientX, y: e.clientY };
      updateCursorPosition(e.clientX, e.clientY);
      
      if (!isVisibleRef.current) {
        isVisibleRef.current = true;
        if (cursorRef.current) {
          cursorRef.current.style.opacity = '1';
        }
      }
    };

    const onMouseOver = (e: MouseEvent) => {
      // Throttle mouseover events to reduce performance impact
      if (throttleTimeoutRef.current) return;
      
      throttleTimeoutRef.current = window.setTimeout(() => {
        throttleTimeoutRef.current = undefined;
      }, 50); // Throttle to max 20 times per second

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
      
      // Only update DOM if class state has changed
      if (cursorRef.current) {
        if (lastClassStateRef.current.hover !== isInteractive) {
          lastClassStateRef.current.hover = isInteractive;
          if (isInteractive) {
            cursorRef.current.classList.add('cursor-hover');
          } else {
            cursorRef.current.classList.remove('cursor-hover');
          }
        }
        
        if (lastClassStateRef.current.video !== isVideoItem) {
          lastClassStateRef.current.video = isVideoItem;
          if (isVideoItem) {
            cursorRef.current.classList.add('cursor-video');
          } else {
            cursorRef.current.classList.remove('cursor-video');
          }
        }
      }
    };

    const onMouseLeave = () => {
      isVisibleRef.current = false;
      if (cursorRef.current) {
        cursorRef.current.style.opacity = '0';
      }
    };

    const onMouseEnter = () => {
      isVisibleRef.current = true;
      if (cursorRef.current) {
        cursorRef.current.style.opacity = '1';
      }
    };

    const onMouseDown = () => {
      cursorRef.current?.classList.add('cursor-clicking');
    };

    const onMouseUp = () => {
      cursorRef.current?.classList.remove('cursor-clicking');
    };

    // Add event listeners with passive option for better performance
    document.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseover', onMouseOver, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave, { passive: true });
    document.addEventListener('mouseenter', onMouseEnter, { passive: true });
    document.addEventListener('mousedown', onMouseDown, { passive: true });
    document.addEventListener('mouseup', onMouseUp, { passive: true });

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mouseup', onMouseUp);
      if (throttleTimeoutRef.current) {
        clearTimeout(throttleTimeoutRef.current);
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