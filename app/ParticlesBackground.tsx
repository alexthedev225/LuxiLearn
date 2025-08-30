"use client";

import { useCallback } from "react";
import Particles from "@tsparticles/react";
import { loadFull } from "tsparticles";

export default function ParticlesBackground() {
  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        fullScreen: false,
        background: { color: { value: "transparent" } },
        particles: {
          number: { value: 50, density: { enable: true, area: 800 } },
          color: { value: ["#A855F7", "#F43F5E", "#EC4899"] },
          shape: { type: "circle" },
          opacity: { value: 0.3 },
          size: { value: { min: 3, max: 7 } },
          move: {
            enable: true,
            speed: 1.5,
            direction: "none",
            outModes: "bounce",
          },
        },
        interactivity: {
          events: {
            onHover: { enable: true, mode: "repulse" },
            onClick: { enable: true, mode: "push" },
          },
          modes: { repulse: { distance: 100 }, push: { quantity: 4 } },
        },
        detectRetina: true,
      }}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  );
}
