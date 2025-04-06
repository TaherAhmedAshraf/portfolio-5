"use client";

import Head from 'next/head';
import { usePageView } from '@/lib/use-page-view';

interface SeoHeadProps {
  title?: string;
  description?: string;
  canonicalUrl?: string;
  ogImage?: string;
  ogImageAlt?: string;
  twitterImage?: string;
  noIndex?: boolean;
}

/**
 * Component to add SEO-specific tags to the page head
 * This helps improve visibility in search results and social media sharing
 */
export function SeoHead({
  title = "Taher Ahmed | Full-Stack Developer & AI Enthusiast",
  description = "Full-Stack Developer, AI Enthusiast, and Entrepreneur with 3+ years of experience building scalable web, mobile, and desktop applications.",
  canonicalUrl = "https://taher.one",
  ogImage = "/pfp.png",
  ogImageAlt = "Taher Ahmed - Full Stack Developer",
  twitterImage = "/images/taher-ahmed-ashraf.jpg",
  noIndex = false
}: SeoHeadProps) {
  // Track page views and engagement
  usePageView();
  
  return (
    <Head>
      {/* Basic meta tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Open Graph tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:alt" content={ogImageAlt} />
      
      {/* Twitter Card tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={twitterImage} />
      
      {/* Additional meta tags that can be dynamically changed */}
      {noIndex && (
        <>
          <meta name="robots" content="noindex, nofollow" />
          <meta name="googlebot" content="noindex, nofollow" />
        </>
      )}
      
      {/* Additional Open Graph tags for better social sharing */}
      <meta property="og:site_name" content="Taher Ahmed Ashraf Portfolio" />
      <meta property="og:locale" content="en_US" />
      <meta property="article:author" content="Taher Ahmed Ashraf" />
      
      {/* Additional Twitter Card tags */}
      <meta name="twitter:site" content="@TaherAhmed01" />
      <meta name="twitter:creator" content="@TaherAhmed01" />
      
      {/* Preconnect to important domains for performance */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      
      {/* Additional SEO tags for name searches */}
      <meta name="author" content="Taher Ahmed Ashraf" />
      <meta name="keywords" content="Taher Ahmed, Taher Ahmed Ashraf, Full-Stack Developer, AI Developer, Web Developer, React Developer, Node.js Developer, Bangladesh Developer" />
    </Head>
  );
} 