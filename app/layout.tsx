import type { Metadata } from "next";
import { Inter } from "next/font/google";
import SmoothScroll from "@/lib/smooth-scroll";
import Provider from "@/lib/session-provider";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Mohamed Asath | Software Engineer",
  description:
    "Software Engineer specializing in full-stack development, cloud architecture, and building scalable applications.",
  keywords: [
    "software engineer",
    "full-stack developer",
    "portfolio",
    "Mohamed Asath",
    "icy-r",
    "MERN stack",
    "Kubernetes",
    "Docker",
  ],
  authors: [{ name: "M Mohamed Asath" }],
  creator: "M Mohamed Asath",
  openGraph: {
    title: "Mohamed Asath | Software Engineer",
    description:
      "Software Engineer specializing in full-stack development, cloud architecture, and building scalable applications.",
    url: "https://icy-r.dev",
    siteName: "Mohamed Asath",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mohamed Asath | Software Engineer",
    description:
      "Software Engineer specializing in full-stack development, cloud architecture, and building scalable applications.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} antialiased noise-bg`}>
        <Provider>
          <SmoothScroll>{children}</SmoothScroll>
        </Provider>
      </body>
    </html>
  );
}
