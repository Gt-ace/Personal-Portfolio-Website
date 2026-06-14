import volunteerImg from "@assets/projects/volunteer-platform.avif";
import cruxImg from "@assets/projects/crux.avif";
import amberImg from "@assets/projects/amber.avif";

/**
 * Project data for the landing-page journey.
 *
 * To add a project: drop its preview image in `attached_assets/projects/`,
 * import it above, and append an entry below. Order here is top-to-bottom
 * order on the page; cards alternate sides automatically.
 */
export interface Project {
  /** Stable id, used as the React key and the modal anchor. */
  id: string;
  /** Display name. */
  title: string;
  /** One-line essence, shown on the card. Set in a serif italic highlight. */
  tagline: string;
  /** What it is. Shown in the preview. */
  description: string;
  /** How it is built. Shown in the preview. */
  howBuilt: string;
  /** Tech stack chips. */
  tech: string[];
  /** Live URL, if any. */
  url?: string;
  /** Source URL, if public. */
  github?: string;
  /** Preview image (imported asset). */
  image: string;
  /** Free-form context line, e.g. a year or a role. */
  meta?: string;
}

export const projects: Project[] = [
  {
    id: "volunteer-platform",
    title: "START Summit Volunteer Platform",
    tagline: "Volunteer operations for a 600-person summit.",
    description:
      "A full-stack platform that runs volunteer operations for START Summit x Hack: registration, role assignment, shift scheduling, team management, and live event-day coordination for more than 600 people.",
    howBuilt:
      "Next.js 16 and TypeScript on the surface, Drizzle ORM over PostgreSQL underneath, Better Auth for accounts, and n8n webhooks wiring up the automation. Mobile-first dark interface built for a phone in a volunteer's hand on event day.",
    tech: ["Next.js 16", "TypeScript", "Tailwind v4", "Drizzle", "PostgreSQL", "Better Auth", "n8n"],
    url: "https://volunteer.startglobal.org",
    image: volunteerImg,
    meta: "2027 edition",
  },
  {
    id: "crux",
    title: "Crux",
    tagline: "A product comparison engine that actually reasons.",
    description:
      "Crux resolves two products, fetches and normalizes their specifications, aligns them row by row, and decides the winner of each row. The language model only normalizes; alignment and row winners are pure, deterministic code.",
    howBuilt:
      "Next.js 15 and React 19 with a Three.js and React Three Fiber visual layer, Drizzle over SQLite for storage, and a Claude model handling the normalize step. Ships as a container to a self-hosted box behind a shared Caddy.",
    tech: ["Next.js 15", "React 19", "Three.js", "Drizzle", "SQLite", "Claude"],
    url: "https://crux.avp.software",
    image: cruxImg,
    meta: "Live",
  },
  {
    id: "amber",
    title: "Amber",
    tagline: "A personal canvas you actually own.",
    description:
      "Self-hostable software for a small personal space: link-in-bio, a little site, a notebook, a blog. Content is plain markdown files on disk with no database lock-in. Anti-platform by design: your software, your server, your files.",
    howBuilt:
      "Runs on Bun with bun:sqlite and ships as a Docker image, reading markdown straight off the filesystem so content stays portable, greppable, and version-controllable with git. Released under AGPL-3.0.",
    tech: ["Bun", "SQLite", "Docker", "Markdown", "AGPL-3.0"],
    url: "https://amber.avp.software",
    github: "https://github.com/Gt-ace/Amber",
    image: amberImg,
    meta: "Open source",
  },
];
