import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services by Taher Ahmed | Web, Mobile & AI Development",
  description: "Discover professional services offered by Taher Ahmed Ashraf including web development, mobile applications, AI integration, and custom software solutions for businesses and startups.",
  keywords: ["Taher Ahmed services", "Web Development", "Mobile App Development", "AI Integration", "Full Stack Services", "React Development", "Node.js Development", "Custom Software Bangladesh"],
  openGraph: {
    title: "Services by Taher Ahmed | Web, Mobile & AI Development",
    description: "Discover professional services offered by Taher Ahmed Ashraf including web development, mobile applications, AI integration, and custom software solutions.",
    url: "https://taher.one/services",
    images: [
      {
        url: "/pfp.png",
        width: 1200,
        height: 630,
        alt: "Services offered by Taher Ahmed"
      }
    ],
  }
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
} 