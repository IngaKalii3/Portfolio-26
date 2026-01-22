# HeroExperience (Next.js App Router)

> **Single canvas, multi-file layout**
> Copy each section into its own file as indicated by comments.

---

/* =============================================================
   FILE: app/page.tsx  (SERVER COMPONENT)
   ============================================================= */

import HeroExperienceClient from "@/components/HeroExperienceClient";

export default function Page() {
  return (
    <main className="overflow-x-hidden">
      <HeroExperienceClient />
    </main>
  );
}

/* =============================================================
   FILE: components/HeroExperienceClient.tsx  (CLIENT COMPONENT)
   ============================================================= */

"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowDown, Mail, Phone, MapPin, Linkedin } from "lucide-react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

/* ------------------ Typewriter Hook ------------------ */

function useTypewriter(text: string, speed = 60) {
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

/* ------------------ GPU Shader Background ------------------ */

function GradientShader() {
  const mesh = useRef<THREE.Mesh>(null!);

  useFrame(({ clock }) => {
    mesh.current.material.uniforms.uTime.value = clock.elapsedTime;
  });

  return (
    <mesh ref={mesh} scale={[10, 10, 1]}>
      <planeGeometry />
      <shaderMaterial
        uniforms={{ uTime: { value: 0 } }}
        fragmentShader={`
          uniform float uTime;
          void main() {
            vec2 uv = gl_FragCoord.xy / 1200.0;
            float c = 0.4 + 0.3 * sin(uTime + uv.x * 6.0);
            gl_FragColor = vec4(0.15, 0.2 + c, 0.35 + c, 1.0);
          }
        `}
      />
    </mesh>
  );
}

/* ------------------ Terminal Animation ------------------ */

const terminalLines = [
  "> initializing_ai_pipeline()",
  "✔ loading policy vectors",
  "✔ compiling risk model",
  "✔ deploying secure inference",
  "> ready_✔",
];

function Terminal() {
  const [lines, setLines] = useState<string[]>([]);

  useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      setLines((l) => [...l, terminalLines[i]]);
      i++;
      if (i === terminalLines.length) clearInterval(id);
    }, 700);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="font-mono text-xs text-green-400 space-y-1">
      {lines.map((l, i) => (
        <div key={i}>{l}</div>
      ))}
    </div>
  );
}

/* ------------------ Main Component ------------------ */

export default function HeroExperienceClient() {
  const title = useTypewriter("Applied AI Consultant & Engineer");

  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const rx = useSpring(useTransform(my, [-0.5, 0.5], [8, -8]), { stiffness: 120, damping: 18 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-12, 12]), { stiffness: 120, damping: 18 });

  return (
    <section className="relative min-h-screen flex items-center">
      {/* GPU BACKGROUND */}
      <div className="absolute inset-0 -z-20">
        <Canvas camera={{ position: [0, 0, 3] }}>
          <GradientShader />
        </Canvas>
      </div>

      <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
        {/* LEFT */}
        <div className="space-y-6 text-center lg:text-left">
          <p className="font-mono text-xs text-primary">Hello, I'm</p>
          <h1 className="font-display text-5xl sm:text-6xl font-bold leading-tight">
            Inga <span className="highlight-text">Kaltak</span>
          </h1>
          <p className="font-mono text-primary h-6">{title}</p>
          <p className="text-muted-foreground max-w-md mx-auto lg:mx-0">
            Building intelligent systems where AI, security, and regulation meet.
          </p>

          <div className="flex justify-center lg:justify-start gap-3">
            <HeroButton primary href="#contact">Get in Touch <ArrowDown className="w-3 h-3" /></HeroButton>
            <HeroButton href="#experience">Experience</HeroButton>
            <HeroButton href="https://linkedin.com" external>LinkedIn</HeroButton>
          </div>
        </div>

        {/* RIGHT – LAPTOP */}
        <motion.div
          onMouseMove={(e) => {
            const r = e.currentTarget.getBoundingClientRect();
            mx.set((e.clientX - r.left) / r.width - 0.5);
            my.set((e.clientY - r.top) / r.height - 0.5);
          }}
          style={{ rotateX: rx, rotateY: ry }}
          className="mx-auto max-w-md perspective-[1200px]"
        >
          <div className="rounded-3xl bg-black/60 border border-white/10 backdrop-blur-xl shadow-2xl overflow-hidden">
            <div className="h-7 bg-white/5 border-b border-white/10" />
            <div className="p-4">
              <Terminal />
            </div>
          </div>
          <div className="mt-2 h-4 bg-black/40 rounded-b-2xl" />
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------ Small Components ------------------ */

function HeroButton({ children, href, primary, external }: any) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={`px-4 py-2 text-xs font-mono rounded-lg transition-all active:translate-y-[1px] ${
        primary
          ? "bg-primary text-primary-foreground shadow-lg"
          : "border border-white/20 bg-black/30"
      }`}
    >
      {children}
    </a>
  );
}
