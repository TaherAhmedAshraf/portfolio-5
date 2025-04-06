import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { CustomCursor } from "@/components/custom-cursor";
import { BackgroundElements } from "@/components/background-elements";
import { AIAssistant } from "@/components/ai-assistant";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Taher Ahmed | Full-Stack Developer & AI Enthusiast",
  description: "Taher Ahmed is a Full-Stack Developer, AI Enthusiast, and Entrepreneur with 3+ years of experience building scalable web, mobile, and desktop applications. Expertise in React, Node.js, Next.js, and AI integration.",
  keywords: ["Taher Ahmed", "Taher Ahmed Ashraf", "Taher", "Full-Stack Developer", "Web Developer", "AI Developer", "React Developer", "Node.js Developer", "Bangladesh Developer", "Software Engineer"],
  authors: [{ name: "Taher Ahmed Ashraf", url: "https://taher.one" }],
  creator: "Taher Ahmed Ashraf",
  publisher: "Taher Ahmed Ashraf",
  formatDetection: {
    email: false,
    telephone: false,
  },
  metadataBase: new URL("https://taher.one"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "profile",
    firstName: "Taher",
    lastName: "Ahmed",
    username: "taherahmedashraf",
    title: "Taher Ahmed | Full-Stack Developer & AI Enthusiast",
    description: "Full-Stack Developer, AI Enthusiast, and Entrepreneur with 3+ years of experience building scalable web, mobile, and desktop applications.",
    url: "https://taher.one",
    siteName: "Taher Ahmed Portfolio",
    images: [
      {
        url: "/images/taher-ahmed-ashraf.jpg",
        width: 1200,
        height: 630,
        alt: "Taher Ahmed Ashraf - Full Stack Developer"
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Taher Ahmed | Full-Stack Developer & AI Enthusiast",
    description: "Full-Stack Developer, AI Enthusiast, and Entrepreneur with 3+ years of experience building scalable web, mobile, and desktop applications.",
    creator: "@TaherAhmed01",
    images: ["/pfp.png"]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex min-h-screen flex-col`}
      >
        <div className="portfolio-background">
          <div className="gradient-1"></div>
          <div className="gradient-2"></div>
        </div>
        <BackgroundElements />
        <CustomCursor />
        <Header />
        <main className="flex-1 relative z-10">{children}</main>
        <Footer />
        <AIAssistant />
      </body>
    </html>
  );
}
