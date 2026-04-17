// ─── Shared SVG Primitive Components ─────────────────────────────────────────

export const StickFigure = ({
  x = 0,
  y = 0,
  facing = 1,
  armAngle = 0,
  label,
}: {
  x?: number;
  y?: number;
  facing?: number;
  armAngle?: number;
  label?: string;
}) => (
  <g transform={`translate(${x},${y}) scale(${facing},1)`}>
    <circle cx="0" cy="-52" r="12" stroke="#fff" strokeWidth="2.5" fill="none" />
    <line x1="0" y1="-40" x2="0" y2="-10" stroke="#fff" strokeWidth="2.5" />
    <line
      x1="0" y1="-32"
      x2={-18 * Math.cos((armAngle * Math.PI) / 180)}
      y2={-32 + 18 * Math.sin((armAngle * Math.PI) / 180)}
      stroke="#fff" strokeWidth="2.5"
    />
    <line
      x1="0" y1="-32"
      x2={18 * Math.cos((armAngle * Math.PI) / 180)}
      y2={-32 + 18 * Math.sin((armAngle * Math.PI) / 180)}
      stroke="#fff" strokeWidth="2.5"
    />
    <line x1="0" y1="-10" x2="-14" y2="16" stroke="#fff" strokeWidth="2.5" />
    <line x1="0" y1="-10" x2="14" y2="16" stroke="#fff" strokeWidth="2.5" />
    {label && (
      <text x="0" y="32" textAnchor="middle" fill="#888" fontSize="11">{label}</text>
    )}
  </g>
);

export const SwimmingFigure = ({
  x = 0,
  y = 0,
  facing = 1,
}: {
  x?: number;
  y?: number;
  facing?: number;
}) => (
  <g transform={`translate(${x},${y}) scale(${facing},1)`}>
    <circle cx="0" cy="0" r="12" stroke="#fff" strokeWidth="2.5" fill="none" />
    <line x1="12" y1="0" x2="40" y2="0" stroke="#fff" strokeWidth="2.5" />
    <line x1="22" y1="0" x2="14" y2="-14" stroke="#fff" strokeWidth="2.5" />
    <line x1="28" y1="0" x2="36" y2="-14" stroke="#fff" strokeWidth="2.5" />
    <line x1="40" y1="0" x2="50" y2="-12" stroke="#fff" strokeWidth="2.5" />
    <line x1="40" y1="0" x2="52" y2="8" stroke="#fff" strokeWidth="2.5" />
  </g>
);

export const Lightbulb = ({ x = 0, y = 0 }: { x?: number; y?: number }) => (
  <g transform={`translate(${x},${y})`}>
    <circle cx="0" cy="-4" r="14" stroke="#fff" strokeWidth="2" fill="none" />
    <line x1="-6" y1="10" x2="6" y2="10" stroke="#fff" strokeWidth="2" />
    <line x1="-4" y1="14" x2="4" y2="14" stroke="#fff" strokeWidth="2" />
    <line x1="0" y1="10" x2="0" y2="2" stroke="#fff" strokeWidth="1.5" />
    <line x1="-16" y1="-4" x2="-20" y2="-4" stroke="#fff" strokeWidth="1.5" />
    <line x1="16" y1="-4" x2="20" y2="-4" stroke="#fff" strokeWidth="1.5" />
    <line x1="-12" y1="-14" x2="-15" y2="-17" stroke="#fff" strokeWidth="1.5" />
    <line x1="12" y1="-14" x2="15" y2="-17" stroke="#fff" strokeWidth="1.5" />
    <line x1="0" y1="-18" x2="0" y2="-22" stroke="#fff" strokeWidth="1.5" />
  </g>
);

export const SharkFin = ({ x = 0, y = 0 }: { x?: number; y?: number }) => (
  <g transform={`translate(${x},${y})`}>
    <path d="M0,0 L-8,-26 L8,0 Z" stroke="#fff" strokeWidth="2" fill="none" />
  </g>
);

export const BeachUmbrella = ({ x = 0, y = 0 }: { x?: number; y?: number }) => (
  <g transform={`translate(${x},${y})`}>
    <path d="M-20,0 Q0,-28 20,0 Z" stroke="#fff" strokeWidth="2" fill="none" />
    <line x1="0" y1="0" x2="4" y2="24" stroke="#fff" strokeWidth="2" />
  </g>
);

