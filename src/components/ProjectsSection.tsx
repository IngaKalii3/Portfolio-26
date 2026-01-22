import React, { useMemo, useRef, useState } from "react";
import { ArrowUpRight, Lock, Bot, BarChart3, Globe, Sparkles } from "lucide-react";
import { WindowCard } from "./WindowCard";
const projects = [{
  title: "FERPA/Title IX Compliance Dashboard",
  description: "Automated policy tracking and reporting system for multiple school districts, ensuring regulatory compliance.",
  tags: ["AI", "Compliance", "Dashboard"],
  icon: BarChart3,
  kind: "Featured"
}, {
  title: "Regulatory LLM Tools",
  description: "GPT-4 and Claude-powered tools to extract, summarize, and structure regulatory requirements from complex documents.",
  tags: ["GPT-4", "Claude", "NLP"],
  icon: Bot,
  kind: "Featured"
}, {
  title: "Blockchain Identity Verification",
  description: "Secure digital governance prototype using blockchain technology for identity verification.",
  tags: ["Blockchain", "Security", "Identity"],
  icon: Lock,
  kind: "Featured"
}, {
  title: "Department of Energy UX Redesign",
  description: "User-centric interface design and content strategy for energy.gov, significantly increasing engagement.",
  tags: ["UX/UI", "Content Strategy", "Federal"],
  icon: Globe,
  kind: "Featured"
},
// ✅ add your two creative projects
{
  title: "Careeros",
  description: "A playful career-exploration experience: swipe through roles, skills, and identity-aligned paths with AI-guided prompts.",
  tags: ["Creative", "Career", "Product"],
  icon: Sparkles,
  kind: "Creative"
}, {
  title: "Humynity",
  description: "A human-first AI storytelling lab: short narratives, tools, and rituals that restore agency, empathy, and meaning.",
  tags: ["Creative", "Culture", "AI"],
  icon: Sparkles,
  kind: "Creative"
}];
export const ProjectsSection = () => {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(0);
  const items = useMemo(() => projects, []);
  const onScroll = () => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-card]");
    if (!card) return;
    const cardWidth = card.offsetWidth;
    const gap = 16; // matches gap-4
    const idx = Math.round(el.scrollLeft / (cardWidth + gap));
    setActive(Math.max(0, Math.min(items.length - 1, idx)));
  };
  return <section id="projects" className="relative py-16 sm:py-20 md:py-32 overflow-hidden">
      {/* subtle depth background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-24 right-[-7rem] w-[26rem] h-[26rem] bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-[-10rem] left-[-7rem] w-[30rem] h-[30rem] bg-accent/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 md:px-8">
        <div className="space-y-3 sm:space-y-4 mb-8 sm:mb-10 md:mb-12">
          <p className="font-mono text-xs sm:text-sm text-primary">Featured Work</p>
          <h2 className="section-title">
            Key <span className="highlight-text">Projects</span>
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base max-w-2xl">
            Swipe on mobile to explore — each card opens a story about the problem, approach, and outcome.
          </p>
        </div>

        {/* ✅ MOBILE: swipe carousel */}
        <div className="md:hidden">
          <div ref={scrollerRef} onScroll={onScroll} className="
              flex gap-4 overflow-x-auto pb-4 -mx-4 px-4
              snap-x snap-mandatory scroll-smooth
              [scrollbar-width:none] [-ms-overflow-style:none]
            " style={{
          WebkitOverflowScrolling: "touch"
        }}>
            <style>{`
              /* hide scrollbar for webkit */
              .no-scrollbar::-webkit-scrollbar { display: none; }
            `}</style>

            {items.map(project => <div key={project.title} data-card className="snap-start shrink-0 w-[86%] xs:w-[78%] sm:w-[70%]">
                <ProjectCard project={project} />
              </div>)}
          </div>

          {/* dots */}
          <div className="flex items-center justify-center gap-2 mt-2">
            {items.map((_, i) => <button key={i} type="button" aria-label={`Go to project ${i + 1}`} onClick={() => {
            const el = scrollerRef.current;
            if (!el) return;
            const card = el.querySelector<HTMLElement>("[data-card]");
            if (!card) return;
            const cardWidth = card.offsetWidth;
            const gap = 16;
            el.scrollTo({
              left: i * (cardWidth + gap),
              behavior: "smooth"
            });
          }} className={["h-2 rounded-full transition-all", i === active ? "w-6 bg-primary" : "w-2 bg-foreground/20"].join(" ")} />)}
          </div>
        </div>

        {/* ✅ DESKTOP: grid */}
        <div className="hidden md:grid md:grid-cols-2 gap-6">
          {items.map((project, index) => <div key={project.title} className="group animate-fade-up" style={{
          animationDelay: `${index * 0.08}s`
        }}>
              <ProjectCard project={project} />
            </div>)}
        </div>
      </div>
    </section>;
};
function ProjectCard({
  project
}: {
  project: {
    title: string;
    description: string;
    tags: string[];
    icon: React.ComponentType<{
      className?: string;
    }>;
    kind?: string;
  };
}) {
  const [pressed, setPressed] = useState(false);
  return <div className="[perspective:1200px]">
      <div className={["relative transition-transform duration-200 will-change-transform", "hover:translate-y-[-2px]", pressed ? "scale-[0.985]" : ""].join(" ")} style={{
      transform: pressed ? "rotateX(2deg) rotateY(-3deg)" : undefined
    }} onPointerDown={() => setPressed(true)} onPointerUp={() => setPressed(false)} onPointerCancel={() => setPressed(false)} onPointerLeave={() => setPressed(false)}>
        {/* depth glow */}
        <div className="absolute -inset-3 -z-10 blur-2xl opacity-70 bg-gradient-to-br from-primary/10 via-accent/10 to-transparent rounded-md" />

        <WindowCard title={project.title.toLowerCase().replace(/\s+/g, "-").slice(0, 42) + ".tsx"} className="
            h-full rounded-2xl overflow-hidden
            border border-foreground/10
            bg-background/65 backdrop-blur
            shadow-window
            hover:shadow-card transition-shadow duration-300
          ">
          <div className="p-5 sm:p-6 space-y-4">
            <div className="flex items-start justify-between">
              <div className="p-3 rounded-2xl bg-primary/10 border border-foreground/10">
                <project.icon className="w-6 h-6 text-primary" />
              </div>

              <div className="flex items-center gap-3">
                {project.kind && <span className="text-[11px] font-mono px-2 py-1 rounded-full border border-foreground/10 bg-muted/40 text-muted-foreground">
                    {project.kind}
                  </span>}
                <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
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
              {project.tags.map(tag => <span key={tag} className="px-2.5 py-1 rounded-full bg-secondary/70 text-secondary-foreground text-[11px] sm:text-xs font-mono border border-foreground/10">
                  {tag}
                </span>)}
            </div>
          </div>
        </WindowCard>
      </div>
    </div>;
}