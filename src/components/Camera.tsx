import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  random,
  useCurrentFrame,
} from 'remotion';

// Key hit impact frames across the 600-frame timeline
export const IMPACT_FRAMES = [
  0,    // Scene 1 Slam
  140,  // Scene 2 Enter command hit
  150,  // Scene 3 Quote Part 1
  185,  // Scene 3 Quote Part 2
  240,  // Scene 4 Countdown "3"
  265,  // Scene 4 Countdown "2"
  290,  // Scene 4 Countdown "1"
  310,  // Scene 5 Atomic Blast Detonation
  430,  // Scene 6 PagerDuty SEV-0 hit
  460,  // Scene 6 Support Twitter on fire
  485,  // Scene 6 CTO panic hit
  510,  // Scene 6 Lead DBA test.sql hit
  540,  // Scene 7 "ZERO TESTS."
  560,  // Scene 7 "NO STAGING."
  580,  // Scene 7 "PURE CONFIDENCE."
];

export const Camera: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const frame = useCurrentFrame();

  // 1. Continuous Slow Push-In (1.00 -> 1.07)
  const pushIn = interpolate(frame, [0, 600], [1.0, 1.07], {
    extrapolateRight: 'clamp',
  });

  // 2. Exponentially Decaying Seeded Shake on Impacts
  let currentShake = 0;
  let isImpactFlash = 0;
  let isChromatic = false;

  for (const hit of IMPACT_FRAMES) {
    const elapsed = frame - hit;
    if (elapsed >= 0 && elapsed <= 25) {
      // Exponential decay
      const decay = Math.exp(-elapsed * 0.22);
      const intensity = hit === 310 ? 32 : 14; // Blast is larger
      currentShake = Math.max(currentShake, intensity * decay);

      // 2-frame impact flash
      if (elapsed === 0) isImpactFlash = Math.max(isImpactFlash, 0.9);
      else if (elapsed === 1) isImpactFlash = Math.max(isImpactFlash, 0.45);

      // Chromatic aberration for 3 frames
      if (elapsed <= 3) isChromatic = true;
    }
  }

  const shakeX = (random(`cam-shake-x-${frame}`) * 2 - 1) * currentShake;
  const shakeY = (random(`cam-shake-y-${frame}`) * 2 - 1) * currentShake;

  const chromaticStyle: React.CSSProperties = isChromatic
    ? {
        filter:
          'drop-shadow(-4px 0px 0px rgba(239, 68, 68, 0.75)) drop-shadow(4px 0px 0px rgba(6, 182, 212, 0.75))',
      }
    : {};

  return (
    <AbsoluteFill
      style={{
        transform: `scale(${pushIn}) translate(${shakeX}px, ${shakeY}px)`,
        transformOrigin: '50% 50%',
        ...chromaticStyle,
      }}
    >
      {children}

      {/* 2-Frame Impact Flash Overlay */}
      {isImpactFlash > 0 && (
        <AbsoluteFill
          style={{
            backgroundColor: '#ffffff',
            opacity: isImpactFlash,
            pointerEvents: 'none',
            zIndex: 9999,
          }}
        />
      )}
    </AbsoluteFill>
  );
};
