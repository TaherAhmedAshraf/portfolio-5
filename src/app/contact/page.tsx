"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { 
  FadeIn, 
  SlideUp, 
  SlideInLeft, 
  SlideInRight,
  AnimatedButton
} from "@/components/animations/motion-elements";
import { AnimatedCharacters, AnimatedWords } from "@/components/animations/animated-text";
import { SectionBackground } from "@/components/section-background";
import { Loader2, Github, Linkedin, Mail, MapPin, X, Instagram, Facebook } from "lucide-react";

export default function ContactPage() {
  const searchParams = useSearchParams();
  const serviceParam = searchParams.get('service');
  
  // Form state
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: serviceParam ? `Inquiry about ${serviceParam} service` : "",
    message: "",
  });

  // Loading and success states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError("");

    try {
      // Validate that we have meaningful information
      const hasValidInfo = formState.name.trim() && formState.email.trim();
      
      if (!hasValidInfo) {
        throw new Error("Please provide your name and email address.");
      }
      
      // Send form data to our API endpoint which will handle Discord integration
      const response = await fetch('/api/discord-webhook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: formState.message,
          userInfo: {
            name: formState.name,
            email: formState.email,
            subject: formState.subject,
            message: formState.message
          },
          messageType: 'contact'
        })
      });
      
      if (!response.ok) {
        throw new Error("Failed to submit form. Please try again.");
      }
      
      // Reset form and show success state
      setFormState({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
      
      setSubmitSuccess(true);
      
      // Hide success message after 5 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
      
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "Something went wrong. Please try again.");
      console.error("Form submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Social media links with icons
  const socialLinks = [
    { name: 'GitHub', icon: <Github size={22} strokeWidth={1.5} />, href: 'https://github.com/taherahmedashraf' },
    { name: 'Facebook', icon: <Facebook size={20} strokeWidth={1.5} />, href: 'https://facebook.com/taherahmedashraf' },
    { name: 'LinkedIn', icon: <Linkedin size={22} strokeWidth={1.5} />, href: 'https://linkedin.com/in/taherahmedashraf' },
    { name: 'X', icon: <X size={22} strokeWidth={1.5} />, href: 'https://x.com/TaherAhmed01' },
    { name: 'Instagram', icon: <Instagram size={22} strokeWidth={1.5} />, href: 'https://instagram.com/taherahmedashraf' }
  ];

  // Animation variants for social icons
  const socialIconVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20
      }
    },
    hover: { 
      scale: 1.2,
      rotate: [0, 10, -10, 0],
      transition: { duration: 0.3 }
    }
  };

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
                  text="Let's Connect" 
                  className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter gradient-text"
                />
                <AnimatedWords 
                  text="I'd Love to Hear from You" 
                  className="text-xl md:text-2xl lg:text-3xl font-bold tracking-tighter"
                />
              </div>
            </SlideUp>

            <FadeIn delay={0.5} className="mb-8">
              <p className="text-lg text-muted-foreground">
                Whether you have a project in mind, a question about my services, or just want to say hello,
                I'm always open to new connections and opportunities.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Contact Form & Info Section */}
      <section className="py-20 relative">
        <SectionBackground variant="dots" intensity="low" />
        <div className="container mx-auto max-w-6xl px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <SlideInLeft>
              <Card className="glass-card border-border/40">
                <CardHeader>
                  <CardTitle className="text-2xl">Send a Message</CardTitle>
                  <CardDescription>
                    Fill out the form below and I'll get back to you as soon as possible.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="name" className="text-sm font-medium mb-1 block">
                            Your Name
                          </label>
                          <Input
                            id="name"
                            name="name"
                            value={formState.name}
                            onChange={handleChange}
                            placeholder="John Doe"
                            required
                            className="bg-background/50"
                          />
                        </div>
                        <div>
                          <label htmlFor="email" className="text-sm font-medium mb-1 block">
                            Email Address
                          </label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formState.email}
                            onChange={handleChange}
                            placeholder="john@example.com"
                            required
                            className="bg-background/50"
                          />
                        </div>
                      </div>
                      <div>
                        <label htmlFor="subject" className="text-sm font-medium mb-1 block">
                          Subject
                        </label>
                        <Input
                          id="subject"
                          name="subject"
                          value={formState.subject}
                          onChange={handleChange}
                          placeholder="What is this regarding?"
                          required
                          className="bg-background/50"
                        />
                      </div>
                      <div className="mb-6">
                        <label htmlFor="message" className="text-sm font-medium mb-1 block">
                          Message
                        </label>
                        <Textarea
                          id="message"
                          name="message"
                          value={formState.message}
                          onChange={handleChange}
                          placeholder="Tell me about your project, question, or just say hi!"
                          required
                          rows={6}
                          className="resize-none bg-background/50"
                        />
                      </div>
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="w-full" 
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Sending...
                        </>
                      ) : "Send Message"}
                    </Button>
                    
                    {submitError && (
                      <p className="text-destructive mt-2 text-center">{submitError}</p>
                    )}
                    
                    {submitSuccess && (
                      <div className="mt-4 p-3 bg-primary/10 border border-primary/30 rounded-md text-center">
                        <p className="text-primary font-medium">Message sent successfully! I'll get back to you soon.</p>
                      </div>
                    )}
                  </form>
                </CardContent>
              </Card>
            </SlideInLeft>

            {/* Contact Info */}
            <SlideInRight>
              <div className="space-y-10">
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold">Contact Information</h3>
                  <p className="text-muted-foreground">
                    I'm always open to discussing new projects, creative ideas or opportunities to be part of your vision.
                  </p>
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        <Mail size={20} strokeWidth={1.5} />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Email</p>
                        <p className="font-medium">mail@taher.one</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        <MapPin size={20} strokeWidth={1.5} />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Location</p>
                        <p className="font-medium">Dhaka, Bangladesh</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <h3 className="text-2xl font-bold">Follow Me</h3>
                  <p className="text-muted-foreground">
                    Connect with me on social media to see my latest projects and updates.
                  </p>
                  
                  <div className="flex gap-4">
                    {socialLinks.map((social, i) => (
                      <motion.a
                        key={social.name}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-11 h-11 rounded-full bg-background/40 border border-primary/20 flex items-center justify-center text-primary hover:text-white hover:bg-primary/80 backdrop-blur-sm transition-colors"
                        initial="hidden"
                        whileInView="visible"
                        whileHover="hover"
                        viewport={{ once: true }}
                        variants={socialIconVariants}
                        transition={{ delay: 0.15 * i }}
                        aria-label={`Visit ${social.name}`}
                      >
                        {social.icon}
                      </motion.a>
                    ))}
                  </div>
                </div>

                <div className="space-y-6">
                  <h3 className="text-2xl font-bold">Looking for Work?</h3>
                  <p className="text-muted-foreground">
                    I'm currently open to select freelance opportunities and permanent positions.
                  </p>
                  
                  <AnimatedButton>
                    <Button variant="outline" className="rounded-full px-6" asChild>
                      <Link href="/about">Learn More About Me</Link>
                    </Button>
                  </AnimatedButton>
                </div>
              </div>
            </SlideInRight>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 relative">
        <SectionBackground variant="grid" intensity="low" />
        <div className="container mx-auto max-w-6xl px-4">
          <SlideUp className="flex flex-col gap-4 mb-12 text-center">
            <AnimatedCharacters 
              text="Frequently Asked Questions" 
              className="text-3xl md:text-4xl font-bold tracking-tighter"
            />
            <FadeIn delay={0.3}>
              <p className="text-muted-foreground mx-auto max-w-[700px]">
                Some common questions about working with me
              </p>
            </FadeIn>
          </SlideUp>

          <div className="max-w-3xl mx-auto space-y-8">
            <FadeIn delay={0.1}>
              <div className="space-y-3">
                <h3 className="text-xl font-bold text-primary">What is your typical project process?</h3>
                <p className="text-muted-foreground">
                  My process typically involves discovery (understanding your needs), planning (creating a roadmap), 
                  design and development (building the solution), testing, and launch. I maintain clear 
                  communication throughout and provide post-launch support.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.3}>
              <div className="space-y-3">
                <h3 className="text-xl font-bold text-primary">How do you handle project pricing?</h3>
                <p className="text-muted-foreground">
                  I offer both fixed-price and hourly rate options depending on the project's scope and requirements. 
                  For most projects, I provide a detailed quote after our initial consultation when I have a clear 
                  understanding of your needs and expectations.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.5}>
              <div className="space-y-3">
                <h3 className="text-xl font-bold text-primary">What is your typical response time?</h3>
                <p className="text-muted-foreground">
                  I typically respond to all inquiries within 24 hours during business days. For ongoing projects, 
                  I maintain regular communication as agreed upon in our project plan.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.7}>
              <div className="space-y-3">
                <h3 className="text-xl font-bold text-primary">Do you work with clients internationally?</h3>
                <p className="text-muted-foreground">
                  Yes, I work with clients globally and have experience collaborating across different time zones. 
                  I'm flexible with scheduling meetings to accommodate different time zones and prefer clear 
                  communication to ensure smooth project progress.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </div>
  );
} 