"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn, smoothScroll } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AnimatedButton } from "@/components/animations/motion-elements";
import { Menu, X } from "lucide-react";

const navItems = [
  { name: "Home", href: "/" },
  { name: "About Me", href: "/about" },
  { name: "Services", href: "/services" },
  // { name: "Portfolio", href: "/portfolio" },
  { name: "AI Project Generator", href: "/project-generator", highlight: true },
  // { name: "Contact", href: "/contact" },
];

// Animation variants
const fadeInDown = {
  hidden: { y: -20, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: {
      duration: 0.5,
    }
  }
};

const navItemVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.3 + (i * 0.1),
      duration: 0.5,
    },
  }),
};

const mobileMenuVariants = {
  closed: { 
    opacity: 0,
    scale: 0.98,
    transition: { 
      duration: 0.2,
      ease: "easeIn" 
    } 
  },
  open: { 
    opacity: 1,
    scale: 1,
    transition: { 
      duration: 0.3,
      ease: "easeOut",
      staggerChildren: 0.07,
      delayChildren: 0.1
    } 
  }
};

const mobileNavItemVariants = {
  closed: { opacity: 0, y: -10 },
  open: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 24
    }
  }
};

export function Header() {
  const pathname = usePathname();
  const [isAnimating, setIsAnimating] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Function to trigger the animation
  const triggerAnimation = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      // Reset the animation after it completes
      setTimeout(() => {
        setIsAnimating(false);
      }, 1500); // Animation duration
    }
  };

  // Set up the animation to run every 5 seconds, but only if not hovered
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (!isHovered) {
        triggerAnimation();
      }
    }, 5000); // 5 seconds interval

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, [isHovered, triggerAnimation]);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  // Handle mouse events
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleClick = () => {
    triggerAnimation();
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <motion.header 
      className="fixed top-4 left-1/2 z-50 w-full py-2"
      style={{ translateX: "-50%" }}
      initial="hidden"
      animate="visible"
      variants={fadeInDown}
    >
      <motion.div 
        className={cn(
          "container max-w-6xl mx-auto p-1 flex items-center justify-between rounded-full bg-clip-padding backdrop-filter backdrop-blur-sm bg-background/50 border",
          isScrolled ? "border-primary/20 shadow-md shadow-primary/10" : "border-border/40"
        )}
        transition={{ duration: 0.3 }}
      >
        <motion.div 
          className="flex items-center gap-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          {/* Profile Image and Name */}
          <motion.div 
            className="w-10 h-10 rounded-full overflow-hidden bg-primary/20 flex items-center justify-center"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {/* Replace with your own image if available */}
            <span className="text-xs font-semibold">TA</span>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link href="/" className="font-semibold text-xl">
              Taher Ahmed
            </Link>
          </motion.div>
        </motion.div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navItems.map((item, i) => (
            <motion.div
              key={item.href}
              custom={i}
              initial="hidden"
              animate="visible"
              variants={navItemVariants}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href={item.href}
                className={cn(
                  "text-sm transition-colors hover:text-primary",
                  item.highlight && "bg-primary/10 px-3 py-1 rounded-full font-medium flex flex-row items-center justify-center",
                  pathname === item.href
                    ? "text-primary font-medium"
                    : "text-foreground/70"
                )}
                onClick={(e) => smoothScroll(e, item.href)}
              >
                {item.name}
                {item.highlight && pathname !== item.href && (
                  <span className="relative flex h-2 w-2 ml-1">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                  </span>
                )}
              </Link>
            </motion.div>
          ))}
        </nav>
        
        {/* Mobile Navigation Button */}
        <div className="flex items-center gap-2 md:hidden">
          <AnimatedButton>
            <Button 
              className="rounded-full px-4 py-1 bg-background/80 text-foreground border border-border/60 text-sm"
              size="sm"
              variant="outline"
              asChild
            >
              <Link href="/contact" onClick={(e) => smoothScroll(e, "/contact")}>Connect</Link>
            </Button>
          </AnimatedButton>

          <motion.button
            onClick={toggleMobileMenu}
            className="p-2 text-foreground rounded-full hover:bg-primary/10 flex items-center justify-center"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </motion.button>
        </div>
        
        {/* Connect Button */}
        <motion.div 
          className="relative hidden md:block"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={handleClick}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <AnimatedButton>
            <Button 
              className={`rounded-full px-6 py-5 bg-background hover:bg-background/80 text-foreground border border-border/60 ${isAnimating ? 'bouncy-button' : ''}`}
              size="sm"
              variant="outline"
              asChild
            >
              <Link href="/contact" onClick={(e) => smoothScroll(e, "/contact")}>Let&apos;s Connect</Link>
            </Button>
          </AnimatedButton>
        </motion.div>
      </motion.div>
      
      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
            />
            
            {/* Menu */}
            <motion.div
              className="fixed inset-x-4 top-20 rounded-2xl bg-background/95 backdrop-blur-lg z-50 p-6 border border-border/40 shadow-xl max-h-[80vh] overflow-auto"
              initial="closed"
              animate="open"
              exit="closed"
              variants={mobileMenuVariants}
            >
              <motion.nav className="flex flex-col">
                {navItems.map((item) => (
                  <motion.div
                    key={item.href}
                    variants={mobileNavItemVariants}
                    className="py-2"
                  >
                    <Link
                      href={item.href}
                      className={cn(
                        "text-base font-medium py-3 px-4 block transition-colors hover:text-primary relative rounded-xl",
                        item.highlight && "bg-primary/10 border border-primary/20",
                        pathname === item.href
                          ? "text-primary bg-primary/5"
                          : "text-foreground/80"
                      )}
                      onClick={(e) => {
                        setMobileMenuOpen(false);
                        smoothScroll(e, item.href);
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <span>{item.name}</span>
                        {item.highlight && pathname !== item.href && (
                          <span className="flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                          </span>
                        )}
                      </div>
                    </Link>
                  </motion.div>
                ))}
                
                <motion.div 
                  variants={mobileNavItemVariants}
                  className="mt-6 pt-6 border-t border-border/30"
                >
                  <Button 
                    className="rounded-xl w-full py-6 bg-primary text-primary-foreground"
                    size="lg"
                    asChild
                  >
                    <Link href="/contact" onClick={(e) => smoothScroll(e, "/contact")}>Let&apos;s Connect</Link>
                  </Button>
                </motion.div>
              </motion.nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  );
} 