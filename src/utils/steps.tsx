import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { ComponentType } from "react";
import {
  StickFigure,
  SwimmingFigure,
  Lightbulb,
  SharkFin,
  BeachUmbrella,
  ThoughtBubble,
  WavyWater,
  Coconut,
  PalmTree,
  BarChart,
  AngryFish,
} from "./designs";

// ─── Step 0 ───────────────────────────────────────────────────────────────────

const Step0 = () => (
  <g>
    <WavyWater y={260} width={800} />
    <WavyWater y={290} width={800} />
    <SwimmingFigure x={300} y={245} mood="worried" hair />
    <ThoughtBubble x={260} y={140} w={90} h={55}>
      <circle cx="-24" cy="-10" r="14" stroke="#fff" strokeWidth="1.5" fill="none" />
      <circle cx="-27" cy="-14" r="2" fill="#fff" />
      <circle cx="-21" cy="-14" r="2" fill="#fff" />
      <path d="M-29,-4 Q-24,-1 -19,-4" stroke="#fff" strokeWidth="1.5" fill="none" />
      <path d="M12,-2 L6,-22 L18,-2 Z" stroke="#fff" strokeWidth="1.5" fill="none" />
    </ThoughtBubble>
    <text x="400" y="430" textAnchor="middle" fill="#555" fontSize="16" fontFamily="monospace">
      Click to continue →
    </text>
  </g>
);

// ─── Step 1 ───────────────────────────────────────────────────────────────────

const Step1 = () => (
  <g>
    <rect x="270" y="310" width="180" height="10" stroke="#fff" strokeWidth="2" fill="none" />
    <line x1="290" y1="320" x2="290" y2="360" stroke="#fff" strokeWidth="2" />
    <line x1="430" y1="320" x2="430" y2="360" stroke="#fff" strokeWidth="2" />
    <rect x="310" y="240" width="100" height="70" stroke="#fff" strokeWidth="2" fill="none" />
    <line x1="360" y1="310" x2="360" y2="320" stroke="#fff" strokeWidth="2" />
    <line x1="340" y1="320" x2="380" y2="320" stroke="#fff" strokeWidth="2" />
    <text x="360" y="282" textAnchor="middle" fill="#fff" fontSize="13" fontFamily="monospace">MALDIVES</text>
    <StickFigure x={280} y={295} label="her" mood="idea" hair />
    <motion.g
      initial={{ opacity: 0, scale: 0.4 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.4, type: "spring" }}
    >
      <Lightbulb x={280} y={215} />
    </motion.g>
  </g>
);

// ─── Toggling icon (used in Step 2) ──────────────────────────────────────────

const TogglingHeadIcon = () => {
  const [showFin, setShowFin] = useState(true);
  useEffect(() => {
    const t = setInterval(() => setShowFin((v) => !v), 900);
    return () => clearInterval(t);
  }, []);
  return (
    <AnimatePresence mode="wait">
      {showFin ? (
        <motion.g key="fin" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <SharkFin x={0} y={0} />
        </motion.g>
      ) : (
        <motion.g key="umbrella" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <BeachUmbrella x={0} y={0} />
        </motion.g>
      )}
    </AnimatePresence>
  );
};

// ─── Step 2 ───────────────────────────────────────────────────────────────────

const Step2 = () => (
  <g>
    <StickFigure x={220} y={310} label="her" />
    <g transform="translate(220,228)">
      <TogglingHeadIcon />
    </g>
    <motion.g
      animate={{ x: [0, -3, 3, -3, 3, 0] }}
      transition={{ duration: 0.4, repeat: Infinity, ease: "linear" }}
    >
      <StickFigure x={480} y={310} facing={-1} label="him" mood="afraid" />
    </motion.g>
  </g>
);

// ─── Step 3 ───────────────────────────────────────────────────────────────────

