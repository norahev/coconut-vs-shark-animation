import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { ComponentType } from "react";
import { usePortrait } from "./portraitContext";
import {
  StickFigure,
  SwimmingFigure,
  Lightbulb,
  Shark,
  BeachUmbrella,
  ThoughtBubble,
  WavyWater,
  Coconut,
  PalmTree,
  BarChart,
  AngryFish,
} from "./designs";

// ─── Intro (Start Screen) ────────────────────────────────────────────────────

const StepIntro = () => {
  const portrait = usePortrait();
  const [phase, setPhase] = useState<"entering" | "settled">("entering");
  const [showCta, setShowCta] = useState(false);

  useEffect(() => {
    // palm+fin finish ~1.6s; settle at 2.2s; CTA at 3.0s
    const t1 = setTimeout(() => setPhase("settled"), 2200);
    const t2 = setTimeout(() => setShowCta(true), 3000);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  // Map favicon (viewBox 0 0 100 100) → scene coords
  const s = portrait ? 2.0 : 2.2;
  const ox = portrait ? 100 : 260;
  const oy = portrait ? 190 : 140;
  const waveY = oy + 80 * s; // l≈316  p≈350
  const ww = portrait ? 400 : 800;

  // Fin shape — enters from off-screen RIGHT, slides left to favicon position
  const finPath = `M ${ox + 20 * s},${oy + 75 * s} C ${ox + 30 * s},${oy + 40 * s} ${ox + 40 * s},${oy + 20 * s} ${ox + 50 * s},${oy + 20 * s} C ${ox + 50 * s},${oy + 40 * s} ${ox + 55 * s},${oy + 60 * s} ${ox + 70 * s},${oy + 75 * s} Z`;
  const finEnterDx = portrait ? 280 : 500;

  // Coconut final position (favicon circle mapped to scene)
  const cX = ox + 80 * s;
  const cY = oy + 35 * s;
  const cR = 14 * s;
  const dotR = 2 * s;
  const dotOffsets: [number, number][] = [
    [(76 - 80) * s, (30 - 35) * s],
    [(85 - 80) * s, (33 - 35) * s],
    [(79 - 80) * s, (40 - 35) * s],
  ];

  const trunkH = portrait ? 260 : 280;
  const palmBaseX = portrait ? 370 : 690; // trunk base, right side of screen
  // Coconut falls straight down from frond top (cX) to favicon position
  const coconutStartY = waveY - trunkH + 28;

  // Single sinusoidal wave
  const wavePoints = Array.from({ length: Math.ceil(ww / 4) + 1 }, (_, i) => {
    const x = i * 4;
    const y = waveY + 8 * Math.sin((x / 80) * 2 * Math.PI);
    return `${x},${y}`;
  }).join(" ");

  const ctaX = portrait ? 200 : 400;
  const ctaY = portrait ? 575 : 465;

  return (
    <g>
      {/* Fin — drawn BEFORE water so wave masks its base */}
      <motion.g
        initial={{ x: finEnterDx }}
        animate={{ x: 0 }}
        transition={{ duration: 1.6, ease: "easeOut" }}
      >
        <path d={finPath} fill="#fff" />
      </motion.g>

      {/* Water wave — drawn ON TOP of fin base; blue → white on settle */}
      <motion.polyline
        points={wavePoints}
        strokeWidth="2.5"
        fill="none"
        animate={{
          stroke: phase === "settled" ? "#ffffff" : "#44aaff",
          opacity: phase === "settled" ? 1.0 : 0.7,
        }}
        transition={{ duration: 0.8 }}
      />

      {/* Palm tree — static, right side; fades out when composition settles */}
      <motion.g
        animate={{ opacity: phase === "settled" ? 0 : 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* trunk — arches from right-side base up-left to above coconut drop point */}
        <path
          d={`M${palmBaseX},${waveY} Q${palmBaseX - 40},${waveY - trunkH * 0.55} ${cX + 4},${waveY - trunkH}`}
          stroke="#fff"
          strokeWidth="5"
          fill="none"
          strokeLinecap="round"
        />
        {/* fronds — fan out from the trunk tip above cX */}
        <path
          d={`M${cX + 4},${waveY - trunkH} Q${cX + 40},${waveY - trunkH - 12} ${cX + 54},${waveY - trunkH + 12}`}
          stroke="#fff"
          strokeWidth="2.5"
          fill="none"
        />
        <path
          d={`M${cX + 4},${waveY - trunkH} Q${cX - 22},${waveY - trunkH - 12} ${cX - 34},${waveY - trunkH + 5}`}
          stroke="#fff"
          strokeWidth="2.5"
          fill="none"
        />
        <path
          d={`M${cX + 4},${waveY - trunkH} Q${cX + 6},${waveY - trunkH - 28} ${cX + 18},${waveY - trunkH - 40}`}
          stroke="#fff"
          strokeWidth="2.5"
          fill="none"
        />
        <path
          d={`M${cX + 4},${waveY - trunkH} Q${cX + 30},${waveY - trunkH - 24} ${cX + 42},${waveY - trunkH - 22}`}
          stroke="#fff"
          strokeWidth="2.5"
          fill="none"
        />
      </motion.g>

      {/* Coconut — falls straight down from frond tip to favicon position */}
      <motion.g
        initial={{ x: cX, y: coconutStartY }}
        animate={{ x: cX, y: cY }}
        transition={{ delay: 1.0, duration: 1.0, ease: "easeIn" }}
      >
        <circle
          cx={0}
          cy={0}
          r={cR}
          stroke="#fff"
          strokeWidth="2"
          fill="none"
        />
        {dotOffsets.map(([dx, dy], i) => (
          <circle key={i} cx={dx} cy={dy} r={dotR} fill="#fff" />
        ))}
      </motion.g>

      {/* CTA — fades in after everything settles */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: showCta ? 1 : 0 }}
        transition={{ duration: 0.6 }}
      >
        <text
          x={ctaX}
          y={ctaY}
          textAnchor="middle"
          fill="#555"
          fontSize="16"
          fontFamily="monospace"
        >
          Click to continue →
        </text>
      </motion.g>
    </g>
  );
};

// ─── Step 0 ───────────────────────────────────────────────────────────────────

const Step0 = () => {
  const portrait = usePortrait();
  const sx = portrait ? 190 : 300;
  const sy = portrait ? 345 : 245;
  const tx = portrait ? 150 : 260;
  const ty = portrait ? 215 : 140;
  const w1y = portrait ? 360 : 260;
  const w2y = portrait ? 390 : 290;
  const ww = portrait ? 400 : 800;
  return (
    <g>
      <WavyWater y={w1y} width={ww} />
      <WavyWater y={w2y} width={ww} />
      <SwimmingFigure x={sx} y={sy} mood="worried" hair />
      <ThoughtBubble x={tx} y={ty} w={90} h={55}>
        <circle
          cx="-24"
          cy="-10"
          r="14"
          stroke="#fff"
          strokeWidth="1.5"
          fill="none"
        />
        <circle cx="-27" cy="-14" r="2" fill="#fff" />
        <circle cx="-21" cy="-14" r="2" fill="#fff" />
        <path
          d="M-29,-4 Q-24,-1 -19,-4"
          stroke="#fff"
          strokeWidth="1.5"
          fill="none"
        />
        <g transform="translate(18,-8) scale(0.38)">
          <Shark />
        </g>
      </ThoughtBubble>
    </g>
  );
};

// ─── Step 1 ───────────────────────────────────────────────────────────────────

const Step1 = () => {
  const portrait = usePortrait();
  // desk/screen positions
  const deskX = portrait ? 110 : 270;
  const deskY = portrait ? 400 : 310;
  const leg1X = portrait ? 130 : 290;
  const leg2X = portrait ? 270 : 430;
  const legY2 = portrait ? 445 : 360;
  const screenX = portrait ? 150 : 310;
  const screenY = portrait ? 330 : 240;
  const screenCX = portrait ? 200 : 360;
  const screenCY = portrait ? 372 : 282;
  const connY2 = deskY + 10;
  const barY = deskY + 10;
  const figX = portrait ? 185 : 280;
  const figY = portrait ? 388 : 295;
  const bulbX = figX;
  const bulbY = portrait ? 283 : 190;
  return (
    <g>
      <rect
        x={deskX}
        y={deskY}
        width="180"
        height="10"
        stroke="#fff"
        strokeWidth="2"
        fill="none"
      />
      <line
        x1={leg1X}
        y1={deskY + 10}
        x2={leg1X}
        y2={legY2}
        stroke="#fff"
        strokeWidth="2"
      />
      <line
        x1={leg2X}
        y1={deskY + 10}
        x2={leg2X}
        y2={legY2}
        stroke="#fff"
        strokeWidth="2"
      />
      <rect
        x={screenX}
        y={screenY}
        width="100"
        height="70"
        stroke="#fff"
        strokeWidth="2"
        fill="none"
      />
      <line
        x1={screenCX}
        y1={screenY + 70}
        x2={screenCX}
        y2={connY2}
        stroke="#fff"
        strokeWidth="2"
      />
      <line
        x1={screenCX - 20}
        y1={barY}
        x2={screenCX + 20}
        y2={barY}
        stroke="#fff"
        strokeWidth="2"
      />
      <text
        x={screenCX}
        y={screenCY}
        textAnchor="middle"
        fill="#fff"
        fontSize="13"
        fontFamily="monospace"
      >
        MALDIVES
      </text>
      <StickFigure x={figX} y={figY} label="me" mood="idea" hair />
      <motion.g
        initial={{ opacity: 0, scale: 0.4 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, type: "spring" }}
      >
        <Lightbulb x={bulbX} y={bulbY} />
      </motion.g>
    </g>
  );
};

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
        <motion.g
          key="fin"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <g transform="translate(-4,2) scale(0.55)">
            <Shark />
          </g>
        </motion.g>
      ) : (
        <motion.g
          key="umbrella"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <BeachUmbrella x={0} y={0} />
        </motion.g>
      )}
    </AnimatePresence>
  );
};

