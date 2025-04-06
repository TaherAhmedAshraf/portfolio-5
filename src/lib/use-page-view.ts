"use client";

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

/**
 * Custom hook to track page views and send engagement signals to Google
 * This helps improve SEO by increasing engagement metrics
 */
export function usePageView() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // When the route changes, log the page view
    if (pathname) {
      // Check if window and location are defined (client-side)
      if (typeof window !== 'undefined') {
        // Get full URL including search params
        const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '');
        
        // Update the document title with the current page info
        const pageName = pathname.split('/').pop() || 'home';
        document.title = `${pageName.charAt(0).toUpperCase() + pageName.slice(1)} | Taher Ahmed Ashraf`;
        
        // Log page view - in a real app, you'd send this to your analytics platform
        console.log(`Page view: ${url}`);
        
        // Dispatch a custom event that Google Analytics and other tools might pick up
        const pageViewEvent = new CustomEvent('pageview', { detail: { url } });
        window.dispatchEvent(pageViewEvent);
        
        // Update canonical link
        const canonical = document.querySelector('link[rel="canonical"]');
        if (canonical) {
          canonical.setAttribute('href', `https://taher.one${url === '/' ? '' : url}`);
        }
      }
    }
  }, [pathname, searchParams]);
} 