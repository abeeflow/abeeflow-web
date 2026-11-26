import type { CSSProperties, ReactNode } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import './HeroHoneycomb.css';

const HEX_POINTS = '60,0 120,34.6 120,103.9 60,138.5 0,103.9 0,34.6';

interface OuterCell {
  id: 'nw' | 'ne' | 'w' | 'e' | 'sw' | 'se';
  translate: string;
  icon: ReactNode;
}

const outerCells: OuterCell[] = [
  {
    id: 'nw',
    translate: 'translate(150 97)',
    icon: (
      <>
        <path d="M3 3v18h18" />
        <path d="M18 17V9" />
        <path d="M13 17V5" />
        <path d="M8 17v-3" />
      </>
    ),
  },
  {
    id: 'ne',
    translate: 'translate(270 97)',
    icon: (
      <>
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="M22 7l-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </>
    ),
  },
  {
    id: 'w',
    translate: 'translate(90 201)',
    icon: (
      <>
        <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
        <polyline points="16 7 22 7 22 13" />
      </>
    ),
  },
  {
    id: 'e',
    translate: 'translate(330 201)',
    icon: (
      <>
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </>
    ),
  },
  {
    id: 'sw',
    translate: 'translate(150 305)',
    icon: <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />,
  },
  {
    id: 'se',
    translate: 'translate(270 305)',
    icon: (
      <>
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </>
    ),
  },
];

// Recorrido del pulso, en sentido horario, y centro de cada celda
// (traslado de la celda + la mitad del hexágono: 60, 69).
const RING: OuterCell['id'][] = ['nw', 'ne', 'e', 'se', 'sw', 'w'];
const HUB = { x: 270, y: 270 };
const cellCenter = (cell: OuterCell) => {
  const [x, y] = cell.translate.match(/[\d.]+/g)!.map(Number);
  return { x: x + 60, y: y + 69 };
};

interface HeroHoneycombProps {
  // Sube cada vez que cambia el verbo del titular (cada 2,8 s).
  tick: number;
  // false con "reducir movimiento": el panal queda quieto.
  animate: boolean;
}

// Panal del hero. Al cargar, las celdas se arman desde el centro hacia
// afuera. Luego, al mismo ritmo que el verbo del titular, se enciende
// una celda y un pulso viaja de ella al centro: el "flow" de abeeFlow.
const HeroHoneycomb = ({ tick, animate }: HeroHoneycombProps) => {
  const { t } = useLanguage();
  const cells = t.hero.cells;
  const activeId = animate ? RING[tick % RING.length] : null;
  const activeCell = outerCells.find((cell) => cell.id === activeId);
  const from = activeCell ? cellCenter(activeCell) : null;

  return (
    <div className="hero-honeycomb-stage" aria-hidden="true">
      {/* Recortado al panal (celdas de x 90 a 450, y 97 a 443) con 10 de aire. */}
      <svg viewBox="80 87 380 367" className="hero-honeycomb-svg" xmlns="http://www.w3.org/2000/svg">
        {/* Celda central con el logo: no es interactiva */}
        <g className="hex-cell center" transform="translate(210 201)">
          <g className="hex-inner" style={{ '--i': 0 } as CSSProperties}>
            <polygon className="hex-shape center" points={HEX_POINTS} />
            {/* Se ilumina cuando llega el pulso. La key reinicia la animación. */}
            {from && tick > 0 && <polygon key={`glow-${tick}`} className="hex-hub-glow" points={HEX_POINTS} />}
            <g className="hex-logo" transform="translate(29 28) scale(1.7)">
              <path d="M16.5 8.5 Q15 7 15 5.5" stroke="var(--yellow)" strokeWidth="0.7" fill="none" strokeLinecap="round" />
              <path d="M19.5 8.5 Q21 7 21 5.5" stroke="var(--yellow)" strokeWidth="0.7" fill="none" strokeLinecap="round" />
              <circle cx="18" cy="11" r="3" fill="var(--yellow)" />
              <path d="M18 13 L21 15 L21.5 22 L18 26 L14.5 22 L15 15 Z" fill="var(--yellow)" />
              <line x1="15.5" y1="16.5" x2="20.5" y2="16.5" stroke="white" strokeWidth="1.2" strokeLinecap="round" />
              <line x1="15" y1="19.5" x2="21" y2="19.5" stroke="white" strokeWidth="1.2" strokeLinecap="round" />
              <line x1="15.5" y1="23" x2="20.5" y2="23" stroke="white" strokeWidth="1.2" strokeLinecap="round" />
              <path d="M10 15 L7 18 L10 21" stroke="var(--yellow)" strokeWidth="1.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M26 15 L29 18 L26 21" stroke="var(--yellow)" strokeWidth="1.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </g>
            <text className="hex-label center" x="60" y="118">{cells.center}</text>
          </g>
        </g>

        {/* Las 6 celdas de alrededor. El <g> interno lleva la entrada:
            un transform en CSS sobre el externo borraría su traslado. */}
        {outerCells.map((cell) => (
          <g key={cell.id} className="hex-cell interactive" transform={cell.translate}>
            <g
              className={`hex-inner ${cell.id === activeId ? 'is-active' : ''}`}
              style={{ '--i': RING.indexOf(cell.id) + 1 } as CSSProperties}
            >
              <polygon className="hex-shape" points={HEX_POINTS} />
              <g className="hex-icon" transform="translate(44 36) scale(1.33)">
                {cell.icon}
              </g>
              <text className="hex-label" x="60" y="113">{cells[cell.id]}</text>
            </g>
          </g>
        ))}

        {/* Pulso de la celda encendida al centro. La key lo reinicia en cada cambio. */}
        {from && tick > 0 && (
          <circle
            key={`pulse-${tick}`}
            className="hex-pulse"
            r="6"
            style={{ '--fx': `${from.x}px`, '--fy': `${from.y}px`, '--tx': `${HUB.x}px`, '--ty': `${HUB.y}px` } as CSSProperties}
          />
        )}
      </svg>
    </div>
  );
};

export default HeroHoneycomb;
