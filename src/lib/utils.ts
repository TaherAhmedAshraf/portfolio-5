import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Creates a new IntersectionObserver that applies animations to elements as they scroll into view
 * 
 * @param options - Intersection Observer options
 * @param animationClass - The CSS class to apply when element is in view
 * @param removeOnExit - Whether to remove the animation class when element exits viewport
 */
export function createScrollAnimation(
  options = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1,
  },
  animationClass = "animate-in",
  removeOnExit = false
) {
  // Check if we're in a browser environment
  if (typeof window === "undefined") return null;
  
  return new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      // When element is in view
      if (entry.isIntersecting) {
        entry.target.classList.add(animationClass);
      } 
      // When element exits viewport
      else if (removeOnExit) {
        entry.target.classList.remove(animationClass);
      }
    });
  }, options);
}

/**
 * Smoothly scrolls to a target element
 * 
 * @param elementId - The ID of the element to scroll to
 * @param offset - Optional offset in pixels
 */
export function scrollToElement(elementId: string, offset = 0) {
  const element = document.getElementById(elementId);
  
  if (element) {
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;
    
    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth"
    });
  }
}

/**
 * Handles navigation link clicks with smooth scrolling and URL updates
 * 
 * @param e - Click event
 * @param href - The href attribute of the link
 * @param offset - Optional offset in pixels
 * @returns - void
 */
export function smoothScroll(e: React.MouseEvent<HTMLAnchorElement>, href: string, offset = 80) {
  // Only process anchor links
  if (!href.startsWith('#')) return;
  
  e.preventDefault();
  
  const targetId = href.substring(1);
  const targetElement = document.getElementById(targetId);
  
  if (targetElement) {
    // Update the URL with the hash, but don't jump to it
    window.history.pushState({}, '', href);
    
    // Scroll smoothly to the element
    const elementPosition = targetElement.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;
    
    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth"
    });
  }
} 