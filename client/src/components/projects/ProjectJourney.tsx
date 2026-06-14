import { useLayoutEffect, useMemo, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  useMotionValueEvent,
} from "framer-motion";
import { projects, type Project } from "@/data/projects";
import ProjectCard from "./ProjectCard";

interface ProjectJourneyProps {
  onOpen: (project: Project) => void;
}

/**
 * The scroll-driven path. A white ball travels down a wavy vertical line as the
 * section scrolls; project cards sit at alternating crests and troughs.
 *
 * The same sine function draws the SVG path and positions the ball, so the ball
 * is always exactly on the line. Project i sits at normalized scroll position
 * (i + 0.5) / n, where sin((i + 0.5) * pi) = (-1)^i, placing it at a wave
 * extreme on alternating sides.
 */
const ProjectJourney = ({ onOpen }: ProjectJourneyProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const [width, setWidth] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Track container width (for the centered line + card placement).
  useLayoutEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const update = () => setWidth(el.clientWidth);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Track the mobile breakpoint.
  useLayoutEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const n = projects.length;

  // Geometry, tuned per breakpoint. The segment is the scroll distance
  // between two cards: larger means slower, more deliberate travel.
  const amplitude = isMobile ? 22 : 100;
  const segment = isMobile ? 680 : 900;
  const ballSize = isMobile ? 14 : 20;
  const lineLeft = isMobile ? 30 : width / 2;
  // Keep cards clear of the wave: the gap must exceed the wave's full
  // excursion (amplitude) plus the ball radius, so the line never runs
  // behind a card.
  const cardGap = isMobile ? 64 : amplitude + 32;
  const height = n * segment;

  const cardWidth = isMobile
    ? Math.max(0, width - cardGap - 16)
    : Math.min(440, Math.max(320, width / 2 - cardGap - 24));

  // Build the wavy path in absolute container coordinates.
  const pathD = useMemo(() => {
    if (!width) return "";
    const samples = 240;
    let d = "";
    for (let i = 0; i <= samples; i++) {
      const t = i / samples;
      const x = lineLeft + Math.sin(t * n * Math.PI) * amplitude;
      const y = t * height;
      d += `${i === 0 ? "M" : "L"} ${x.toFixed(2)} ${y.toFixed(2)} `;
    }
    return d.trim();
  }, [width, lineLeft, amplitude, n, height]);

  // Progress runs from the section top reaching the viewport top, to the
  // section bottom reaching the viewport bottom. The ball then descends
  // naturally through the viewport and covers the whole line: top at the
  // start, bottom at the end.
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Dwell-on-scroll: instead of the ball moving linearly with scroll, its
  // progress lingers ("dwells") over each project so every visitor sees all
  // of them, then glides quickly between. We remap raw scroll progress to a
  // piecewise-linear curve whose output holds flat at each project's center
  // while the page keeps scrolling, producing a "stop for a beat" pause.
  //
  // Project i is centered at cᵢ = (i + 0.5) / n in both scroll and output
  // space, so its plateau lands the ball exactly on node i — preserving the
  // existing alignment with the card anchored at top = (i + 0.5) * segment.
  //
  // The half-width of each dwell band. Clamped so the bands stay disjoint and
  // positive as projects are added (they would overlap once 1/n ≤ 2·dwell,
  // i.e. n ≥ 8, which would make the input range non-monotonic and throw).
  const dwell = Math.min(0.07, 0.45 / n);

  const { inputRange, outputRange } = useMemo(() => {
    // Reduced motion keeps the original linear mapping (no dwell pauses).
    if (reduce) return { inputRange: [0, 1], outputRange: [0, 1] };
    const input: number[] = [0];
    const output: number[] = [0];
    for (let i = 0; i < n; i++) {
      const c = (i + 0.5) / n;
      input.push(c - dwell, c + dwell);
      output.push(c, c);
    }
    input.push(1);
    output.push(1);
    return { inputRange: input, outputRange: output };
  }, [n, dwell, reduce]);

  // A single remapped progress value drives both axes (and the trail) so the
  // ball stays exactly on the wavy path and the trail tip stays glued to it,
  // even while parked during a dwell.
  const remapped = useTransform(scrollYProgress, inputRange, outputRange);
  const ballY = useTransform(remapped, (r) => r * height);
  const ballX = useTransform(
    remapped,
    (r) => lineLeft + Math.sin(r * n * Math.PI) * amplitude,
  );

  // The active project is the one whose dwell band currently contains the raw
  // scroll position — the same window over which the ball is parked. Computed
  // on raw scrollYProgress (the remap's input domain) so highlight and dwell
  // share the same window; -1 when the ball is gliding between projects.
  const [activeIndex, setActiveIndex] = useState(-1);
  useMotionValueEvent(scrollYProgress, "change", (p) => {
    let next = -1;
    for (let i = 0; i < n; i++) {
      const c = (i + 0.5) / n;
      if (p >= c - dwell && p <= c + dwell) {
        next = i;
        break;
      }
    }
    setActiveIndex((prev) => (prev === next ? prev : next));
  });

  return (
    <div
      ref={containerRef}
      className="relative mx-auto w-full max-w-6xl px-4"
      style={{ height }}
    >
      {/* The wavy spine */}
      {width > 0 && (
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full"
          width={width}
          height={height}
          viewBox={`0 0 ${width} ${height}`}
          fill="none"
          aria-hidden="true"
        >
          {/* Faint full path */}
          <path
            d={pathD}
            stroke="rgba(255,255,255,0.10)"
            strokeWidth={1.5}
            strokeLinecap="round"
          />
          {/* Bright trail, drawn up to the ball as you scroll */}
          <motion.path
            d={pathD}
            stroke="rgba(255,255,255,0.55)"
            strokeWidth={2}
            strokeLinecap="round"
            style={{ pathLength: reduce ? 1 : remapped }}
          />
          {/* Connector from each node out to its card, plus the node ring */}
          {projects.map((p, i) => {
            const isRight = i % 2 === 0;
            const cx = lineLeft + amplitude * Math.sin((i + 0.5) * Math.PI);
            const cy = (i + 0.5) * segment;
            const cardEdge = isRight ? lineLeft + cardGap : lineLeft - cardGap;
            const active = i === activeIndex;
            return (
              <g key={p.id}>
                {!isMobile && (
                  <line
                    x1={cx}
                    y1={cy}
                    x2={cardEdge}
                    y2={cy}
                    stroke="rgba(255,255,255,0.14)"
                    strokeWidth={1}
                  />
                )}
                {/* Soft pulse ring while the ball dwells on this node */}
                {active && !reduce && (
                  <motion.circle
                    cx={cx}
                    cy={cy}
                    fill="none"
                    stroke="rgba(255,255,255,0.45)"
                    strokeWidth={1.5}
                    initial={{ r: 7, opacity: 0.6 }}
                    animate={{ r: 22, opacity: 0 }}
                    transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut" }}
                  />
                )}
                <motion.circle
                  cx={cx}
                  cy={cy}
                  fill="#0d0d0e"
                  initial={false}
                  animate={{
                    r: active ? 8 : 5,
                    stroke: active
                      ? "rgba(255,255,255,0.9)"
                      : "rgba(255,255,255,0.35)",
                    strokeWidth: active ? 2 : 1.5,
                  }}
                  transition={{ type: "spring", stiffness: 320, damping: 18 }}
                />
              </g>
            );
          })}
        </svg>
      )}

      {/* The travelling ball */}
      {width > 0 && (
        <motion.div
          className="pointer-events-none absolute left-0 top-0 z-10"
          style={{ x: ballX, y: ballY }}
        >
          <div
            className="relative rounded-full bg-white"
            style={{
              width: ballSize,
              height: ballSize,
              marginLeft: -ballSize / 2,
              marginTop: -ballSize / 2,
              boxShadow:
                "0 0 0 1px rgba(255,255,255,0.6), 0 0 22px 6px rgba(255,255,255,0.35)",
            }}
          >
            {/* Soft halo */}
            <span className="absolute left-1/2 top-1/2 -z-10 h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/20 blur-xl" />
          </div>
        </motion.div>
      )}

      {/* Project cards, anchored to each node */}
      {width > 0 &&
        projects.map((project, i) => {
          const isRight = i % 2 === 0;
          const top = (i + 0.5) * segment;

          const positionStyle: React.CSSProperties = isMobile
            ? { top, left: cardGap, right: 16, width: cardWidth }
            : isRight
              ? { top, left: lineLeft + cardGap, width: cardWidth }
              : { top, left: lineLeft - cardGap - cardWidth, width: cardWidth };

          const offX = reduce || isMobile ? 0 : isRight ? 44 : -44;
          const offY = reduce ? 0 : isMobile ? 28 : 0;

          return (
            <div
              key={project.id}
              className="absolute"
              style={{ ...positionStyle, transform: "translateY(-50%)" }}
            >
              <motion.div
                initial={{ opacity: 0, x: offX, y: offY }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true, amount: 0.4, margin: "0px 0px -10% 0px" }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              >
                <ProjectCard
                  project={project}
                  onOpen={onOpen}
                  active={i === activeIndex}
                />
              </motion.div>
            </div>
          );
        })}
    </div>
  );
};

export default ProjectJourney;
