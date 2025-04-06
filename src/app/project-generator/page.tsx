"use client";

import { AIProjectGenerator } from "@/components/ai-project-generator";
import { PageHeader } from "@/components/page-header";
import { Container } from "@/components/container";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

export default function ProjectGeneratorPage() {
  return (
    <main className="flex flex-col min-h-screen">
      <PageHeader
        title="AI Project Generator"
        subtitle="Need inspiration for your next coding project? Let AI help you generate creative ideas"
      />
      
      <Container className="mt-8 mb-16 flex-1">
        <div className="max-w-4xl mx-auto space-y-10">
          {/* Description Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="h-full bg-background/60 border-border/40">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4 text-primary">How It Works</h3>
                  <p className="text-muted-foreground mb-4">
                    This AI-powered tool helps you break through creative blocks by suggesting 
                    project ideas tailored to your interests and skills.
                  </p>
                  <p className="text-muted-foreground">
                    Simply enter a brief description like <span className="text-foreground font-medium">"A React app for plant lovers"</span> or {" "}
                    <span className="text-foreground font-medium">"A mobile game with puzzle elements"</span>, and the AI will do the rest.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card className="h-full bg-background/60 border-border/40">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4 text-primary">What You'll Get</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-primary">•</span>
                      <span>Project title and detailed description</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">•</span>
                      <span>Recommended technologies and stack</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">•</span>
                      <span>Difficulty level and time estimates</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">•</span>
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
              <div className="bg-background/40 backdrop-blur-sm p-5 rounded-lg border border-primary/10">
                <h4 className="font-medium text-primary mb-2">For Learning</h4>
                <p className="text-sm text-muted-foreground">
                  Practice new technologies or programming concepts with projects that challenge 
                  your current skills while remaining achievable.
                </p>
              </div>
              
              <div className="bg-background/40 backdrop-blur-sm p-5 rounded-lg border border-primary/10">
                <h4 className="font-medium text-primary mb-2">For Your Portfolio</h4>
                <p className="text-sm text-muted-foreground">
                  Build and polish these projects to showcase your abilities to potential 
                  employers with clean code and attention to detail.
                </p>
              </div>
              
              <div className="bg-background/40 backdrop-blur-sm p-5 rounded-lg border border-primary/10">
                <h4 className="font-medium text-primary mb-2">For Inspiration</h4>
                <p className="text-sm text-muted-foreground">
                  Use these as starting points and modify them to match your interests. Generate 
                  multiple ideas and combine elements from different suggestions.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </main>
  );
} 