import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Initiatives from "@/components/Initiatives";
import Hackathon from "@/components/Hackathon";
import Recruitment from "@/components/Recruitment";
import Team from "@/components/Team";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Projects />
        <Initiatives />
        <Hackathon />
        <Recruitment />
        <Team />
      </main>
      <Footer />
    </>
  );
}
