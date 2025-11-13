import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Tools from "@/components/Tools";
import Blog from "@/components/Blog";
import Contact from "@/components/Contact";
import BackgroundElements from "@/components/BackgroundElements";

export default function Home() {
  return (
    <>
      <BackgroundElements />
      <main className="min-h-screen relative" style={{ zIndex: 1 }}>
        <Navbar />
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Tools />
        <Blog />
        <Contact />
        <Footer />
      </main>
    </>
  );
}
