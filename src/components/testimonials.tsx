"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Star, Quote } from "lucide-react";
import { Card } from "@/components/ui/card";

interface Testimonial {
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  image?: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Sarah Johnson",
    role: "Product Manager",
    company: "Tech Solutions Inc.",
    content: "Taher's expertise in full-stack development is exceptional. He delivered our project ahead of schedule with outstanding quality. His attention to detail and problem-solving skills are remarkable.",
    rating: 5,
  },
  {
    name: "Michael Chen",
    role: "CTO",
    company: "Innovation Labs",
    content: "Working with Taher was a game-changer for our startup. His AI integration skills helped us build a cutting-edge product that exceeded our expectations. Highly recommended!",
    rating: 5,
  },
  {
    name: "Emily Rodriguez",
    role: "Founder",
    company: "Digital Ventures",
    content: "Taher's ability to understand complex requirements and translate them into elegant solutions is impressive. His work on our mobile app was flawless, and the results speak for themselves.",
    rating: 5,
  },
  {
    name: "David Kim",
    role: "Engineering Lead",
    company: "Cloud Systems",
    content: "Exceptional developer with a keen eye for design. Taher not only writes clean, maintainable code but also thinks about the user experience. A true professional in every sense.",
    rating: 5,
  },
];

export function Testimonials() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      
      <div className="container mx-auto max-w-6xl px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-cyan-400 bg-clip-text text-transparent">
            Client Testimonials
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Don&apos;t just take my word for it - hear what clients have to say about working with me
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
            >
              <Card className="relative p-6 bg-background/40 backdrop-blur-sm border-border/40 hover:border-primary/40 transition-all duration-300 h-full overflow-hidden group">
                {/* Gradient background on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Quote icon */}
                <div className="absolute top-4 right-4 opacity-20">
                  <Quote className="w-12 h-12 text-primary" />
                </div>

                <div className="relative z-10">
                  {/* Rating */}
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 + i * 0.05 }}
                      >
                        <Star className="w-5 h-5 fill-yellow-500 text-yellow-500" />
                      </motion.div>
                    ))}
                  </div>

                  {/* Content */}
                  <p className="text-foreground/80 mb-6 italic leading-relaxed">
                    &quot;{testimonial.content}&quot;
                  </p>

                  {/* Author info */}
                  <div className="flex items-center gap-3">
                    <motion.div
                      className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-cyan-500 flex items-center justify-center text-white font-bold text-lg"
                      animate={hoveredIndex === index ? { scale: 1.1 } : { scale: 1 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      {testimonial.name.charAt(0)}
                    </motion.div>
                    <div>
                      <h4 className="font-semibold text-foreground">
                        {testimonial.name}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {testimonial.role} at {testimonial.company}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Decorative element */}
                <motion.div
                  className="absolute -bottom-2 -right-2 w-24 h-24 rounded-full bg-gradient-to-br from-primary/20 to-transparent blur-2xl"
                  animate={{
                    scale: hoveredIndex === index ? 1.5 : 1,
                    opacity: hoveredIndex === index ? 0.6 : 0.3,
                  }}
                  transition={{ duration: 0.3 }}
                />
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
