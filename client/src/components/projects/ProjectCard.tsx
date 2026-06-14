import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/projects";

interface ProjectCardProps {
  project: Project;
  onOpen: (project: Project) => void;
}

/**
 * A medium card on the project journey. Clicking it opens the preview.
 * Entrance animation is owned by the parent node; this handles hover and press.
 */
const ProjectCard = ({ project, onOpen }: ProjectCardProps) => {
  return (
    <motion.button
      type="button"
      onClick={() => onOpen(project)}
      className="group relative block w-full overflow-hidden rounded-2xl border border-white/[0.07] bg-[#161618] text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
      whileHover={{ y: -6, borderColor: "rgba(255,255,255,0.16)" }}
      whileTap={{ scale: 0.985, y: -2 }}
      transition={{ type: "spring", stiffness: 320, damping: 20 }}
    >
      {/* Top-edge glow on hover */}
      <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      <div className="aspect-[16/10] w-full overflow-hidden">
        <motion.img
          src={project.image}
          alt={`${project.title} preview`}
          loading="lazy"
          className="h-full w-full object-cover"
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.04 }}
          transition={{ type: "spring", stiffness: 200, damping: 25 }}
        />
      </div>

      <div className="space-y-3 p-6">
        {project.meta && (
          <p className="text-[0.7rem] uppercase tracking-[0.16em] text-white/40">
            {project.meta}
          </p>
        )}

        <h3 className="text-xl font-semibold leading-tight text-white">
          {project.title}
        </h3>

        <p className="font-serif text-[1.2rem] italic leading-snug text-white/55">
          {project.tagline}
        </p>

        <div className="flex flex-wrap gap-1.5 pt-1">
          {project.tech.slice(0, 4).map((t) => (
            <span
              key={t}
              className="rounded-full border border-white/[0.06] bg-white/[0.03] px-2 py-0.5 text-[0.7rem] text-white/55"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-1.5 pt-2 text-sm text-white/45 transition-colors duration-200 group-hover:text-white/80">
          <span>View project</span>
          <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
      </div>
    </motion.button>
  );
};

export default ProjectCard;
