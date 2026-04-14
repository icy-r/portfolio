"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import Scene3D from "@/components/Scene3D";
import CustomCursor from "@/components/CustomCursor";

export default function Home() {
  const [avatarUrl, setAvatarUrl] = useState<string | undefined>();

  useEffect(() => {
    async function loadUser() {
      try {
        const res = await fetch("/api/github?type=user&username=icy-r");
        const data = await res.json();
        if (data?.avatar_url) setAvatarUrl(data.avatar_url);
      } catch {
        // ignore
      }
    }
    loadUser();
  }, []);

  return (
    <>
      <CustomCursor />
      <Scene3D />
      <main className="relative" style={{ zIndex: 1 }}>
        <Navbar avatarUrl={avatarUrl} />
        <Hero avatarUrl={avatarUrl} />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
        <Footer />
      </main>
    </>
  );
}
