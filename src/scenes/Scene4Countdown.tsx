import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  Audio,
  staticFile,
} from 'remotion';
import { serifFont, monoFont } from '../utils/fonts';

export const Scene4Countdown: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // The last 12 frames (frames 58 to 70, global frames 298 to 310) are HARD CUT TO BLACK + SILENCE!
  const isDeadSilence = frame >= 58;

  // Numbers:
  // 3: frame 0 to 25
  // 2: frame 25 to 50
  // 1: frame 50 to 58
  let currentNum = '3';
  let numRelFrame = frame;

  if (frame >= 25 && frame < 50) {
    currentNum = '2';
    numRelFrame = frame - 25;
  } else if (frame >= 50 && frame < 58) {
    currentNum = '1';
    numRelFrame = frame - 50;
  }

  // Slam spring for each number
  const numSpring = spring({
    frame: numRelFrame,
    fps,
    config: { damping: 9, mass: 0.5, stiffness: 260 },
  });

  const numScale = interpolate(numSpring, [0, 1], [2.2, 1.0]);

  // Expanding shock ring pulse
  const ringRadius = interpolate(numRelFrame, [0, 25], [60, 480], {
    extrapolateRight: 'clamp',
  });
  const ringAlpha = interpolate(numRelFrame, [0, 6, 25], [0.9, 0.7, 0], {
    extrapolateRight: 'clamp',
  });

  if (isDeadSilence) {
    // Hard cut to black + total silence right before blast
    return (
      <AbsoluteFill
        style={{
          backgroundColor: '#000000',
        }}
      />
    );
  }

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#050203',
        color: '#f4f4f5',
        overflow: 'hidden',
        padding: 80,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: monoFont,
      }}
    >
      {/* Riser Audio (stops before frame 58 to ensure 12 frames of dead silence) */}
      {frame === 0 && (
        <Audio src={staticFile('sfx/riser.wav')} volume={0.9} />
      )}

      {/* Expanding Ring Pulse */}
      <div
        style={{
          position: 'absolute',
          width: ringRadius * 2,
          height: ringRadius * 2,
          borderRadius: '50%',
          border: `6px solid rgba(239, 68, 68, ${ringAlpha})`,
          boxShadow: `0 0 40px rgba(239, 68, 68, ${ringAlpha})`,
          pointerEvents: 'none',
        }}
      />

      {/* Top Header */}
      <div
        style={{
          position: 'absolute',
          top: 120,
          textAlign: 'center',
          letterSpacing: '8px',
          fontSize: 26,
          color: '#ef4444',
          fontWeight: 800,
        }}
      >
        [ WARNING: POINT OF NO RETURN ]
      </div>

      {/* Massive Slam Number */}
      <div
        style={{
          fontSize: 320,
          fontWeight: 900,
          color: currentNum === '1' ? '#ef4444' : '#f59e0b',
          textShadow:
            '0 0 90px rgba(239, 68, 68, 0.9), 0 0 35px rgba(245, 158, 11, 0.9)',
          transform: `scale(${numScale})`,
          fontFamily: serifFont,
          lineHeight: 1,
        }}
      >
        {currentNum}
      </div>

      {/* Underneath: DETONATION SEQUENCE */}
      <div
        style={{
          marginTop: 40,
          fontSize: 44,
          fontWeight: 900,
          letterSpacing: '14px',
          color: '#ffffff',
          textTransform: 'uppercase',
          textAlign: 'center',
          borderTop: '2px solid rgba(239, 68, 68, 0.5)',
          borderBottom: '2px solid rgba(239, 68, 68, 0.5)',
          padding: '16px 36px',
          backgroundColor: 'rgba(239, 68, 68, 0.1)',
        }}
      >
        DETONATION SEQUENCE
      </div>

      {/* Telemetry bottom indicators */}
      <div
        style={{
          position: 'absolute',
          bottom: 140,
          left: 80,
          right: 80,
          display: 'flex',
          justifyContent: 'space-between',
          fontSize: 22,
          color: '#a1a1aa',
          borderTop: '1px solid #27272a',
          paddingTop: 16,
        }}
      >
        <div>STAGE: SYNCHRONIZED</div>
        <div style={{ color: '#ef4444' }}>ABORT CODE: INVALID (404)</div>
      </div>
    </AbsoluteFill>
  );
};
