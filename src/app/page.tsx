"use client";

import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";
import { 
  FadeIn, 
  SlideUp, 
  SlideInLeft, 
  SlideInRight, 
  ScaleUp,
  AnimatedButton
} from "@/components/animations/motion-elements";
import { AnimatedCharacters, AnimatedWords } from "@/components/animations/animated-text";
import { AnimatedProjectCard } from "@/components/animations/animated-card";
import { WorkExperience } from "@/components/work-experience";
import { HeroBackground } from "@/components/hero-background";
import { SectionBackground } from "@/components/section-background";
import { SeoKeywords } from "@/components/seo-keywords";
import { KnowledgePanel } from "@/components/knowledge-panel";

// Schema.org structured data for enhanced search visibility
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
  "image": "https://taher.one/pfp.png",
  "url": "https://taher.one",
  "sameAs": [
    "https://github.com/taherahmedashraf",
    "https://linkedin.com/in/taherahmedashraf",
    "https://facebook.com/taherahmedashraf",
    "https://instagram.com/taherahmedashraf",
    "https://x.com/TaherAhmed01"
  ],
  "knowsAbout": [
    "Web Development",
    "React",
    "Next.js",
    "Node.js",
    "TypeScript",
    "AI Integration",
    "Mobile App Development",
    "Desktop App Development"
  ],
  "workLocation": {
    "@type": "Place",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Dhaka",
      "addressCountry": "Bangladesh"
    }
  },
  "worksFor": {
    "@type": "Organization",
    "@id": "https://taher.one/#organization",
    "name": "Dreabuild",
    "url": "https://dreabuild.com"
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
  ]
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://taher.one/#organization",
  "name": "Dreabuild",
  "url": "https://dreabuild.com",
  "logo": "https://dreabuild.com/logo.png",
  "description": "Software Development Company specializing in web, mobile, and desktop applications with AI integration.",
  "founder": {
    "@type": "Person",
    "@id": "https://taher.one/#person"
  }
};

const portfolioSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://taher.one/#website",
  "url": "https://taher.one",
  "name": "Taher Ahmed Ashraf Portfolio",
  "description": "Portfolio of Taher Ahmed Ashraf, Full-Stack Developer and AI Enthusiast",
  "author": {
    "@type": "Person",
    "@id": "https://taher.one/#person"
  }
};

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Schema.org structured data for SEO */}
      <Script
        id="schema-person"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <Script
        id="schema-organization"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <Script
        id="schema-website"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(portfolioSchema) }}
      />

      {/* Knowledge Panel for Google */}
      <KnowledgePanel />

      {/* Add SEO keywords for better search visibility */}
      <SeoKeywords />

      {/* Hero Section */}
      <section className="py-20 md:py-36 relative">
        <HeroBackground />
        <div className="container mx-auto max-w-6xl px-4">
          <div className="flex flex-col-reverse md:flex-row items-center gap-12">
            <SlideInLeft className="flex-1 space-y-6">
              <div>
                <h1 className="sr-only">Taher Ahmed - Full-Stack Developer & AI Enthusiast</h1>
                <AnimatedCharacters 
                  text="Full-Stack" 
                  className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-primary gradient-text"
                />
                <AnimatedWords 
                  text="Developer & AI Enthusiast" 
                  className="text-4xl md:text-6xl lg:text-6xl font-bold tracking-tighter"
                />
              </div>
              <FadeIn delay={0.5}>
                <p className="text-xl text-muted-foreground">
                  Building scalable web, mobile, and desktop applications with 3+ years of experience. CTO & Co-founder of Dreabuild.
                </p>
              </FadeIn>
              <FadeIn delay={0.8} className="flex flex-wrap gap-4 pt-4">
                <AnimatedButton>
                  <Button asChild size="lg" className="rounded-full px-8 pulse-effect">
                    <Link href="/portfolio">View My Work</Link>
                  </Button>
                </AnimatedButton>
                <AnimatedButton>
                  <Button variant="outline" size="lg" asChild className="rounded-full px-8 border-border/60">
                    <Link href="/contact">Get in Touch</Link>
                  </Button>
                </AnimatedButton>
              </FadeIn>
            </SlideInLeft>
            <SlideInRight className="flex-1 flex justify-center md:justify-end">
              <motion.div 
                className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden glow-border"
                initial={{ rotate: -5, scale: 0.9 }}
                animate={{ rotate: 0, scale: 1 }}
                transition={{ duration: 0.5, type: "spring", damping: 15 }}
              >
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-primary/5 flex items-center justify-center border border-primary/10"
                  animate={{ 
                    boxShadow: ["0px 0px 0px rgba(0,210,255,0.3)", "0px 0px 25px rgba(0,210,255,0.4)", "0px 0px 0px rgba(0,210,255,0.3)"] 
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <Image 
                    src="/pfp.png" 
                    alt="Taher Ahmed - Full Stack Developer"
                    fill 
                    className="object-cover grayscale hover:grayscale-0 transition-all duration-300"
                    priority
                  />
                </motion.div>
              </motion.div>
            </SlideInRight>
          </div>
        </div>
      </section>

      <Separator className="opacity-20" />

      {/* Technical Skills Section */}
      <section className="py-20 relative">
        <SectionBackground variant="dots" intensity="low" />
        <div className="container mx-auto max-w-6xl px-4">
          <SlideUp className="flex flex-col gap-4 mb-12">
            <AnimatedCharacters 
              text="Technical Skills" 
              className="text-3xl md:text-4xl font-bold tracking-tighter"
            />
            <FadeIn delay={0.3}>
              <p className="text-muted-foreground max-w-[700px]">
                My expertise spans across various technologies and domains in software development.
              </p>
            </FadeIn>
          </SlideUp>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Skill 1 */}
            <ScaleUp delay={0.1}>
              <Card className="glass-card">
                <CardHeader>
                  <motion.div 
                    className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <span className="text-primary text-xl">🌐</span>
                  </motion.div>
                  <CardTitle>Web & Backend Development</CardTitle>
                  <CardDescription>Building robust web applications and backend systems.</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    React.js, Next.js, Vue.js, Node.js, Express.js, TypeScript, REST APIs, GraphQL, PostgreSQL, MongoDB, Firebase, Supabase
                  </p>
                </CardContent>
              </Card>
            </ScaleUp>

            {/* Skill 2 */}
            <ScaleUp delay={0.2}>
              <Card className="glass-card">
                <CardHeader>
                  <motion.div 
                    className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                  >
                    <span className="text-primary text-xl">📱</span>
                  </motion.div>
                  <CardTitle>Mobile & Desktop Development</CardTitle>
                  <CardDescription>Cross-platform applications for all devices.</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    React Native for Android & iOS, Electron.js for cross-platform desktop applications, with a focus on performance and user experience.
                  </p>
                </CardContent>
              </Card>
            </ScaleUp>

            {/* Skill 3 */}
            <ScaleUp delay={0.3}>
              <Card className="glass-card">
                <CardHeader>
                  <motion.div 
                    className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                  >
                    <span className="text-primary text-xl">🤖</span>
                  </motion.div>
                  <CardTitle>AI & Automation</CardTitle>
                  <CardDescription>Integrating AI for smarter solutions.</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    OpenAI API, Gemini AI, AI-powered tools, chatbots & NLP-based automation, and business workflow automation solutions.
                  </p>
                </CardContent>
              </Card>
            </ScaleUp>
          </div>

          <FadeIn delay={0.5} className="mt-12 text-center">
            <AnimatedButton>
              <Button asChild variant="outline" className="rounded-full px-8 border-border/60">
                <Link href="/about">More About Me</Link>
              </Button>
            </AnimatedButton>
          </FadeIn>
        </div>
      </section>

      {/* Work Experience Section */}
      <WorkExperience />

      {/* Featured Projects Section */}
      <section className="py-20 relative">
        <SectionBackground variant="grid" intensity="low" />
        <div className="container mx-auto max-w-6xl px-4">
          <SlideUp className="flex flex-col gap-4 text-center mb-12">
            <AnimatedCharacters 
              text="Notable Projects" 
              className="text-3xl md:text-4xl font-bold tracking-tighter"
            />
            <FadeIn delay={0.3}>
              <p className="text-muted-foreground mx-auto max-w-[700px]">
                Selected projects that showcase my expertise and problem-solving abilities.
              </p>
            </FadeIn>
          </SlideUp>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Featured Project 1 */}
            <AnimatedProjectCard
              title="SportyPost"
              description="Sports Management Platform"
              tags={["React", "Next.js", "Node.js", "PostgreSQL"]}
              link="https://sporypost.io/"
              image="/projects/sportypost.png"
            >
              <div className="aspect-video bg-black/20"></div>
            </AnimatedProjectCard>

            {/* Featured Project 2 */}
            <AnimatedProjectCard
              title="Okkhor"
              description="E-Commerce Platform"
              tags={["React", "Next.js", "Node.js", "MongoDB"]}
              link="https://okkhor.com/"
              image="/projects/okkhor.png"
            >
              <div className="aspect-video bg-black/20"></div>
            </AnimatedProjectCard>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            {/* Additional Project 1 */}
            <AnimatedProjectCard
              title="Dreabuild"
              description="Software Development Company"
              tags={["Vue", "Tailwind CSS"]}
              link="https://dreabuild.com/"
              image="/projects/dreabuild.png"
              className="h-auto"
            >
              <div className="aspect-video bg-black/20"></div>
            </AnimatedProjectCard>

            {/* Additional Project 2 */}
            <AnimatedProjectCard
              title="Express Dynamic Routing"
              description="NPM Package for Express.js to dynamically generate routes"
              tags={["Node.js", "Express.js"]}
              link="https://www.npmjs.com/package/express-dynamic-routing"
              className="h-auto"
              image="/projects/edr.png"
            >
              <div className="aspect-video bg-black/20"></div>
            </AnimatedProjectCard>

            {/* Additional Project 3 */}
            <AnimatedProjectCard
              title="Octo Profile"
              description="Github Profile Page Generator"
              tags={["Next.js", "Tailwind CSS"]}
              link="https://octo-profile-gamma.vercel.app/"
              className="h-auto"
              image="/projects/octo-profile.png"
            >
              <div className="aspect-video bg-black/20"></div>
            </AnimatedProjectCard>
          </div>

          {/* <FadeIn delay={0.5} className="mt-12 text-center">
            <AnimatedButton>
              <Button asChild className="rounded-full px-8 pulse-effect">
                <Link href="/portfolio">View All Work</Link>
              </Button>
            </AnimatedButton>
          </FadeIn> */}
        </div>
      </section>
    </div>
  );
}
