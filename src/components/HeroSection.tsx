import React, { useEffect, useRef, useState } from "react";
import { ArrowDown, Mail, Phone, MapPin, Linkedin } from "lucide-react";
import { WindowCard } from "./WindowCard";

export const HeroSection = () => {
  const laptopRef = useRef<HTMLDivElement>(null);
  const frame = useRef<number | null>(null);

  const [tilt, setTilt] = useState({ rx: 0, ry: 0, hx: 50, hy: 40 });
  const [canHover, setCanHover] = useState(false);

  useEffect(() => {
    setCanHover(
      window.matchMedia("(hover: hover) and (pointer: fine)").matches
    );
  }, []);

  const onMove = (e: React.MouseEvent) => {
    if (!canHover || !laptopRef.current) return;

    if (frame.current) cancelAnimationFrame(frame.current);

    frame.current = requestAnimationFrame(() => {
      const r = laptopRef.current!.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;

      setTilt({
        rx: -(y / r.height - 0.5) * 8,
        ry: (x / r.width - 0.5) * 12,
        hx: (x / r.width) * 100,
        hy: (y / r.height) * 100
      });
    });
  };

  const reset = () =>
    setTilt({ rx: 0, ry: 0, hx: 50, hy: 40 });

  return (
    <section className="relative min-h-screen flex items-center pt-20">
      <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-14 items-center">
        
        {/* LEFT */}
        <div className="space-y-7">
          <p className="text-sm font-mono text-primary">Hello, I’m</p>

          <h1 className="font-display text-5xl md:text-6xl font-bold leading-tight">
            Inga <br />
            <span className="highlight-text">Kaltak</span>
          </h1>

          <p className="text-xl text-muted-foreground">
            Applied AI Consultant & Engineer
          </p>

          <p className="max-w-xl text-muted-foreground leading-relaxed">
            Building intelligent systems at the intersection of AI, security, and policy.
          </p>

          <div className="flex flex-wrap gap-3">
            <a className="btn-primary">
              Get in Touch <ArrowDown className="w-4 h-4 -rotate-45" />
            </a>
            <a className="btn-secondary">View Experience</a>
          </div>
        </div>

        {/* RIGHT – LAPTOP */}
        <div
          ref={laptopRef}
          onMouseMove={onMove}
          onMouseLeave={reset}
          className="mx-auto max-w-lg perspective-1200"
        >
          <div
            className="relative transition-transform duration-200"
            style={{
              transform: canHover
                ? `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`
                : undefined
            }}
          >
            {/* Screen */}
            <div className="rounded-2xl bg-zinc-900 border border-white/10 shadow-2xl overflow-hidden">
              
              {/* Camera notch */}
              <div className="absolute top-2 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-black/60" />

              {/* OS chrome */}
              <div className="h-8 px-4 flex items-center gap-2 bg-zinc-800">
                <span className="w-3 h-3 bg-red-500 rounded-full" />
                <span className="w-3 h-3 bg-yellow-400 rounded-full" />
                <span className="w-3 h-3 bg-green-500 rounded-full" />
              </div>

              {/* Screen content */}
              <div className="p-4 sm:p-6 font-sans bg-background">
                <WindowCard title="contact.json">
                  <div className="space-y-5">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary/30 to-accent/40 mx-auto flex items-center justify-center">
                      <span className="font-display text-2xl font-bold">IK</span>
                    </div>

                    <div className="space-y-3 text-sm">
                      <Item icon={Mail} text="ingakaltak7@gmail.com" />
                      <Item icon={Phone} text="215-791-5906" />
                      <Item icon={MapPin} text="Philadelphia, PA" />
                      <Item
                        icon={Linkedin}
                        link="https://linkedin.com/in/ik11"
                        text="linkedin.com/in/ik11"
                      />
                    </div>
                  </div>
                </WindowCard>
              </div>
            </div>

            {/* Base */}
            <div className="relative mt-3 h-4 bg-zinc-300/60 rounded-b-2xl">
              <div className="absolute inset-x-1/2 -translate-x-1/2 top-0 w-20 h-1 bg-black/20 rounded-full" />
            </div>
          </div>

          {canHover && (
            <p className="text-xs text-muted-foreground mt-3 text-center">
              Hover to explore depth
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

const Item = ({ icon: Icon, text, link }: any) => (
  <div className="flex items-center gap-3">
    <Icon className="w-4 h-4 text-primary" />
    {link ? (
      <a href={link} className="hover:text-primary transition">{text}</a>
    ) : (
      <span>{text}</span>
    )}
  </div>
);
