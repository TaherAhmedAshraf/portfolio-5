import { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Project Generator | Taher Ahmed",
  description: "Generate creative project ideas using AI. Get detailed project specifications including features, technologies, and time estimates.",
};

export default function ProjectGeneratorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
} 