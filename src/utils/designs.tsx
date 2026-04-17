// ─── Shared SVG Primitive Components ─────────────────────────────────────────

export type Mood =
  | "neutral"
  | "worried"
  | "happy"
  | "idea"
  | "afraid"
  | "surprised"
  | "terrified"
  | "angry"
  | "explaining"
  | "dazed";

// Inline face drawn inside a head circle of radius 12, centred at (0,0)
const Face = ({ mood, scale = 1 }: { mood: Mood; scale?: number }) => {
  const s = scale;
  // eye y position
  const eyeY = -3 * s;
  const eyeOff = 4 * s;
  const eyeR = 1.5 * s;

  const eyes = (
    <>
      <circle cx={-eyeOff} cy={eyeY} r={eyeR} fill="#fff" />
      <circle cx={eyeOff} cy={eyeY} r={eyeR} fill="#fff" />
    </>
  );

  // wide eyes for afraid/terrified
  const wideEyes = (
    <>
      <circle
        cx={-eyeOff}
        cy={eyeY}
        r={eyeR * 1.8}
        stroke="#fff"
        strokeWidth="1"
        fill="none"
      />
      <circle cx={-eyeOff} cy={eyeY} r={eyeR * 0.8} fill="#fff" />
      <circle
        cx={eyeOff}
        cy={eyeY}
        r={eyeR * 1.8}
        stroke="#fff"
        strokeWidth="1"
        fill="none"
      />
      <circle cx={eyeOff} cy={eyeY} r={eyeR * 0.8} fill="#fff" />
    </>
  );

  // X eyes for dazed
  const xEyes = (
    <>
      <line
        x1={-eyeOff - 2 * s}
        y1={eyeY - 2 * s}
        x2={-eyeOff + 2 * s}
        y2={eyeY + 2 * s}
        stroke="#fff"
        strokeWidth="1.2"
      />
      <line
        x1={-eyeOff + 2 * s}
        y1={eyeY - 2 * s}
        x2={-eyeOff - 2 * s}
        y2={eyeY + 2 * s}
        stroke="#fff"
        strokeWidth="1.2"
      />
      <line
        x1={eyeOff - 2 * s}
        y1={eyeY - 2 * s}
        x2={eyeOff + 2 * s}
        y2={eyeY + 2 * s}
        stroke="#fff"
        strokeWidth="1.2"
      />
      <line
        x1={eyeOff + 2 * s}
        y1={eyeY - 2 * s}
        x2={eyeOff - 2 * s}
        y2={eyeY + 2 * s}
        stroke="#fff"
        strokeWidth="1.2"
      />
    </>
  );

  // brow helpers
  const worriedBrows = (
    <>
      <line
        x1={-eyeOff - 3 * s}
        y1={eyeY - 5 * s}
        x2={-eyeOff + 2 * s}
        y2={eyeY - 7 * s}
        stroke="#fff"
        strokeWidth="1.2"
      />
      <line
        x1={eyeOff - 2 * s}
        y1={eyeY - 7 * s}
        x2={eyeOff + 3 * s}
        y2={eyeY - 5 * s}
        stroke="#fff"
        strokeWidth="1.2"
      />
    </>
  );
  const angryBrows = (
    <>
      <line
        x1={-eyeOff - 3 * s}
        y1={eyeY - 7 * s}
        x2={-eyeOff + 3 * s}
        y2={eyeY - 4 * s}
        stroke="#fff"
        strokeWidth="1.5"
      />
      <line
        x1={eyeOff - 3 * s}
        y1={eyeY - 4 * s}
        x2={eyeOff + 3 * s}
        y2={eyeY - 7 * s}
        stroke="#fff"
        strokeWidth="1.5"
      />
    </>
  );
  const raisedBrows = (
    <>
      <line
        x1={-eyeOff - 3 * s}
        y1={eyeY - 7 * s}
        x2={-eyeOff + 3 * s}
        y2={eyeY - 8 * s}
        stroke="#fff"
        strokeWidth="1.2"
      />
      <line
        x1={eyeOff - 3 * s}
        y1={eyeY - 8 * s}
        x2={eyeOff + 3 * s}
        y2={eyeY - 7 * s}
        stroke="#fff"
        strokeWidth="1.2"
      />
    </>
  );

  const mouthY = 4 * s;

  switch (mood) {
    case "happy":
      return (
        <g>
          {eyes}
          {/* smile */}
          <path
            d={`M${-5 * s},${mouthY} Q0,${mouthY + 5 * s} ${5 * s},${mouthY}`}
            stroke="#fff"
            strokeWidth="1.2"
            fill="none"
          />
        </g>
      );
    case "idea":
      return (
        <g>
          {raisedBrows}
          {/* wide open eyes */}
          <circle cx={-eyeOff} cy={eyeY} r={eyeR * 1.4} fill="#fff" />
          <circle cx={eyeOff} cy={eyeY} r={eyeR * 1.4} fill="#fff" />
          {/* open "o" mouth */}
          <ellipse
            cx="0"
            cy={mouthY + 1 * s}
            rx={3 * s}
            ry={2.5 * s}
            stroke="#fff"
            strokeWidth="1.2"
            fill="none"
          />
        </g>
      );
    case "worried":
      return (
        <g>
          {worriedBrows}
          {eyes}
          {/* frown */}
          <path
            d={`M${-5 * s},${mouthY + 3 * s} Q0,${mouthY} ${5 * s},${mouthY + 3 * s}`}
            stroke="#fff"
            strokeWidth="1.2"
            fill="none"
          />
        </g>
      );
    case "afraid":
      return (
        <g>
          {worriedBrows}
          {wideEyes}
          {/* wavy nervous mouth */}
          <path
            d={`M${-5 * s},${mouthY + 1 * s} Q${-2 * s},${mouthY - 1 * s} 0,${mouthY + 1 * s} Q${2 * s},${mouthY + 3 * s} ${5 * s},${mouthY + 1 * s}`}
            stroke="#fff"
            strokeWidth="1.2"
            fill="none"
          />
        </g>
      );
    case "terrified":
      return (
        <g>
          {angryBrows}
          {wideEyes}
          {/* open screaming mouth */}
          <ellipse
            cx="0"
            cy={mouthY + 2 * s}
            rx={4.5 * s}
            ry={3.5 * s}
            stroke="#fff"
            strokeWidth="1.2"
            fill="none"
          />
        </g>
      );
    case "angry":
      return (
        <g>
          {angryBrows}
          {eyes}
          {/* flat annoyed mouth */}
          <line
            x1={-5 * s}
            y1={mouthY + 2 * s}
            x2={5 * s}
            y2={mouthY + 2 * s}
            stroke="#fff"
            strokeWidth="1.2"
          />
        </g>
      );
    case "explaining":
      return (
        <g>
          {eyes}
          {/* slight confident smile */}
          <path
            d={`M${-4 * s},${mouthY} Q0,${mouthY + 4 * s} ${4 * s},${mouthY}`}
            stroke="#fff"
            strokeWidth="1.2"
            fill="none"
          />
          {/* one raised brow for knowing look */}
          <line
            x1={eyeOff - 3 * s}
            y1={eyeY - 8 * s}
            x2={eyeOff + 3 * s}
            y2={eyeY - 6 * s}
            stroke="#fff"
            strokeWidth="1.2"
          />
        </g>
      );
    case "surprised":
      return (
        <g>
          {raisedBrows}
          <circle
            cx={-eyeOff}
            cy={eyeY}
            r={eyeR * 1.6}
            stroke="#fff"
            strokeWidth="1"
            fill="none"
          />
          <circle cx={-eyeOff} cy={eyeY} r={eyeR * 0.7} fill="#fff" />
          <circle
            cx={eyeOff}
            cy={eyeY}
            r={eyeR * 1.6}
            stroke="#fff"
            strokeWidth="1"
            fill="none"
          />
          <circle cx={eyeOff} cy={eyeY} r={eyeR * 0.7} fill="#fff" />
          {/* small "o" mouth */}
          <ellipse
            cx="0"
            cy={mouthY + 1 * s}
            rx={2.5 * s}
            ry={2 * s}
            stroke="#fff"
            strokeWidth="1.2"
            fill="none"
          />
        </g>
      );
    case "dazed":
      return (
        <g>
          {xEyes}
          {/* wavy dazed mouth */}
          <path
            d={`M${-4 * s},${mouthY + 2 * s} Q0,${mouthY} ${4 * s},${mouthY + 2 * s}`}
            stroke="#fff"
            strokeWidth="1.2"
            fill="none"
          />
        </g>
      );
    default: // neutral
      return (
        <g>
          {eyes}
          {/* flat line mouth */}
          <line
            x1={-4 * s}
            y1={mouthY + 2 * s}
            x2={4 * s}
            y2={mouthY + 2 * s}
            stroke="#fff"
            strokeWidth="1.2"
          />
        </g>
      );
  }
};

