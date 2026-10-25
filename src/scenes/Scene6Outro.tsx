import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

export const Scene6Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({ frame, fps, config: { damping: 14 } });
  const punchlineSpring = spring({ frame: frame - 20, fps, config: { damping: 12 } });

  // Floating ember particles
  const embers = Array.from({ length: 25 }).map((_, i) => {
    const seed = (i * 73) % 100;
    const x = seed * 10.8;
    const speed = 1.2 + (i % 3) * 0.8;
    const y = 1920 - ((frame * speed * 25 + i * 80) % 2100);
    const size = 3 + (i % 4) * 2;
    const alpha = 0.3 + ((i % 5) * 0.15);
    return { x, y, size, alpha };
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#050203',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: "'Courier New', Courier, monospace",
        color: '#f4f4f5',
        padding: 40,
        overflow: 'hidden',
      }}
    >
      {/* Floating glowing embers */}
      {embers.map((e, idx) => (
        <div
          key={idx}
          style={{
            position: 'absolute',
            left: e.x,
            top: e.y,
            width: e.size,
            height: e.size,
            borderRadius: '50%',
            backgroundColor: '#f97316',
            boxShadow: '0 0 10px #ea580c, 0 0 20px #facc15',
            opacity: e.alpha,
          }}
        />
      ))}

      {/* Main Title Badge */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          gap: 20,
          zIndex: 10,
          opacity: titleSpring,
          transform: `scale(${interpolate(titleSpring, [0, 1], [0.8, 1])})`,
        }}
      >
        <div
          style={{
            fontSize: 28,
            letterSpacing: '12px',
            color: '#a1a1aa',
            textTransform: 'uppercase',
          }}
        >
          THE MORAL OF THE STORY
        </div>

        <div
          style={{
            fontSize: 64,
            fontWeight: 900,
            lineHeight: 1.3,
            color: '#ffffff',
            textTransform: 'uppercase',
            letterSpacing: '4px',
          }}
        >
          Zero Tests.
          <br />
          <span style={{ color: '#f59e0b' }}>No Staging.</span>
          <br />
          <span style={{ color: '#ef4444' }}>Pure Confidence.</span>
        </div>
      </div>

      {/* Punchline */}
      {frame >= 20 && (
        <div
          style={{
            marginTop: 50,
            opacity: punchlineSpring,
            transform: `scale(${interpolate(punchlineSpring, [0, 1], [0.9, 1])})`,
            textAlign: 'center',
            zIndex: 10,
          }}
        >
          <div
            style={{
              fontSize: 34,
              fontWeight: 'bold',
              color: '#34d399',
              letterSpacing: '6px',
            }}
          >
            HAPPY WEEKEND, DEVELOPERS.
          </div>
          <div
            style={{
              fontSize: 20,
              color: '#71717a',
              marginTop: 14,
              letterSpacing: '3px',
            }}
          >
            SEE YOU AT MONDAY POST-MORTEM
          </div>
        </div>
      )}

      {/* Remotion Footer Watermark */}
      <div
        style={{
          position: 'absolute',
          bottom: 120,
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          opacity: 0.7,
        }}
      >
        <div
          style={{
            width: 14,
            height: 14,
            backgroundColor: '#06b6d4',
            borderRadius: '50%',
            boxShadow: '0 0 10px #06b6d4',
          }}
        />
        <span style={{ fontSize: 20, letterSpacing: '4px', color: '#cbd5e1' }}>
          RENDERED WITH REMOTION & REACT
        </span>
      </div>
    </AbsoluteFill>
  );
};
