import { useEffect, useMemo, useRef } from 'react';
import './HoneycombBackground.css';

const HEX_RADIUS = 70;
const COLS = 12;
const ROWS = 9;
const PARALLAX_RANGE = 10;

const HoneycombBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const { hexagons, viewBoxWidth, viewBoxHeight } = useMemo(() => {
    const sqrt3div2 = Math.sqrt(3) / 2;
    const horizSpacing = HEX_RADIUS * Math.sqrt(3);
    const vertSpacing = HEX_RADIUS * 1.5;
    const offsetX = horizSpacing / 2;

    const cells: { points: string; key: string }[] = [];
    for (let row = 0; row < ROWS; row++) {
      for (let col = 0; col < COLS; col++) {
        const cx = col * horizSpacing + (row % 2) * offsetX + offsetX;
        const cy = row * vertSpacing + HEX_RADIUS;
        const r = HEX_RADIUS;
        const points = [
          [cx, cy - r],
          [cx + r * sqrt3div2, cy - r / 2],
          [cx + r * sqrt3div2, cy + r / 2],
          [cx, cy + r],
          [cx - r * sqrt3div2, cy + r / 2],
          [cx - r * sqrt3div2, cy - r / 2],
        ]
          .map((p) => `${p[0].toFixed(1)},${p[1].toFixed(1)}`)
          .join(' ');
        cells.push({ points, key: `${row}-${col}` });
      }
    }

    return {
      hexagons: cells,
      viewBoxWidth: COLS * horizSpacing + offsetX * 2,
      viewBoxHeight: ROWS * vertSpacing + HEX_RADIUS,
    };
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    const wrapper = wrapperRef.current;
    if (!container || !wrapper) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (window.innerWidth < 768) return;

    const heroSection = container.closest<HTMLElement>('.hero');
    if (!heroSection) return;

    let rafId: number | null = null;
    let pendingX = 0;
    let pendingY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = heroSection.getBoundingClientRect();
      const cx = (e.clientX - rect.left) / rect.width - 0.5;
      const cy = (e.clientY - rect.top) / rect.height - 0.5;
      pendingX = cx * PARALLAX_RANGE * 2;
      pendingY = cy * PARALLAX_RANGE * 2;

      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        wrapper.style.transform = `translate3d(${pendingX.toFixed(2)}px, ${pendingY.toFixed(2)}px, 0)`;
        rafId = null;
      });
    };

    heroSection.addEventListener('mousemove', handleMouseMove);
    return () => {
      heroSection.removeEventListener('mousemove', handleMouseMove);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div ref={containerRef} className="honeycomb-bg" aria-hidden="true">
      <div ref={wrapperRef} className="honeycomb-wrapper">
        <svg
          viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
          preserveAspectRatio="xMidYMid slice"
          width="100%"
          height="100%"
        >
          {hexagons.map((h) => (
            <polygon key={h.key} className="hex-cell" points={h.points} />
          ))}
        </svg>
      </div>
    </div>
  );
};

export default HoneycombBackground;