// Crude ponytail / long hair for the girl figure
const GirlHair = ({ scale = 1 }: { scale?: number }) => {
  const s = scale;
  return (
    <g>
      {/* single flowing hairline: right side → over top → left side → ponytail */}
      <path
        d={`M${10 * s},${-8 * s} Q${6 * s},${-21 * s} 0,${-22 * s} Q${-6 * s},${-21 * s} ${-10 * s},${-8 * s} Q${-20 * s},${4 * s} ${-16 * s},${14 * s} Q${-14 * s},${20 * s} ${-18 * s},${26 * s}`}
        stroke="#fff"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  );
};

export const StickFigure = ({
  x = 0,
  y = 0,
  facing = 1,
  armAngle = 0,
  label,
  mood = "neutral",
  hair = false,
}: {
  x?: number;
  y?: number;
  facing?: number;
  armAngle?: number;
  label?: string;
  mood?: Mood;
  hair?: boolean;
}) => (
  <g transform={`translate(${x},${y}) scale(${facing},1)`}>
    <circle
      cx="0"
      cy="-52"
      r="12"
      stroke="#fff"
      strokeWidth="2.5"
      fill="none"
    />
    {hair && (
      <g transform="translate(0,-52)">
        <GirlHair />
      </g>
    )}
    <g transform="translate(0,-52)">
      <Face mood={mood} />
    </g>
    <line x1="0" y1="-40" x2="0" y2="-10" stroke="#fff" strokeWidth="2.5" />
    <line
      x1="0"
      y1="-32"
      x2={-18 * Math.cos((armAngle * Math.PI) / 180)}
      y2={-32 + 18 * Math.sin((armAngle * Math.PI) / 180)}
      stroke="#fff"
      strokeWidth="2.5"
    />
    <line
      x1="0"
      y1="-32"
      x2={18 * Math.cos((armAngle * Math.PI) / 180)}
      y2={-32 + 18 * Math.sin((armAngle * Math.PI) / 180)}
      stroke="#fff"
      strokeWidth="2.5"
    />
    <line x1="0" y1="-10" x2="-14" y2="16" stroke="#fff" strokeWidth="2.5" />
    <line x1="0" y1="-10" x2="14" y2="16" stroke="#fff" strokeWidth="2.5" />
    {label && (
      <g transform={`scale(${facing},1)`}>
        <text x="0" y="32" textAnchor="middle" fill="#888" fontSize="11">
          {label}
        </text>
      </g>
    )}
  </g>
);