// ─── Step 2 ───────────────────────────────────────────────────────────────────

const Step2 = () => {
  const portrait = usePortrait();
  const girlX = portrait ? 130 : 220;
  const girlY = portrait ? 420 : 310;
  const tbX = portrait ? 165 : 255;
  const tbY = portrait ? 280 : 170;
  const guyX = portrait ? 270 : 480;
  return (
    <g>
      <StickFigure x={girlX} y={girlY} label="me" mood="happy" hair />
      <ThoughtBubble x={tbX} y={tbY} w={130} h={85}>
        <g transform="translate(0,-12)">
          <TogglingHeadIcon />
        </g>
      </ThoughtBubble>
      <motion.g
        animate={{ x: [0, -3, 3, -3, 3, 0] }}
        transition={{ duration: 0.4, repeat: Infinity, ease: "linear" }}
      >
        <StickFigure
          x={guyX}
          y={girlY}
          facing={-1}
          label="hubby"
          mood="afraid"
        />
      </motion.g>
    </g>
  );
};

// ─── Step 3 ───────────────────────────────────────────────────────────────────

const Step3 = () => {
  const portrait = usePortrait();
  const girlX = portrait ? 130 : 220;
  const girlY = portrait ? 420 : 310;
  const bulbX = portrait ? 130 : 220;
  const bulbY = portrait ? 310 : 203;
  const guyX = portrait ? 270 : 480;
  return (
    <g>
      <StickFigure x={girlX} y={girlY} label="me" mood="idea" hair />
      <motion.g
        initial={{ opacity: 0, scale: 0.3 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", delay: 0.2 }}
      >
        <Lightbulb x={bulbX} y={bulbY} />
      </motion.g>
      <motion.g
        animate={{ x: [0, -3, 3, -3, 3, 0] }}
        transition={{ duration: 0.4, repeat: Infinity, ease: "linear" }}
      >
        <StickFigure
          x={guyX}
          y={girlY}
          facing={-1}
          label="hubby"
          mood="afraid"
        />
      </motion.g>
    </g>
  );
};

// ─── Step 4 ───────────────────────────────────────────────────────────────────

const Step4 = () => {
  const portrait = usePortrait();
  const palmX = portrait ? 80 : 200;
  const palmY = portrait ? 490 : 390;
  const figX = portrait ? 100 : 220;
  const figY = portrait ? 475 : 375;
  const coconutX = portrait ? 98 : 218;
  const coconutY = portrait ? 400 : 300;
  // star halo center: head = figY - 52, halo 15px above head
  const starCX = figX;
  const starCY = figY - 52 - 15;
  const chartTranslate = portrait
    ? `translate(210,490) scale(1.2)`
    : `translate(455,390) scale(1.4)`;
  const chartLabelX = portrait ? 280 : 539;
  const chartLabelY = portrait ? 330 : 228;
  return (
    <g>
      <PalmTree x={palmX} y={palmY} />
      <StickFigure x={figX} y={figY} mood="dazed" hair />
      <motion.g
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeIn", delay: 0.3 }}
      >
        <Coconut x={coconutX} y={coconutY} />
      </motion.g>
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.3 }}
      >
        {/* Orbit center above the head — rx=22 ry=7 gives a flat 3-D halo */}
        <g transform={`translate(${starCX},${starCY})`}>
          <motion.text
            textAnchor="middle"
            dominantBaseline="central"
            fill="#ff0"
            fontSize="11"
            animate={{
              x: [22, 19, 11, 0, -11, -19, -22, -19, -11, 0, 11, 19, 22],
              y: [0, 4, 6, 7, 6, 4, 0, -4, -6, -7, -6, -4, 0],
            }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: "linear",
              delay: 0.9,
            }}
          >
            ✦
          </motion.text>
          <motion.text
            textAnchor="middle"
            dominantBaseline="central"
            fill="#ff0"
            fontSize="11"
            animate={{
              x: [-11, -19, -22, -19, -11, 0, 11, 19, 22, 19, 11, 0, -11],
              y: [6, 4, 0, -4, -6, -7, -6, -4, 0, 4, 6, 7, 6],
            }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: "linear",
              delay: 0.9,
            }}
          >
            ✦
          </motion.text>
          <motion.text
            textAnchor="middle"
            dominantBaseline="central"
            fill="#ff0"
            fontSize="11"
            animate={{
              x: [-11, 0, 11, 19, 22, 19, 11, 0, -11, -19, -22, -19, -11],
              y: [-6, -7, -6, -4, 0, 4, 6, 7, 6, 4, 0, -4, -6],
            }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: "linear",
              delay: 0.9,
            }}
          >
            ✦
          </motion.text>
        </g>
      </motion.g>
      <motion.g
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <g transform={chartTranslate}>
          <BarChart x={0} y={0} />
        </g>
        <text
          x={chartLabelX}
          y={chartLabelY}
          textAnchor="middle"
          fill="#aaa"
          fontSize="14"
          fontFamily="monospace"
        >
          Death by...
        </text>
      </motion.g>
    </g>
  );
};

