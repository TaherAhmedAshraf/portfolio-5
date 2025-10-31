"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
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

export default function ServicesPage() {
  return (
    <div className="flex flex-col">
      {/* Floating particles effect */}
      <FloatingParticles />
      
      {/* Hero Section */}
      <section className="py-24 md:py-32 relative">
        <SectionBackground variant="gradient" intensity="medium" />
        <div className="container mx-auto max-w-6xl px-4">
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
            <SlideUp>
              <div className="flex flex-col gap-2">
                <AnimatedCharacters 
                  text="My Services" 
                  className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter gradient-text"
                />
                <AnimatedWords 
                  text="Expert Solutions for Your Digital Needs" 
                  className="text-xl md:text-2xl lg:text-3xl font-bold tracking-tighter"
                />
              </div>
            </SlideUp>

            <FadeIn delay={0.5} className="mb-8">
              <p className="text-lg text-muted-foreground">
                I offer comprehensive services in full-stack development, mobile apps, 
                AI integration, and more. Let&apos;s transform your ideas into exceptional digital experiences.
              </p>
            </FadeIn>
            
            <ScaleUp delay={0.7}>
              <AnimatedButton>
                <Button asChild className="rounded-full px-8 py-6">
                  <Link href="#services">Explore Services</Link>
                </Button>
              </AnimatedButton>
            </ScaleUp>
          </div>
        </div>
      </section>

      {/* Main Services Section */}
      <section id="services" className="py-20 relative">
        <SectionBackground variant="dots" intensity="low" />
        <div className="container mx-auto max-w-6xl px-4">
          <SlideUp className="flex flex-col gap-4 mb-12 text-center">
            <AnimatedCharacters 
              text="What I Offer" 
              className="text-3xl md:text-4xl font-bold tracking-tighter"
            />
            <FadeIn delay={0.3}>
              <p className="text-muted-foreground mx-auto max-w-[700px]">
                Specialized development services tailored to your business goals and target audience
              </p>
            </FadeIn>
          </SlideUp>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Web Development */}
            <ScaleUp delay={0.1}>
              <Card className="glass-card h-full">
                <CardHeader>
                  <motion.div 
                    className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <span className="text-primary text-2xl">🌐</span>
                  </motion.div>
                  <CardTitle>Web Development</CardTitle>
                  <CardDescription>Custom websites & web applications</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
                    <li>Responsive website design & development</li>
                    <li>Custom web applications with modern frameworks</li>
                    <li>E-commerce solutions</li>
                    <li>CMS implementation</li>
                    <li>Performance optimization</li>
                    <li>SEO optimization</li>
                  </ul>
                  <div className="pt-4">
                    <span className="text-sm text-muted-foreground">Starting at</span>
                    <p className="text-xl font-bold text-primary">$250</p>
                  </div>
                </CardContent>
                <CardFooter>
                  <AnimatedButton className="w-full">
                    <Button asChild variant="outline" className="w-full rounded-full">
                      <Link href="/contact?service=web">Learn More</Link>
                    </Button>
                  </AnimatedButton>
                </CardFooter>
              </Card>
            </ScaleUp>

            {/* Mobile Development */}
            <ScaleUp delay={0.2}>
              <Card className="glass-card relative h-full overflow-hidden">
                <motion.div
                  className="absolute -right-16 -top-16 w-32 h-32 bg-primary/10 rounded-full blur-xl"
                  animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0.8, 0.5] }}
                  transition={{ duration: 5, repeat: Infinity }}
                />
                <CardHeader>
                  <motion.div 
                    className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                  >
                    <span className="text-primary text-2xl">📱</span>
                  </motion.div>
                  <CardTitle>Mobile App Development</CardTitle>
                  <CardDescription>Cross-platform mobile applications</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
                    <li>Native & cross-platform mobile app development</li>
                    <li>React Native & Expo expertise</li>
                    <li>iOS & Android deployment</li>
                    <li>Performance optimization for mobile</li>
                    <li>Offline functionality</li>
                    <li>Push notifications integration</li>
                  </ul>
                  <div className="pt-4">
                    <span className="text-sm text-muted-foreground">Starting at</span>
                    <p className="text-xl font-bold text-primary">$350</p>
                  </div>
                </CardContent>
                <CardFooter>
                  <AnimatedButton className="w-full">
                    <Button asChild variant="outline" className="w-full rounded-full">
                      <Link href="/contact?service=mobile">Learn More</Link>
                    </Button>
                  </AnimatedButton>
                </CardFooter>
              </Card>
            </ScaleUp>

            {/* AI Integration */}
            <ScaleUp delay={0.3}>
              <Card className="glass-card h-full border-primary/20">
                <CardHeader className="bg-gradient-to-br from-primary/5 to-transparent">
                  <motion.div 
                    className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                  >
                    <span className="text-primary text-2xl">🤖</span>
                  </motion.div>
                  <CardTitle>AI Integration</CardTitle>
                  <CardDescription>Intelligent solutions with AI</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
                    <li>OpenAI & Gemini AI integration</li>
                    <li>Chatbot development</li>
                    <li>Content generation tools</li>
                    <li>Recommendation systems</li>
                    <li>Data analysis & reporting</li>
                    <li>ML model implementation</li>
                  </ul>
                  <div className="pt-4">
                    <span className="text-sm text-muted-foreground">Starting at</span>
                    <p className="text-xl font-bold text-primary">$450</p>
                  </div>
                </CardContent>
                <CardFooter>
                  <AnimatedButton className="w-full">
                    <Button asChild className="w-full rounded-full">
                      <Link href="/contact?service=ai">Get Started</Link>
                    </Button>
                  </AnimatedButton>
                </CardFooter>
              </Card>
            </ScaleUp>

            {/* Full-Stack Development */}
            <ScaleUp delay={0.4}>
              <Card className="glass-card h-full">
                <CardHeader>
                  <motion.div 
                    className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
                  >
                    <span className="text-primary text-2xl">⚙️</span>
                  </motion.div>
                  <CardTitle>Full-Stack Development</CardTitle>
                  <CardDescription>End-to-end development solutions</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
                    <li>Complete frontend & backend development</li>
                    <li>Database design & optimization</li>
                    <li>API development & integration</li>
                    <li>Authentication & authorization systems</li>
                    <li>Cloud deployment</li>
                    <li>Maintenance & support</li>
                  </ul>
                  <div className="pt-4">
                    <span className="text-sm text-muted-foreground">Starting at</span>
                    <p className="text-xl font-bold text-primary">$550</p>
                  </div>
                </CardContent>
                <CardFooter>
                  <AnimatedButton className="w-full">
                    <Button asChild variant="outline" className="w-full rounded-full">
                      <Link href="/contact?service=fullstack">Learn More</Link>
                    </Button>
                  </AnimatedButton>
                </CardFooter>
              </Card>
            </ScaleUp>

            {/* Business Automation */}
            <ScaleUp delay={0.5}>
              <Card className="glass-card h-full">
                <CardHeader>
                  <motion.div 
                    className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 3, repeat: Infinity, delay: 2 }}
                  >
                    <span className="text-primary text-2xl">⚡</span>
                  </motion.div>
                  <CardTitle>Business Automation</CardTitle>
                  <CardDescription>Streamline your business processes</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
                    <li>Workflow automation solutions</li>
                    <li>Custom business tools development</li>
                    <li>Integration with existing systems</li>
                    <li>Process optimization</li>
                    <li>Reporting & analytics</li>
                    <li>Training & documentation</li>
                  </ul>
                  <div className="pt-4">
                    <span className="text-sm text-muted-foreground">Starting at</span>
                    <p className="text-xl font-bold text-primary">$850</p>
                  </div>
                </CardContent>
                <CardFooter>
                  <AnimatedButton className="w-full">
                    <Button asChild variant="outline" className="w-full rounded-full">
                      <Link href="/contact?service=automation">Learn More</Link>
                    </Button>
                  </AnimatedButton>
                </CardFooter>
              </Card>
            </ScaleUp>

            {/* Consulting & Advisory */}
            <ScaleUp delay={0.6}>
              <Card className="glass-card h-full">
                <CardHeader>
                  <motion.div 
                    className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 3, repeat: Infinity, delay: 2.5 }}
                  >
                    <span className="text-primary text-2xl">💡</span>
                  </motion.div>
                  <CardTitle>Consulting & Advisory</CardTitle>
                  <CardDescription>Expert technology guidance</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
                    <li>Technology stack consultation</li>
                    <li>Architecture planning</li>
                    <li>Code reviews</li>
                    <li>Technical strategy</li>
                    <li>Team mentoring & training</li>
                    <li>Project rescue services</li>
                  </ul>
                  <div className="pt-4">
                    <span className="text-sm text-muted-foreground">Starting at</span>
                    <p className="text-xl font-bold text-primary">$50/hr</p>
                  </div>
                </CardContent>
                <CardFooter>
                  <AnimatedButton className="w-full">
                    <Button asChild variant="outline" className="w-full rounded-full">
                      <Link href="/contact?service=consulting">Learn More</Link>
                    </Button>
                  </AnimatedButton>
                </CardFooter>
              </Card>
            </ScaleUp>
          </div>
        </div>
      </section>

      {/* How I Work Section */}
      <section className="py-20 relative">
        <SectionBackground variant="grid" intensity="low" />
        <div className="container mx-auto max-w-6xl px-4">
          <SlideUp className="flex flex-col gap-4 mb-16 text-center">
            <AnimatedCharacters 
              text="My Process" 
              className="text-3xl md:text-4xl font-bold tracking-tighter"
            />
            <FadeIn delay={0.3}>
              <p className="text-muted-foreground mx-auto max-w-[700px]">
                A structured approach to bring your vision to life with quality and efficiency
              </p>
            </FadeIn>
          </SlideUp>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <SlideInLeft>
              <div className="space-y-12">
                {/* Step 1 */}
                <div className="relative pl-16">
                  <div className="absolute left-0 top-0 flex">
                    <motion.div 
                      className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-xl font-bold"
                      animate={{ scale: [1, 1.1, 1], boxShadow: ["0px 0px 0px rgba(0,210,255,0.3)", "0px 0px 15px rgba(0,210,255,0.5)", "0px 0px 0px rgba(0,210,255,0.3)"] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      1
                    </motion.div>
                  </div>
                  <h3 className="text-xl font-bold mb-2">Discovery & Planning</h3>
                  <p className="text-muted-foreground">
                    We start by understanding your business, goals, and requirements. This phase includes 
                    research, planning, and defining the project scope to create a solid foundation.
                  </p>
                </div>

                {/* Step 2 */}
                <div className="relative pl-16">
                  <div className="absolute left-0 top-0 flex">
                    <motion.div 
                      className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-xl font-bold"
                      animate={{ scale: [1, 1.1, 1], boxShadow: ["0px 0px 0px rgba(0,210,255,0.3)", "0px 0px 15px rgba(0,210,255,0.5)", "0px 0px 0px rgba(0,210,255,0.3)"] }}
                      transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                    >
                      2
                    </motion.div>
                  </div>
                  <h3 className="text-xl font-bold mb-2">Design & Architecture</h3>
                  <p className="text-muted-foreground">
                    Creating wireframes, mockups, and defining the technical architecture. We design 
                    both the user experience and the technical foundation for your solution.
                  </p>
                </div>

                {/* Step 3 */}
                <div className="relative pl-16">
                  <div className="absolute left-0 top-0 flex">
                    <motion.div 
                      className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-xl font-bold"
                      animate={{ scale: [1, 1.1, 1], boxShadow: ["0px 0px 0px rgba(0,210,255,0.3)", "0px 0px 15px rgba(0,210,255,0.5)", "0px 0px 0px rgba(0,210,255,0.3)"] }}
                      transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                    >
                      3
                    </motion.div>
                  </div>
                  <h3 className="text-xl font-bold mb-2">Development & Testing</h3>
                  <p className="text-muted-foreground">
                    Building your solution with clean, maintainable code while implementing rigorous 
                    testing protocols to ensure quality and reliability.
                  </p>
                </div>
              </div>
            </SlideInLeft>

            <SlideInRight>
              <div className="space-y-12">
                {/* Step 4 */}
                <div className="relative pl-16">
                  <div className="absolute left-0 top-0 flex">
                    <motion.div 
                      className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-xl font-bold"
                      animate={{ scale: [1, 1.1, 1], boxShadow: ["0px 0px 0px rgba(0,210,255,0.3)", "0px 0px 15px rgba(0,210,255,0.5)", "0px 0px 0px rgba(0,210,255,0.3)"] }}
                      transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
                    >
                      4
                    </motion.div>
                  </div>
                  <h3 className="text-xl font-bold mb-2">Deployment & Integration</h3>
                  <p className="text-muted-foreground">
                    Launching your solution to the appropriate platforms and ensuring smooth 
                    integration with existing systems. We implement best practices for deployment.
                  </p>
                </div>

                {/* Step 5 */}
                <div className="relative pl-16">
                  <div className="absolute left-0 top-0 flex">
                    <motion.div 
                      className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-xl font-bold"
                      animate={{ scale: [1, 1.1, 1], boxShadow: ["0px 0px 0px rgba(0,210,255,0.3)", "0px 0px 15px rgba(0,210,255,0.5)", "0px 0px 0px rgba(0,210,255,0.3)"] }}
                      transition={{ duration: 3, repeat: Infinity, delay: 2 }}
                    >
                      5
                    </motion.div>
                  </div>
                  <h3 className="text-xl font-bold mb-2">Training & Handover</h3>
                  <p className="text-muted-foreground">
                    Providing comprehensive documentation and training to ensure your team 
                    can effectively use and manage the solution.
                  </p>
                </div>

                {/* Step 6 */}
                <div className="relative pl-16">
                  <div className="absolute left-0 top-0 flex">
                    <motion.div 
                      className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-xl font-bold"
                      animate={{ scale: [1, 1.1, 1], boxShadow: ["0px 0px 0px rgba(0,210,255,0.3)", "0px 0px 15px rgba(0,210,255,0.5)", "0px 0px 0px rgba(0,210,255,0.3)"] }}
                      transition={{ duration: 3, repeat: Infinity, delay: 2.5 }}
                    >
                      6
                    </motion.div>
                  </div>
                  <h3 className="text-xl font-bold mb-2">Support & Evolution</h3>
                  <p className="text-muted-foreground">
                    Offering ongoing maintenance, support, and feature enhancements to 
                    ensure your solution continues to deliver value as your business evolves.
                  </p>
                </div>
              </div>
            </SlideInRight>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 relative">
        <SectionBackground variant="minimal" intensity="medium" />
        <div className="container mx-auto max-w-6xl px-4">
          <SlideUp className="flex flex-col gap-4 mb-12 text-center">
            <AnimatedCharacters 
              text="FAQ" 
              className="text-3xl md:text-4xl font-bold tracking-tighter"
            />
            <FadeIn delay={0.3}>
              <p className="text-muted-foreground mx-auto max-w-[700px]">
                Answers to commonly asked questions about my services
              </p>
            </FadeIn>
          </SlideUp>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FadeIn delay={0.2}>
              <div className="space-y-3">
                <h3 className="text-xl font-bold text-primary">How long does a typical project take?</h3>
                <p className="text-muted-foreground">
                  Project timelines vary based on complexity and scope. Simple websites may take 2-4 weeks, 
                  while complex applications can take 3-6 months. During our initial consultation, 
                  I&apos;ll provide a more accurate timeline based on your specific requirements.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.3}>
              <div className="space-y-3">
                <h3 className="text-xl font-bold text-primary">Do you offer maintenance services?</h3>
                <p className="text-muted-foreground">
                  Yes, I offer ongoing maintenance and support packages for all projects. These include 
                  regular updates, security patches, performance monitoring, and feature enhancements 
                  to keep your application running smoothly.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.4}>
              <div className="space-y-3">
                <h3 className="text-xl font-bold text-primary">How do payments work?</h3>
                <p className="text-muted-foreground">
                  I typically work with a 30% upfront deposit, followed by milestone-based payments. 
                  For larger projects, we&apos;ll establish a payment schedule aligned with project phases. 
                  I accept bank transfers, PayPal, and major credit cards.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.5}>
              <div className="space-y-3">
                <h3 className="text-xl font-bold text-primary">Can you work with an existing codebase?</h3>
                <p className="text-muted-foreground">
                  Absolutely. I can review, optimize, and extend existing codebases. I&apos;ll first conduct 
                  a code audit to understand the current architecture and identify potential improvements 
                  before implementing changes.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.6}>
              <div className="space-y-3">
                <h3 className="text-xl font-bold text-primary">Do you provide source code access?</h3>
                <p className="text-muted-foreground">
                  Yes, you&apos;ll receive full access to the source code once the project is completed and final 
                  payment is received. I believe in transparency and ensuring you have complete ownership 
                  of your digital assets.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.7}>
              <div className="space-y-3">
                <h3 className="text-xl font-bold text-primary">How do we communicate during the project?</h3>
                <p className="text-muted-foreground">
                  I maintain regular communication through your preferred channels (email, Slack, Microsoft Teams). 
                  We&apos;ll have scheduled check-ins to review progress, provide feedback, and make adjustments as needed.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative">
        <SectionBackground variant="gradient" intensity="high" />
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center max-w-3xl mx-auto">
            <ScaleUp>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Bring Your Ideas to Life?
              </h2>
            </ScaleUp>
            <FadeIn delay={0.3} className="mb-8">
              <p className="text-lg text-muted-foreground">
                Let&apos;s discuss your project needs and create something amazing together.
                I&apos;m here to help turn your vision into reality with tailored solutions.
              </p>
            </FadeIn>
            <FadeIn delay={0.5} className="flex flex-wrap gap-4 justify-center">
              <AnimatedButton>
                <Button asChild size="lg" className="rounded-full px-8 py-6 pulse-effect">
                  <Link href="/contact">Get in Touch</Link>
                </Button>
              </AnimatedButton>
              <AnimatedButton>
                <Button variant="outline" asChild size="lg" className="rounded-full px-8 py-6 border-border/60">
                  <Link href="/portfolio">View My Work</Link>
                </Button>
              </AnimatedButton>
            </FadeIn>
          </div>
        </div>
      </section>
    </div>
  );
} 