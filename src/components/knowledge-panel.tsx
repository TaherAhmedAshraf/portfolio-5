"use client";

import Script from 'next/script';

/**
 * This component provides enhanced structured data specifically 
 * designed to help create a Google Knowledge Panel for Taher Ahmed Ashraf.
 * Knowledge Panels appear on the right side of Google search results for
 * notable entities like celebrities, businesses, etc.
 */
export function KnowledgePanel() {
  // Comprehensive person schema with details that help create a knowledge panel
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": "https://taher.one/#person",
    "name": "Taher Ahmed",
    "givenName": "Taher",
    "familyName": "Ahmed",
    "alternateName": ["Taher Ahmed", "Taher"],
    "jobTitle": "Full-Stack Developer",
    "description": "Full-Stack Developer, AI Enthusiast, and Entrepreneur with 3+ years of experience building scalable web, mobile, and desktop applications.",
    "birthPlace": {
      "@type": "Place",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Dhaka",
        "addressCountry": "Bangladesh"
      }
    },
    "nationality": {
      "@type": "Country",
      "name": "Bangladesh"
    },
    "image": {
      "@type": "ImageObject",
      "url": "https://taher.one/pfp.png",
      "width": "800",
      "height": "800",
      "contentUrl": "https://taher.one/pfp.png",
      "caption": "Taher Ahmed - Full Stack Developer and AI Enthusiast"
    },
    "url": "https://taher.one",
    "sameAs": [
      "https://github.com/taherahmedashraf",
      "https://linkedin.com/in/taherahmedashraf",
      "https://facebook.com/taherahmedashraf",
      "https://instagram.com/taherahmedashraf",
      "https://x.com/TaherAhmed01"
    ],
    "knowsLanguage": ["English", "Bengali"],
    "knowsAbout": [
      {
        "@type": "Thing",
        "name": "Web Development",
        "url": "https://taher.one/services#web-development",
        "description": "Creating responsive and dynamic web applications using modern frameworks"
      },
      {
        "@type": "Thing",
        "name": "AI Integration",
        "url": "https://taher.one/services#ai-integration",
        "description": "Implementing artificial intelligence solutions for businesses"
      },
      {
        "@type": "Thing",
        "name": "Mobile App Development",
        "url": "https://taher.one/services#mobile-development",
        "description": "Building cross-platform mobile applications for iOS and Android"
      }
    ],
    "hasOccupation": {
      "@type": "Occupation",
      "name": "Full-Stack Developer",
      "description": "Develops end-to-end web and mobile applications with expertise in front-end and back-end technologies",
      "skills": "React, Next.js, Node.js, TypeScript, AI Integration, API Development"
    },
    "worksFor": {
      "@type": "Organization",
      "@id": "https://taher.one/#organization",
      "name": "Dreabuild",
      "url": "https://dreabuild.com",
      "logo": "https://dreabuild.com/logo.png"
    },
    "alumniOf": [
      {
        "@type": "Organization",
        "name": "Solar ICT",
        "url": "https://solarict.com"
      },
      {
        "@type": "Organization",
        "name": "Genres Agency",
        "url": "https://genresagency.com"
      }
    ],
    "award": [
      "Top Developer Award - Dreabuild 2023",
      "Best AI Integration - Solar ICT 2022"
    ],
    "workLocation": {
      "@type": "Place",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Dhaka",
        "addressCountry": "Bangladesh"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://taher.one/about"
    }
  };

  return (
    <Script
      id="knowledge-panel-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
    />
  );
} 