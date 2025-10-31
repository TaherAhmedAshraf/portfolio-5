"use client";

import { motion } from "framer-motion";
import { 
  Code2, 
  Database, 
  Globe, 
  Smartphone,
  Cpu,
  Zap,
  Cloud,
  Brain,
  Layers,
  Terminal,
  Rocket,
} from "lucide-react";

const techStack = [
  { icon: Code2, name: "React & Next.js", color: "#61DAFB" },
  { icon: Terminal, name: "Node.js", color: "#339933" },
  { icon: Layers, name: "TypeScript", color: "#3178C6" },
  { icon: Zap, name: "Tailwind CSS", color: "#06B6D4" },
  { icon: Database, name: "PostgreSQL", color: "#4169E1" },
  { icon: Database, name: "MongoDB", color: "#47A248" },
  { icon: Cloud, name: "Firebase", color: "#FFCA28" },
  { icon: Globe, name: "Vue.js", color: "#4FC08D" },
  { icon: Cpu, name: "Electron", color: "#47848F" },
  { icon: Brain, name: "AI/OpenAI", color: "#412991" },
  { icon: Smartphone, name: "React Native", color: "#7952B3" },
  { icon: Rocket, name: "Full Stack", color: "#FF6B6B" },
];

export function TechStackBanner() {
  return (
    <section className="py-12 relative overflow-hidden border-y border-border/40 bg-background/30 backdrop-blur-sm">
      <div className="container mx-auto max-w-6xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h3 className="text-lg md:text-xl font-semibold text-muted-foreground mb-2">
            Powered by Industry-Leading Technologies
          </h3>
        </motion.div>

        {/* Grid layout for tech stack */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {techStack.map((tech, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center justify-center p-4 rounded-xl bg-background/40 border border-border/40 hover:border-primary/40 transition-all duration-300 group"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <div className="relative">
                {/* Glow effect */}
                <div
                  className="absolute inset-0 blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-300 rounded-full"
                  style={{ backgroundColor: tech.color }}
                />
                
                <tech.icon
                  className="w-10 h-10 md:w-12 md:h-12 relative z-10 transition-all duration-300"
                  style={{ color: tech.color }}
                  strokeWidth={1.5}
                />
              </div>
              <span className="text-xs md:text-sm mt-3 text-center text-muted-foreground group-hover:text-foreground transition-colors">
                {tech.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
