"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StaggerContainer, FadeIn, SlideInLeft, SlideInRight } from "@/components/animations/motion-elements";
import { SectionBackground } from "@/components/section-background";

// Work experience data
const experiences = [
  {
    position: "CTO & Co-Founder",
    company: "Dreabuild",
    location: "Remote",
    period: "Present",
    description: "Leading a team of developers to build AI-powered and business automation tools. Developing scalable web and mobile solutions for startups and businesses.",
    highlights: ["Team Leadership", "AI Integration", "Product Development"],
  },
  {
    position: "Full Stack Developer (Lead)",
    company: "Solar ICT",
    location: "Crissier, Swaziland",
    period: "Dec 2023 – Jul 2024",
    description: "Led the development team, managing their in-house software and websites. Worked on Solar Healthcare (doctor consultation app) & Solar-PVI (e-commerce platform). Managed server hosting & deployment.",
    highlights: ["Team Leadership", "Healthcare App", "E-commerce Platform"],
  },
  {
    position: "Full Stack Developer",
    company: "Genres Agency",
    location: "Dhaka, Bangladesh",
    period: "Jul 2022 – Nov 2023",
    description: "Developed Okkhor.com (e-commerce platform), SportyPost (sports social media manager), and NotesNudge (AI-powered note-taking app).",
    highlights: ["E-commerce", "Social Media Tools", "AI Applications"],
  },
  {
    position: "Junior Software Engineer",
    company: "AgamiSoft Ltd",
    location: "Dhaka, Bangladesh",
    period: "Oct 2021 – May 2022",
    description: "Worked on AgamiSoft Courier Management System, Thailotto (lottery app), MusicZi (music app), and Anayashe (e-commerce site).",
    highlights: ["Courier Management", "Mobile Apps", "Web Development"],
  }
];

export function WorkExperience() {
  return (
    <section className="py-20 relative">
      <div className="container mx-auto max-w-6xl px-4">
        <SlideInLeft className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tighter mb-4">Work Experience</h2>
          <p className="text-muted-foreground max-w-[700px]">
            My professional journey as a developer across various roles and projects.
          </p>
        </SlideInLeft>

        <div className="relative">
          {/* Timeline bar */}
          <motion.div 
            className="absolute left-[15px] md:left-1/2 -translate-x-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-primary/50 via-primary/30 to-primary/5"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "100%", opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          />

          {/* Timeline items */}
          <StaggerContainer className="relative">
            {experiences.map((exp, index) => (
              <TimelineItem 
                key={`${exp.company}-${exp.period}`}
                experience={exp}
                isEven={index % 2 === 0}
                index={index}
              />
            ))}
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
}

interface TimelineItemProps {
  experience: typeof experiences[0];
  isEven: boolean;
  index: number;
}

function TimelineItem({ experience, isEven, index }: TimelineItemProps) {
  const AnimationWrapper = isEven ? SlideInRight : SlideInLeft;
  
  return (
    <div className={`flex flex-col md:flex-row items-start gap-8 mb-16 ${isEven ? 'md:flex-row-reverse' : ''}`}>
      {/* Timeline dot */}
      <motion.div 
        className="absolute left-0 md:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-card border-4 border-primary mt-6 z-10 flex items-center justify-center"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5 + (index * 0.1), type: "spring", stiffness: 100 }}
      >
        <span className="text-xs font-bold">{index + 1}</span>
      </motion.div>

      {/* Date */}
      <div className={`w-full md:w-1/2 pl-12 md:pl-0 ${isEven ? 'md:pr-16 text-left' : 'md:pl-16 text-left md:text-right'}`}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 + (index * 0.1) }}
        >
          <h3 className="text-xl font-bold text-primary">{experience.period}</h3>
          <p className="text-sm text-muted-foreground">{experience.location}</p>
        </motion.div>
      </div>

      {/* Content */}
      <AnimationWrapper className="w-full md:w-1/2 pl-12 md:pl-0" delay={0.2 * index}>
        <Card className="bg-card/50 border-border/20 backdrop-blur-sm w-full">
          <CardHeader>
            <CardTitle>{experience.position}</CardTitle>
            <h4 className="text-lg font-medium">{experience.company}</h4>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              {experience.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {experience.highlights.map((highlight, i) => (
                <motion.span
                  key={highlight}
                  className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + (i * 0.1) + (index * 0.1) }}
                >
                  {highlight}
                </motion.span>
              ))}
            </div>
          </CardContent>
        </Card>
      </AnimationWrapper>
    </div>
  );
} 