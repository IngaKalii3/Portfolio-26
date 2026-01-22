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
    return window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  }, []);
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!supportsHover || !laptopRef.current) return;
    const rect = laptopRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setTilt({
      rx: -((y - rect.height / 2) / rect.height) * 8,
      ry: (x - rect.width / 2) / rect.width * 10,
      hx: x / rect.width * 100,
      hy: y / rect.height * 100
    });
  };
  const resetTilt = () => setTilt({
    rx: 0,
    ry: 0,
    hx: 50,
    hy: 35
  });
  return <section className="relative min-h-[85vh] flex items-center overflow-hidden py-14 sm:py-16">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-24 right-[-6rem] w-64 h-64 bg-accent/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 left-[-6rem] w-80 h-80 bg-secondary/20 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-2 items-center">
          {/* LEFT */}
          <div className="space-y-6 text-center lg:text-left animate-fade-up">
            <div className="space-y-2">
              <p className="font-mono text-xs tracking-wide text-primary">
                Hello, I&apos;m
              </p>

              <h1 className="font-display font-bold leading-[1.05] text-[2.2rem] sm:text-5xl md:text-6xl">
                Inga <br />
                <span className="highlight-text">Kaltak</span>
              </h1>

              <p className="text-muted-foreground text-base sm:text-lg">
                Applied AI Consultant & Engineer
              </p>
            </div>

            <p className="max-w-xl mx-auto lg:mx-0 text-muted-foreground leading-relaxed text-sm sm:text-base">
              Building intelligent systems at the intersection of AI, security,
              and policy. Turning regulatory complexity into deployable systems.
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-2 pt-2">
              <HeroButton primary href="#contact">
                Get in Touch <ArrowDown className="w-3.5 h-3.5 -rotate-45" />
              </HeroButton>

              <HeroButton href="#experience">
                Experience
              </HeroButton>

              <HeroButton href="https://www.linkedin.com/in/ik11/" external>
                LinkedIn <Linkedin className="w-3.5 h-3.5" />
              </HeroButton>
            </div>
          </div>

          {/* RIGHT */}
          <div className="animate-fade-up stagger-2">
            <div ref={laptopRef} onMouseMove={handleMouseMove} onMouseLeave={resetTilt} className="mx-auto max-w-sm sm:max-w-md [perspective:1100px]">
              <div className="relative transition-transform duration-200 motion-reduce:transform-none" style={{
              transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`
            }}>
                {/* Glow */}
                <div className="absolute -inset-5 -z-10 rounded-[2rem] blur-2xl opacity-60 pointer-events-none" style={{
                background: "radial-gradient(circle at 30% 20%, rgba(124,58,237,0.22), transparent 55%), radial-gradient(circle at 70% 80%, rgba(34,197,94,0.16), transparent 55%)"
              }} />

                {/* Screen */}
                <div className="rounded-3xl border border-foreground/10 bg-background/60 backdrop-blur shadow-window overflow-hidden">
                  <div className="h-7 border-b border-foreground/10 bg-accent/40" />

                  <div className="relative p-4 sm:p-5">
                    <div className="absolute inset-0 pointer-events-none" style={{
                    background: `radial-gradient(circle at ${tilt.hx}% ${tilt.hy}%, rgba(255,255,255,0.1), transparent 55%)`
                  }} />

                    <WindowCard title="contact.json" className="rounded-2xl border border-foreground/10 bg-background/60 backdrop-blur shadow-card">
                      <div className="space-y-5 p-4">
                        <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-primary/20 to-accent/40 border border-foreground/10 flex items-center justify-center">
                          <span className="font-display font-bold text-xl">
                            IK
                          </span>
                        </div>

                        <div className="space-y-2 text-xs px-[2px] py-[2px]">
                          <ContactRow icon={<Mail />} text="ingakaltak7@gmail.com" href="mailto:ingakaltak7@gmail.com" />
                          <ContactRow icon={<Phone />} text="215-791-5906" />
                          <ContactRow icon={<MapPin />} text="Philadelphia, PA" />
                          <ContactRow icon={<Linkedin />} text="linkedin.com/in/ik11" href="https://www.linkedin.com/in/ik11/" />
                        </div>

                        <div className="flex flex-wrap justify-center gap-1.5">
                          {["AI Policy", "Cybersecurity", "Consulting"].map(tag => <span key={tag} className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-secondary/70 border border-foreground/10">
                              {tag}
                            </span>)}
                        </div>
                      </div>
                    </WindowCard>
                  </div>
                </div>

                {/* Base */}
                <div className="relative mx-auto mt-2 w-[90%]">
                  <div className="h-4 rounded-b-[2rem] bg-background/60 backdrop-blur border border-foreground/10 shadow-card" />
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-14 h-1.5 rounded-full bg-foreground/10" />
                </div>

                <div className="relative mx-auto mt-2 w-[80%] h-5 rounded-full bg-black/20 blur-xl -z-10" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>;
};

/* ---------- Small 3D Button ---------- */

const HeroButton = ({
  children,
  href,
  primary,
  external
}: {
  children: React.ReactNode;
  href: string;
  primary?: boolean;
  external?: boolean;
}) => <a href={href} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined} className={`
      inline-flex items-center gap-1.5
      px-4 py-2 rounded-lg font-mono text-xs
      transition-all duration-150
      active:translate-y-[1px]
      ${primary ? "bg-primary text-primary-foreground shadow-md hover:shadow-lg" : "border border-foreground/20 bg-background/60 backdrop-blur hover:bg-muted/60"}
    `}>
    {children}
  </a>;
const ContactRow = ({
  icon,
  text,
  href
}: {
  icon: React.ReactNode;
  text: string;
  href?: string;
}) => <div className="flex items-center gap-2 font-mono">
    <span className="text-primary w-3.5 h-3.5">{icon}</span>
    {href ? <a href={href} className="hover:text-primary transition break-all">
        {text}
      </a> : <span>{text}</span>}
  </div>;