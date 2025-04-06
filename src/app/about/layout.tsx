import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Taher Ahmed | Full-Stack Developer & AI Enthusiast",
  description: "Learn about Taher Ahmed's journey, expertise, skills, and experience as a Full-Stack Developer, AI Enthusiast, and CTO of Dreabuild.",
  keywords: ["Taher Ahmed", "Taher Ahmed Ashraf", "Full-Stack Developer", "Developer Biography", "Taher Background", "Taher Skills", "Bangladesh Developer"],
  openGraph: {
    title: "About Taher Ahmed | Full-Stack Developer & AI Enthusiast",
    description: "Learn about Taher Ahmed's journey, expertise, and experience as a Full-Stack Developer, AI Enthusiast, and CTO of Dreabuild.",
    url: "https://taher.one/about",
    images: [
      {
        url: "/pfp.png",
        width: 1200,
        height: 630,
        alt: "Taher Ahmed - Full Stack Developer"
      }
    ],
  }
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
} 