"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { 
  FadeIn, 
  SlideUp,
  AnimatedButton
} from "@/components/animations/motion-elements";
import { SectionBackground } from "./section-background";
import { HeroBackground } from "./hero-background";
import { Github, Linkedin, Twitter, Instagram, X, Facebook } from "lucide-react";
import { cn, smoothScroll } from "@/lib/utils";

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  const footerLinksVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1 * i,
        duration: 0.3,
      }
    }),
    hover: {
      y: -3,
      color: "hsl(var(--primary))",
      transition: { duration: 0.2 }
    }
  };

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
    <footer className="relative mt-auto py-12 overflow-hidden">
      {/* Gradient background */}
      <SectionBackground/>
      <div className="container mx-auto max-w-6xl px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Links */}
          <div className="space-y-4">
            <SlideUp delay={0.1}>
              <h3 className="font-bold text-xl">Quick Links</h3>
            </SlideUp>
            
            <FadeIn delay={0.3}>
              <ul className="space-y-2">
                {['Home', 'About', 'Services', 'Portfolio', 'Contact'].map((item, i) => (
                  <motion.li 
                    key={item}
                    initial="hidden"
                    whileInView="visible"
                    whileHover="hover"
                    viewport={{ once: true }}
                    variants={footerLinksVariants}
                    custom={i}
                    transition={{ delay: 0.1 * i }}
                  >
                    <Link 
                      href={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                      className="hover:text-primary transition-colors"
                      onClick={(e) => smoothScroll(e, item === 'Home' ? '/' : `/${item.toLowerCase()}`)}
                    >
                      {item}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </FadeIn>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <SlideUp delay={0.2}>
              <h3 className="font-bold text-xl">Connect</h3>
            </SlideUp>
            
            <FadeIn delay={0.4} className="flex gap-4">
              {[
                { name: 'GitHub', icon: <Github size={20} strokeWidth={1.5} />, href: 'https://github.com/taherahmedashraf' },
                { name: 'LinkedIn', icon: <Linkedin size={20} strokeWidth={1.5} />, href: 'https://linkedin.com/in/taherahmedashraf' },
                { name: 'Facebook', icon: <Facebook size={20} strokeWidth={1.5} />, href: 'https://facebook.com/taherahmedashraf' },
                { name: 'X', icon: <X size={20} strokeWidth={1.5} />, href: 'https://x.com/TaherAhmed01' },
                { name: 'Instagram', icon: <Instagram size={20} strokeWidth={1.5} />, href: 'https://instagram.com/taherahmedashraf' }
              ].map((social, i) => (
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
            </FadeIn>
          </div>
        </div>

        <motion.div 
          className="border-t border-border/40 mt-8 pt-8 text-center text-sm text-muted-foreground"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          viewport={{ once: true }}
        >
          © {currentYear} Taher Ahmed. All rights reserved.
        </motion.div>
      </div>
    </footer>
  );
} 