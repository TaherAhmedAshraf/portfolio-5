"use client";

import { motion } from "framer-motion";
import { Zap, Shield, Target, Heart, TrendingUp, Users } from "lucide-react";

const benefits = [
  {
    icon: Zap,
    title: "Lightning Fast Delivery",
    description: "I deliver high-quality projects ahead of schedule without compromising on quality.",
    color: "from-yellow-500 to-orange-500",
  },
  {
    icon: Shield,
    title: "Reliable & Trustworthy",
    description: "Clean code, proper documentation, and commitment to best practices in every project.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Target,
    title: "Goal-Oriented Approach",
    description: "I focus on your business objectives and deliver solutions that drive real results.",
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: Heart,
    title: "Passionate About Tech",
    description: "I stay updated with the latest technologies to provide cutting-edge solutions.",
    color: "from-pink-500 to-rose-500",
  },
  {
    icon: TrendingUp,
    title: "Scalable Solutions",
    description: "I build applications that grow with your business and handle increased demand.",
    color: "from-purple-500 to-indigo-500",
  },
  {
    icon: Users,
    title: "Excellent Communication",
    description: "Regular updates, transparent progress tracking, and responsive support.",
    color: "from-teal-500 to-cyan-500",
  },
];

export function WhyWorkWithMe() {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-primary/5" />
      
      <div className="container mx-auto max-w-6xl px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-cyan-400 bg-clip-text text-transparent">
            Why Work With Me?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            I bring more than just technical skills to the table - I deliver value through commitment, quality, and results
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="relative p-6 rounded-2xl bg-background/40 backdrop-blur-sm border border-border/40 hover:border-primary/40 transition-all duration-300 h-full overflow-hidden">
                {/* Gradient background on hover */}
                <div 
                  className={`absolute inset-0 bg-gradient-to-br ${benefit.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                />
                
                {/* Icon */}
                <motion.div
                  className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${benefit.color} mb-4 relative z-10`}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <benefit.icon className="w-6 h-6 text-white" />
                </motion.div>

                {/* Content */}
                <h3 className="text-xl font-bold mb-2 relative z-10">
                  {benefit.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed relative z-10">
                  {benefit.description}
                </p>

                {/* Decorative element */}
                <motion.div
                  className="absolute -bottom-4 -right-4 w-24 h-24 rounded-full bg-gradient-to-br from-primary/20 to-transparent blur-2xl"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: index * 0.2,
                  }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
