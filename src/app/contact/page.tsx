"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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

// Contact form component that uses search params
function ContactForm() {
  const searchParams = useSearchParams();
  const serviceParam = searchParams.get("service");
  
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

  return (
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
              placeholder="johndoe@example.com"
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
            placeholder="Project inquiry, collaboration, etc."
            className="bg-background/50"
          />
        </div>
        <div>
          <label htmlFor="message" className="text-sm font-medium mb-1 block">
            Message
          </label>
          <Textarea
            id="message"
            name="message"
            value={formState.message}
            onChange={handleChange}
            placeholder="Tell me about your project or question..."
            rows={6}
            required
            className="resize-none bg-background/50"
          />
        </div>
      </div>
      
      {submitError && (
        <div className="p-4 bg-destructive/10 text-destructive rounded-md text-sm">
          {submitError}
        </div>
      )}
      
      {submitSuccess && (
        <div className="p-4 bg-primary/10 text-primary rounded-md text-sm">
          Your message has been sent successfully! I'll get back to you soon.
        </div>
      )}
      
      <AnimatedButton>
        <Button 
          type="submit" 
          className="w-full rounded-full pulse-effect" 
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Sending...
            </>
          ) : (
            "Send Message"
          )}
        </Button>
      </AnimatedButton>
    </form>
  );
}

export default function ContactPage() {
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
                  text="Let&apos;s Connect" 
                  className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter gradient-text"
                />
                <AnimatedWords 
                  text="I&apos;d Love to Hear from You" 
                  className="text-xl md:text-2xl lg:text-3xl font-bold tracking-tighter"
                />
              </div>
            </SlideUp>

            <FadeIn delay={0.5} className="mb-8">
              <p className="text-lg text-muted-foreground">
                Whether you have a project in mind, a question about my services, or just want to say hello,
                I&apos;m always open to new connections and opportunities.
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
                    Fill out the form below and I&apos;ll get back to you as soon as possible.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Suspense fallback={<div>Loading form...</div>}>
                    <ContactForm />
                  </Suspense>
                </CardContent>
              </Card>
            </SlideInLeft>

            {/* Contact Info */}
            <SlideInRight>
              <div className="flex flex-col gap-10">
                <div>
                  <h3 className="text-2xl font-bold mb-6">Get in Touch</h3>
                  <p className="text-muted-foreground mb-6">
                    Have a specific question or project in mind? Reach out directly through these channels:
                  </p>
                  
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-primary/10 rounded-full">
                        <Mail size={20} className="text-primary" />
                      </div>
                      <div>
                        <h4 className="text-sm font-medium">Email</h4>
                        <a 
                          href="mailto:taher88@live.com" 
                          className="text-muted-foreground hover:text-primary transition-colors"
                        >
                          taher88@live.com
                        </a>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-primary/10 rounded-full">
                        <MapPin size={20} className="text-primary" />
                      </div>
                      <div>
                        <h4 className="text-sm font-medium">Location</h4>
                        <p className="text-muted-foreground">Dhaka, Bangladesh</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-2xl font-bold mb-6">Connect With Me</h3>
                  <div className="flex flex-wrap gap-4">
                    {socialLinks.map((social, index) => (
                      <motion.a
                        key={social.name}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 rounded-full bg-primary/10 hover:bg-primary/20 text-primary transition-all"
                        variants={socialIconVariants}
                        initial="hidden"
                        animate="visible"
                        whileHover="hover"
                        transition={{ delay: index * 0.1 }}
                        aria-label={social.name}
                      >
                        {social.icon}
                      </motion.a>
                    ))}
                  </div>
                </div>
                
                <div className="p-6 bg-primary/5 border border-primary/10 rounded-lg">
                  <h3 className="text-lg font-semibold mb-4">Project Request</h3>
                  <p className="text-muted-foreground mb-4">
                    If you have a specific project in mind, including these details helps me understand your needs better:
                  </p>
                  <ul className="space-y-2 pl-5 list-disc text-sm text-muted-foreground marker:text-primary">
                    <li>Project type and scope</li>
                    <li>Target audience and goals</li>
                    <li>Timeline and budget expectations</li>
                    <li>Any specific technologies or requirements</li>
                  </ul>
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
                  I offer both fixed-price and hourly rate options depending on the project&apos;s scope and requirements. 
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
                  I&apos;m flexible with scheduling meetings to accommodate different time zones and prefer clear 
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