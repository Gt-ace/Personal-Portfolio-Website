import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, ChevronLeft, ChevronRight } from "lucide-react";
import BackArrow from "@/components/BackArrow";

import elevator1 from "@assets/elevator1.jpeg";
import elevator2 from "@assets/elevator2.jpeg";
import elevator3 from "@assets/elevator3.jpeg";

interface Project {
  title: string;
  description: string;
  tech: string[];
  url?: string;
  github?: string;
  images: string[];
}

const projects: Project[] = [
  {
    title: "START Summit — Volunteer Platform",
    description:
      "A full-stack volunteer management platform built for START Summit x Hack 2027, handling 600+ volunteers with role assignment, shift scheduling, team management, and event-day operations. Features a mobile-first dark UI with glassmorphism design, Better Auth integration, a multi-step registration flow, and n8n webhook automation.",
    tech: ["Next.js 16", "TypeScript", "Tailwind CSS v4", "Drizzle ORM", "PostgreSQL", "Better Auth", "n8n"],
    url: "https://volunteer.startglobal.org",
    images: [],
  },
  {
    title: "Summit x Hack 2026 — Inventory Management",
    description:
      "A real-time inventory management system built for START Summit x Hack 2026, enabling volunteers to request supplies via QR code while coordinators and runners fulfill and deliver orders — replacing ad-hoc logistics with a structured, live-updating workflow.",
    tech: ["Next.js 16", "SQLite", "Server Actions", "Docker"],
    url: "https://inventory.startglobal.org",
    images: [],
  },
  {
    title: "Summit x Hack 2026 — Elevator Pitch Booth",
    description:
      "A real-time pitch recording booth for START Summit 2026 that lets founders record 60-second elevator pitches and receive their videos by email. Synchronizes two tablets and a laptop via WebSockets, coordinating QR-based check-in, a synced countdown timer, OBS-controlled video recording, and an automated transcoding-and-delivery pipeline.",
    tech: ["Next.js", "WebSockets", "OBS Integration", "FFmpeg"],
    url: "https://www.startglobal.org/start-summit",
    images: [elevator1, elevator2, elevator3],
  },
];

const AUTO_ROTATE_MS = 6000;

const ImageCarousel = ({ images }: { images: string[] }) => {
  const [current, setCurrent] = useState(0);
  const [resetKey, setResetKey] = useState(0);

  const advance = useCallback(
    () => setCurrent((p) => (p + 1) % images.length),
    [images.length],
  );

  // Auto-rotate; restarts whenever the user interacts (resetKey changes)
  useEffect(() => {
    if (images.length <= 1) return;
    const id = setInterval(advance, AUTO_ROTATE_MS);
    return () => clearInterval(id);
  }, [images.length, advance, resetKey]);

  const go = (next: number) => {
    setCurrent(next);
    setResetKey((k) => k + 1); // restart timer on manual nav
  };

  if (images.length === 0) {
    return (
      <div className="aspect-[16/10] bg-[#141414] flex items-center justify-center">
        <p className="text-gray-600 text-sm italic">Image coming soon</p>
      </div>
    );
  }

  if (images.length === 1) {
    return (
      <div className="aspect-[16/10] overflow-hidden">
        <img
          src={images[0]}
          alt=""
          className="w-full h-full object-cover"
        />
      </div>
    );
  }

  return (
    <div className="aspect-[16/10] relative group overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.img
          key={current}
          src={images[current]}
          alt=""
          className="w-full h-full object-cover absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2 }}
        />
      </AnimatePresence>

      {/* Nav arrows */}
      <button
        onClick={() => go((current - 1 + images.length) % images.length)}
        className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer hover:bg-black/80"
        aria-label="Previous image"
      >
        <ChevronLeft className="w-4 h-4 text-white" />
      </button>
      <button
        onClick={() => go((current + 1) % images.length)}
        className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer hover:bg-black/80"
        aria-label="Next image"
      >
        <ChevronRight className="w-4 h-4 text-white" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => go(i)}
            className={`w-1.5 h-1.5 rounded-full transition-all duration-200 cursor-pointer ${
              i === current ? "bg-white w-4" : "bg-white/40 hover:bg-white/60"
            }`}
            aria-label={`Go to image ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

const ProjectCard = ({
  project,
  index,
}: {
  project: Project;
  index: number;
}) => {
  return (
    <motion.div
      className="group relative bg-[#161616] rounded-xl overflow-hidden border border-white/[0.06] cursor-pointer"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{
        y: -6,
        borderColor: "rgba(255,255,255,0.15)",
      }}
      whileTap={{ scale: 0.985, y: -2 }}
      transition={{ delay: 0.15 + index * 0.12, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {/* Top-edge glow on hover */}
      <motion.div
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
      />

      <ImageCarousel images={project.images} />

      <div className="p-5 space-y-4">
        <h3 className="text-lg font-semibold text-white leading-tight group-hover:text-white/95 transition-colors duration-200">
          {project.title}
        </h3>

        <p className="text-sm text-gray-400 leading-relaxed">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <motion.span
              key={t}
              className="text-xs px-2.5 py-1 rounded-full bg-white/[0.06] text-gray-300 border border-white/[0.06] group-hover:border-white/[0.1] group-hover:bg-white/[0.08] transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >
              {t}
            </motion.span>
          ))}
        </div>

        <div className="flex gap-3 pt-1">
          {project.url && (
            <motion.a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-white cursor-pointer"
              whileHover={{ x: 2 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Visit
            </motion.a>
          )}
          {project.github && (
            <motion.a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-white cursor-pointer"
              whileHover={{ x: 2 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <Github className="w-3.5 h-3.5" />
              Source
            </motion.a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const Projects = () => {
  return (
    <motion.section
      id="projects"
      className="min-h-screen px-4 py-24 md:py-32"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-5xl mx-auto">
        <motion.div
          className="flex items-center mb-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <BackArrow />
          <h2 className="text-3xl font-bold">Projects</h2>
        </motion.div>

        <motion.p
          className="text-gray-500 mb-12"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08, duration: 0.5 }}
        >
          A selection of things I've built.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default Projects;
