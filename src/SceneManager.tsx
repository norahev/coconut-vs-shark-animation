import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SCENES, LABELS } from "./utils/steps";
import { PortraitContext } from "./utils/portraitContext";

export default function SceneManager() {
  const [step, setStep] = useState(0);
  const [sceneKey, setSceneKey] = useState(0);
  const [portrait, setPortrait] = useState(
    () => window.innerWidth < window.innerHeight
  );

  useEffect(() => {
    const update = () => setPortrait(window.innerWidth < window.innerHeight);
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const advance = () => {
    if (step < SCENES.length - 1) {
      setStep((s) => s + 1);
      setSceneKey((k) => k + 1);
    }
  };

  const goToStep = (i: number) => {
    setStep(i);
    setSceneKey((k) => k + 1);
  };

  const Scene = SCENES[step];

  return (
    <PortraitContext.Provider value={portrait}>
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
        viewBox={portrait ? "0 0 400 600" : "0 0 800 500"}
        width="100%"
        height="100%"
        style={{ maxHeight: "100vh", maxWidth: "100vw" }}
      >
        <AnimatePresence mode="wait">
          <motion.g
            key={sceneKey}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            <Scene />
          </motion.g>
        </AnimatePresence>

        <foreignObject
          x={portrait ? 10 : 20}
          y={4}
          width={portrait ? 380 : 760}
          height={portrait ? 52 : 36}
        >
          <div
            style={{
              textAlign: "center",
              color: "#444",
              fontSize: portrait ? "13px" : "11px",
              fontFamily: "monospace",
              lineHeight: "1.4",
              padding: portrait ? "0 8px" : "8px 8px 0",
              wordBreak: "break-word",
            }}
          >
            {LABELS[step]}
          </div>
        </foreignObject>

        {SCENES.map((_, i) => (
          <circle
            key={i}
            cx={(portrait ? 200 : 400) - (SCENES.length - 1) * 8 + i * 16}
            cy={portrait ? "585" : "485"}
            r="4"
            fill={i === step ? "#fff" : "#444"}
            style={{ cursor: "pointer" }}
            onClick={(e) => { e.stopPropagation(); goToStep(i); }}
          />
        ))}
      </svg>
    </div>
    </PortraitContext.Provider>
  );
}
