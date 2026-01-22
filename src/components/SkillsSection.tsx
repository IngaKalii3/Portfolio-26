import React, { useState } from "react";
import { WindowCard } from "./WindowCard";
const skillCategories = [{
  title: "AI & Machine Learning",
  skills: ["GPT-4", "Claude", "LLaMA", "Mistral", "NLP", "Prompt Engineering", "AI Policy"]
}, {
  title: "Security & Compliance",
  skills: ["Penetration Testing", "NIST AI RMF", "FERPA", "OSINT", "Metasploit", "Burp Suite", "Nmap"]
}, {
  title: "Consulting & Analysis",
  skills: ["Policy Analysis", "Government Procurement", "Change Management", "ROI Reporting", "Data Analysis"]
}, {
  title: "Design & Development",
  skills: ["UX/UI Design", "Content Strategy", "Blockchain", "Process Automation", "Dashboard Development"]
}];
export const SkillsSection = () => {
  return <section id="skills" className="relative py-14 sm:py-16 md:py-24 overflow-hidden">
      {/* subtle depth background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-24 right-[-7rem] w-[22rem] h-[22rem] bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-[-10rem] left-[-7rem] w-[26rem] h-[26rem] bg-accent/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 md:px-8">
        <div className="space-y-3 mb-8 sm:mb-10">
          <p className="font-mono text-xs sm:text-sm text-primary">What I Do</p>
          <h2 className="section-title">
            Skills & <span className="highlight-text">Expertise</span>
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base max-w-2xl">
            Compact snapshot of tools and domains I use most often.
          </p>
        </div>

        {/* Mobile-first: 1 col, then 2 col */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
          {skillCategories.map((category, index) => <TiltCard key={category.title} title={category.title.toLowerCase().replace(/\s+/g, "_") + ".ts"} delay={index * 0.08}>
              <div className="space-y-3">
                <h3 className="font-display text-base sm:text-lg font-bold leading-tight">
                  {category.title}
                </h3>

                <div className="flex flex-wrap gap-2">
                  {category.skills.map(skill => <span key={skill} className="inline-flex items-center justify-center py-1 text-[11px] sm:text-xs font-mono rounded-full border border-foreground/10 bg-background/60 text-foreground/85 transition-all hover:border-primary/40 hover:bg-primary/5 active:scale-[0.98] cursor-default text-center px-[4px]">
                      {skill}
                    </span>)}
                </div>
              </div>
            </TiltCard>)}
        </div>
      </div>
    </section>;
};
function TiltCard({
  title,
  delay,
  children
}: {
  title: string;
  delay: number;
  children: React.ReactNode;
}) {
  const [pressed, setPressed] = useState(false);
  return <div className="animate-fade-up [perspective:1200px]" style={{
    animationDelay: `${delay}s`
  }}>
      <div className={["relative transition-transform duration-200 will-change-transform", pressed ? "scale-[0.985]" : "hover:translate-y-[-2px]"].join(" ")} style={{
      transform: pressed ? "rotateX(2deg) rotateY(-3deg)" : undefined
    }} onPointerDown={() => setPressed(true)} onPointerUp={() => setPressed(false)} onPointerCancel={() => setPressed(false)} onPointerLeave={() => setPressed(false)}>
        {/* glow under card */}
        <div className="absolute -inset-3 -z-10 rounded-3xl blur-2xl opacity-70 bg-gradient-to-br from-primary/10 via-accent/10 to-transparent" />

        <WindowCard title={title} className="
            rounded-2xl overflow-hidden
            border border-foreground/10
            bg-background/65 backdrop-blur
            shadow-window
            hover:shadow-card transition-shadow duration-300
          ">
          {/* tighter padding for compact look */}
          <div className="p-4 sm:p-5">{children}</div>
        </WindowCard>
      </div>
    </div>;
}