"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Trophy, Code, Users, Rocket } from "lucide-react";

interface StatItem {
  icon: React.ReactNode;
  value: number;
  suffix: string;
  label: string;
  color: string;
}

const stats: StatItem[] = [
  {
    icon: <Trophy className="w-6 h-6" />,
    value: 3,
    suffix: "+",
    label: "Years Experience",
    color: "from-yellow-500 to-orange-500",
  },
  {
    icon: <Code className="w-6 h-6" />,
    value: 50,
    suffix: "+",
    label: "Projects Completed",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: <Users className="w-6 h-6" />,
    value: 30,
    suffix: "+",
    label: "Happy Clients",
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: <Rocket className="w-6 h-6" />,
    value: 5,
    suffix: "+",
    label: "Tech Stacks Mastered",
    color: "from-purple-500 to-pink-500",
  },
];

function CountUp({ end, duration = 2 }: { end: number; duration?: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = (currentTime - startTime) / (duration * 1000);

      if (progress < 1) {
        setCount(Math.floor(end * progress));
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration]);

  return <span>{count}</span>;
}

export function AchievementsStats() {
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

    const element = document.getElementById("achievements-stats");
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
    <section id="achievements-stats" className="py-16 relative overflow-hidden">
      {/* Background glow effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
      
      <div className="container mx-auto max-w-6xl px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isVisible ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group"
            >
              {/* Card */}
              <div className="relative p-6 rounded-2xl bg-background/40 backdrop-blur-sm border border-border/40 hover:border-primary/40 transition-all duration-300 overflow-hidden group-hover:shadow-lg group-hover:shadow-primary/20">
                {/* Gradient background on hover */}
                <div 
                  className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                />
                
                {/* Icon */}
                <motion.div
                  className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${stat.color} mb-4`}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <div className="text-white">
                    {stat.icon}
                  </div>
                </motion.div>

                {/* Count */}
                <div className="flex items-baseline gap-1 mb-2">
                  <motion.h3
                    className={`text-4xl md:text-5xl font-bold bg-gradient-to-br ${stat.color} bg-clip-text text-transparent`}
                    initial={{ scale: 0 }}
                    animate={isVisible ? { scale: 1 } : {}}
                    transition={{ type: "spring", stiffness: 100, delay: index * 0.1 + 0.3 }}
                  >
                    {isVisible ? <CountUp end={stat.value} /> : 0}
                  </motion.h3>
                  <span className={`text-2xl md:text-3xl font-bold bg-gradient-to-br ${stat.color} bg-clip-text text-transparent`}>
                    {stat.suffix}
                  </span>
                </div>

                {/* Label */}
                <p className="text-sm md:text-base text-muted-foreground font-medium">
                  {stat.label}
                </p>

                {/* Decorative element */}
                <motion.div
                  className="absolute -bottom-2 -right-2 w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-transparent blur-xl"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: index * 0.2,
                  }}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
