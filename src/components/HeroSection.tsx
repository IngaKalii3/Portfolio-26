import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowDown,
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Calendar,
  ArrowUpRight
} from "lucide-react";

/* =========================
   DATA
========================= */

const experiences = [
  {
    title: "AI Policy Engineer",
    company: "Independent Consultant",
    type: "Self-employed",
    period: "Oct 2023 - Present",
    location: "Philadelphia, PA",
    highlights: [
      "Built FERPA/Title IX compliance dashboards for school districts",
      "Launched AI consultancy delivering automation prototypes",
      "Converted policy frameworks into deployable controls",
      "Developed GPT-4 / Claude regulatory extraction tools",
      "Conducted NIST AI RMF feasibility assessments",
      "Integrated open-source LLMs cutting infra costs 40%"
    ]
  },
  {
    title: "Penetration Tester",
    company: "Defense Intelligence Agency & Lockheed Martin",
    type: "Contract",
    period: "Nov 2024 - May 2025",
    location: "Washington, DC (Remote)",
    highlights: [
      "Executed 12+ authorized penetration tests",
      "Discovered 47 critical vulnerabilities",
      "Reduced security incidents by 30%",
      "Briefed senior stakeholders with risk action plans"
    ]
  }
];

/* =========================
   TYPEWRITER HOOK
========================= */

function useTypewriter(text: string, speed = 50) {
  const [output, setOutput] = useState("");
  useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      setOutput(text.slice(0, i));
      i++;
      if (i > text.length) clearInterval(id);
    }, speed);
    return () => clearInterval(id);
  }, [text, speed]);
  return output;
}

/* =========================
   COMPONENT
========================= */

export default function HeroExperience() {
  const typed = useTypewriter("Applied AI Consultant & Engineer");
  const laptopRef = useRef<HTMLDivElement | null>(null);

  const [tilt, setTilt] = useState({ rx: 0, ry: 0, hx: 50, hy: 40 });

  const supportsHover = useMemo(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(hover: hover)").matches;
  }, []);

  const onMove = (e: React.MouseEvent) => {
    if (!supportsHover || !laptopRef.current) return;
    const r = laptopRef.current.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    setTilt({
      rx: -((y - r.height / 2) / r.height) * 8,
      ry: ((x - r.width / 2) / r.width) * 10,
      hx: (x / r.width) * 100,
      hy: (y / r.height) * 100
    });
  };

  return (
    <section className="relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute w-[60rem] h-[60rem] bg-primary/20 rounded-full blur-3xl animate-pulse -top-40 -left-40" />
        <div className="absolute w-[50rem] h-[50rem] bg-accent/20 rounded-full blur-3xl animate-[pulse_6s_ease-in-out_infinite] bottom-[-20rem] right-[-20rem]" />
      </div>

      {/* HERO */}
      <div className="container mx-auto px-4 py-24 grid gap-16 lg:grid-cols-2 items-center">
        <div className="space-y-6 text-center lg:text-left">
          <p className="font-mono text-xs text-primary">Hello, I'm</p>
          <h1 className="font-display text-5xl sm:text-6xl font-bold leading-tight">
            Inga <span className="text-primary">Kaltak</span>
          </h1>
          <p className="font-mono text-muted-foreground h-6">{typed}<span className="animate-pulse">▍</span></p>
          <p className="max-w-xl mx-auto lg:mx-0 text-muted-foreground">
            Building intelligent systems at the intersection of AI, security, and policy.
          </p>
          <div className="flex flex-wrap justify-center lg:justify-start gap-3">
            <HeroButton href="#experience" primary>
              View Experience <ArrowDown className="w-4 h-4 -rotate-45" />
            </HeroButton>
            <HeroButton href="https://www.linkedin.com/in/ik11" external>
              LinkedIn <Linkedin className="w-4 h-4" />
            </HeroButton>
          </div>
        </div>

        {/* Laptop */}
        <div
          ref={laptopRef}
          onMouseMove={onMove}
          onMouseLeave={() => setTilt({ rx: 0, ry: 0, hx: 50, hy: 40 })}
          className="mx-auto max-w-md [perspective:1200px]"
        >
          <div
            className="transition-transform duration-200"
            style={{ transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)` }}
          >
            {/* Screen */}
            <div className="rounded-3xl border border-foreground/10 bg-background/70 backdrop-blur shadow-2xl overflow-hidden">
              <div className="h-7 bg-gradient-to-r from-muted/50 to-muted border-b border-foreground/10" />
              <div className="p-4 relative">
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at ${tilt.hx}% ${tilt.hy}%, rgba(255,255,255,0.15), transparent 60%)`
                  }}
                />
                <div className="space-y-3 font-mono text-xs">
                  <ContactRow icon={<Mail />} text="ingakaltak7@gmail.com" />
                  <ContactRow icon={<Phone />} text="215-791-5906" />
                  <ContactRow icon={<MapPin />} text="Philadelphia, PA" />
                </div>
              </div>
            </div>
            {/* Base */}
            <div className="mt-2 h-4 rounded-b-3xl bg-background/60 border border-foreground/10" />
          </div>
        </div>
      </div>

      {/* EXPERIENCE */}
      <div id="experience" className="container mx-auto px-4 pb-32 space-y-6">
        <h2 className="text-3xl font-display font-bold">Experience</h2>
        {experiences.map(exp => (
          <div key={exp.title} className="rounded-2xl border border-foreground/10 bg-background/60 backdrop-blur p-6 shadow-card">
            <div className="flex flex-col md:flex-row md:justify-between gap-2">
              <div>
                <h3 className="font-display font-bold text-xl flex items-center gap-2">
                  {exp.title} <ArrowUpRight className="w-4 h-4 text-primary" />
                </h3>
                <p className="text-muted-foreground">{exp.company}</p>
              </div>
              <div className="flex gap-4 text-xs font-mono text-muted-foreground">
                <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{exp.period}</span>
                <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{exp.location}</span>
              </div>
            </div>
            <ul className="mt-4 space-y-2">
              {exp.highlights.map(h => (
                <li key={h} className="text-sm text-muted-foreground flex gap-2">
                  <span className="mt-2 w-1.5 h-1.5 bg-primary rounded-full" />
                  {h}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

/* =========================
   UI PARTS
========================= */

function HeroButton({ children, href, primary, external }: any) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono transition-all active:translate-y-[1px] ${
        primary
          ? "bg-primary text-primary-foreground shadow-md hover:shadow-lg"
          : "border border-foreground/20 bg-background/60 backdrop-blur hover:bg-muted/60"
      }`}
    >
      {children}
    </a>
  );
}

function ContactRow({ icon, text }: any) {
  return (
    <div className="flex gap-2 items-center">
      <span className="text-primary w-4 h-4">{icon}</span>
      <span>{text}</span>
    </div>
  );
}
