import React, { useMemo, useRef, useState } from "react";
import { ArrowDown, Mail, Phone, MapPin } from "lucide-react";
import { WindowCard } from "./WindowCard";

export const HeroSection = () => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0, sx: 50, sy: 50 });

  const supportsHover = useMemo(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia?.("(hover: hover) and (pointer: fine)")?.matches ?? false;
  }, []);

  const handleMove = (e: React.MouseEvent) => {
    if (!supportsHover) return;
    const el = cardRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left; // 0..w
    const y = e.clientY - rect.top;  // 0..h

    const px = (x / rect.width) * 100;
    const py = (y / rect.height) * 100;

    // tilt intensity (keep subtle)
    const ry = ((x - rect.width / 2) / rect.width) * 14;  // left/right
    const rx = -((y - rect.height / 2) / rect.height) * 12; // up/down

    setTilt({ rx, ry, sx: px, sy: py });
  };

  const handleLeave = () => setTilt({ rx: 0, ry: 0, sx: 50, sy: 50 });

  return (
    <section className="relative overflow-hidden pt-16 pb-20 min-h-screen flex items-center">
      {/* background: depth grid + glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-background/90" />
        <div className="absolute inset-0 opacity-[0.25] [mask-image:radial-gradient(60%_55%_at_50%_40%,black,transparent)]">
          <div className="h-full w-full bg-[linear-gradient(to_right,hsl(var(--foreground)/0.08)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--foreground)/0.08)_1px,transparent_1px)] bg-[size:64px_64px]" />
        </div>

        {/* glows */}
        <div className="absolute -top-24 right-[-6rem] w-[22rem] h-[22rem] bg-accent/25 rounded-full blur-3xl" />
        <div className="absolute bottom-[-8rem] left-[-6rem] w-[26rem] h-[26rem] bg-secondary/30 rounded-full blur-3xl" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[34rem] h-[18rem] bg-primary/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 md:px-8">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          {/* LEFT */}
          <div className="space-y-7 sm:space-y-8 animate-fade-up">
            <div className="space-y-2">
              <p className="font-mono text-xs sm:text-sm text-primary tracking-wide">
                Hello, I&apos;m
              </p>

              {/* 3D-ish name plate */}
              <div className="inline-block">
                <h1 className="text-[2.6rem] sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold leading-[1.05]">
                  Inga{" "}
                  <span className="relative inline-block">
                    <span className="relative z-10 highlight-text">Kaltak</span>
                    <span className="absolute -inset-x-2 -inset-y-1 z-0 rounded-xl bg-primary/10 blur-[10px]" />
                    <span className="absolute -bottom-1 left-0 right-0 h-[10px] rounded-full bg-foreground/10 blur-md" />
                  </span>
                </h1>
              </div>

              <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground font-light mt-3">
                Applied AI Consultant & Engineer
              </p>
            </div>

            <p className="text-base sm:text-lg text-muted-foreground max-w-xl leading-relaxed">
              Building intelligent systems at the intersection of AI, security, and policy.
              Transforming complex regulatory frameworks into deployable solutions.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
              <a
                href="#contact"
                className="group relative inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-mono text-sm shadow-card transition-transform active:scale-[0.99] hover:translate-y-[-1px]"
              >
                <span className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.35),transparent_55%)]" />
                <span className="relative">Get in Touch</span>
                <ArrowDown className="relative w-4 h-4 rotate-[-45deg] group-hover:translate-x-0.5 transition-transform" />
              </a>

              <a
                href="#experience"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-foreground/20 bg-background/40 backdrop-blur font-mono text-sm hover:bg-muted/60 transition-colors"
              >
                View Experience
              </a>
            </div>

            {/* small “stats” row for uniqueness */}
            <div className="flex flex-wrap gap-3 pt-2 text-xs sm:text-sm text-muted-foreground">
              {[
                { k: "Focus", v: "AI + Security" },
                { k: "Strength", v: "Policy → Product" },
                { k: "Location", v: "Philadelphia" },
              ].map((item) => (
                <div
                  key={item.k}
                  className="px-3 py-2 rounded-xl border border-foreground/10 bg-background/40 backdrop-blur"
                >
                  <span className="font-mono text-foreground/80">{item.k}:</span>{" "}
                  <span className="font-mono">{item.v}</span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: 3D card */}
          <div className="animate-fade-up stagger-2">
            <div className="mx-auto lg:ml-auto max-w-md">
              <div
                ref={cardRef}
                onMouseMove={handleMove}
                onMouseLeave={handleLeave}
                className="relative [perspective:1100px]"
              >
                {/* shadow “under” the card */}
                <div
                  className="absolute -inset-3 -z-10 rounded-3xl blur-2xl opacity-60"
                  style={{
                    background:
                      "radial-gradient(circle at 30% 20%, rgba(124,58,237,0.25), transparent 55%), radial-gradient(circle at 70% 80%, rgba(34,197,94,0.18), transparent 55%)",
                  }}
                />

                <div
                  className="will-change-transform transition-transform duration-200 motion-reduce:transform-none"
                  style={{
                    transform: supportsHover
                      ? `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) translateZ(0)`
                      : undefined,
                  }}
                >
                  <WindowCard
                    title="contact.json"
                    className="shadow-window rounded-2xl overflow-hidden border border-foreground/10 bg-background/60 backdrop-blur"
                  >
                    {/* inner glossy highlight that follows cursor */}
                    <div
                      className="pointer-events-none absolute inset-0 opacity-0 motion-reduce:hidden"
                      style={{
                        opacity: supportsHover ? 1 : 0,
                        background: `radial-gradient(circle at ${tilt.sx}% ${tilt.sy}%, rgba(255,255,255,0.18), transparent 55%)`,
                      }}
                    />

                    <div className="relative space-y-6">
                      <div className="relative w-20 h-20 sm:w-24 sm:h-24 mx-auto">
                        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/25 to-accent/35 blur-md" />
                        <div className="relative w-full h-full rounded-full bg-gradient-to-br from-primary/20 to-accent/40 flex items-center justify-center border border-foreground/10">
                          <span className="font-display text-2xl sm:text-3xl font-bold">IK</span>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center gap-3 text-sm">
                          <Mail className="w-4 h-4 text-primary" />
                          <a
                            href="mailto:ingakaltak7@gmail.com"
                            className="font-mono hover:text-primary transition-colors break-all"
                          >
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
                      </div>

                      <div className="flex flex-wrap gap-2 pt-1">
                        {["AI Policy", "Cybersecurity", "Consulting"].map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1 rounded-full text-xs font-mono bg-secondary/70 text-secondary-foreground border border-foreground/10"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* micro-detail: “terminal footer” */}
                      <div className="pt-3 border-t border-foreground/10 text-xs font-mono text-muted-foreground flex items-center justify-between">
                        <span>status: available</span>
                        <span className="text-foreground/60">v2.6</span>
                      </div>
                    </div>
                  </WindowCard>
                </div>
              </div>

              {/* small note under card (mobile friendly) */}
              <p className="mt-4 text-xs sm:text-sm text-muted-foreground text-center lg:text-right">
                Tip: hover the card for depth ✨
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
