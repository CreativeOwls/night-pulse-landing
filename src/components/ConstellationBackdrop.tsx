import { useEffect, useRef } from "react";

type Dot = { x: number; y: number; vx: number; vy: number; r: number };

const DOT_DENSITY = 1 / 14000; // dots per px^2
const MAX_DOTS = 140;
const LINK_DISTANCE = 130;
const CURSOR_RADIUS = 180;

function readToken(styles: CSSStyleDeclaration, name: string, fallback: string) {
  const value = styles.getPropertyValue(name).trim();
  return value || fallback;
}

/**
 * Animated constellation backdrop: drifting dots linked by faint lines,
 * gently parallaxed by the pointer. Freezes drift under prefers-reduced-motion.
 */
export function ConstellationBackdrop() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const rootStyles = getComputedStyle(document.documentElement);
    const dotColor = readToken(rootStyles, "--foreground", "#ffffff");
    const linkColor = readToken(rootStyles, "--accent-blue", "#8ab4f8");

    let width = 0;
    let height = 0;
    let dots: Dot[] = [];
    let frame = 0;

    const pointer = { x: -9999, y: -9999, px: 0, py: 0, tx: 0, ty: 0 };

    const seed = () => {
      const count = Math.min(MAX_DOTS, Math.round(width * height * DOT_DENSITY));
      dots = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.18,
        vy: (Math.random() - 0.5) * 0.18,
        r: 0.8 + Math.random() * 1.4,
      }));
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
    };

    const onPointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = event.clientX - rect.left;
      pointer.y = event.clientY - rect.top;
      pointer.tx = (pointer.x / rect.width - 0.5) * 26;
      pointer.ty = (pointer.y / rect.height - 0.5) * 26;
    };

    const onPointerLeave = () => {
      pointer.x = -9999;
      pointer.y = -9999;
      pointer.tx = 0;
      pointer.ty = 0;
    };

    const draw = () => {
      pointer.px += (pointer.tx - pointer.px) * 0.05;
      pointer.py += (pointer.ty - pointer.py) * 0.05;

      ctx.clearRect(0, 0, width, height);
      ctx.save();
      ctx.translate(pointer.px, pointer.py);

      for (const dot of dots) {
        if (!reduceMotion) {
          dot.x += dot.vx;
          dot.y += dot.vy;
          if (dot.x < -20) dot.x = width + 20;
          if (dot.x > width + 20) dot.x = -20;
          if (dot.y < -20) dot.y = height + 20;
          if (dot.y > height + 20) dot.y = -20;
        }
      }

      for (let i = 0; i < dots.length; i += 1) {
        const a = dots[i]!;
        for (let j = i + 1; j < dots.length; j += 1) {
          const b = dots[j]!;

          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);
          if (dist > LINK_DISTANCE) continue;

          const midX = (a.x + b.x) / 2;
          const midY = (a.y + b.y) / 2;
          const cursorDist = Math.hypot(midX - pointer.x + pointer.px, midY - pointer.y + pointer.py);
          const nearCursor = Math.max(0, 1 - cursorDist / CURSOR_RADIUS);
          const alpha = (1 - dist / LINK_DISTANCE) * (0.08 + nearCursor * 0.22);

          ctx.strokeStyle = linkColor;
          ctx.globalAlpha = alpha;
          ctx.lineWidth = 0.6;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }

      for (const dot of dots) {
        const cursorDist = Math.hypot(dot.x - pointer.x + pointer.px, dot.y - pointer.y + pointer.py);
        const nearCursor = Math.max(0, 1 - cursorDist / CURSOR_RADIUS);
        ctx.globalAlpha = 0.22 + nearCursor * 0.5;
        ctx.fillStyle = dotColor;
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.r + nearCursor * 0.7, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalAlpha = 1;
      ctx.restore();
      frame = window.requestAnimationFrame(draw);
    };

    resize();
    frame = window.requestAnimationFrame(draw);

    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerleave", onPointerLeave);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerleave", onPointerLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
}