// ─── Step 5 ───────────────────────────────────────────────────────────────────

const Step5 = () => {
  const portrait = usePortrait();
  const girlX = portrait ? 130 : 220;
  const girlY = portrait ? 430 : 340;
  const tbX = portrait ? 130 : 220;
  const tbY = portrait ? 275 : 200;
  const guyX = portrait ? 270 : 490;
  // pointing line
  const lineX1 = portrait ? 240 : 460;
  const lineY1 = portrait ? girlY - 32 : 308;
  const lineX2 = portrait ? 170 : 310;
  const lineY2 = portrait ? girlY - 20 : 320;
  // thought bubbles above hubby
  const tb1X = portrait ? 320 : 560;
  const tb1Y = portrait ? 335 : 240;
  const tb2X = portrait ? 360 : 620;
  const tb2Y = portrait ? 275 : 185;
  return (
    <g>
      <StickFigure
        x={girlX}
        y={girlY}
        label="me"
        mood="explaining"
        armAngle={-30}
        hair
      />
      <ThoughtBubble x={tbX} y={tbY} w={130} h={90}>
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
        <StickFigure
          x={guyX}
          y={girlY}
          facing={-1}
          label="hubby"
          mood="angry"
          armAngle={-50}
        />
      </motion.g>
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <line
          x1={lineX1}
          y1={lineY1}
          x2={lineX2}
          y2={lineY2}
          stroke="#fff"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </motion.g>
      <motion.g
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <ThoughtBubble x={tb1X} y={tb1Y} w={50} h={36}>
          <Coconut x={0} y={-10} />
        </ThoughtBubble>
      </motion.g>
      <motion.g
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.65 }}
      >
        <ThoughtBubble x={tb2X} y={tb2Y} w={50} h={36}>
          <g transform="translate(-4,-10) scale(0.42)">
            <Shark />
          </g>
        </ThoughtBubble>
      </motion.g>
    </g>
  );
};

