"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface Skill {
  name: string;
  level: number;
  color: string;
  category: string;
}

const skills: Skill[] = [
  // Frontend
  { name: "React / Next.js", level: 95, color: "from-cyan-500 to-blue-500", category: "Frontend" },
  { name: "TypeScript", level: 90, color: "from-blue-600 to-blue-700", category: "Frontend" },
  { name: "Vue.js", level: 85, color: "from-green-500 to-emerald-600", category: "Frontend" },
  { name: "Tailwind CSS", level: 95, color: "from-cyan-400 to-teal-500", category: "Frontend" },
  
  // Backend
  { name: "Node.js / Express", level: 90, color: "from-green-600 to-lime-600", category: "Backend" },
  { name: "PostgreSQL / MongoDB", level: 85, color: "from-blue-500 to-indigo-600", category: "Backend" },
  { name: "REST APIs / GraphQL", level: 88, color: "from-pink-500 to-rose-600", category: "Backend" },
  
  // Mobile & Desktop
  { name: "React Native", level: 85, color: "from-purple-500 to-pink-500", category: "Mobile" },
  { name: "Electron.js", level: 80, color: "from-teal-500 to-cyan-600", category: "Desktop" },
  
  // AI & Tools
  { name: "AI Integration", level: 88, color: "from-orange-500 to-red-500", category: "AI" },
  { name: "Firebase / Supabase", level: 90, color: "from-yellow-500 to-orange-500", category: "Backend" },
];

export function SkillsShowcase() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById("skills-showcase");
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  return (
    <section id="skills-showcase" className="py-20 relative">
      <div className="container mx-auto max-w-6xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-cyan-400 bg-clip-text text-transparent">
            Skills & Expertise
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A comprehensive overview of my technical proficiency across various domains
          </p>
        </motion.div>

        <div className="grid gap-4">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, x: -50 }}
              animate={isVisible ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="group"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm md:text-base font-medium text-foreground">
                  {skill.name}
                </span>
                <span className={`text-sm font-bold bg-gradient-to-r ${skill.color} bg-clip-text text-transparent`}>
                  {skill.level}%
                </span>
              </div>
              
              {/* Progress bar container */}
              <div className="relative h-3 bg-secondary/50 rounded-full overflow-hidden border border-border/40">
                {/* Background shimmer effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                  animate={{
                    x: ["-100%", "200%"],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: index * 0.1,
                    ease: "linear",
                  }}
                />
                
                {/* Progress fill */}
                <motion.div
                  className={`absolute inset-y-0 left-0 rounded-full bg-gradient-to-r ${skill.color} shadow-lg`}
                  initial={{ width: 0 }}
                  animate={isVisible ? { width: `${skill.level}%` } : {}}
                  transition={{
                    duration: 1,
                    delay: index * 0.05 + 0.2,
                    ease: "easeOut",
                  }}
                >
                  {/* Glow effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0"
                    animate={{
                      x: ["-100%", "200%"],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: 1 + index * 0.1,
                    }}
                  />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