export const SwimmingFigure = ({
  x = 0,
  y = 0,
  facing = 1,
  mood = "neutral",
  hair = false,
}: {
  x?: number;
  y?: number;
  facing?: number;
  mood?: Mood;
  hair?: boolean;
}) => (
  <g transform={`translate(${x},${y}) scale(${facing},1)`}>
    <circle cx="0" cy="0" r="12" stroke="#fff" strokeWidth="2.5" fill="none" />
    {hair && (
      <g transform="translate(0,0)">
        <GirlHair scale={0.85} />
      </g>
    )}
    <g transform="translate(0,0)">
      <Face mood={mood} scale={0.85} />
    </g>
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

export const Shark = ({ x = 0, y = 0 }: { x?: number; y?: number }) => (
  <g transform={`translate(${x},${y})`}>
    {/* body */}
    <ellipse
      cx="0"
      cy="0"
      rx="28"
      ry="10"
      stroke="#fff"
      strokeWidth="2"
      fill="none"
    />
    {/* dorsal fin */}
    <path
      d="M-4,-10 L-12,-30 L10,-10"
      stroke="#fff"
      strokeWidth="1.5"
      fill="none"
    />
    {/* tail fins */}
    <path
      d="M28,0 L42,-14 L42,14 Z"
      stroke="#fff"
      strokeWidth="1.5"
      fill="none"
    />
    {/* pectoral fin */}
    <path d="M6,10 L10,22 L18,10" stroke="#fff" strokeWidth="1.5" fill="none" />
    {/* eye */}
    <circle
      cx="-16"
      cy="-3"
      r="3"
      stroke="#fff"
      strokeWidth="1.2"
      fill="none"
    />
    <circle cx="-16" cy="-3" r="1.2" fill="#fff" />
    {/* teeth / grin */}
    <path
      d="M-26,4 L-20,1 L-15,4 L-10,1 L-5,4"
      stroke="#fff"
      strokeWidth="1.5"
      fill="none"
    />
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
    <circle
      cx="-18"
      cy="18"
      r="3"
      stroke="#fff"
      strokeWidth="1.5"
      fill="none"
    />
    <circle
      cx="-12"
      cy="10"
      r="5"
      stroke="#fff"
      strokeWidth="1.5"
      fill="none"
    />
    <ellipse
      cx="0"
      cy="-10"
      rx={w / 2}
      ry={h / 2}
      stroke="#fff"
      strokeWidth="2"
      fill="#111"
    />
    {children}
  </g>
);

export const WavyWater = ({
  y = 0,
  width = 800,
}: {
  y?: number;
  width?: number;
}) => {
  const amplitude = 8;
  const wavelength = 80;
  const points: string[] = [];
  for (let x = 0; x <= width; x += 4) {
    points.push(
      `${x},${y + amplitude * Math.sin((x / wavelength) * 2 * Math.PI)}`,
    );
  }
  return (
    <>
      <polyline
        points={points.join(" ")}
        stroke="#4af"
        strokeWidth="2"
        fill="none"
        opacity="0.6"
      />
      <polyline
        points={points
          .map((p) => {
            const [px, py] = p.split(",");
            return `${px},${Number(py) + 20}`;
          })
          .join(" ")}
        stroke="#4af"
        strokeWidth="2"
        fill="none"
        opacity="0.3"
      />
    </>
  );
};

export const Coconut = ({ x = 0, y = 0 }: { x?: number; y?: number }) => (
  <ellipse
    cx={x}
    cy={y}
    rx="10"
    ry="11"
    stroke="#fff"
    strokeWidth="2"
    fill="none"
  />
);

export const PalmTree = ({ x = 0, y = 0 }: { x?: number; y?: number }) => (
  <g transform={`translate(${x},${y})`}>
    <path
      d="M0,0 Q10,-80 4,-160"
      stroke="#fff"
      strokeWidth="4"
      fill="none"
      strokeLinecap="round"
    />
    <path
      d="M4,-160 Q30,-170 40,-150"
      stroke="#fff"
      strokeWidth="2"
      fill="none"
    />
    <path
      d="M4,-160 Q-20,-170 -30,-155"
      stroke="#fff"
      strokeWidth="2"
      fill="none"
    />
    <path
      d="M4,-160 Q0,-185 10,-195"
      stroke="#fff"
      strokeWidth="2"
      fill="none"
    />
    <path
      d="M4,-160 Q20,-180 30,-180"
      stroke="#fff"
      strokeWidth="2"
      fill="none"
    />
    <ellipse
      cx="8"
      cy="-152"
      rx="7"
      ry="8"
      stroke="#fff"
      strokeWidth="2"
      fill="none"
    />
  </g>
);

export const BarChart = ({ x = 0, y = 0 }: { x?: number; y?: number }) => (
  <g transform={`translate(${x},${y})`}>
    <line x1="0" y1="0" x2="0" y2="-100" stroke="#fff" strokeWidth="2" />
    <line x1="0" y1="0" x2="120" y2="0" stroke="#fff" strokeWidth="2" />
    <rect
      x="10"
      y="-78"
      width="40"
      height="78"
      stroke="#fff"
      strokeWidth="2"
      fill="none"
    />
    <text x="30" y="-82" textAnchor="middle" fill="#fff" fontSize="12">
      🥥
    </text>
    <rect
      x="68"
      y="-22"
      width="40"
      height="22"
      stroke="#fff"
      strokeWidth="2"
      fill="none"
    />
    <text x="88" y="-26" textAnchor="middle" fill="#fff" fontSize="12">
      🦈
    </text>
    <text x="30" y="12" textAnchor="middle" fill="#aaa" fontSize="11">
      coconut
    </text>
    <text x="88" y="12" textAnchor="middle" fill="#aaa" fontSize="11">
      shark
    </text>
    <text x="-4" y="-95" textAnchor="end" fill="#aaa" fontSize="11">
      %
    </text>
  </g>
);

export const AngryFish = ({ x = 0, y = 0 }: { x?: number; y?: number }) => (
  <g transform={`translate(${x},${y})`}>
    <ellipse
      cx="0"
      cy="0"
      rx="55"
      ry="28"
      stroke="#fff"
      strokeWidth="2.5"
      fill="none"
    />
    <path
      d="M55,0 L80,-20 L80,20 Z"
      stroke="#fff"
      strokeWidth="2"
      fill="none"
    />
    <circle cx="-30" cy="-8" r="6" stroke="#fff" strokeWidth="2" fill="none" />
    <circle cx="-31" cy="-9" r="2" fill="#fff" />
    <line x1="-36" y1="-16" x2="-24" y2="-20" stroke="#fff" strokeWidth="2.5" />
    <path
      d="M-48,8 L-38,2 L-30,8 L-22,2 L-14,8 L-6,2"
      stroke="#fff"
      strokeWidth="2"
      fill="none"
    />
    <path
      d="M-10,-28 L0,-50 L16,-28"
      stroke="#fff"
      strokeWidth="2"
      fill="none"
    />
    <path d="M0,18 L10,38 L20,18" stroke="#fff" strokeWidth="2" fill="none" />
  </g>
);