// ─── Step 6 ───────────────────────────────────────────────────────────────────

const Step6 = () => {
  const portrait = usePortrait();
  const [phase, setPhase] = useState<0 | 1 | 2>(0);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 2000);
    const t2 = setTimeout(() => setPhase(2), 3500);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  const mood: "happy" | "surprised" | "terrified" =
    phase === 0 ? "happy" : phase === 1 ? "surprised" : "terrified";

  // landscape vs portrait positions
  const w1y = portrait ? 360 : 290;
  const w2y = portrait ? 385 : 315;
  const ww = portrait ? 400 : 900;
  const girlX = portrait ? 130 : 280;
  const girlY = portrait ? 340 : 270;
  const guyX = portrait ? 210 : 380;
  const guyY = portrait ? 338 : 268;
  const fleeX = portrait ? -400 : -900;
  // fish: base position + phase offsets
  const fishBaseX = portrait ? 350 : 750;
  const fishY = portrait ? 345 : 280;
  const fishPhase0X = portrait ? 200 : 400;
  const fishPhase1X = portrait ? -100 : -150;
  const fishPhase2X = portrait ? -150 : -350;
  const captionX = portrait ? 200 : 400;
  const captionY = portrait ? 560 : 420;

  return (
    <g>
      <WavyWater y={w1y} width={ww} />
      <WavyWater y={w2y} width={ww} />

      {/* Girl swimmer */}
      <motion.g
        animate={{ x: phase === 2 ? fleeX : 0 }}
        transition={{ duration: 2.5, ease: "easeIn" }}
      >
        <SwimmingFigure x={girlX} y={girlY} facing={-1} mood={mood} hair />
      </motion.g>

      {/* Guy swimmer */}
      <motion.g
        animate={{ x: phase === 2 ? fleeX : 0 }}
        transition={{ duration: 2.2, ease: "easeIn" }}
      >
        <SwimmingFigure x={guyX} y={guyY} facing={-1} mood={mood} />
      </motion.g>

      {/* Triggerfish */}
      <motion.g
        animate={{
          x:
            phase === 0 ? fishPhase0X : phase === 1 ? fishPhase1X : fishPhase2X,
        }}
        transition={{
          duration: phase === 0 ? 0 : phase === 1 ? 1.5 : 2,
          ease: "easeOut",
        }}
      >
        <motion.g
          animate={phase === 2 ? { y: [0, -8, 0, -8, 0] } : { y: 0 }}
          transition={
            phase === 2
              ? { duration: 3, repeat: Infinity, ease: "easeInOut", delay: 2 }
              : {}
          }
        >
          <AngryFish x={fishBaseX} y={fishY} />
        </motion.g>
      </motion.g>

      <motion.g
        animate={{ opacity: phase >= 1 ? 1 : 0 }}
        transition={{ duration: 0.6 }}
      >
        <text
          x={captionX}
          y={captionY}
          textAnchor="middle"
          fill="#555"
          fontSize="14"
          fontFamily="monospace"
        >
          Triggerfish: `Didn't she say I was coming?!`
        </text>
      </motion.g>
    </g>
  );
};

// ─── Exports ──────────────────────────────────────────────────────────────────

export const LABELS: string[] = [
  "",
  "Swimming in the ocean, hoping to finally see a shark...",
  "Got a better idea — let's go to the Maldives, where the sharks live!",
  "Pitching the trip, hubby is scared of sharks",
  "Thinking about a solution... Let's convince him with some data!",
  "Coconut vs Shark statistics, this should convince him... right?",
  "NOT what  I expected... now scared of fins and fruits alike. Let's cross fingers!",
  "PS: he doesn't even know about the triggerfish nesting season waiting for us!",
];

export const SCENES: ComponentType[] = [
  StepIntro,
  Step0,
  Step1,
  Step2,
  Step3,
  Step4,
  Step5,
  Step6,
];