export const ThoughtBubble = ({
  x = 0,
  y = 0,
  w = 60,
  h = 40,
  children,
}: {
  x?: number;
  y?: number;
  w?: number;
  h?: number;
  children?: React.ReactNode;
}) => (
  <g transform={`translate(${x},${y})`}>
    <circle cx="-18" cy="18" r="3" stroke="#fff" strokeWidth="1.5" fill="none" />
    <circle cx="-12" cy="10" r="5" stroke="#fff" strokeWidth="1.5" fill="none" />
    <ellipse cx="0" cy="-10" rx={w / 2} ry={h / 2} stroke="#fff" strokeWidth="2" fill="#111" />
    {children}
  </g>
);

export const WavyWater = ({ y = 0, width = 800 }: { y?: number; width?: number }) => {
  const amplitude = 8;
  const wavelength = 80;
  const points: string[] = [];
  for (let x = 0; x <= width; x += 4) {
    points.push(`${x},${y + amplitude * Math.sin((x / wavelength) * 2 * Math.PI)}`);
  }
  return (
    <>
      <polyline points={points.join(" ")} stroke="#4af" strokeWidth="2" fill="none" opacity="0.6" />
      <polyline
        points={points
          .map((p) => {
            const [px, py] = p.split(",");
            return `${px},${Number(py) + 20}`;
          })
          .join(" ")}
        stroke="#4af" strokeWidth="2" fill="none" opacity="0.3"
      />
    </>
  );
};

export const Coconut = ({ x = 0, y = 0 }: { x?: number; y?: number }) => (
  <ellipse cx={x} cy={y} rx="10" ry="11" stroke="#fff" strokeWidth="2" fill="none" />
);

export const PalmTree = ({ x = 0, y = 0 }: { x?: number; y?: number }) => (
  <g transform={`translate(${x},${y})`}>
    <path d="M0,0 Q10,-60 4,-120" stroke="#fff" strokeWidth="4" fill="none" strokeLinecap="round" />
    <path d="M4,-120 Q30,-130 40,-110" stroke="#fff" strokeWidth="2" fill="none" />
    <path d="M4,-120 Q-20,-130 -30,-115" stroke="#fff" strokeWidth="2" fill="none" />
    <path d="M4,-120 Q0,-145 10,-155" stroke="#fff" strokeWidth="2" fill="none" />
    <path d="M4,-120 Q20,-140 30,-140" stroke="#fff" strokeWidth="2" fill="none" />
    <ellipse cx="8" cy="-112" rx="7" ry="8" stroke="#fff" strokeWidth="2" fill="none" />
  </g>
);

export const BarChart = ({ x = 0, y = 0 }: { x?: number; y?: number }) => (
  <g transform={`translate(${x},${y})`}>
    <line x1="0" y1="0" x2="0" y2="-100" stroke="#fff" strokeWidth="2" />
    <line x1="0" y1="0" x2="120" y2="0" stroke="#fff" strokeWidth="2" />
    <rect x="10" y="-78" width="40" height="78" stroke="#fff" strokeWidth="2" fill="none" />
    <text x="30" y="-82" textAnchor="middle" fill="#fff" fontSize="9">🥥</text>
    <rect x="68" y="-22" width="40" height="22" stroke="#fff" strokeWidth="2" fill="none" />
    <text x="88" y="-26" textAnchor="middle" fill="#fff" fontSize="9">🦈</text>
    <text x="30" y="12" textAnchor="middle" fill="#aaa" fontSize="9">coconut</text>
    <text x="88" y="12" textAnchor="middle" fill="#aaa" fontSize="9">shark</text>
    <text x="-4" y="-95" textAnchor="end" fill="#aaa" fontSize="9">%</text>
  </g>
);

export const AngryFish = ({ x = 0, y = 0 }: { x?: number; y?: number }) => (
  <g transform={`translate(${x},${y})`}>
    <ellipse cx="0" cy="0" rx="55" ry="28" stroke="#fff" strokeWidth="2.5" fill="none" />
    <path d="M55,0 L80,-20 L80,20 Z" stroke="#fff" strokeWidth="2" fill="none" />
    <circle cx="-30" cy="-8" r="6" stroke="#fff" strokeWidth="2" fill="none" />
    <circle cx="-31" cy="-9" r="2" fill="#fff" />
    <line x1="-36" y1="-16" x2="-24" y2="-20" stroke="#fff" strokeWidth="2.5" />
    <path d="M-48,8 L-38,2 L-30,8 L-22,2 L-14,8 L-6,2" stroke="#fff" strokeWidth="2" fill="none" />
    <path d="M-10,-28 L0,-50 L16,-28" stroke="#fff" strokeWidth="2" fill="none" />
    <path d="M0,18 L10,38 L20,18" stroke="#fff" strokeWidth="2" fill="none" />
  </g>
);
