import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfolio of Taher Ahmed | Full-Stack & AI Development Projects",
  description: "Browse Taher Ahmed's portfolio showcasing his best web development, mobile applications, and AI integration projects including SportyPost, Okkhor, and Dreabuild.",
  keywords: ["Taher Ahmed portfolio", "Taher Ahmed projects", "Full Stack projects", "Web Development portfolio", "Mobile App Development examples", "React projects", "AI integration examples", "Bangladesh developer portfolio"],
  openGraph: {
    title: "Portfolio of Taher Ahmed Ashraf | Full-Stack & AI Development Projects",
    description: "Browse Taher Ahmed Ashraf's portfolio showcasing his best web development, mobile applications, and AI integration projects.",
    url: "https://taher.one/portfolio",
    images: [
      {
        url: "/pfp.png",
        width: 1200,
        height: 630,
        alt: "Portfolio projects by Taher Ahmed"
      }
    ],
  }
};

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
} 