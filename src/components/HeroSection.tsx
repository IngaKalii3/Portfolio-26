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
    return window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
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

  const resetTilt = () =>
    setTilt({ rx: 0, ry: 0, hx: 50, hy: 35 });

  return (
    <section className="relative min-h-screen overflow-hidden flex items-center py-16 sm:py-20">
      {/* Background effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-24 right-[-6rem] w-72 h-72 bg-accent/25 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 left-[-6rem] w-96 h-96 bg-secondary/25 rounded-full blur-3xl" />

        <div className="absolute inset-0 opacity-20 [mask-image:radial-gradient(55%_55%_at_50%_35%,black,transparent)]">
          <div className="h-full w-full bg-[linear-gradient(to_right,hsl(var(--foreground)/0.08)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--foreground)/0.08)_1px,transparent_1px)] bg-[size:64px_64px]" />
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-14 lg:grid-cols-2 items-center">
          {/* LEFT */}
          <div className="space-y-8 text-center lg:text-left animate-fade-up">
            <div className="space-y-3">
              <p className="font-mono text-xs tracking-wide text-primary">
                Hello, I&apos;m
              </p>

              <h1 className="font-display font-bold leading-tight text-[2.4rem] sm:text-5xl md:text-6xl">
                Inga <br />
                <span className="highlight-text">Kaltak</span>
              </h1>

              <p className="text-muted-foreground text-lg sm:text-xl">
                Applied AI Consultant & Engineer
              </p>
            </div>

            <p className="max-w-xl mx-auto lg:mx-0 text-muted-foreground leading-relaxed text-base sm:text-lg">
              Building intelligent systems at the intersection of AI, security,
              and policy. Transforming regulatory complexity into deployable
              solutions.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-mono text-sm hover:bg-primary/90 transition shadow-card"
              >
                Get in Touch
                <ArrowDown className="w-4 h-4 -rotate-45" />
              </a>

              <a
                href="#experience"
                className="inline-flex items-center justify-center px-6 py-3 rounded-xl border border-foreground/20 bg-background/50 backdrop-blur font-mono text-sm hover:bg-muted/60 transition"
              >
                View Experience
              </a>

              <a
                href="https://www.linkedin.com/in/ik11/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-foreground/20 bg-background/50 backdrop-blur font-mono text-sm hover:bg-muted/60 transition"
              >
                LinkedIn <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* RIGHT */}
          <div className="animate-fade-up stagger-2">
            <div
              ref={laptopRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={resetTilt}
              className="mx-auto max-w-md sm:max-w-lg [perspective:1200px]"
            >
              <div
                className="relative transition-transform duration-200 motion-reduce:transform-none"
                style={{
                  transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
                }}
              >
                {/* Glow */}
                <div
                  className="absolute -inset-6 -z-10 rounded-[2rem] blur-2xl opacity-70 pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(circle at 30% 20%, rgba(124,58,237,0.25), transparent 55%), radial-gradient(circle at 70% 80%, rgba(34,197,94,0.18), transparent 55%)",
                  }}
                />

                {/* Screen */}
                <div className="rounded-3xl border border-foreground/10 bg-background/60 backdrop-blur shadow-window overflow-hidden">
                  <div className="h-8 border-b border-foreground/10 bg-accent/40" />

                  <div className="relative p-5 sm:p-6">
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background: `radial-gradient(circle at ${tilt.hx}% ${tilt.hy}%, rgba(255,255,255,0.12), transparent 55%)`,
                      }}
                    />

                    <WindowCard title="contact.json" className="rounded-2xl border border-foreground/10 bg-background/60 backdrop-blur shadow-card">
                      <div className="space-y-6 p-5">
                        <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto rounded-full bg-gradient-to-br from-primary/20 to-accent/40 border border-foreground/10 flex items-center justify-center">
                          <span className="font-display font-bold text-2xl sm:text-3xl">
                            IK
                          </span>
                        </div>

                        <div className="space-y-3 text-sm">
                          <ContactRow icon={<Mail />} text="ingakaltak7@gmail.com" href="mailto:ingakaltak7@gmail.com" />
                          <ContactRow icon={<Phone />} text="215-791-5906" />
                          <ContactRow icon={<MapPin />} text="Philadelphia, PA" />
                          <ContactRow
                            icon={<Linkedin />}
                            text="linkedin.com/in/ik11"
                            href="https://www.linkedin.com/in/ik11/"
                          />
                        </div>

                        <div className="flex flex-wrap justify-center gap-2">
                          {["AI Policy", "Cybersecurity", "Consulting"].map(tag => (
                            <span
                              key={tag}
                              className="px-3 py-1 rounded-full text-[11px] sm:text-xs font-mono bg-secondary/70 border border-foreground/10"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </WindowCard>
                  </div>
                </div>

                {/* Base */}
                <div className="relative mx-auto mt-3 w-[92%]">
                  <div className="h-4 sm:h-5 rounded-b-[2rem] bg-background/60 backdrop-blur border border-foreground/10 shadow-card" />
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 sm:w-20 h-1.5 sm:h-2 rounded-full bg-foreground/10" />
                </div>

                <div className="relative mx-auto mt-2 w-[85%] h-6 rounded-full bg-black/20 blur-xl -z-10" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ContactRow = ({
  icon,
  text,
  href,
}: {
  icon: React.ReactNode;
  text: string;
  href?: string;
}) => (
  <div className="flex items-center gap-3 font-mono">
    <span className="text-primary w-4 h-4">{icon}</span>
    {href ? (
      <a href={href} className="hover:text-primary transition break-all">
        {text}
      </a>
    ) : (
      <span>{text}</span>
    )}
  </div>
);
