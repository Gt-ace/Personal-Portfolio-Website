import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useLocation } from "wouter";
import { ArrowDown } from "lucide-react";
import ProjectJourney from "@/components/projects/ProjectJourney";
import ProjectModal from "@/components/projects/ProjectModal";
import type { Project } from "@/data/projects";

const scrollToProjects = () => {
  document
    .getElementById("projects")
    ?.scrollIntoView({ behavior: "smooth", block: "start" });
};

const Home = () => {
  const [, setLocation] = useLocation();
  const [active, setActive] = useState<Project | null>(null);

  // When arriving from another page via the Projects nav item, scroll down.
  useEffect(() => {
    if (sessionStorage.getItem("scrollTo") === "projects") {
      sessionStorage.removeItem("scrollTo");
      // Wait a frame so the section has laid out before scrolling.
      requestAnimationFrame(() => requestAnimationFrame(scrollToProjects));
    }
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Hero */}
      <section
        id="home"
        className="flex min-h-screen flex-col items-center justify-center px-4 text-center"
      >
        <motion.p
          className="mb-5 text-sm uppercase tracking-[0.28em] text-white/40"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.7 }}
        >
          Designer and engineer
        </motion.p>

        <motion.h1
          className="font-serif text-5xl italic leading-[1.05] text-white sm:text-7xl md:text-8xl"
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
        >
          Arthur Van Petegem
        </motion.h1>

        <motion.p
          className="mt-7 max-w-xl text-base leading-relaxed text-white/55 sm:text-lg"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          I build full-stack products end to end, from the database to the last
          pixel. A few of them live below.
        </motion.p>

        <motion.button
          type="button"
          onClick={scrollToProjects}
          className="group mt-14 flex flex-col items-center gap-2 text-white/40 transition-colors duration-200 hover:text-white/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-4 focus-visible:ring-offset-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          aria-label="Scroll to projects"
        >
          <span className="text-xs uppercase tracking-[0.2em]">Scroll</span>
          <motion.span
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowDown className="h-4 w-4" />
          </motion.span>
        </motion.button>
      </section>

      {/* Project journey */}
      <section id="projects" className="-mt-[12vh] pb-12 md:-mt-[14vh]">
        <div className="mx-auto mb-4 max-w-5xl px-4 text-center md:mb-8">
          <h2 className="font-serif text-3xl italic text-white sm:text-4xl">
            Selected work
          </h2>
        </div>

        <ProjectJourney onOpen={setActive} />
      </section>

      {/* Footer */}
      <footer className="px-4 pb-24 pt-8 text-center">
        <motion.h2
          className="font-serif text-3xl italic text-white sm:text-4xl"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          Let us build something.
        </motion.h2>
        <motion.button
          type="button"
          onClick={() => setLocation("/contact")}
          className="mt-7 inline-flex items-center rounded-lg bg-white px-7 py-3 text-sm font-medium text-black"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.7, delay: 0.08 }}
          whileHover={{ y: -3, scale: 1.03 }}
          whileTap={{ scale: 0.96, y: 0 }}
        >
          Get in touch
        </motion.button>
      </footer>

      <ProjectModal project={active} onClose={() => setActive(null)} />
    </motion.div>
  );
};

export default Home;
