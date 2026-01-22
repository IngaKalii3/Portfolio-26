import React, { useEffect, useMemo, useRef, useState } from "react";
import { ArrowUpRight, Lock, Bot, BarChart3, Globe, Sparkles } from "lucide-react";
import { WindowCard } from "./WindowCard";

type Project = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  icon: React.ComponentType<{ className?: string }>;
  kind: "Featured" | "Creative";
};

const projects: Project[] = [
  {
    id: "ferpa-titleix-dashboard",
    title: "FERPA/Title IX Compliance Dashboard",
    description:
      "Automated policy tracking and reporting system for multiple school districts, ensuring regulatory compliance.",
    tags: ["AI", "Compliance", "Dashboard"],
    icon: BarChart3,
    kind: "Featured",
  },
  {
    id: "regulatory-llm-tools",
    title: "Regulatory LLM Tools",
    description:
      "GPT-4 and Claude-powered tools to extract, summarize, and structure regulatory requirements from complex documents.",
    tags: ["GPT-4", "Claude", "NLP"],
    icon: Bot,
    kind: "Featured",
  },
  {
    id: "blockchain-identity",
    title: "Blockchain Identity Verification",
    description: "Secure digital governance prototype using blockchain technology for identity verification.",
    tags: ["Blockchain", "Security", "Identity"],
    icon: Lock,
    kind: "Featured",
  },
  {
    id: "doe-ux-redesign",
    title: "Department of Energy UX Redesign",
    description: "User-centric interface design and content strategy for energy.gov, significantly increasing engagement.",
    tags: ["UX/UI", "Content Strategy", "Federal"],
    icon: Globe,
    kind: "Featured",
  },
  {
    id: "careeros",
    title: "Careeros",
    description:
      "A playful career-exploration experience: swipe through roles, skills, and identity-aligned paths with AI-guided prompts.",
    tags: ["Creative", "Career", "Product"],
    icon: Sparkles,
    kind: "Creative",
  },
  {
    id: "humynity",
    title: "Humynity",
    description:
      "A human-first AI storytelling lab: short narratives, tools, and rituals that restore agency, empathy, and meaning.",
    tags: ["Creative", "Culture", "AI"],
    icon: Sparkles,
    kind: "Creative",
  },
];

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (!mq) return;
    const onChange = () => setReduced(mq.matches);
    onChange();
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);
  return reduced;
}

function useActiveSnapIndex(scrollerRef: React.RefObject<HTMLDivElement>, deps: any[] = []) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    const onScroll = () => {
      const cards = Array.from(el.querySelectorAll<HTMLElement>("[data-card]"));
      if (!cards.length) return;

      const left = el.scrollLeft;
      let best = 0;
      let bestDist = Infinity;

      for (let i = 0; i < cards.length; i++) {
        const c = cards[i];
        const dist = Math.abs(c.offsetLeft - left);
        if (dist < bestDist) {
          bestDist = dist;
          best = i;
        }
      }
      setActive(best);
    };

    onScroll();
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return [active, setActive] as const;
}

function scrollToIndex(scroller: HTMLDivElement | null, index: number) {
  if (!scroller) return;
  const cards = Array.from(scroller.querySelectorAll<HTMLElement>("[data-card]"));
  const target = cards[index];
  if (!target) return;
  scroller.scrollTo({ left: target.offsetLeft, behavior: "smooth" });
}