const Step3 = () => (
  <g>
    <StickFigure x={220} y={310} label="her" mood="idea" hair />
    <motion.g
      initial={{ opacity: 0, scale: 0.3 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", delay: 0.2 }}
    >
      <Lightbulb x={220} y={228} />
    </motion.g>
    <motion.g
      animate={{ x: [0, -3, 3, -3, 3, 0] }}
      transition={{ duration: 0.4, repeat: Infinity, ease: "linear" }}
    >
      <StickFigure x={480} y={310} facing={-1} label="him" mood="afraid" />
    </motion.g>
  </g>
);

// ─── Step 4 ───────────────────────────────────────────────────────────────────

const Step4 = () => (
  <g>
    <PalmTree x={200} y={390} />
    <StickFigure x={220} y={375} mood="dazed" hair />
    <motion.g
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeIn", delay: 0.3 }}
    >
      <Coconut x={218} y={300} />
    </motion.g>
    <motion.g
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 1, 0, 1, 0] }}
      transition={{ delay: 0.9, duration: 0.6 }}
    >
      <text x="240" y="295" fill="#ff0" fontSize="16">✦✦✦</text>
    </motion.g>
    <motion.g
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.5, duration: 0.5 }}
    >
      <BarChart x={490} y={380} />
      <text x="550" y="200" textAnchor="middle" fill="#aaa" fontSize="12" fontFamily="monospace">
        Death by...
      </text>
    </motion.g>
  </g>
);

// ─── Step 5 ───────────────────────────────────────────────────────────────────

const Step5 = () => (
  <g>
    <StickFigure x={220} y={340} label="her" mood="explaining" armAngle={-30} hair />
    <ThoughtBubble x={220} y={200} w={130} h={90}>
      <g transform="translate(-30,10) scale(0.35)">
        <PalmTree x={0} y={0} />
      </g>
      <g transform="translate(10,-20) scale(0.32)">
        <BarChart x={0} y={0} />
      </g>
    </ThoughtBubble>
    <motion.g
      initial={{ x: 3 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.3 }}
    >
      <StickFigure x={490} y={340} facing={-1} label="him" mood="angry" armAngle={-50} />
    </motion.g>
    <motion.g
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
    >
      <line x1="460" y1="308" x2="310" y2="320" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" />
    </motion.g>
    <motion.g initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
      <ThoughtBubble x={560} y={240} w={50} h={36}>
        <Coconut x={0} y={-10} />
      </ThoughtBubble>
    </motion.g>
    <motion.g initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.65 }}>
      <ThoughtBubble x={620} y={185} w={50} h={36}>
        <SharkFin x={0} y={-4} />
      </ThoughtBubble>
    </motion.g>
  </g>
);

// ─── Step 6 ───────────────────────────────────────────────────────────────────

const Step6 = () => (
  <g>
    <WavyWater y={290} width={900} />
    <WavyWater y={315} width={900} />
    <motion.g
      initial={{ x: 0 }}
      animate={{ x: -900 }}
      transition={{ duration: 2, ease: "easeIn", delay: 1.2 }}
    >
      <SwimmingFigure x={280} y={270} facing={-1} mood="terrified" hair />
    </motion.g>
    <motion.g
      initial={{ x: 0 }}
      animate={{ x: -900 }}
      transition={{ duration: 1.8, ease: "easeIn", delay: 1.0 }}
    >
      <SwimmingFigure x={380} y={268} facing={-1} mood="terrified" />
    </motion.g>
    <motion.g
      initial={{ x: 300 }}
      animate={{ x: -900 }}
      transition={{ duration: 2.5, ease: "easeIn", delay: 0 }}
    >
      <AngryFish x={750} y={275} />
    </motion.g>
    <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
      <text x="400" y="420" textAnchor="middle" fill="#555" fontSize="14" fontFamily="monospace">
        a triggerfish enters the chat
      </text>
    </motion.g>
  </g>
);

// ─── Exports ──────────────────────────────────────────────────────────────────

export const LABELS: string[] = [
  "Step 0 — Swimming with worries",
  "Step 1 — A brilliant idea",
  "Step 2 — Pitching the trip",
  "Step 3 — Another idea forms",
  "Step 4 — Coconut vs Shark statistics",
  "Step 5 — The explanation",
  "Step 6 — Nature disagrees",
];

export const SCENES: ComponentType[] = [Step0, Step1, Step2, Step3, Step4, Step5, Step6];
