"use client";

import { useEffect, useRef } from "react";

const GREEN = "#39FF14";
const BLUE = "#0055FF";

function hex2rgb(h: string): [number, number, number] {
  const n = parseInt(h.replace("#", ""), 16);
  return [(n >> 16) & 0xff, (n >> 8) & 0xff, n & 0xff];
}

function rgba(h: string, a: number) {
  const [r, g, b] = hex2rgb(h);
  return `rgba(${r},${g},${b},${a.toFixed(3)})`;
}

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  color: string;
  alpha: number;
};

type Meteor = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  color: string;
};

export function NetworkBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let particles: Particle[] = [];
    let meteors: Meteor[] = [];
    let lastMeteor = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const count = Math.max(18, Math.min(34, Math.floor((canvas.width * canvas.height) / 42000)));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.08,
        vy: (Math.random() - 0.5) * 0.08,
        r: 0.8 + Math.random() * 1.4,
        color: Math.random() > 0.5 ? GREEN : BLUE,
        alpha: 0.03 + Math.random() * 0.05,
      }));
    };

    const safeZone = () => ({
      cx: canvas.width * 0.5,
      cy: canvas.height * 0.44,
      rx: canvas.width * 0.24,
      ry: canvas.height * 0.18,
    });

    const inSafe = (x: number, y: number) => {
      const z = safeZone();
      const dx = (x - z.cx) / z.rx;
      const dy = (y - z.cy) / z.ry;
      return dx * dx + dy * dy < 1;
    };

    const draw = (ts: number) => {
      raf = requestAnimationFrame(draw);
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      const z = safeZone();
      const bg = ctx.createRadialGradient(z.cx, z.cy, 0, z.cx, z.cy, Math.max(w, h) * 0.65);
      bg.addColorStop(0, "rgba(5,11,9,0.88)");
      bg.addColorStop(0.28, "rgba(5,11,9,0.78)");
      bg.addColorStop(0.55, "rgba(2,5,7,0.32)");
      bg.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, w, h);

      const orb = ctx.createRadialGradient(w * 0.78, h * 0.92, 0, w * 0.78, h * 0.92, Math.max(w, h) * 0.82);
      orb.addColorStop(0, "rgba(10,10,10,0.82)");
      orb.addColorStop(0.55, "rgba(4,4,4,0.58)");
      orb.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = orb;
      ctx.beginPath();
      ctx.arc(w * 0.78, h * 0.92, Math.max(w, h) * 0.82, 0, Math.PI * 2);
      ctx.fill();

      ctx.lineWidth = 0.5;
      for (const p of particles) {
        p.x += p.vx + (mouse.current.x - 0.5) * 0.01;
        p.y += p.vy + (mouse.current.y - 0.5) * 0.01;
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;
        if (inSafe(p.x, p.y)) continue;

        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 4);
        g.addColorStop(0, rgba(p.color, p.alpha * 1.1));
        g.addColorStop(1, rgba(p.color, 0));
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 4, 0, Math.PI * 2);
        ctx.fill();
      }

      if (ts - lastMeteor > 2600 && meteors.length < 2) {
        const side = Math.random() > 0.5 ? 1 : -1;
        const y = h * (0.18 + Math.random() * 0.64);
        meteors.push({
          x: side > 0 ? -40 : w + 40,
          y,
          vx: side > 0 ? 1.2 : -1.2,
          vy: (Math.random() - 0.5) * 0.12,
          life: 0,
          maxLife: 240,
          color: Math.random() > 0.5 ? GREEN : BLUE,
        });
        lastMeteor = ts;
      }

      meteors = meteors.filter((m) => m.life < m.maxLife);
      for (const m of meteors) {
        m.x += m.vx;
        m.y += m.vy;
        m.life += 1;
        if (inSafe(m.x, m.y)) continue;
        const alpha = Math.max(0, 1 - m.life / m.maxLife);
        const trail = ctx.createLinearGradient(m.x, m.y, m.x - m.vx * 10, m.y - m.vy * 10);
        trail.addColorStop(0, rgba(m.color, alpha * 0.55));
        trail.addColorStop(1, rgba(m.color, 0));
        ctx.strokeStyle = trail;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(m.x, m.y);
        ctx.lineTo(m.x - m.vx * 14, m.y - m.vy * 14);
        ctx.stroke();
      }

      const mask = ctx.createRadialGradient(z.cx, z.cy, 0, z.cx, z.cy, Math.max(z.rx, z.ry) * 1.15);
      mask.addColorStop(0, "rgba(4,8,8,0.95)");
      mask.addColorStop(1, "rgba(4,8,8,0)");
      ctx.fillStyle = mask;
      ctx.beginPath();
      ctx.ellipse(z.cx, z.cy, z.rx, z.ry, 0, 0, Math.PI * 2);
      ctx.fill();
    };

    resize();
    raf = requestAnimationFrame(draw);
    window.addEventListener("resize", resize);
    const onMouse = (e: MouseEvent) => {
      mouse.current.x = e.clientX / window.innerWidth;
      mouse.current.y = e.clientY / window.innerHeight;
    };
    const onTouch = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouse.current.x = e.touches[0].clientX / window.innerWidth;
        mouse.current.y = e.touches[0].clientY / window.innerHeight;
      }
    };
    window.addEventListener("mousemove", onMouse);
    window.addEventListener("touchmove", onTouch, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("touchmove", onTouch);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{ position: "fixed", inset: 0, width: "100vw", height: "100vh", pointerEvents: "none", zIndex: 0 }}
    />
  );
}
