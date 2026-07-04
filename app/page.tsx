import { Suspense, lazy } from "react";
import Hero from "./(home)/_components/Hero";
import About from "./(home)/_components/About";
import Skills from "./(home)/_components/Skills";
import SelectedWork from "./(home)/_components/SelectedWork";
import ContactForm from "./(home)/_components/ContactForm";
import Footer from "./(home)/_components/Footer";
import BubbleMenu from "./components/BubbleMenu";
import ScrollToTop from "./components/ScrollToTop";

const ProjectDetailModal = lazy(
  () => import("./(home)/_components/ProjectDetailModal")
);

const navItems = [
  {
    label: "home",
    href: "#",
    ariaLabel: "Home",
    rotation: -8,
    hoverStyles: { bgColor: "#654b92", textColor: "#ffffff" },
  },
  {
    label: "about",
    href: "#about",
    ariaLabel: "About",
    rotation: 8,
    hoverStyles: { bgColor: "#654b92", textColor: "#ffffff" },
  },
  {
    label: "projects",
    href: "#work",
    ariaLabel: "Projects",
    rotation: 8,
    hoverStyles: { bgColor: "#654b92", textColor: "#ffffff" },
  },
  {
    label: "skills",
    href: "#skills",
    ariaLabel: "Skills",
    rotation: 8,
    hoverStyles: { bgColor: "#654b92", textColor: "#ffffff" },
  },
  {
    label: "contact",
    href: "#contact",
    ariaLabel: "Contact",
    rotation: -8,
    hoverStyles: { bgColor: "#654b92", textColor: "#ffffff" },
  },
];

export default function Home() {
  return (
    <>
      <BubbleMenu
        items={navItems}
        menuAriaLabel="Toggle navigation"
        menuBg="#1a1a1b"
        menuContentColor="#fafafa"
        useFixedPosition={true}
        animationEase="back.out(1.5)"
        animationDuration={0.5}
        staggerDelay={0.12}
      />
      <Hero />

      {/* Selected Work */}
      <section className="relative">
        <div className="section-divider" />
        <SelectedWork />
      </section>

      {/* About */}
      <section className="relative section-bg-alt">
        <div className="section-divider" />
        <About />
      </section>

      {/* Skills */}
      <section className="relative">
        <div className="section-divider" />
        <Skills />
      </section>

      {/* Contact */}
      <section className="relative section-bg-alt">
        <div className="section-divider" />
        <ContactForm />
        <Suspense fallback={null}>
          <ProjectDetailModal />
        </Suspense>
      </section>

      <Footer />
      <ScrollToTop />
    </>
  );
}
