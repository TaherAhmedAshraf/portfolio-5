import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Taher Ahmed | Hire Full-Stack Developer",
  description: "Get in touch with Taher Ahmed for project inquiries, collaboration opportunities, or to discuss how his expertise in full-stack development and AI can benefit your business.",
  keywords: ["Contact Taher Ahmed", "Hire Taher Ahmed", "Taher Developer Contact", "Full-Stack Developer Bangladesh", "Hire React Developer", "Hire AI Developer"],
  openGraph: {
    title: "Contact Taher Ahmed Ashraf | Hire Full-Stack Developer",
    description: "Get in touch with Taher Ahmed Ashraf for project inquiries, collaboration opportunities, or to discuss how his expertise can benefit your business.",
    url: "https://taher.one/contact",
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

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 