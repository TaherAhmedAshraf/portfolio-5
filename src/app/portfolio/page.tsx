"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { 
  FadeIn, 
  SlideUp, 
  ScaleUp,
  AnimatedButton
} from "@/components/animations/motion-elements";
import { AnimatedCharacters } from "@/components/animations/animated-text";
import { SectionBackground } from "@/components/section-background";

// Project types for filtering
type ProjectCategory = "all" | "web" | "mobile" | "ai" | "design";

// Project interface
interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  categories: ProjectCategory[];
  tags: string[];
  featured: boolean;
  slug: string;
}

export default function PortfolioPage() {
  // State for category filtering
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>("all");

  // Sample projects data
  const projects: Project[] = [
    {
      id: "1",
      title: "BloodPing",
      description: "Blood donation platform connecting donors with recipients in emergency situations",
      imageUrl: "/projects/bloodping.jpg",
      categories: ["web", "mobile"],
      tags: ["React Native", "Next.js", "Node.js", "PostgreSQL"],
      featured: true,
      slug: "bloodping"
    },
    {
      id: "2",
      title: "Marchant Pro",
      description: "E-commerce business management tool for online sellers",
      imageUrl: "/projects/marchant-pro.jpg",
      categories: ["web"],
      tags: ["Next.js", "Node.js", "PostgreSQL"],
      featured: true,
      slug: "marchant-pro"
    },
    {
      id: "3",
      title: "NCTB Textbook AI",
      description: "AI-powered study assistant for students using Bangladesh national curriculum textbooks",
      imageUrl: "/projects/textbook-ai.jpg",
      categories: ["web", "ai"],
      tags: ["Next.js", "Gemini AI"],
      featured: false,
      slug: "textbook-ai"
    },
    {
      id: "4",
      title: "Moody Journal",
      description: "Mood tracking and journaling app with analytics and insights",
      imageUrl: "/projects/moody-journal.jpg",
      categories: ["mobile"],
      tags: ["React Native", "Supabase"],
      featured: false,
      slug: "moody-journal"
    },
    {
      id: "5",
      title: "NotesNudge",
      description: "AI-powered note-taking application with smart organization",
      imageUrl: "/projects/notes-nudge.jpg",
      categories: ["web", "ai"],
      tags: ["Next.js", "OpenAI API"],
      featured: false,
      slug: "notes-nudge"
    },
    {
      id: "6",
      title: "TaskFlow",
      description: "Team collaboration and project management platform",
      imageUrl: "/projects/taskflow.jpg",
      categories: ["web"],
      tags: ["React", "Express", "MongoDB"],
      featured: false,
      slug: "taskflow"
    },
    {
      id: "7",
      title: "HealthTrack",
      description: "Personal health monitoring and fitness tracking application",
      imageUrl: "/projects/healthtrack.jpg",
      categories: ["mobile"],
      tags: ["React Native", "Firebase"],
      featured: false,
      slug: "healthtrack"
    },
    {
      id: "8",
      title: "Portfolio Website",
      description: "Personal portfolio website with modern design and animations",
      imageUrl: "/projects/portfolio.jpg",
      categories: ["web", "design"],
      tags: ["Next.js", "Tailwind CSS", "Framer Motion"],
      featured: false,
      slug: "portfolio-website"
    }
  ];

  // Filter projects based on active category
  const filteredProjects = activeCategory === "all" 
    ? projects 
    : projects.filter(project => project.categories.includes(activeCategory));

  // Featured projects
  const featuredProjects = projects.filter(project => project.featured);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="py-24 md:py-32 relative">
        <SectionBackground variant="gradient" intensity="medium" />
        <div className="container mx-auto max-w-6xl px-4">
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
            <SlideUp>
              <div className="flex flex-col gap-2">
                <AnimatedCharacters 
                  text="My Portfolio" 
                  className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter gradient-text"
                />
                <AnimatedCharacters 
                  text="Showcasing My Recent Work" 
                  className="text-xl md:text-2xl lg:text-3xl font-bold tracking-tighter"
                />
              </div>
            </SlideUp>

            <FadeIn delay={0.5} className="mb-8">
              <p className="text-lg text-muted-foreground">
                A collection of projects that demonstrate my expertise in 
                web development, mobile apps, AI integration, and more.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      {featuredProjects.length > 0 && (
        <section className="py-20 relative">
          <SectionBackground variant="dots" intensity="low" />
          <div className="container mx-auto max-w-6xl px-4">
            <SlideUp className="flex flex-col gap-4 mb-12 text-center">
              <AnimatedCharacters 
                text="Featured Projects" 
                className="text-3xl md:text-4xl font-bold tracking-tighter"
              />
              <FadeIn delay={0.3}>
                <p className="text-muted-foreground mx-auto max-w-[700px]">
                  Highlighted work that showcases the range and depth of my capabilities
                </p>
              </FadeIn>
            </SlideUp>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {featuredProjects.map((project, index) => (
                <FeaturedProjectCard 
                  key={project.id} 
                  project={project} 
                  index={index} 
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Project Gallery Section */}
      <section className="py-20 relative">
        <SectionBackground variant="grid" intensity="low" />
        <div className="container mx-auto max-w-6xl px-4">
          <SlideUp className="flex flex-col gap-4 mb-12 text-center">
            <AnimatedCharacters 
              text="Project Gallery" 
              className="text-3xl md:text-4xl font-bold tracking-tighter"
            />
            <FadeIn delay={0.3}>
              <p className="text-muted-foreground mx-auto max-w-[700px]">
                Browse through a selection of my work across different categories
              </p>
            </FadeIn>
          </SlideUp>

          {/* Filter tabs */}
          <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-12">
            <FilterButton 
              category="all" 
              activeCategory={activeCategory} 
              onClick={() => setActiveCategory("all")}
            >
              All Projects
            </FilterButton>
            <FilterButton 
              category="web" 
              activeCategory={activeCategory} 
              onClick={() => setActiveCategory("web")}
            >
              Web
            </FilterButton>
            <FilterButton 
              category="mobile" 
              activeCategory={activeCategory} 
              onClick={() => setActiveCategory("mobile")}
            >
              Mobile
            </FilterButton>
            <FilterButton 
              category="ai" 
              activeCategory={activeCategory} 
              onClick={() => setActiveCategory("ai")}
            >
              AI
            </FilterButton>
            <FilterButton 
              category="design" 
              activeCategory={activeCategory} 
              onClick={() => setActiveCategory("design")}
            >
              Design
            </FilterButton>
          </div>

          {/* Projects grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project, index) => (
              <ProjectCard 
                key={project.id} 
                project={project} 
                index={index} 
              />
            ))}
          </div>
        </div>
      </section>

      {/* Project Idea Generator Section */}
      <section className="py-20 relative">
        <SectionBackground variant="grid" intensity="medium" />
        <div className="container px-4 mx-auto text-center">
          <SlideUp className="mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Need Project Ideas?
            </h2>
            <FadeIn delay={0.3}>
              <p className="text-muted-foreground mx-auto max-w-[700px]">
                Looking for inspiration? Use our AI-powered project idea generator to kickstart your creativity.
              </p>
            </FadeIn>
          </SlideUp>
          
          <div className="max-w-3xl mx-auto">
            <FadeIn delay={0.5}>
              <Card className="glass-card border-border/40 p-6 text-center">
                <CardHeader>
                  <CardTitle className="text-2xl">AI Project Generator</CardTitle>
                  <CardDescription>
                    Generate custom project ideas based on your interests, skills, and goals
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-muted-foreground">
                    Our AI will help you brainstorm detailed project ideas complete with technologies,
                    features, and time estimates to help you get started quickly.
                  </p>
                  <AnimatedButton>
                    <Button asChild size="lg" className="rounded-full px-8">
                      <Link href="/project-generator">Try the Project Generator</Link>
                    </Button>
                  </AnimatedButton>
                </CardContent>
              </Card>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative">
        <SectionBackground variant="gradient" intensity="medium" />
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center max-w-3xl mx-auto">
            <ScaleUp>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Have a Project in Mind?
              </h2>
            </ScaleUp>
            <FadeIn delay={0.3} className="mb-8">
              <p className="text-lg text-muted-foreground">
                Let&apos;s collaborate and bring your vision to life. I&apos;m ready to help you build 
                something amazing that exceeds your expectations.
              </p>
            </FadeIn>
            <FadeIn delay={0.5}>
              <AnimatedButton>
                <Button asChild size="lg" className="rounded-full px-8 py-6">
                  <Link href="/contact">Start a Conversation</Link>
                </Button>
              </AnimatedButton>
            </FadeIn>
          </div>
        </div>
      </section>
    </div>
  );
}

// Featured Project Card Component
function FeaturedProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group"
    >
      <Link href={`/portfolio/${project.slug}`}>
        <Card className="glass-card overflow-hidden h-full border-border/40 hover:border-primary/40 transition-all duration-300">
          <div className="aspect-[16/9] relative">
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10">
              <Button variant="outline" className="rounded-full border-white/80 text-white">
                View Project
              </Button>
            </div>
            <motion.div 
              className="w-full h-full"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <Image 
                src={project.imageUrl} 
                alt={project.title} 
                fill 
                className="object-cover" 
              />
            </motion.div>
          </div>
          <CardHeader>
            <div className="flex flex-wrap gap-2 mb-2">
              {project.categories.map((category) => (
                <Badge key={category} variant="outline" className="text-xs border-primary/30 text-primary">
                  {category === "ai" ? "AI" : category.charAt(0).toUpperCase() + category.slice(1)}
                </Badge>
              ))}
            </div>
            <CardTitle className="text-2xl group-hover:text-primary transition-colors">
              {project.title}
            </CardTitle>
            <CardDescription className="text-base">{project.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="bg-primary/10 text-primary">
                  {tag}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}

// Regular Project Card Component
function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      viewport={{ once: true }}
      className="group"
    >
      <Link href={`/portfolio/${project.slug}`}>
        <Card className="glass-card overflow-hidden h-full border-border/40 hover:border-primary/40 transition-all duration-300">
          <div className="aspect-video relative">
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10">
              <Button variant="outline" size="sm" className="rounded-full border-white/80 text-white">
                View Details
              </Button>
            </div>
            <motion.div 
              className="w-full h-full"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <Image 
                src={project.imageUrl} 
                alt={project.title} 
                fill 
                className="object-cover" 
              />
            </motion.div>
          </div>
          <CardHeader className="p-4">
            <CardTitle className="text-lg group-hover:text-primary transition-colors">
              {project.title}
            </CardTitle>
            <CardDescription className="text-sm line-clamp-2">
              {project.description}
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="flex flex-wrap gap-1.5">
              {project.tags.slice(0, 3).map((tag) => (
                <Badge key={tag} variant="secondary" className="bg-primary/5 text-primary text-xs">
                  {tag}
                </Badge>
              ))}
              {project.tags.length > 3 && (
                <Badge variant="secondary" className="bg-primary/5 text-primary text-xs">
                  +{project.tags.length - 3} more
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}

// Filter Button Component
function FilterButton({ 
  children, 
  category,
  activeCategory,
  onClick
}: { 
  children: React.ReactNode;
  category: ProjectCategory;
  activeCategory: ProjectCategory;
  onClick: () => void;
}) {
  const isActive = activeCategory === category;
  
  return (
    <motion.button
      onClick={onClick}
      className={`
        px-4 py-2 rounded-full text-sm transition-all
        ${isActive 
          ? 'bg-primary text-primary-foreground' 
          : 'bg-background hover:bg-primary/10 border border-border/60'}
      `}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.button>
  );
} 