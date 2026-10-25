import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import { serifFont, monoFont } from '../utils/fonts';

export const Scene7Moral: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Three slams:
  // 1. "ZERO TESTS." at frame 0
  const slam1 = spring({ frame, fps, config: { damping: 9, mass: 0.5 } });
  // 2. "NO STAGING." at frame 18
  const slam2 = spring({
    frame: frame - 18,
    fps,
    config: { damping: 9, mass: 0.5 },
  });
  // 3. "PURE CONFIDENCE." at frame 36
  const slam3 = spring({
    frame: frame - 36,
    fps,
    config: { damping: 9, mass: 0.5 },
  });

  // Outro text at frame 45
  const outroSpring = spring({
    frame: frame - 45,
    fps,
    config: { damping: 12 },
  });

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
        fontFamily: serifFont,
      }}
    >
      {/* Top Banner */}
      <div
        style={{
          position: 'absolute',
          top: 120,
          textAlign: 'center',
          letterSpacing: '10px',
          fontSize: 22,
          color: '#a1a1aa',
          fontFamily: monoFont,
          textTransform: 'uppercase',
          borderBottom: '1px solid rgba(255,255,255,0.15)',
          paddingBottom: 10,
        }}
      >
        [ THE THREE PILLARS OF DISASTER ]
      </div>

      {/* The 3 Slams */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 24,
          textAlign: 'center',
          width: '100%',
        }}
      >
        {/* 1. ZERO TESTS. (White) */}
        <div
          style={{
            fontSize: 72,
            fontWeight: 900,
            letterSpacing: '6px',
            color: '#ffffff',
            textTransform: 'uppercase',
            opacity: slam1,
            transform: `scale(${interpolate(slam1, [0, 1], [1.8, 1])})`,
            textShadow: '0 0 40px rgba(255, 255, 255, 0.7)',
          }}
        >
          ZERO TESTS.
        </div>

        {/* 2. NO STAGING. (Amber) */}
        {frame >= 18 && (
          <div
            style={{
              fontSize: 72,
              fontWeight: 900,
              letterSpacing: '6px',
              color: '#f59e0b',
              textTransform: 'uppercase',
              opacity: slam2,
              transform: `scale(${interpolate(slam2, [0, 1], [1.8, 1])})`,
              textShadow: '0 0 50px rgba(245, 158, 11, 0.8)',
            }}
          >
            NO STAGING.
          </div>
        )}

        {/* 3. PURE CONFIDENCE. (Red) */}
        {frame >= 36 && (
          <div
            style={{
              fontSize: 72,
              fontWeight: 900,
              letterSpacing: '6px',
              color: '#ef4444',
              textTransform: 'uppercase',
              opacity: slam3,
              transform: `scale(${interpolate(slam3, [0, 1], [1.8, 1])})`,
              textShadow: '0 0 50px rgba(239, 68, 68, 0.9)',
            }}
          >
            PURE CONFIDENCE.
          </div>
        )}
      </div>

      {/* HAPPY WEEKEND & Post-Mortem */}
      {frame >= 45 && (
        <div
          style={{
            position: 'absolute',
            bottom: 150,
            left: 80,
            right: 80,
            textAlign: 'center',
            opacity: outroSpring,
            transform: `scale(${interpolate(outroSpring, [0, 1], [0.85, 1])})`,
          }}
        >
          <div
            style={{
              fontSize: 42,
              fontWeight: 900,
              letterSpacing: '6px',
              color: '#10b981',
              textTransform: 'uppercase',
              textShadow: '0 0 35px rgba(16, 185, 129, 0.7)',
            }}
          >
            HAPPY WEEKEND, DEVELOPERS.
          </div>

          <div
            style={{
              fontSize: 26,
              color: '#a1a1aa',
              letterSpacing: '3px',
              marginTop: 18,
              fontFamily: monoFont,
            }}
          >
            See you at Monday&apos;s post-mortem.
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};