export const ProjectsSection = () => {
  const reducedMotion = usePrefersReducedMotion();
  const [tab, setTab] = useState<"Featured" | "Creative">("Featured");

  const featured = useMemo(() => projects.filter((p) => p.kind === "Featured"), []);
  const creative = useMemo(() => projects.filter((p) => p.kind === "Creative"), []);

  const items = tab === "Featured" ? featured : creative;

  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const [active] = useActiveSnapIndex(scrollerRef, [tab]);

  return (
    <section id="projects" className="relative overflow-hidden py-14 sm:py-16 md:py-24">
      {/* 3D-ish background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-24 right-[-7rem] w-[22rem] h-[22rem] bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-[-10rem] left-[-7rem] w-[26rem] h-[26rem] bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute inset-0 opacity-[0.18] [mask-image:radial-gradient(55%_55%_at_50%_35%,black,transparent)]">
          <div className="h-full w-full bg-[linear-gradient(to_right,hsl(var(--foreground)/0.08)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--foreground)/0.08)_1px,transparent_1px)] bg-[size:64px_64px]" />
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 md:px-8">
        <div className="space-y-3 mb-6 sm:mb-8">
          <p className="font-mono text-xs sm:text-sm text-primary">Featured Work</p>
          <h2 className="section-title">
            Key <span className="highlight-text">Projects</span>
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base max-w-2xl">
            Mobile-first: swipe cards. Desktop: clean grid. Two lanes—Featured + Creative.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-2 mb-5">
          {(["Featured", "Creative"] as const).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => {
                setTab(t);
                // reset scroll when switching tabs
                requestAnimationFrame(() => scrollToIndex(scrollerRef.current, 0));
              }}
              className={[
                "px-3 py-2 rounded-xl text-xs sm:text-sm font-mono border transition-colors",
                tab === t
                  ? "bg-primary text-primary-foreground border-primary/20"
                  : "bg-background/50 border-foreground/10 hover:bg-muted/50",
              ].join(" ")}
              aria-pressed={tab === t}
            >
              {t}
            </button>
          ))}
        </div>

        {/* ✅ Mobile: swipe carousel */}
        <div className="md:hidden">
          <div
            ref={scrollerRef}
            className="no-scrollbar flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 snap-x snap-mandatory scroll-smooth"
            style={{ WebkitOverflowScrolling: "touch" }}
          >
            {items.map((project) => (
              <div
                key={project.id}
                data-card
                className="snap-start shrink-0 w-[88%] sm:w-[72%]"
              >
                <ProjectCard project={project} reducedMotion={reducedMotion} />
              </div>
            ))}
          </div>

          {/* dots */}
          <div className="flex items-center justify-center gap-2 mt-2">
            {items.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Go to project ${i + 1}`}
                onClick={() => scrollToIndex(scrollerRef.current, i)}
                className={[
                  "h-2 rounded-full transition-all",
                  i === active ? "w-6 bg-primary" : "w-2 bg-foreground/20",
                ].join(" ")}
              />
            ))}
          </div>
        </div>

        {/* ✅ Desktop: organized grid */}
        <div className="hidden md:grid md:grid-cols-2 gap-6">
          {items.map((project, index) => (
            <div
              key={project.id}
              className="animate-fade-up"
              style={{ animationDelay: `${index * 0.08}s` }}
            >
              <ProjectCard project={project} reducedMotion={reducedMotion} />
            </div>
          ))}
        </div>
      </div>

      {/* scrollbar hide (scoped) */}
      <style>{`
        .no-scrollbar { scrollbar-width: none; -ms-overflow-style: none; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
      `}</style>
    </section>
  );
};

function ProjectCard({
  project,
  reducedMotion,
}: {
  project: Project;
  reducedMotion: boolean;
}) {
  const [pressed, setPressed] = useState(false);
  const Icon = project.icon;

  return (
    <div className="[perspective:1200px]">
      <div
        className={[
          "relative will-change-transform",
          "transition-transform duration-200",
          !reducedMotion ? "animate-fade-up" : "",
          pressed ? "scale-[0.985]" : "hover:translate-y-[-2px]",
        ].join(" ")}
        style={{
          transform: pressed ? "rotateX(2deg) rotateY(-4deg)" : undefined,
        }}
        onPointerDown={() => setPressed(true)}
        onPointerUp={() => setPressed(false)}
        onPointerCancel={() => setPressed(false)}
        onPointerLeave={() => setPressed(false)}
      >
        {/* depth glow */}
        <div className="absolute -inset-3 -z-10 rounded-3xl blur-2xl opacity-70 bg-gradient-to-br from-primary/10 via-accent/10 to-transparent" />

        {/* subtle shine sweep */}
        {!reducedMotion && (
          <div className="pointer-events-none absolute inset-0 rounded-2xl overflow-hidden">
            <div className="absolute -left-1/2 top-0 h-full w-1/2 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        )}

        <WindowCard
          title={(project.id.slice(0, 42) + ".tsx").toLowerCase()}
          className="h-full rounded-2xl overflow-hidden border border-foreground/10 bg-background/65 backdrop-blur shadow-window hover:shadow-card transition-shadow duration-300"
        >
          <div className="p-5 sm:p-6 space-y-4">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-primary/10 border border-foreground/10">
                  <Icon className="w-6 h-6 text-primary" />
                </div>

                <span
                  className={[
                    "text-[11px] sm:text-xs font-mono px-2 py-1 rounded-full border",
                    project.kind === "Featured"
                      ? "bg-muted/40 border-foreground/10 text-muted-foreground"
                      : "bg-accent/10 border-accent/20 text-foreground/80",
                  ].join(" ")}
                >
                  {project.kind}
                </span>
              </div>

              <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </div>

            <div>
              <h3 className="font-display text-lg sm:text-xl font-bold leading-snug group-hover:text-primary transition-colors">
                {project.title}
              </h3>
              <p className="text-muted-foreground text-sm sm:text-[15px] mt-2 leading-relaxed">
                {project.description}
              </p>
            </div>

            <div className="flex flex-wrap gap-2 pt-1">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 rounded-full bg-secondary/70 text-secondary-foreground text-[11px] sm:text-xs font-mono border border-foreground/10"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </WindowCard>
      </div>
    </div>
  );
}
