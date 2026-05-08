import { useEffect, useMemo, useRef } from 'react';
import './HoneycombBackground.css';

const HEX_RADIUS = 70;
const COLS = 20;
const ROWS = 15;

const HoneycombBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);

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
    if (!container) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (window.innerWidth < 768) return;

    let rafId = 0;
    let pendingX = 0;
    let pendingY = 0;
    let scheduled = false;

    const handleMouseMove = (e: MouseEvent) => {
      pendingX = e.clientX;
      pendingY = e.clientY;
      if (scheduled) return;
      scheduled = true;
      rafId = requestAnimationFrame(() => {
        container.style.setProperty('--mouse-x', `${pendingX}px`);
        container.style.setProperty('--mouse-y', `${pendingY}px`);
        scheduled = false;
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div ref={containerRef} className="hex-bg" aria-hidden="true">
      <svg
        className="hex-bg-svg base"
        viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
        preserveAspectRatio="xMidYMid slice"
      >
        <g>
          {hexagons.map((h) => (
            <polygon key={h.key} points={h.points} />
          ))}
        </g>
      </svg>
      <svg
        className="hex-bg-svg highlight"
        viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
        preserveAspectRatio="xMidYMid slice"
      >
        <g>
          {hexagons.map((h) => (
            <polygon key={h.key} points={h.points} />
          ))}
        </g>
      </svg>
    </div>
  );
};

export default HoneycombBackground;
