import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const metadata = {
  title: "Projects | Your Portfolio",
  description: "Explore my portfolio of web development and design projects.",
};

// Sample project data - in a real project, this might come from a CMS or database
const projects = [
  {
    id: "project-one",
    title: "Project One",
    description: "A brief description of the project and its purpose.",
    technologies: ["React", "Next.js", "TailwindCSS"],
    category: "Web Development",
  },
  {
    id: "project-two",
    title: "Project Two",
    description: "A brief description of the project and its purpose.",
    technologies: ["TypeScript", "Node.js", "MongoDB"],
    category: "Full Stack",
  },
  {
    id: "project-three", 
    title: "Project Three",
    description: "A brief description of the project and its purpose.",
    technologies: ["Vue.js", "Firebase", "Tailwind CSS"],
    category: "Web Development",
  },
  {
    id: "project-four",
    title: "Project Four",
    description: "A brief description of the project and its purpose.",
    technologies: ["React Native", "Expo", "TypeScript"],
    category: "Mobile Development",
  },
  {
    id: "project-five",
    title: "Project Five",
    description: "A brief description of the project and its purpose.",
    technologies: ["Python", "Django", "PostgreSQL"],
    category: "Backend Development",
  },
  {
    id: "project-six",
    title: "Project Six",
    description: "A brief description of the project and its purpose.",
    technologies: ["HTML", "CSS", "JavaScript"],
    category: "Web Development",
  },
];

export default function ProjectsPage() {
  return (
    <div className="container mx-auto max-w-screen-xl px-4 py-12 md:py-20">
      <div className="flex flex-col gap-4 mb-12">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">My Projects</h1>
        <p className="text-xl text-muted-foreground max-w-[800px]">
          A collection of my work across web development, design, and more.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <Card key={project.id} className="overflow-hidden">
            <div className="relative h-48 bg-muted">
              <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                Project Image
              </div>
            </div>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{project.title}</CardTitle>
                  <CardDescription>{project.description}</CardDescription>
                </div>
                <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
                  {project.category}
                </span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" asChild className="w-full">
                <Link href={`/projects/${project.id}`}>View Details</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
} 