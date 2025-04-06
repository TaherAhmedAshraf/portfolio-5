"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AnimatedButton } from "@/components/animations/motion-elements";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { motion } from "framer-motion";

interface ProjectIdea {
  title: string;
  description: string;
  technologies: string[];
  difficulty: string;
  estimatedTime: string;
  keyFeatures: string[];
}

export function AIProjectGenerator() {
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [projectIdea, setProjectIdea] = useState<ProjectIdea | null>(null);
  const [error, setError] = useState("");

  const handleGenerateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!prompt.trim()) return;
    
    setIsLoading(true);
    setError("");
    
    try {
      const promptMessage = `Generate a creative and detailed project idea based on the following input: "${prompt}".
      You MUST respond with ONLY a JSON object without ANY explanatory text or markdown formatting.
      The JSON object should have the following properties:
      {
        "title": "Project Title",
        "description": "A detailed description of the project",
        "technologies": ["Technology1", "Technology2", "Technology3"],
        "difficulty": "Beginner/Intermediate/Advanced",
        "estimatedTime": "Estimated time to complete",
        "keyFeatures": ["Feature 1", "Feature 2", "Feature 3", "Feature 4"]
      }
      IMPORTANT: Your response must be parseable JSON. Do not include any text outside the JSON object, no markdown formatting, and no explanation.`;
      
      const response = await fetch("/api/ai-assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: promptMessage,
          history: [],
          forceJsonResponse: true, // Signal to the backend that we need JSON
        }),
      });
      
      if (!response.ok) {
        throw new Error("Failed to generate project idea");
      }
      
      const { reply } = await response.json();
      
      // Try to extract JSON from the response
      let jsonStr = reply;
      let ideaData = null;
      
      // Attempt various parsing strategies
      try {
        // First try direct parsing
        ideaData = JSON.parse(jsonStr);
      } catch {
        console.log("Direct parsing failed, trying to extract JSON...");
        
        // Try to extract JSON from markdown code blocks
        if (reply.includes("```json")) {
          jsonStr = reply.split("```json")[1].split("```")[0].trim();
        } else if (reply.includes("```")) {
          jsonStr = reply.split("```")[1].split("```")[0].trim();
        } else {
          // Try to find anything that looks like JSON
          const jsonMatch = reply.match(/\{[\s\S]*\}/);
          if (jsonMatch) {
            jsonStr = jsonMatch[0];
          }
        }
        
        try {
          ideaData = JSON.parse(jsonStr);
        } catch (innerError) {
          console.error("All JSON parsing attempts failed:", innerError);
          
          // Create a fallback project structure from the text response
          ideaData = createFallbackProject(reply);
        }
      }
      
      if (ideaData && isValidProjectIdea(ideaData)) {
        setProjectIdea(ideaData);
      } else {
        throw new Error("Invalid project data structure");
      }
    } catch (error) {
      console.error("Error generating project:", error);
      setError("An error occurred while generating your project idea. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  
  // Validate that the project idea has the required structure
  const isValidProjectIdea = (idea: unknown): idea is ProjectIdea => {
    if (!idea || typeof idea !== 'object') return false;
    
    const potentialIdea = idea as Partial<ProjectIdea>;
    return (
      typeof potentialIdea.title === "string" &&
      typeof potentialIdea.description === "string" &&
      Array.isArray(potentialIdea.technologies) &&
      typeof potentialIdea.difficulty === "string" &&
      typeof potentialIdea.estimatedTime === "string" &&
      Array.isArray(potentialIdea.keyFeatures)
    );
  };
  
  // Create a fallback project structure when parsing fails
  const createFallbackProject = (text: string): ProjectIdea => {
    // Extract title - first sentence or first line
    const titleMatch = text.match(/^(.+?)[\.\?\!]|^(.+?)[\r\n]/);
    const title = titleMatch 
      ? (titleMatch[1] || titleMatch[2]).trim() 
      : "Project Idea";
    
    // Rest of the text as description
    const description = text
      .replace(title, '')
      .trim()
      .replace(/^[\.\?\!\:\,\r\n\s]+/, '');
    
    // Extract any technologies mentioned
    const techKeywords = [
      "React", "Vue", "Angular", "JavaScript", "TypeScript", "Python", 
      "Java", "C#", "Node.js", "Express", "Django", "Flask", "Ruby", 
      "Rails", "PHP", "Laravel", "HTML", "CSS", "Tailwind", "Bootstrap",
      "MongoDB", "PostgreSQL", "MySQL", "Firebase", "AWS", "Azure", "Docker"
    ];
    
    const technologies = techKeywords
      .filter(tech => new RegExp(`\\b${tech}\\b`, 'i').test(text))
      .slice(0, 5);
    
    if (technologies.length === 0) {
      technologies.push("JavaScript", "HTML", "CSS");
    }
    
    return {
      title,
      description,
      technologies,
      difficulty: text.toLowerCase().includes("advanced") 
        ? "Advanced" 
        : text.toLowerCase().includes("beginner") 
          ? "Beginner" 
          : "Intermediate",
      estimatedTime: text.match(/(\d+\s*(?:week|month|day|hour|week|month)s?)/i)?.[1] || "2-4 weeks",
      keyFeatures: [
        "Feature extracted from AI response",
        "Interactive user interface",
        "Data persistence",
        "Responsive design"
      ]
    };
  };

  return (
    <div className="w-full">
      <Card className="glass-card border-border/40">
        <CardHeader>
          <CardTitle className="text-2xl">AI Project Generator</CardTitle>
          <CardDescription>
            Describe what kind of project you&apos;re interested in, and I&apos;ll generate a creative project idea for you.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleGenerateProject} className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-2">
              <Input
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="e.g., A React app for productivity, A mobile game about space exploration..."
                className="flex-1 bg-background/50"
              />
              <AnimatedButton>
                <Button 
                  type="submit" 
                  disabled={isLoading || !prompt.trim()}
                  className="whitespace-nowrap"
                >
                  {isLoading ? "Generating..." : "Generate Idea"}
                </Button>
              </AnimatedButton>
            </div>
            
            {error && (
              <div className="p-3 bg-destructive/10 border border-destructive/20 text-destructive rounded-md text-sm">
                {error}
              </div>
            )}
          </form>
          
          {isLoading && (
            <div className="flex justify-center my-8">
              <div className="flex gap-2">
                <span className="w-3 h-3 bg-primary/60 rounded-full animate-pulse"></span>
                <span className="w-3 h-3 bg-primary/60 rounded-full animate-pulse animation-delay-200"></span>
                <span className="w-3 h-3 bg-primary/60 rounded-full animate-pulse animation-delay-400"></span>
              </div>
            </div>
          )}
          
          {projectIdea && !isLoading && (
            <motion.div 
              className="mt-6 space-y-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-primary">{projectIdea.title}</h3>
                <p className="text-muted-foreground">{projectIdea.description}</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="font-semibold">Technologies</h4>
                  <div className="flex flex-wrap gap-2">
                    {projectIdea.technologies.map((tech, i) => (
                      <motion.span
                        key={i}
                        className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-semibold">Project Details</h4>
                  <p className="text-sm">
                    <span className="font-medium">Difficulty:</span> {projectIdea.difficulty}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Estimated Time:</span> {projectIdea.estimatedTime}
                  </p>
                </div>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-semibold">Key Features</h4>
                <ul className="list-disc pl-5 space-y-1">
                  {projectIdea.keyFeatures.map((feature, i) => (
                    <motion.li
                      key={i}
                      className="text-sm text-muted-foreground"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + (i * 0.1) }}
                    >
                      {feature}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}
        </CardContent>
        <CardFooter className="text-xs text-muted-foreground">
          Powered by AI to help you find inspiration for your next project.
        </CardFooter>
      </Card>
    </div>
  );
} 