"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";

interface Node {
  x: number;
  y: number;
  baseRadius: number;
  phase: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
}

const GRID_GAP = 56;
const ACCENT = "62, 207, 142";
const ACCENT_SECONDARY = "79, 142, 247";
const GLOW_RADIUS = 260;
const NODE_REACT_RADIUS = 180;
const PARTICLE_COUNT = 26;

function subscribeToCapabilities(callback: () => void) {
  const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  const coarsePointerQuery = window.matchMedia("(pointer: coarse)");
  reducedMotionQuery.addEventListener("change", callback);
  coarsePointerQuery.addEventListener("change", callback);
  window.addEventListener("resize", callback);
  return () => {
    reducedMotionQuery.removeEventListener("change", callback);
    coarsePointerQuery.removeEventListener("change", callback);
    window.removeEventListener("resize", callback);
  };
}

function getIsEnabled() {
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;
  const isCoarsePointer = window.matchMedia("(pointer: coarse)").matches;
  const isSmallViewport = window.innerWidth < 768;
  return !prefersReducedMotion && !isCoarsePointer && !isSmallViewport;
}

function getServerIsEnabled() {
  return false;
}

export function LiveDataField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const enabled = useSyncExternalStore(
    subscribeToCapabilities,
    getIsEnabled,
    getServerIsEnabled
  );

  useEffect(() => {
    if (!enabled) return;
    const canvasEl = canvasRef.current;
    if (!canvasEl) return;
    const ctxEl = canvasEl.getContext("2d");
    if (!ctxEl) return;
    const wrapperEl = wrapperRef.current;
    if (!wrapperEl) return;
    const canvas: HTMLCanvasElement = canvasEl;
    const ctx: CanvasRenderingContext2D = ctxEl;
    const wrapper: HTMLDivElement = wrapperEl;

    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let nodes: Node[] = [];
    let particles: Particle[] = [];
    const mouse = { x: -9999, y: -9999, active: false };
    let targetMouse = { x: -9999, y: -9999 };
    let rafId = 0;
    let visible = true;

    function buildNodes() {
      nodes = [];
      const cols = Math.ceil(width / GRID_GAP) + 2;
      const rows = Math.ceil(height / GRID_GAP) + 2;
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          nodes.push({
            x: i * GRID_GAP,
            y: j * GRID_GAP,
            baseRadius: 1 + Math.random() * 0.6,
            phase: Math.random() * Math.PI * 2,
          });
        }
      }
    }

    function buildParticles() {
      particles = Array.from({ length: PARTICLE_COUNT }, () => spawnParticle());
    }

    function spawnParticle(): Particle {
      const maxLife = 6000 + Math.random() * 6000;
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.06,
        vy: (Math.random() - 0.5) * 0.06,
        life: Math.random() * maxLife,
        maxLife,
      };
    }

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildNodes();
      buildParticles();
    }

    function onPointerMove(e: PointerEvent) {
      targetMouse = { x: e.clientX, y: e.clientY };
      mouse.active = true;
    }

    function onPointerLeave() {
      mouse.active = false;
      targetMouse = { x: -9999, y: -9999 };
    }

    function onVisibilityChange() {
      visible = document.visibilityState === "visible";
    }

    let lastTime = performance.now();

    function draw(now: number) {
      rafId = requestAnimationFrame(draw);
      if (!visible) return;
      const dt = Math.min(now - lastTime, 48);
      lastTime = now;

      mouse.x += (targetMouse.x - mouse.x) * 0.12;
      mouse.y += (targetMouse.y - mouse.y) * 0.12;

      const scrollY = window.scrollY;
      const fadeRange = height || 800;
      const scrollFade = 1 - Math.min(scrollY / fadeRange, 0.72);
      wrapper.style.transform = `translate3d(0, ${-scrollY * 0.18}px, 0)`;
      wrapper.style.opacity = String(scrollFade);

      ctx.clearRect(0, 0, width, height);

      if (mouse.active) {
        const glow = ctx.createRadialGradient(
          mouse.x,
          mouse.y,
          0,
          mouse.x,
          mouse.y,
          GLOW_RADIUS
        );
        glow.addColorStop(0, `rgba(${ACCENT}, 0.10)`);
        glow.addColorStop(0.5, `rgba(${ACCENT_SECONDARY}, 0.04)`);
        glow.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = glow;
        ctx.fillRect(
          mouse.x - GLOW_RADIUS,
          mouse.y - GLOW_RADIUS,
          GLOW_RADIUS * 2,
          GLOW_RADIUS * 2
        );
      }

      for (const node of nodes) {
        const dx = node.x - mouse.x;
        const dy = node.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const proximity = Math.max(0, 1 - dist / NODE_REACT_RADIUS);
        const shimmer = 0.5 + 0.5 * Math.sin(now / 1800 + node.phase);
        const baseOpacity = 0.05 + shimmer * 0.05;
        const opacity = baseOpacity + proximity * 0.55;
        const radius = node.baseRadius + proximity * 1.6;

        if (opacity < 0.01) continue;

        ctx.beginPath();
        ctx.arc(node.x, node.y, radius, 0, Math.PI * 2);
        ctx.fillStyle =
          proximity > 0.05
            ? `rgba(${ACCENT}, ${Math.min(opacity, 0.9)})`
            : `rgba(255, 255, 255, ${opacity})`;
        ctx.fill();
      }

      ctx.lineWidth = 1;
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.life += dt;

        if (
          p.life > p.maxLife ||
          p.x < -20 ||
          p.x > width + 20 ||
          p.y < -20 ||
          p.y > height + 20
        ) {
          particles[i] = spawnParticle();
          continue;
        }

        const lifeRatio = p.life / p.maxLife;
        const fade = Math.sin(lifeRatio * Math.PI);
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const proximity = Math.max(0, 1 - dist / NODE_REACT_RADIUS);

        ctx.beginPath();
        ctx.arc(p.x, p.y, 1 + proximity * 1.2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${ACCENT_SECONDARY}, ${(0.12 + proximity * 0.4) * fade})`;
        ctx.fill();
      }
    }

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerleave", onPointerLeave);
    document.addEventListener("visibilitychange", onVisibilityChange);
    rafId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerleave", onPointerLeave);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      wrapper.style.transform = "";
      wrapper.style.opacity = "";
    };
  }, [enabled]);

  return (
    <div
      ref={wrapperRef}
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-grid mask-fade-bottom will-change-transform">
      {enabled && <canvas ref={canvasRef} className="absolute inset-0" />}
    </div>
  );
}
