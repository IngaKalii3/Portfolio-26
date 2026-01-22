import React, { useMemo, useRef, useState } from "react";
import { ArrowDown, Mail, Phone, MapPin, Linkedin } from "lucide-react";
import { WindowCard } from "./WindowCard";
export const HeroSection = () => {
  const laptopRef = useRef<HTMLDivElement | null>(null);
  const [tilt, setTilt] = useState({
    rx: 0,
    ry: 0,
    hx: 50,
    hy: 35
  });
  const supportsHover = useMemo(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia?.("(hover: hover) and (pointer: fine)")?.matches ?? false;
  }, []);
  const onMove = (e: React.MouseEvent) => {
    if (!supportsHover) return;
    const el = laptopRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    const px = x / r.width * 100;
    const py = y / r.height * 100;
    const ry = (x - r.width / 2) / r.width * 14;
    const rx = -((y - r.height / 2) / r.height) * 10;
    setTilt({
      rx,
      ry,
      hx: px,
      hy: py
    });
  };
  const onLeave = () => setTilt({
    rx: 0,
    ry: 0,
    hx: 50,
    hy: 35
  });
  return <section className="relative overflow-hidden min-h-screen flex items-center pt-16 pb-16 sm:pb-20">
      {/* Decorative glows */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-24 right-[-7rem] w-[22rem] h-[22rem] bg-accent/25 rounded-full blur-3xl" />
        <div className="absolute bottom-[-10rem] left-[-7rem] w-[26rem] h-[26rem] bg-secondary/25 rounded-full blur-3xl" />
        <div className="absolute inset-0 opacity-[0.18] [mask-image:radial-gradient(55%_55%_at_50%_35%,black,transparent)]">
          <div className="h-full w-full bg-[linear-gradient(to_right,hsl(var(--foreground)/0.08)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--foreground)/0.08)_1px,transparent_1px)] bg-[size:64px_64px]" />
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 md:px-8">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          {/* Left */}
          <div className="space-y-7 sm:space-y-8 animate-fade-up">
            <div className="space-y-2">
              <p className="font-mono text-xs sm:text-sm text-primary tracking-wide">Hello, I&apos;m</p>

              <h1 className="text-[2.6rem] sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold leading-[1.05]">
                Inga <br />
                <span className="highlight-text">Kaltak</span>
              </h1>

              <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground font-light mt-3">
                Applied AI Consultant & Engineer
              </p>
            </div>

            <p className="text-base sm:text-lg text-muted-foreground max-w-xl leading-relaxed">
              Building intelligent systems at the intersection of AI, security, and policy.
              Transforming complex regulatory frameworks into deployable solutions.
            </p>

            <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
              <a href="#contact" className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-mono text-sm rounded-xl hover:bg-primary/90 transition-colors shadow-card">
                Get in Touch
                <ArrowDown className="w-4 h-4 rotate-[-45deg]" />
              </a>

              <a href="#experience" className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-foreground/20 bg-background/40 backdrop-blur font-mono text-sm rounded-xl hover:bg-muted/60 transition-colors">
                View Experience
              </a>

              {/* ✅ LinkedIn */}
              <a href="https://www.linkedin.com/in/ik11/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-foreground/20 bg-background/40 backdrop-blur font-mono text-sm rounded-xl hover:bg-muted/60 transition-colors">
                LinkedIn <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Right: 3D Laptop UI */}
          <div className="animate-fade-up stagger-2">
            <div ref={laptopRef} onMouseMove={onMove} onMouseLeave={onLeave} className="mx-auto lg:ml-auto max-w-md sm:max-w-lg [perspective:1200px]">
              <div className="relative transition-transform duration-200 will-change-transform motion-reduce:transform-none" style={{
              transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`
            }}>
                {/* glossy highlight */}
                <div className="pointer-events-none absolute -inset-6 -z-10 rounded-[2rem] blur-2xl opacity-70" style={{
                background: "radial-gradient(circle at 30% 20%, rgba(124,58,237,0.22), transparent 55%), radial-gradient(circle at 70% 80%, rgba(34,197,94,0.15), transparent 55%)"
              }} />

                {/* Screen */}
                <div className="relative rounded-3xl border border-foreground/10 bg-background/60 backdrop-blur shadow-window overflow-hidden">
                  {/* Screen bezel */}
                  <div className="px-4 py-3 border-b bg-accent border border-purple-400 border-solid">
                    
                  </div>

                  {/* Screen content */}
                  <div className="relative p-5 sm:p-6">
                    {/* follow-cursor sheen */}
                    <div className="pointer-events-none absolute inset-0 opacity-80" style={{
                    background: `radial-gradient(circle at ${tilt.hx}% ${tilt.hy}%, rgba(255,255,255,0.12), transparent 55%)`
                  }} />

                    <WindowCard title="contact.json" className="shadow-card border border-foreground/10 bg-background/60 backdrop-blur rounded-2xl">
                      <div className="space-y-6 p-5">
                        <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-primary/20 to-accent/40 rounded-full mx-auto flex items-center justify-center border border-foreground/10">
                          <span className="font-display text-2xl sm:text-3xl font-bold">IK</span>
                        </div>

                        <div className="space-y-3">
                          <div className="flex items-center gap-3 text-sm">
                            <Mail className="w-4 h-4 text-primary" />
                            <a href="mailto:ingakaltak7@gmail.com" className="font-mono hover:text-primary transition-colors break-all">
                              ingakaltak7@gmail.com
                            </a>
                          </div>

                          <div className="flex items-center gap-3 text-sm">
                            <Phone className="w-4 h-4 text-primary" />
                            <span className="font-mono">215-791-5906</span>
                          </div>

                          <div className="flex items-center gap-3 text-sm">
                            <MapPin className="w-4 h-4 text-primary" />
                            <span className="font-mono">Philadelphia, PA</span>
                          </div>

                          {/* ✅ LinkedIn inside the “screen” too */}
                          <div className="flex items-center gap-3 text-sm">
                            <Linkedin className="w-4 h-4 text-primary" />
                            <a href="https://www.linkedin.com/in/ik11/" target="_blank" rel="noopener noreferrer" className="font-mono hover:text-primary transition-colors break-all">
                              linkedin.com/in/ik11
                            </a>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2 pt-1 justify-center">
                          {["AI Policy", "Cybersecurity", "Consulting"].map(tag => <span key={tag} className="px-3 py-1 bg-secondary/70 text-secondary-foreground text-[11px] sm:text-xs font-mono rounded-full border border-foreground/10">
                              {tag}
                            </span>)}
                        </div>
                      </div>
                    </WindowCard>
                  </div>
                </div>

                {/* Laptop base */}
                <div className="relative mx-auto mt-3 w-[92%]">
                  <div className="h-4 sm:h-5 rounded-b-[2rem] bg-background/60 backdrop-blur border border-foreground/10 shadow-card" />
                  <div className="absolute left-1/2 -translate-x-1/2 top-0 w-16 sm:w-20 h-1.5 sm:h-2 rounded-full bg-foreground/10" />
                </div>

                {/* shadow on the “desk” */}
                <div className="mx-auto mt-2 w-[85%] h-6 rounded-full bg-black/20 blur-xl -z-10 relative" />
              </div>

              <p className="mt-4 text-xs sm:text-sm text-muted-foreground text-center lg:text-right">
                Tip: hover the laptop for depth ✨
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>;
};