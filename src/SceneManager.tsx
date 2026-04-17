import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SCENES, LABELS } from "./utils/steps";

export default function SceneManager() {
  const [step, setStep] = useState(0);

  const advance = () => setStep((s) => Math.min(s + 1, SCENES.length - 1));

  const Scene = SCENES[step];

  return (
    <div
      onClick={advance}
      style={{
        width: "100vw",
        height: "100vh",
        background: "#111",
        cursor: step < SCENES.length - 1 ? "pointer" : "default",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        userSelect: "none",
      }}
    >
      <svg
        viewBox="0 0 800 500"
        width="100%"
        height="100%"
        style={{ maxHeight: "100vh", maxWidth: "100vw" }}
      >
        <AnimatePresence mode="wait">
          <motion.g
            key={step}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            <Scene />
          </motion.g>
        </AnimatePresence>

        <text
          x="400"
          y="24"
          textAnchor="middle"
          fill="#444"
          fontSize="11"
          fontFamily="monospace"
        >
          {LABELS[step]}
        </text>

        {SCENES.map((_, i) => (
          <circle
            key={i}
            cx={400 - (SCENES.length - 1) * 8 + i * 16}
            cy="485"
            r="4"
            fill={i === step ? "#fff" : "#444"}
          />
        ))}
      </svg>
    </div>
  );
}
