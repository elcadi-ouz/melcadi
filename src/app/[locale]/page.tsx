import Hero from "@/components/sections/hero";
import About from "@/components/sections/about";
import Services from "@/components/sections/services";
import Languages from "@/components/sections/languages";
import Projects from "@/components/sections/projects";
import SideMenu from "@/components/sections/SideMenu";
import Footer from "@/components/sections/footer";
import Contact from "@/components/sections/contact";

export default function Home() {
  return (
    <main>
      <SideMenu />
      <Hero />
      <About />
      <Languages />
      <Services />
      <Projects />
      <Contact />
      <Footer />
    </main>
  )
}
