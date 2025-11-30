import type { Metadata } from "next";
import { Inter } from "next/font/google";
import SmoothScroll from "@/lib/smooth-scroll";
import Provider from "@/lib/session-provider";
import "./globals.css";
import { ThemeProvider } from "next-themes";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "M Mohamed Asath | Associate Software Engineer Portfolio",
  description: "Associate Software Engineer at IFS with 1+ year of experience, specializing in full-stack development, database management, and cloud architecture. Pursuing BSc in Software Engineering at SLIIT (CGPA 3.7).",
  keywords: ["associate software engineer", "IFS", "full-stack developer", "portfolio", "Mohamed Asath", "icy-r", "SLIIT", "MERN stack", "Kubernetes", "Docker"],
  authors: [{ name: "M Mohamed Asath" }],
  creator: "M Mohamed Asath",
  openGraph: {
    title: "M Mohamed Asath | Associate Software Engineer Portfolio",
    description: "Associate Software Engineer at IFS with 1+ year of experience, specializing in full-stack development, database management, and cloud architecture.",
    url: "https://icy-r.dev",
    siteName: "M Mohamed Asath Portfolio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "M Mohamed Asath | Associate Software Engineer Portfolio",
    description: "Associate Software Engineer at IFS with 1+ year of experience, specializing in full-stack development, database management, and cloud architecture.",
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
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <Provider>
            <SmoothScroll>{children}</SmoothScroll>
          </Provider>
        </ThemeProvider>
      </body>
    </html>
  );
}
