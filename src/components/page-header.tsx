"use client";

import { motion } from "framer-motion";
import { SectionBackground } from "@/components/section-background";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export function PageHeader({ title, subtitle, className = "" }: PageHeaderProps) {
  return (
    <section className={`py-24 md:py-32 relative ${className}`}>
      <SectionBackground variant="gradient" intensity="medium" />
      <div className="container mx-auto max-w-6xl px-4">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          <motion.div
            className="flex flex-col gap-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter gradient-text">
              {title}
            </h1>
            {subtitle && (
              <motion.p 
                className="text-xl md:text-2xl lg:text-3xl font-bold tracking-tighter"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                {subtitle}
              </motion.p>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
} 