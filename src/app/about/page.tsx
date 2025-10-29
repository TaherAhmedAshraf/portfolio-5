"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
import { SectionBackground } from "@/components/section-background";
import { FloatingParticles } from "@/components/floating-particles";

export default function AboutPage() {
  return (
    <div className="flex flex-col">
      {/* Floating particles effect */}
      <FloatingParticles />
      
      {/* Hero Section */}
      <section className="py-24 md:py-32 relative">
        <SectionBackground variant="gradient" intensity="medium" />
        <div className="container mx-auto max-w-6xl px-4">
          <div className="flex flex-col-reverse md:flex-row items-center gap-12">
            <SlideInLeft className="flex-1 space-y-6">
              <div>
                <AnimatedCharacters 
                  text="About Me" 
                  className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-primary gradient-text"
                />
                <AnimatedWords 
                  text="My Journey & Expertise" 
                  className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter"
                />
              </div>
              <FadeIn delay={0.5}>
                <p className="text-xl text-muted-foreground">
                  I&apos;m Taher Ahmed, a Full-Stack Developer and AI Enthusiast with a passion for building innovative digital solutions that solve real-world problems.
                </p>
              </FadeIn>
            </SlideInLeft>
            <SlideInRight className="flex-1 flex justify-center md:justify-end">
              <motion.div 
                className="relative w-60 h-60 md:w-80 md:h-80 rounded-full overflow-hidden"
                initial={{ rotate: 5, scale: 0.9 }}
                animate={{ rotate: 0, scale: 1 }}
                transition={{ duration: 0.5, type: "spring", damping: 15 }}
                whileHover={{ scale: 1.05 }}
              >
                {/* Animated border gradient */}
                <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: "linear-gradient(135deg, #00d2ff, #3a7bd5, #00d2ff)",
                    padding: "4px",
                  }}
                  animate={{
                    rotate: 360,
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  <div className="w-full h-full rounded-full bg-background" />
                </motion.div>
                
                <motion.div 
                  className="absolute inset-1 bg-gradient-to-tr from-primary/30 to-primary/5 flex items-center justify-center border-2 border-primary/20 rounded-full overflow-hidden"
                  animate={{ 
                    boxShadow: [
                      "0px 0px 20px rgba(0,210,255,0.3)", 
                      "0px 0px 40px rgba(0,210,255,0.5)", 
                      "0px 0px 20px rgba(0,210,255,0.3)"
                    ] 
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <Image 
                    src="/pfp.png" 
                    alt="Taher Ahmed" 
                    fill 
                    className="object-cover hover:scale-110 transition-transform duration-500"
                  />
                  
                  {/* Hover overlay */}
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-t from-primary/50 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"
                  />
                </motion.div>
              </motion.div>
            </SlideInRight>
          </div>
        </div>
      </section>

      {/* Personal Information Section */}
      <section className="py-20 relative">
        <SectionBackground variant="dots" intensity="low" />
        <div className="container mx-auto max-w-6xl px-4">
          <SlideUp className="flex flex-col gap-4 mb-12">
            <AnimatedCharacters 
              text="Who I Am" 
              className="text-3xl md:text-4xl font-bold tracking-tighter"
            />
            <FadeIn delay={0.3}>
              <p className="text-muted-foreground max-w-[700px]">
                Get to know me beyond the code and explore my professional journey.
              </p>
            </FadeIn>
          </SlideUp>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
            <SlideInLeft>
              <div className="space-y-6">
                <h3 className="text-2xl font-bold">Personal Background</h3>
                <p className="text-muted-foreground">
                  I&apos;m a passionate developer with a strong focus on creating seamless user experiences through innovative technology solutions. My journey began with a curiosity about how digital systems work, which led me to explore various programming languages and frameworks.
                </p>
                <p className="text-muted-foreground">
                  As CTO & Co-founder of Dreabuild, I lead the technical vision and strategy, working with talented developers to build AI-powered and business automation tools. I&apos;m constantly exploring new technologies and methodologies to enhance our solutions.
                </p>
                <p className="text-muted-foreground">
                  When I&apos;m not coding, you might find me exploring new tech trends, contributing to open-source projects, or mentoring aspiring developers. I believe in continuous learning and staying updated with the latest industry developments.
                </p>
              </div>
            </SlideInLeft>

            <SlideInRight>
              <Card className="glass-card h-full">
                <CardHeader>
                  <CardTitle>Quick Facts</CardTitle>
                  <CardDescription>A snapshot of who I am</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center border-b border-border/30 pb-2">
                    <span className="font-medium">Location</span>
                    <span className="text-muted-foreground">Dhaka, Bangladesh</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-border/30 pb-2">
                    <span className="font-medium">Experience</span>
                    <span className="text-muted-foreground">3+ Years</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-border/30 pb-2">
                    <span className="font-medium">Education</span>
                    <span className="text-muted-foreground">Computer Science Student</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-border/30 pb-2">
                    <span className="font-medium">Languages</span>
                    <span className="text-muted-foreground">English, Bengali</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-border/30 pb-2">
                    <span className="font-medium">Interests</span>
                    <span className="text-muted-foreground">AI, Automation, Open Source</span>
                  </div>
                  <div className="flex justify-between items-center pb-2">
                    <span className="font-medium">Current Role</span>
                    <span className="text-muted-foreground">CTO & Co-founder at Dreabuild</span>
                  </div>
                </CardContent>
              </Card>
            </SlideInRight>
          </div>

          <FadeIn delay={0.5} className="text-center">
            <AnimatedButton>
              <Button asChild variant="outline" className="rounded-full px-8 border-border/60">
                <Link href="/contact">Get in Touch</Link>
              </Button>
            </AnimatedButton>
          </FadeIn>
        </div>
      </section>

      {/* Skills & Expertise Section */}
      <section className="py-20 relative">
        <SectionBackground variant="grid" intensity="low" />
        <div className="container mx-auto max-w-6xl px-4">
          <SlideUp className="flex flex-col gap-4 mb-12 text-center">
            <AnimatedCharacters 
              text="Skills & Expertise" 
              className="text-3xl md:text-4xl font-bold tracking-tighter"
            />
            <FadeIn delay={0.3}>
              <p className="text-muted-foreground mx-auto max-w-[700px]">
                A detailed look at my technical capabilities and domain knowledge.
              </p>
            </FadeIn>
          </SlideUp>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {/* Frontend */}
            <ScaleUp delay={0.1}>
              <Card className="glass-card">
                <CardHeader>
                  <motion.div 
                    className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <span className="text-primary text-xl">⚛️</span>
                  </motion.div>
                  <CardTitle>Frontend Development</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                    <li>React.js & Next.js for modern web applications</li>
                    <li>TypeScript for type-safe code</li>
                    <li>HTML5, CSS3, Tailwind CSS for responsive design</li>
                    <li>Redux, Context API for state management</li>
                    <li>Framer Motion for animations</li>
                    <li>React Testing Library & Jest for testing</li>
                  </ul>
                </CardContent>
              </Card>
            </ScaleUp>

            {/* Backend */}
            <ScaleUp delay={0.2}>
              <Card className="glass-card">
                <CardHeader>
                  <motion.div 
                    className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                  >
                    <span className="text-primary text-xl">🔧</span>
                  </motion.div>
                  <CardTitle>Backend Development</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                    <li>Node.js & Express.js for server-side applications</li>
                    <li>RESTful API design and implementation</li>
                    <li>GraphQL for efficient data fetching</li>
                    <li>PostgreSQL, MongoDB database management</li>
                    <li>Firebase, Supabase for BaaS solutions</li>
                    <li>Authentication & authorization systems</li>
                  </ul>
                </CardContent>
              </Card>
            </ScaleUp>

            {/* Mobile & Cross-Platform */}
            <ScaleUp delay={0.3}>
              <Card className="glass-card">
                <CardHeader>
                  <motion.div 
                    className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                  >
                    <span className="text-primary text-xl">📱</span>
                  </motion.div>
                  <CardTitle>Mobile Development</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                    <li>React Native for cross-platform mobile apps</li>
                    <li>Expo for rapid mobile development</li>
                    <li>Native device API integration</li>
                    <li>Offline-first architecture</li>
                    <li>Push notifications implementation</li>
                    <li>App Store & Play Store deployment</li>
                  </ul>
                </CardContent>
              </Card>
            </ScaleUp>

            {/* AI & ML */}
            <ScaleUp delay={0.4}>
              <Card className="glass-card">
                <CardHeader>
                  <motion.div 
                    className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
                  >
                    <span className="text-primary text-xl">🤖</span>
                  </motion.div>
                  <CardTitle>AI & Machine Learning</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                    <li>OpenAI API integration for AI capabilities</li>
                    <li>Gemini AI implementation for applications</li>
                    <li>NLP for chatbots and text analysis</li>
                    <li>AI-powered recommendation systems</li>
                    <li>Machine learning model implementation</li>
                    <li>Data processing and analysis</li>
                  </ul>
                </CardContent>
              </Card>
            </ScaleUp>

            {/* DevOps */}
            <ScaleUp delay={0.5}>
              <Card className="glass-card">
                <CardHeader>
                  <motion.div 
                    className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 2 }}
                  >
                    <span className="text-primary text-xl">🚀</span>
                  </motion.div>
                  <CardTitle>DevOps & Deployment</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                    <li>Git version control & GitHub workflows</li>
                    <li>Docker containerization</li>
                    <li>CI/CD pipelines setup and maintenance</li>
                    <li>Cloud deployment (AWS, Vercel, Netlify)</li>
                    <li>Server configuration and management</li>
                    <li>Performance optimization</li>
                  </ul>
                </CardContent>
              </Card>
            </ScaleUp>

            {/* Business & Strategy */}
            <ScaleUp delay={0.6}>
              <Card className="glass-card">
                <CardHeader>
                  <motion.div 
                    className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 2.5 }}
                  >
                    <span className="text-primary text-xl">💼</span>
                  </motion.div>
                  <CardTitle>Business & Strategy</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                    <li>Technical project management</li>
                    <li>Agile & Scrum methodologies</li>
                    <li>Team leadership and mentoring</li>
                    <li>Product strategy and roadmapping</li>
                    <li>Business process automation</li>
                    <li>Client communication and requirements gathering</li>
                  </ul>
                </CardContent>
              </Card>
            </ScaleUp>
          </div>

          <FadeIn delay={0.7} className="text-center mt-12">
            <AnimatedButton>
              <Button asChild className="rounded-full px-8 pulse-effect">
                <Link href="/portfolio">View My Work</Link>
              </Button>
            </AnimatedButton>
          </FadeIn>
        </div>
      </section>

      {/* Philosophy & Approach Section */}
      <section className="py-20 relative">
        <SectionBackground variant="minimal" intensity="medium" />
        <div className="container mx-auto max-w-6xl px-4">
          <SlideUp className="flex flex-col gap-4 mb-12">
            <AnimatedCharacters 
              text="My Philosophy" 
              className="text-3xl md:text-4xl font-bold tracking-tighter"
            />
            <FadeIn delay={0.3}>
              <p className="text-muted-foreground max-w-[700px]">
                The principles that guide my work and approach to development.
              </p>
            </FadeIn>
          </SlideUp>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <SlideInLeft className="space-y-8">
              <div className="space-y-3">
                <h3 className="text-xl font-bold text-primary">User-Centered Design</h3>
                <p className="text-muted-foreground">
                  I believe in creating applications with the end-user in mind. Every feature, interaction, and design element should enhance the user experience and solve real problems.
                </p>
              </div>
              <div className="space-y-3">
                <h3 className="text-xl font-bold text-primary">Clean, Maintainable Code</h3>
                <p className="text-muted-foreground">
                  Writing clean, well-documented code that&apos;s easy to maintain and scale is fundamental to my development process. I prioritize code quality and follow best practices.
                </p>
              </div>
              <div className="space-y-3">
                <h3 className="text-xl font-bold text-primary">Continuous Learning</h3>
                <p className="text-muted-foreground">
                  Technology evolves rapidly, and I&apos;m committed to staying ahead through continuous learning and adaptation. I embrace new tools and methodologies that improve efficiency and outcomes.
                </p>
              </div>
            </SlideInLeft>

            <SlideInRight className="space-y-8">
              <div className="space-y-3">
                <h3 className="text-xl font-bold text-primary">Collaborative Development</h3>
                <p className="text-muted-foreground">
                  I thrive in collaborative environments where ideas are shared openly. The best solutions often emerge from diverse perspectives and teamwork.
                </p>
              </div>
              <div className="space-y-3">
                <h3 className="text-xl font-bold text-primary">Problem-Solving Focus</h3>
                <p className="text-muted-foreground">
                  At its core, development is about solving problems. I approach each project by understanding the underlying problems before crafting elegant technical solutions.
                </p>
              </div>
              <div className="space-y-3">
                <h3 className="text-xl font-bold text-primary">Performance & Optimization</h3>
                <p className="text-muted-foreground">
                  Creating fast, responsive applications is essential. I optimize for performance at every step, from code architecture to asset delivery and database queries.
                </p>
              </div>
            </SlideInRight>
          </div>

          <FadeIn delay={0.5} className="text-center mt-16">
            <motion.div 
              className="inline-block"
              animate={{ 
                y: [0, -10, 0],
                scale: [1, 1.05, 1] 
              }}
              transition={{ 
                duration: 5, 
                repeat: Infinity,
                repeatType: "loop" 
              }}
            >
              <AnimatedButton>
                <Button asChild size="lg" className="rounded-full px-8 py-6 bg-primary hover:bg-primary/90 text-primary-foreground">
                  <Link href="/contact">Work With Me</Link>
                </Button>
              </AnimatedButton>
            </motion.div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
} 