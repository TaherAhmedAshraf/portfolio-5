"use client";

import { AIProjectGenerator } from "@/components/ai-project-generator";
import { PageHeader } from "@/components/page-header";
import { Container } from "@/components/container";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { FloatingParticles } from "@/components/floating-particles";
import { Sparkles, Target, Code, Lightbulb } from "lucide-react";

export default function ProjectGeneratorPage() {
  return (
    <main className="flex flex-col min-h-screen">
      {/* Floating particles effect */}
      <FloatingParticles />
      
      <PageHeader
        title="AI Project Generator"
        subtitle="Need inspiration for your next coding project? Let AI help you generate creative ideas"
      />
      
      <Container className="mt-8 mb-16 flex-1 relative z-10">
        <div className="max-w-4xl mx-auto space-y-10">
          {/* Description Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="h-full bg-background/60 border-border/40 hover:border-primary/40 transition-all duration-300 group overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <CardContent className="p-6 relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <motion.div
                      className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <Sparkles className="w-5 h-5 text-white" />
                    </motion.div>
                    <h3 className="text-xl font-semibold text-primary">How It Works</h3>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    This AI-powered tool helps you break through creative blocks by suggesting 
                    project ideas tailored to your interests and skills.
                  </p>
                  <p className="text-muted-foreground">
                    Simply enter a brief description like <span className="text-foreground font-medium">&quot;A React app for plant lovers&quot;</span> or {" "}
                    <span className="text-foreground font-medium">&quot;A mobile game with puzzle elements&quot;</span>, and the AI will do the rest.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card className="h-full bg-background/60 border-border/40 hover:border-primary/40 transition-all duration-300 group overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <CardContent className="p-6 relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <motion.div
                      className="p-3 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <Target className="w-5 h-5 text-white" />
                    </motion.div>
                    <h3 className="text-xl font-semibold text-primary">What You&apos;ll Get</h3>
                  </div>
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex items-start gap-3">
                      <Code className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span>Project title and detailed description</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Code className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span>Recommended technologies and stack</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Code className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span>Difficulty level and time estimates</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Code className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span>Key features to implement in your project</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </div>
          
          {/* Generator Component */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <AIProjectGenerator />
          </motion.div>
          
          {/* Additional Info Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl p-8 border border-primary/20"
          >
            <h3 className="text-xl font-semibold mb-6 text-center">How to Use These Project Ideas</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <motion.div 
                className="bg-background/40 backdrop-blur-sm p-5 rounded-lg border border-primary/10 group hover:border-primary/30 transition-all duration-300"
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <motion.div
                    className="p-2 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500"
                    whileHover={{ rotate: 5 }}
                  >
                    <Code className="w-5 h-5 text-white" />
                  </motion.div>
                  <h4 className="font-medium text-primary">For Learning</h4>
                </div>
                <p className="text-sm text-muted-foreground">
                  Practice new technologies or programming concepts with projects that challenge 
                  your current skills while remaining achievable.
                </p>
              </motion.div>
              
              <motion.div 
                className="bg-background/40 backdrop-blur-sm p-5 rounded-lg border border-primary/10 group hover:border-primary/30 transition-all duration-300"
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <motion.div
                    className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500"
                    whileHover={{ rotate: 5 }}
                  >
                    <Target className="w-5 h-5 text-white" />
                  </motion.div>
                  <h4 className="font-medium text-primary">For Your Portfolio</h4>
                </div>
                <p className="text-sm text-muted-foreground">
                  Build and polish these projects to showcase your abilities to potential 
                  employers with clean code and attention to detail.
                </p>
              </motion.div>
              
              <motion.div 
                className="bg-background/40 backdrop-blur-sm p-5 rounded-lg border border-primary/10 group hover:border-primary/30 transition-all duration-300"
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <motion.div
                    className="p-2 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500"
                    whileHover={{ rotate: 5 }}
                  >
                    <Lightbulb className="w-5 h-5 text-white" />
                  </motion.div>
                  <h4 className="font-medium text-primary">For Inspiration</h4>
                </div>
                <p className="text-sm text-muted-foreground">
                  Use these as starting points and modify them to match your interests. Generate 
                  multiple ideas and combine elements from different suggestions.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </Container>
    </main>
  );
} 