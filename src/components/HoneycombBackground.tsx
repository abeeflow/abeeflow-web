import { useEffect, useMemo, useRef } from 'react';
import './HoneycombBackground.css';

const HEX_RADIUS = 70;
const COLS = 20;
const ROWS = 15;
const PARALLAX_RANGE = 30; // ±15px (range/2)
const LERP_FACTOR = 0.06;

const HoneycombBackground = () => {
  const gRef = useRef<SVGGElement>(null);

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
    const g = gRef.current;
    if (!g) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (window.innerWidth < 768) return;

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let rafId = 0;

    const handleMouseMove = (e: MouseEvent) => {
      targetX = (e.clientX / window.innerWidth - 0.5) * PARALLAX_RANGE;
      targetY = (e.clientY / window.innerHeight - 0.5) * PARALLAX_RANGE;
    };

    const animate = () => {
      currentX += (targetX - currentX) * LERP_FACTOR;
      currentY += (targetY - currentY) * LERP_FACTOR;
      g.setAttribute('transform', `translate(${currentX.toFixed(2)} ${currentY.toFixed(2)})`);
      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove);
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div className="honeycomb-bg" aria-hidden="true">
      <div className="honeycomb-wrapper">
        <svg
          viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
          preserveAspectRatio="xMidYMid slice"
          width="100%"
          height="100%"
        >
          <g ref={gRef}>
            {hexagons.map((h) => (
              <polygon key={h.key} className="hex-cell" points={h.points} />
            ))}
          </g>
        </svg>
      </div>
    </div>
  );
};

export default HoneycombBackground;
