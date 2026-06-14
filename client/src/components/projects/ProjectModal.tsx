import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ExternalLink, Github, X } from "lucide-react";
import type { Project } from "@/data/projects";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

/**
 * A preview panel for a single project: what it is, how it is built, the stack,
 * and where to go see it. Opens from a card on the journey.
 */
const ProjectModal = ({ project, onClose }: ProjectModalProps) => {
  const reduce = useReducedMotion();
  const closeRef = useRef<HTMLButtonElement>(null);

  // Close on Escape, lock background scroll, and move focus into the dialog.
  useEffect(() => {
    if (!project) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusTimer = window.setTimeout(() => closeRef.current?.focus(), 0);

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      window.clearTimeout(focusTimer);
    };
  }, [project, onClose]);

  return createPortal(
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-modal-title"
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/75" />

          {/* Panel */}
          <motion.div
            className="relative w-full sm:max-w-2xl max-h-[92vh] overflow-y-auto rounded-t-2xl sm:rounded-2xl border border-white/[0.08] bg-[#161618] shadow-2xl shadow-black/60"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.98 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              ref={closeRef}
              onClick={onClose}
              aria-label="Close preview"
              className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-black/40 text-white/70 backdrop-blur-sm transition-colors duration-200 hover:bg-black/60 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="aspect-[16/10] w-full overflow-hidden border-b border-white/[0.06]">
              <img
                src={project.image}
                alt={`${project.title} preview`}
                className="h-full w-full object-cover"
              />
            </div>

            <div className="space-y-7 p-7 sm:p-9">
              <header className="space-y-2">
                {project.meta && (
                  <p className="text-xs uppercase tracking-[0.18em] text-white/40">
                    {project.meta}
                  </p>
                )}
                <h2
                  id="project-modal-title"
                  className="text-2xl font-semibold leading-tight text-white sm:text-3xl"
                >
                  {project.title}
                </h2>
                <p className="font-serif text-lg italic text-white/55">
                  {project.tagline}
                </p>
              </header>

              <section className="space-y-2">
                <h3 className="text-xs uppercase tracking-[0.16em] text-white/40">
                  What it is
                </h3>
                <p className="text-[0.95rem] leading-relaxed text-white/75">
                  {project.description}
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="text-xs uppercase tracking-[0.16em] text-white/40">
                  How it is built
                </h3>
                <p className="text-[0.95rem] leading-relaxed text-white/75">
                  {project.howBuilt}
                </p>
              </section>

              <section className="space-y-3">
                <h3 className="text-xs uppercase tracking-[0.16em] text-white/40">
                  Stack
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-white/[0.08] bg-white/[0.04] px-3 py-1 text-xs text-white/70"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </section>

              <div className="flex flex-wrap gap-3 pt-1">
                {project.url && (
                  <motion.a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg bg-white px-5 py-2.5 text-sm font-medium text-black"
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.97, y: 0 }}
                    transition={{ type: "spring", stiffness: 400, damping: 18 }}
                  >
                    Visit live
                    <ExternalLink className="h-3.5 w-3.5" />
                  </motion.a>
                )}
                {project.github && (
                  <motion.a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg border border-white/15 px-5 py-2.5 text-sm font-medium text-white/80"
                    whileHover={{ y: -2, borderColor: "rgba(255,255,255,0.4)" }}
                    whileTap={{ scale: 0.97, y: 0 }}
                    transition={{ type: "spring", stiffness: 400, damping: 18 }}
                  >
                    Source
                    <Github className="h-3.5 w-3.5" />
                  </motion.a>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
};

export default ProjectModal;
