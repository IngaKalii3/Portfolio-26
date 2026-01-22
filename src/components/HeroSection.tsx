import React, { useEffect, useMemo, useRef, useState } from "react";
import { ArrowDown, Mail, Phone, MapPin, Linkedin } from "lucide-react";
import { WindowCard } from "./WindowCard";

export const HeroSection = () => {
  const laptopRef = useRef<HTMLDivElement | null>(null);

  const [tilt, setTilt] = useState({ rx: 0, ry: 0, hx: 50, hy: 35 });
  const [booting, setBooting] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setBooting(false), 1800);
    return () => clearTimeout(t);
  }, []);

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

    setTilt({
      rx: -((y - r.height / 2) / r.height) * 10,
      ry: ((x - r.width / 2) / r.width) * 14,
      hx: (x / r.width) * 100,
      hy: (y / r.height) * 100
    });
  };

  const onLeave = () =>
    setTilt({
      rx: 0,
      ry: 0,
      hx: 50,
      hy: 35
    });

  return (
    <section className="relative overflow-hidden min-h-screen flex items-center justify-center pt-16 pb-20">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-24 right-[-7rem] w-[22rem] h-[22rem] bg-accent/25 rounded-full blur-3xl" />
        <div className="absolute bottom-[-10rem] left-[-7rem] w-[26rem] h-[26rem] bg-secondary/25 rounded-full blur-3xl" />
        <div className="absolute inset-0 opacity-[0.18] [mask-image:radial-gradient(55%_55%_at_50%_35%,black,transparent)]">
          <div className="h-full w-full bg-[linear-gradient(to_right,hsl(var(--foreground)/0.08)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--foreground)/0.08)_1px,transparent_1px)] bg-[size:64px_64px]" />
        </div>
      </div>

      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          {/* LEFT */}
          <div className="space-y-8 animate-fade-up">
            <p className="font-mono text-sm text-primary">Hello, I&apos;m</p>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold leading-tight">
              Inga <br />
              <span className="highlight-text">Kaltak</span>
            </h1>

            <p className="text-xl text-muted-foreground">
              Applied AI Consultant & Engineer
            </p>

            <p className="text-lg text-muted-foreground max-w-xl">
              Building intelligent systems at the intersection of AI, security, and policy.
              Turning regulation into production-ready systems.
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-mono text-sm rounded-xl shadow-card"
              >
                Get in Touch
                <ArrowDown className="w-4 h-4 -rotate-45" />
              </a>

              <a
                href="#experience"
                className="inline-flex items-center gap-2 px-6 py-3 border border-foreground/20 bg-background/40 backdrop-blur font-mono text-sm rounded-xl"
              >
                View Experience
              </a>

              <a
                href="https://www.linkedin.com/in/ik11/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 border border-foreground/20 bg-background/40 backdrop-blur font-mono text-sm rounded-xl"
              >
                LinkedIn <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* RIGHT – LAPTOP */}
          <div className="animate-fade-up stagger-2">
            <div
              ref={laptopRef}
              onMouseMove={onMove}
              onMouseLeave={onLeave}
              className="[perspective:1200px] max-w-lg mx-auto"
            >
              <div
                className="relative transition-transform duration-200 will-change-transform"
                style={{ transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)` }}
              >
                {/* Glow */}
                <div
                  className="absolute -inset-6 -z-10 blur-2xl rounded-[2rem]"
                  style={{
                    background:
                      "radial-gradient(circle at 30% 20%, rgba(124,58,237,0.25), transparent 55%), radial-gradient(circle at 70% 80%, rgba(34,197,94,0.18), transparent 55%)"
                  }}
                />

                {/* Screen */}
                <div className="rounded-3xl border border-foreground/10 bg-background/60 backdrop-blur shadow-window overflow-hidden">
                  {/* Bezel */}
                  <div className="px-4 py-2 border-b border-foreground/10 font-mono text-xs text-muted-foreground">
                    system://portfolio/hero
                  </div>

                  {/* Content */}
                  <div className="relative p-6">
                    <div
                      className="pointer-events-none absolute inset-0"
                      style={{
                        background: `radial-gradient(circle at ${tilt.hx}% ${tilt.hy}%, rgba(255,255,255,0.12), transparent 55%)`
                      }}
                    />

                    {booting ? (
                      <div className="font-mono text-sm text-green-400 space-y-1 animate-pulse">
                        <p>&gt; booting system…</p>
                        <p>&gt; loading contact.json</p>
                        <p>&gt; initializing interface █</p>
                      </div>
                    ) : (
                      <WindowCard
                        title="contact.json"
                        className="bg-black/40 border border-foreground/10 rounded-2xl shadow-card"
                      >
                        <div className="p-5 space-y-6 font-mono text-sm">
                          <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-primary/30 to-accent/40 flex items-center justify-center border border-foreground/10">
                            <span className="text-3xl font-bold">IK</span>
                          </div>

                          <div className="space-y-3">
                            <div className="flex items-center gap-3">
                              <Mail className="w-4 h-4 text-primary" />
                              <a href="mailto:ingakaltak7@gmail.com">
                                ingakaltak7@gmail.com
                              </a>
                            </div>

                            <div className="flex items-center gap-3">
                              <Phone className="w-4 h-4 text-primary" />
                              <span>215-791-5906</span>
                            </div>

                            <div className="flex items-center gap-3">
                              <MapPin className="w-4 h-4 text-primary" />
                              <span>Philadelphia, PA</span>
                            </div>

                            <div className="flex items-center gap-3">
                              <Linkedin className="w-4 h-4 text-primary" />
                              <a
                                href="https://www.linkedin.com/in/ik11/"
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                linkedin.com/in/ik11
                              </a>
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-2 justify-center pt-2">
                            {["AI Policy", "Cybersecurity", "Consulting"].map(tag => (
                              <span
                                key={tag}
                                className="px-3 py-1 text-xs bg-secondary/70 rounded-full border border-foreground/10"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </WindowCard>
                    )}
                  </div>
                </div>

                {/* Base */}
                <div className="relative mx-auto mt-3 w-[92%]">
                  <div className="h-5 rounded-b-[2rem] bg-background/60 backdrop-blur border border-foreground/10 shadow-card" />
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-2 rounded-full bg-foreground/10" />
                </div>

                <div className="mx-auto mt-2 w-[85%] h-6 bg-black/20 blur-xl rounded-full" />
              </
