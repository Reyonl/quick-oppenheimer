import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
} from 'remotion';
import { Caption } from '../components/Caption';
import { serifFont, monoFont } from '../utils/fonts';

const SHRAPNEL_DATA = [
  { text: 'SIGSEGV', angle: 0.35, speed: 22, color: '#ef4444', size: 38 },
  { text: 'OOMKilled', angle: 1.2, speed: 25, color: '#f87171', size: 42 },
  { text: 'DROP DATABASE production;', angle: 2.1, speed: 19, color: '#ffffff', size: 44 },
  { text: 'TypeError: undefined is not a function', angle: 3.3, speed: 21, color: '#facc15', size: 36 },
  { text: 'HTTP 500 INTERNAL SERVER ERROR', angle: 4.4, speed: 26, color: '#ea580c', size: 40 },
  { text: 'FATAL: KILLED', angle: 5.3, speed: 24, color: '#ec4899', size: 38 },
  { text: 'ECONNREFUSED 127.0.0.1:5432', angle: 5.9, speed: 20, color: '#fb923c', size: 34 },
];

export const Scene5Blast: React.FC = () => {
  const frame = useCurrentFrame();

  // Counter 1: Yield requests spinning up from 0 to 100,000 req/s
  const reqCount = Math.floor(
    interpolate(frame, [10, 75], [0, 100000], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    })
  );

  // Counter 2: Uptime spinning down from 99.99% to 0.00%
  const uptime = interpolate(frame, [10, 75], [99.99, 0.0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  }).toFixed(2);

  // Shockwave ring expansion
  const shock1 = interpolate(frame, [0, 80], [20, 950], {
    extrapolateRight: 'clamp',
  });
  const shock1Alpha = interpolate(frame, [0, 20, 80], [0.95, 0.6, 0], {
    extrapolateRight: 'clamp',
  });

  const shock2 = interpolate(frame, [12, 90], [10, 800], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const shock2Alpha = interpolate(frame, [12, 35, 90], [0.8, 0.4, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Fireball expansion
  const fireRadius = interpolate(frame, [0, 40, 100], [40, 420, 560], {
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#070202',
        color: '#f4f4f5',
        overflow: 'hidden',
        fontFamily: monoFont,
      }}
    >
      {/* SVG Definitions for feTurbulence displacement on fireball */}
      <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        <defs>
          <filter id="feTurbulenceBlast" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.035"
              numOctaves="3"
              seed={frame % 40}
              result="turbulence"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="turbulence"
              scale="45"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      {/* Shockwave Rings */}
      <div
        style={{
          position: 'absolute',
          top: 980,
          left: 540,
          width: shock1 * 2,
          height: shock1 * 2,
          transform: 'translate(-50%, -50%)',
          borderRadius: '50%',
          border: `10px solid rgba(254, 240, 138, ${shock1Alpha})`,
          boxShadow: `0 0 50px rgba(234, 88, 12, ${shock1Alpha})`,
          pointerEvents: 'none',
        }}
      />
      {frame >= 12 && (
        <div
          style={{
            position: 'absolute',
            top: 980,
            left: 540,
            width: shock2 * 2,
            height: shock2 * 2,
            transform: 'translate(-50%, -50%)',
            borderRadius: '50%',
            border: `6px solid rgba(239, 68, 68, ${shock2Alpha})`,
            boxShadow: `0 0 35px rgba(239, 68, 68, ${shock2Alpha})`,
            pointerEvents: 'none',
          }}
        />
      )}

      {/* Mushroom Cloud & Fireball layered with SVG feTurbulence */}
      <div
        style={{
          position: 'absolute',
          top: 980,
          left: 540,
          width: fireRadius * 2,
          height: fireRadius * 2,
          transform: 'translate(-50%, -50%)',
          borderRadius: '50%',
          background:
            'radial-gradient(circle at 50% 50%, #ffffff 0%, #fef08a 25%, #ea580c 55%, #7f1d1d 80%, rgba(24,24,27,0) 100%)',
          filter: 'url(#feTurbulenceBlast) drop-shadow(0 0 60px #ea580c)',
          pointerEvents: 'none',
        }}
      />

      {/* Flying Shrapnel Error Tokens */}
      {frame > 3 &&
        SHRAPNEL_DATA.map((item, idx) => {
          const t = frame - 3;
          const dist = item.speed * t;
          const x = 540 + Math.cos(item.angle) * dist;
          const y = 980 + Math.sin(item.angle) * dist;
          const rot = item.angle * 50 + t * 4;
          const opacity = interpolate(t, [0, 8, 80], [0, 1, 0], {
            extrapolateRight: 'clamp',
          });

          return (
            <div
              key={idx}
              style={{
                position: 'absolute',
                left: x,
                top: y,
                transform: `translate(-50%, -50%) rotate(${rot}deg)`,
                color: item.color,
                fontSize: item.size,
                fontWeight: 900,
                fontFamily: monoFont,
                textShadow: `0 0 25px ${item.color}`,
                whiteSpace: 'nowrap',
                opacity,
                zIndex: 60,
                pointerEvents: 'none',
              }}
            >
              💥 {item.text}
            </div>
          );
        })}

      {/* Top Title: TRINITY CRITICAL EVENT */}
      <div
        style={{
          position: 'absolute',
          top: 100,
          left: 80,
          right: 80,
          textAlign: 'center',
          zIndex: 70,
        }}
      >
        <div
          style={{
            fontSize: 48,
            fontWeight: 900,
            letterSpacing: '8px',
            color: '#fef08a',
            fontFamily: serifFont,
            textShadow: '0 0 40px #ea580c',
            textTransform: 'uppercase',
          }}
        >
          TRINITY CRITICAL EVENT
        </div>

        {/* Real-time Counters Grid */}
        <div
          style={{
            marginTop: 24,
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 20,
            fontFamily: monoFont,
          }}
        >
          <div
            style={{
              backgroundColor: 'rgba(15, 16, 21, 0.85)',
              border: '2px solid #ef4444',
              borderRadius: 14,
              padding: '16px 20px',
              boxShadow: '0 0 25px rgba(239, 68, 68, 0.4)',
            }}
          >
            <div style={{ fontSize: 18, color: '#fca5a5' }}>FAILED REQUESTS</div>
            <div
              style={{
                fontSize: 36,
                fontWeight: 900,
                color: '#ef4444',
                marginTop: 4,
              }}
            >
              {reqCount.toLocaleString()} /s
            </div>
          </div>

          <div
            style={{
              backgroundColor: 'rgba(15, 16, 21, 0.85)',
              border: '2px solid #f59e0b',
              borderRadius: 14,
              padding: '16px 20px',
              boxShadow: '0 0 25px rgba(245, 158, 11, 0.3)',
            }}
          >
            <div style={{ fontSize: 18, color: '#fef08a' }}>SYSTEM UPTIME</div>
            <div
              style={{
                fontSize: 36,
                fontWeight: 900,
                color: uptime === '0.00' ? '#ef4444' : '#f59e0b',
                marginTop: 4,
              }}
            >
              {uptime}%
            </div>
          </div>
        </div>
      </div>

      {/* Caption at bottom */}
      <Caption
        text="...It worked. But at what cost?"
        highlightWords={['worked', 'cost']}
        startFrame={25}
      />
    </AbsoluteFill>
  );
};
