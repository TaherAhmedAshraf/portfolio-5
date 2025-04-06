"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ReactNode } from "react";

interface AnimatedCardProps {
  title: string;
  description: string;
  tags?: string[];
  link?: string;
  children?: ReactNode;
  className?: string;
  image?: string;
}

export const AnimatedProjectCard = ({
  title,
  description,
  tags = [],
  link = "#",
  children,
  className = "",
  image,
}: AnimatedCardProps) => {
  return (
    <motion.div
      className={`group relative overflow-hidden rounded-lg bg-card border border-border/20 transition-all ${className}`}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        type: "spring",
        damping: 20,
        stiffness: 100,
      }}
      whileHover={{ 
        scale: 1.02, 
        borderColor: "rgba(var(--primary-rgb), 0.5)",
        transition: { duration: 0.2 }
      }}
    >
      <div className="relative overflow-hidden">
        {children}
        <motion.div 
          className="absolute inset-0 flex items-center justify-center text-lg font-medium"
          initial={{ opacity: 1 }}
          whileHover={{ opacity: 1, transition: { duration: 0.3 } }}
        >
          {
            image ? (
              <img src={image} alt={title} className="w-full h-full object-cover" />
            ):(
              <div className="w-full h-full bg-black/40 flex items-center justify-center text-lg font-medium">
                <p>No image available</p>
              </div>
            )
          }
        </motion.div>
        <motion.div 
          className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-primary/10 backdrop-blur-sm transition-opacity flex items-center justify-center"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button variant="outline" className="border-white/20 bg-black/50 hover:bg-black/70">
              <Link href={link}>View Project</Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
      <div className="p-4">
        <h3 className="text-xl font-bold">{title}</h3>
        <p className="text-sm text-muted-foreground mt-1">{description}</p>
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {tags.map((tag, index) => (
              <motion.span
                key={index}
                className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                {tag}
              </motion.span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}; 