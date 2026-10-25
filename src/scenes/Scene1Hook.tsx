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
import { Caption } from '../components/Caption';
import { serifFont, monoFont } from '../utils/fonts';

export const Scene1Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Instant slam (spring with zero initial delay, slams hard into position)
  const slam = spring({
    frame,
    fps,
    config: { damping: 10, mass: 0.6, stiffness: 220 },
  });

  const slamScale = interpolate(slam, [0, 1], [1.7, 1.0]);
  const slamOpacity = interpolate(slam, [0, 0.4, 1], [0.3, 1, 1]);

  // Clock ticks
  const seconds = 57 + Math.floor(frame / 30);
  const timeStr = `16:59:${seconds.toString().padStart(2, '0')}`;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#050507',
        color: '#f4f4f5',
        overflow: 'hidden',
        padding: 80,
      }}
    >
      {/* Audio SFX: Clock Ticks */}
      {frame % 30 === 0 && (
        <Audio src={staticFile('sfx/clock_tick.wav')} volume={0.85} />
      )}

      {/* Top Header & Corner Clock */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          borderBottom: '2px solid rgba(239, 68, 68, 0.35)',
          paddingBottom: 20,
          fontFamily: monoFont,
        }}
      >
        <div>
          <div
            style={{
              fontSize: 24,
              color: '#ef4444',
              letterSpacing: '4px',
              fontWeight: 800,
            }}
          >
            [ CLASSIFIED // MANHATTAN DEV LAB ]
          </div>
          <div
            style={{
              fontSize: 20,
              color: '#71717a',
              letterSpacing: '2px',
              marginTop: 4,
            }}
          >
            REPO: production-core // BRANCH: main
          </div>
        </div>

        {/* Big corner ticking clock */}
        <div
          style={{
            backgroundColor: 'rgba(239, 68, 68, 0.12)',
            border: '2px solid #ef4444',
            borderRadius: 12,
            padding: '12px 20px',
            textAlign: 'right',
            boxShadow: '0 0 25px rgba(239, 68, 68, 0.3)',
          }}
        >
          <div
            style={{
              fontSize: 18,
              color: '#fca5a5',
              letterSpacing: '3px',
              fontWeight: 700,
            }}
          >
            LOCAL TIME
          </div>
          <div
            style={{
              fontSize: 48,
              fontWeight: 900,
              color: '#ef4444',
              textShadow: '0 0 20px rgba(239, 68, 68, 0.8)',
              fontFamily: monoFont,
            }}
          >
            {timeStr}
          </div>
        </div>
      </div>

      {/* Center Slam Huge Typography */}
      <div
        style={{
          position: 'absolute',
          top: 360,
          left: 80,
          right: 80,
          textAlign: 'center',
          transform: `scale(${slamScale})`,
          opacity: slamOpacity,
        }}
      >
        <div
          style={{
            fontSize: 76,
            fontWeight: 800,
            letterSpacing: '14px',
            color: '#ffffff',
            fontFamily: serifFont,
            textTransform: 'uppercase',
          }}
        >
          FRIDAY
        </div>
        <div
          style={{
            fontSize: 160,
            fontWeight: 900,
            lineHeight: 1.05,
            letterSpacing: '6px',
            color: '#f59e0b',
            textShadow:
              '0 0 60px rgba(245, 158, 11, 0.7), 0 0 20px rgba(239, 68, 68, 0.8)',
            fontFamily: monoFont,
          }}
        >
          4:59 PM
        </div>

        {/* Sub-tag warning */}
        <div
          style={{
            marginTop: 30,
            fontSize: 30,
            letterSpacing: '8px',
            color: '#ef4444',
            fontWeight: 800,
            textTransform: 'uppercase',
            fontFamily: monoFont,
            backgroundColor: 'rgba(239, 68, 68, 0.1)',
            padding: '10px 24px',
            display: 'inline-block',
            borderRadius: 8,
            border: '1px solid rgba(239, 68, 68, 0.4)',
          }}
        >
          ⚠️ 60 SECONDS TO WEEKEND
        </div>
      </div>

      {/* Fill Screen: Real Telemetry Status Grid */}
      <div
        style={{
          position: 'absolute',
          top: 860,
          left: 80,
          right: 80,
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 24,
          fontFamily: monoFont,
        }}
      >
        <div
          style={{
            backgroundColor: '#0d0e12',
            border: '1px solid #27272a',
            borderRadius: 14,
            padding: '24px 20px',
          }}
        >
          <div style={{ color: '#71717a', fontSize: 20 }}>STAGING TESTS</div>
          <div style={{ color: '#ef4444', fontSize: 38, fontWeight: 900 }}>
            0 PASSED
          </div>
          <div style={{ color: '#52525b', fontSize: 18, marginTop: 4 }}>
            (None ever written)
          </div>
        </div>

        <div
          style={{
            backgroundColor: '#0d0e12',
            border: '1px solid #27272a',
            borderRadius: 14,
            padding: '24px 20px',
          }}
        >
          <div style={{ color: '#71717a', fontSize: 20 }}>PR REVIEWERS</div>
          <div style={{ color: '#f59e0b', fontSize: 38, fontWeight: 900 }}>
            0 ONLINE
          </div>
          <div style={{ color: '#52525b', fontSize: 18, marginTop: 4 }}>
            (Already at bar)
          </div>
        </div>

        <div
          style={{
            backgroundColor: '#0d0e12',
            border: '1px solid #27272a',
            borderRadius: 14,
            padding: '24px 20px',
            gridColumn: 'span 2',
          }}
        >
          <div style={{ color: '#71717a', fontSize: 20 }}>CONFIDENCE LEVEL</div>
          <div style={{ color: '#10b981', fontSize: 38, fontWeight: 900 }}>
            100.0% UNJUSTIFIED
          </div>
          <div style={{ color: '#52525b', fontSize: 18, marginTop: 4 }}>
            &ldquo;It works on my MacBook Air&rdquo;
          </div>
        </div>
      </div>

      {/* Caption at bottom */}
      <Caption
        text="He has no tests. He has no fear. He has no idea."
        highlightWords={['no', 'tests', 'fear', 'idea']}
        startFrame={5}
      />
    </AbsoluteFill>
  );
};
