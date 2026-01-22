import React, { useMemo, useRef, useState } from "react";
import { ArrowDown, Mail, Phone, MapPin, Linkedin } from "lucide-react";
import { WindowCard } from "./WindowCard";

export const HeroSection = () => {
  const laptopRef = useRef<HTMLDivElement | null>(null);

  const [tilt, setTilt] = useState({
    rx: 0,
    ry: 0,
    hx: 50,
    hy: 35,
  });

  const supportsHover = useMemo(() => {
    if (typeof window === "undefined") return false;
    return (
      window.matchMedia?.("(hover: hover) and (pointer: fine)")?.matches ?? false
    );
  }, []);

  const onMove = (e: React.MouseEvent) => {
    if (!supportsHover || !laptopRef.current) return;

    const rect = laptopRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const px = (x / rect.width) * 100;
    const py = (y / rect.height) * 100;

    setTilt({
      rx: -((y - rect.height / 2) / rect.height) * 10,
      ry: ((x - rect.width / 2) / rect.width) * 14,
      hx: px,
      hy: py,
    });
  };

  const resetTilt = () => {
    setTilt({ rx: 0, ry: 0, hx: 50, hy: 35 });
  };

  // entrance animation
  const [mounted, setMounted] = useState(false);
  React.useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  const entranceStyle = mounted
    ? { transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) translateY(0px)` }
    : { transform: "rotateX(-12deg) rotateY(8deg) translateY(30px)" };
    setTilt({ rx: 0, ry: 0, hx: 50, hy: 35 });

  return (
    <section className="relative min-h-screen overflow-hidden pt-20 pb-20 flex items-center group">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 -z-10 transition-transform duration-300 will-change-transform group-hover:scale-[1.02]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(124,58,237,0.35),transparent_45%),radial-gradient(circle_at_80%_30%,rgba(34,197,94,0.25),transparent_45%),radial-gradient(circle_at_50%_80%,rgba(14,165,233,0.25),transparent_50%)] animate-gradient-shift"(circle_at_20%_20%,rgba(124,58,237,0.35),transparent_45%),radial-gradient(circle_at_80%_30%,rgba(34,197,94,0.25),transparent_45%),radial-gradient(circle_at_50%_80%,rgba(14,165,233,0.25),transparent_50%)] animate-[pulse_14s_ease-in-out_infinite]" />
        <div className="absolute inset-0 backdrop-blur-[2px]" />
        <div className="absolute inset-0 opacity-20 [mask-image:radial-gradient(60%_55%_at_50%_40%,black,transparent)]">
          <div className="h-full w-full bg-[linear-gradient(to_right,hsl(var(--foreground)/0.08)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--foreground)/0.08)_1px,transparent_1px)] bg-[size:64px_64px]" />
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 md:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* LEFT CONTENT */}
          <div className="space-y-8 animate-fade-up">
            <div className="space-y-3">
              <p className="font-mono text-xs sm:text-sm tracking-wide text-primary">
                Hello, I’m
              </p>

              <h1 className="font-display font-bold leading-[1.05] text-[2.5rem] sm:text-5xl md:text-6xl lg:text-7xl">
                Inga <br />
                <span className="highlight-text">Kaltak</span>
              </h1>

              <p className="mt-3 text-lg sm:text-xl md:text-2xl text-muted-foreground">
                Applied AI Consultant & Engineer
              </p>
            </div>

            <p className="max-w-xl text-base sm:text-lg text-muted-foreground leading-relaxed">
              Building intelligent systems at the intersection of AI, security, and
              policy. Turning complex regulatory frameworks into deployable
              solutions.
            </p>

            <div className="flex flex-wrap gap-3">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-mono text-sm shadow-card hover:bg-primary/90 transition"
              >
                Get in Touch
                <ArrowDown className="w-4 h-4 rotate-[-45deg]" />
              </a>

              <a
                href="#experience"
                className="inline-flex items-center px-6 py-3 rounded-xl border border-foreground/20 bg-background/50 backdrop-blur font-mono text-sm hover:bg-muted/60 transition"
              >
                View Experience
              </a>

              <a
                href="https://www.linkedin.com/in/ik11/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-foreground/20 bg-background/50 backdrop-blur font-mono text-sm hover:bg-muted/60 transition"
              >
                LinkedIn <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* RIGHT – 3D LAPTOP */}
          <div className="animate-fade-up stagger-2">
            <div
                ref={laptopRef}
                onMouseMove={onMove}
                onMouseLeave={resetTilt}
                className="mx-auto max-w-md sm:max-w-lg [perspective:1200px]"
              >
              <div
                className="relative transition-transform duration-200 will-change-transform"
                style={entranceStyle}(${tilt.rx}deg) rotateY(${tilt.ry}deg)`
                }}
              >
                {/* Glow */}
                <div
                  className="absolute -inset-8 -z-10 rounded-[2rem] blur-2xl opacity-70"
                  style={{
                    background:
                      "radial-gradient(circle at 30% 20%, rgba(124,58,237,0.25), transparent 55%), radial-gradient(circle at 70% 80%, rgba(34,197,94,0.2), transparent 55%)",
                  }}
                />

                {/* Screen */}
                <div className="rounded-3xl border border-foreground/10 bg-background/60 backdrop-blur shadow-window overflow-hidden">
                  <div className="px-4 py-3 border-b border-foreground/10 bg-accent/30" />

                  <div className="relative p-5 sm:p-6">
                    <div
                      className="pointer-events-none absolute inset-0"
                      style={{
                        background: `radial-gradient(circle at ${tilt.hx}% ${tilt.hy}%, rgba(255,255,255,0.14), transparent 55%)`,
                      }}
                    />

                    <WindowCard title="contact.json" className="rounded-2xl border border-foreground/10 bg-background/70 backdrop-blur shadow-card">
                      <div className="p-5 space-y-6">
                        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-primary/30 to-accent/40 border border-foreground/10">
                          <span className="font-display text-3xl font-bold">IK</span>
                        </div>

                        <div className="space-y-3 text-sm">
                          <ContactRow icon={Mail}>
                            <a href="mailto:ingakaltak7@gmail.com">ingakaltak7@gmail.com</a>
                          </ContactRow>
                          <ContactRow icon={Phone}>215-791-5906</ContactRow>
                          <ContactRow icon={MapPin}>Philadelphia, PA</ContactRow>
                          <ContactRow icon={Linkedin}>
                            <a
                              href="https://www.linkedin.com/in/ik11/"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              linkedin.com/in/ik11
                            </a>
                          </ContactRow>
                        </div>

                        <div className="flex justify-center gap-2">
                          {["AI Policy", "Cybersecurity", "Consulting"].map((tag) => (
                            <span
                              key={tag}
                              className="px-3 py-1 rounded-full text-xs font-mono bg-secondary/70 border border-foreground/10"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </WindowCard>
                  </div>
                </div>

                {/* Laptop base */}
                <div className="relative mx-auto mt-3 w-[92%]">
                  <div className="h-4 rounded-b-[2rem] bg-background/60 backdrop-blur border border-foreground/10 shadow-card" />
                  <div className="absolute left-1/2 top-0 h-1.5 w-20 -translate-x-1/2 rounded-full bg-foreground/10" />
                </div>

                <div className="mx-auto mt-2 h-6 w-[85%] rounded-full bg-black/20 blur-xl" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ContactRow = ({ icon: Icon, children }: any) => (
  <div className="flex items-center gap-3">
    <Icon className="h-4 w-4 text-primary" />
    <span className="font-mono hover:text-primary transition-colors">
      {children}
    </span>
  </div>
);
