"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useCallback } from "react";

interface Node {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  vx: number;
  vy: number;
  radius: number;
  pulsePhase: number;
  layer: number;
}

function InteractiveMesh() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: -9999, y: -9999 });
  const nodesRef = useRef<Node[]>([]);
  const animationRef = useRef<number>(0);
  const dpr = useRef(1);

  const init = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    dpr.current = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = window.innerWidth * dpr.current;
    canvas.height = window.innerHeight * dpr.current;
    canvas.style.width = window.innerWidth + "px";
    canvas.style.height = window.innerHeight + "px";

    const w = canvas.width;
    const h = canvas.height;
    const nodes: Node[] = [];

    const spacing = 80 * dpr.current;
    const cols = Math.ceil(w / spacing) + 2;
    const rows = Math.ceil(h / spacing) + 2;
    const offsetX = (w - (cols - 1) * spacing) / 2;
    const offsetY = (h - (rows - 1) * spacing) / 2;

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const x = offsetX + col * spacing + (row % 2 ? spacing * 0.5 : 0);
        const y = offsetY + row * spacing * 0.866;
        const distFromCenter = Math.hypot(x - w / 2, y - h / 2);
        const maxDist = Math.hypot(w / 2, h / 2);
        const layer = distFromCenter / maxDist;

        nodes.push({
          x,
          y,
          baseX: x,
          baseY: y,
          vx: 0,
          vy: 0,
          radius: (1.5 + Math.random() * 1.5) * dpr.current,
          pulsePhase: Math.random() * Math.PI * 2,
          layer,
        });
      }
    }

    nodesRef.current = nodes;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    init();

    const onResize = () => init();
    window.addEventListener("resize", onResize);

    const onMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX * dpr.current;
      mouse.current.y = e.clientY * dpr.current;
    };
    const onMouseLeave = () => {
      mouse.current.x = -9999;
      mouse.current.y = -9999;
    };
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseleave", onMouseLeave);

    let time = 0;

    const animate = () => {
      time += 0.008;
      const w = canvas.width;
      const h = canvas.height;
      const nodes = nodesRef.current;
      const mx = mouse.current.x;
      const my = mouse.current.y;
      const interactRadius = 200 * dpr.current;

      ctx.clearRect(0, 0, w, h);

      for (const node of nodes) {
        const breathX = Math.sin(time + node.pulsePhase) * 3 * dpr.current;
        const breathY = Math.cos(time * 0.7 + node.pulsePhase) * 3 * dpr.current;
        let targetX = node.baseX + breathX;
        let targetY = node.baseY + breathY;

        const dx = mx - node.x;
        const dy = my - node.y;
        const dist = Math.hypot(dx, dy);

        if (dist < interactRadius && dist > 0) {
          const force = (1 - dist / interactRadius) * 60 * dpr.current;
          targetX -= (dx / dist) * force;
          targetY -= (dy / dist) * force;
        }

        node.vx += (targetX - node.x) * 0.04;
        node.vy += (targetY - node.y) * 0.04;
        node.vx *= 0.88;
        node.vy *= 0.88;
        node.x += node.vx;
        node.y += node.vy;
      }

      const connectionDist = 100 * dpr.current;

      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);

          if (dist < connectionDist) {
            const alpha = (1 - dist / connectionDist);

            const midDist = Math.hypot(
              (a.x + b.x) / 2 - mx,
              (a.y + b.y) / 2 - my
            );
            const glow = midDist < interactRadius * 1.5
              ? (1 - midDist / (interactRadius * 1.5)) * 0.6
              : 0;

            const baseAlpha = alpha * 0.22 * (1 - (a.layer + b.layer) * 0.25);
            const finalAlpha = Math.min(baseAlpha + glow * alpha, 0.7);

            if (glow > 0.1) {
              const r = Math.round(179 + (255 - 179) * glow);
              const g = Math.round(27 + (80 - 27) * glow);
              const b2 = Math.round(27 + (60 - 27) * glow);
              ctx.strokeStyle = `rgba(${r},${g},${b2},${finalAlpha})`;
              ctx.lineWidth = (0.5 + glow * 1.5) * dpr.current;
            } else {
              ctx.strokeStyle = `rgba(179,27,27,${finalAlpha})`;
              ctx.lineWidth = 0.5 * dpr.current;
            }

            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      for (const node of nodes) {
        const nodeDist = Math.hypot(node.x - mx, node.y - my);
        const proximity = nodeDist < interactRadius
          ? 1 - nodeDist / interactRadius
          : 0;

        const pulse = (Math.sin(time * 2 + node.pulsePhase) + 1) / 2;
        const r = node.radius * (1 + pulse * 0.3 + proximity * 1.5);

        const centerFade = 1 - node.layer * 0.35;

        if (proximity > 0.1) {
          ctx.beginPath();
          ctx.arc(node.x, node.y, r * 3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(179,27,27,${proximity * 0.15})`;
          ctx.fill();
        }

        ctx.beginPath();
        ctx.arc(node.x, node.y, r, 0, Math.PI * 2);
        const alpha = (0.45 + pulse * 0.25 + proximity * 0.5) * centerFade;
        if (proximity > 0.3) {
          ctx.fillStyle = `rgba(255,100,80,${Math.min(alpha + 0.2, 1)})`;
        } else {
          ctx.fillStyle = `rgba(179,27,27,${alpha})`;
        }
        ctx.fill();
      }

      if (mx > 0 && my > 0) {
        const gradient = ctx.createRadialGradient(mx, my, 0, mx, my, interactRadius * 1.2);
        gradient.addColorStop(0, "rgba(179,27,27,0.06)");
        gradient.addColorStop(0.5, "rgba(179,27,27,0.02)");
        gradient.addColorStop(1, "rgba(179,27,27,0)");
        ctx.fillStyle = gradient;
        ctx.fillRect(mx - interactRadius * 1.5, my - interactRadius * 1.5, interactRadius * 3, interactRadius * 3);
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseleave", onMouseLeave);
    };
  }, [init]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0"
    />
  );
}

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <InteractiveMesh />

      <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/20 to-background pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-surface/50 backdrop-blur-sm text-muted text-sm mb-8 pointer-events-auto">
            <span className="w-2 h-2 rounded-full bg-cornell-red animate-pulse" />
            Cornell University&apos;s Premier FinTech Organization
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.95]"
        >
          <span className="text-foreground drop-shadow-[0_0_30px_rgba(0,0,0,0.8)]">Cornell</span>
          <br />
          <span className="text-cornell-red drop-shadow-[0_0_40px_rgba(179,27,27,0.3)]">FinTech</span>
          <br />
          <span className="text-foreground drop-shadow-[0_0_30px_rgba(0,0,0,0.8)]">Club</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-8 text-lg sm:text-xl text-muted max-w-2xl mx-auto leading-relaxed"
        >
          Empowering the future of finance through technology.
          <br className="hidden sm:block" />
          Building, learning, and innovating at the intersection of
          finance and tech.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 pointer-events-auto"
        >
          <a
            href="#recruitment"
            className="px-8 py-3.5 bg-cornell-red text-white rounded-lg font-medium hover:bg-cornell-red-light transition-all hover:shadow-lg hover:shadow-cornell-red/20"
          >
            Join Us
          </a>
          <a
            href="#about"
            className="px-8 py-3.5 border border-border text-foreground rounded-lg font-medium hover:bg-surface/80 backdrop-blur-sm transition-all"
          >
            Learn More
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="mt-20 pointer-events-auto"
        >
          <a
            href="#about"
            className="inline-flex flex-col items-center gap-2 text-muted text-sm hover:text-foreground transition-colors"
          >
            Scroll to explore
            <motion.svg
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M12 5v14M5 12l7 7 7-7" />
            </motion.svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
