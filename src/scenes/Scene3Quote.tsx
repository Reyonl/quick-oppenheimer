import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import { serifFont, monoFont } from '../utils/fonts';

export const Scene3Quote: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Part 1: "Now I am become Developer,"
  const part1Spring = spring({
    frame,
    fps,
    config: { damping: 14, mass: 1 },
  });

  // Part 2: (beat) "the Destroyer of Production." (frame 35+)
  const part2Spring = spring({
    frame: frame - 35,
    fps,
    config: { damping: 12, mass: 1.1 },
  });

  // Attribution (frame 55+)
  const attrSpring = spring({
    frame: frame - 55,
    fps,
    config: { damping: 14 },
  });

  // Slow ambient glow scale
  const glowScale = interpolate(frame, [0, 90], [0.8, 1.4], {
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#020203',
        color: '#f4f4f5',
        overflow: 'hidden',
        padding: 80,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Background Amber Core Glow */}
      <div
        style={{
          position: 'absolute',
          width: 800,
          height: 800,
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(245, 158, 11, 0.22) 0%, rgba(239, 68, 68, 0.08) 50%, transparent 70%)',
          filter: 'blur(70px)',
          transform: `scale(${glowScale})`,
          pointerEvents: 'none',
        }}
      />

      {/* Top Header */}
      <div
        style={{
          position: 'absolute',
          top: 100,
          letterSpacing: '12px',
          fontSize: 22,
          color: '#a1a1aa',
          fontFamily: monoFont,
          textTransform: 'uppercase',
          borderBottom: '1px solid rgba(255, 255, 255, 0.15)',
          paddingBottom: 12,
        }}
      >
        [ TRINITY MEMORANDUM // 1945 ]
      </div>

      {/* Center Serif Quote Container */}
      <div
        style={{
          width: '100%',
          textAlign: 'center',
          fontFamily: serifFont,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 36,
          zIndex: 10,
        }}
      >
        {/* Line 1 */}
        <div
          style={{
            fontSize: 56,
            letterSpacing: '8px',
            color: '#e4e4e7',
            opacity: part1Spring,
            transform: `scale(${interpolate(part1Spring, [0, 1], [0.85, 1])})`,
            lineHeight: 1.3,
            textTransform: 'none',
          }}
        >
          &ldquo;Now I am become Developer,&rdquo;
        </div>

        {/* Line 2 (The punchline in glowing amber) */}
        {frame >= 35 && (
          <div
            style={{
              fontSize: 78,
              fontWeight: 900,
              letterSpacing: '6px',
              color: '#f59e0b',
              textShadow:
                '0 0 60px rgba(245, 158, 11, 0.85), 0 0 25px rgba(239, 68, 68, 0.9)',
              opacity: part2Spring,
              transform: `scale(${interpolate(part2Spring, [0, 1], [0.8, 1])})`,
              lineHeight: 1.15,
              textTransform: 'uppercase',
            }}
          >
            The Destroyer
            <br />
            <span style={{ color: '#ef4444' }}>of Production.</span>
          </div>
        )}

        {/* Attribution */}
        {frame >= 55 && (
          <div
            style={{
              fontSize: 30,
              letterSpacing: '4px',
              color: '#a1a1aa',
              fontFamily: monoFont,
              marginTop: 20,
              opacity: attrSpring,
              borderTop: '1px solid rgba(245, 158, 11, 0.3)',
              paddingTop: 18,
            }}
          >
            — J. Robert Oppenheimer, Senior Engineer (1945)
          </div>
        )}
      </div>

      {/* Screen Fill: Historical Memo Details */}
      <div
        style={{
          position: 'absolute',
          bottom: 120,
          left: 80,
          right: 80,
          textAlign: 'center',
          fontFamily: monoFont,
          fontSize: 22,
          color: '#71717a',
          letterSpacing: '3px',
          borderTop: '1px solid #27272a',
          paddingTop: 20,
        }}
      >
        <div>INCIDENT REPORT: 0 WITNESSES REMAIN CONSOLED</div>
        <div style={{ color: '#ef4444', marginTop: 6, fontWeight: 700 }}>
          ESTIMATED BLAST RADIUS: 45 MICROSERVICES
        </div>
      </div>
    </AbsoluteFill>
  );
};
