import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  Audio,
} from 'remotion';
import { generateHeartbeat, generateGeigerClick } from '../utils/audioGenerator';

export const Scene1Inciting: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Heartbeat triggers every ~30 frames (1s)
  const isHeartbeatFrame = frame === 10 || frame === 45 || frame === 75;

  // Camera slow zoom
  const zoom = interpolate(frame, [0, 90], [1, 1.12], {
    extrapolateRight: 'clamp',
  });

  // Fade in at start
  const opacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateRight: 'clamp',
  });

  // Ticking time calculation
  const seconds = 57 + Math.floor(frame / 30);
  const timeString = `16:59:${seconds.toString().padStart(2, '0')}`;

  // Heartbeat scale pulse
  const pulseScale = interpolate(
    frame % 30,
    [0, 5, 12, 30],
    [1, 1.05, 0.99, 1],
    { extrapolateRight: 'clamp' }
  );

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#0a0a0c',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        opacity,
        transform: `scale(${zoom * pulseScale})`,
        color: '#e4e4e7',
        fontFamily: "'Courier New', Courier, monospace",
        padding: 60,
      }}
    >
      {/* Audio SFX */}
      {isHeartbeatFrame && <Audio src={generateHeartbeat()} volume={0.8} />}
      {frame % 15 === 0 && <Audio src={generateGeigerClick()} volume={0.4} />}

      {/* Top Tag */}
      <div
        style={{
          position: 'absolute',
          top: 180,
          letterSpacing: '8px',
          fontSize: 24,
          color: '#a1a1aa',
          textTransform: 'uppercase',
          borderBottom: '1px solid #3f3f46',
          paddingBottom: 10,
        }}
      >
        [ LOS ALAMOS CODEBASE — FRIDAY ]
      </div>

      {/* Clock display */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 20,
        }}
      >
        <div
          style={{
            fontSize: 96,
            fontWeight: 900,
            letterSpacing: '6px',
            color: '#ef4444',
            textShadow: '0 0 40px rgba(239, 68, 68, 0.6)',
            fontFamily: 'monospace',
          }}
        >
          {timeString}
        </div>
        <div
          style={{
            fontSize: 28,
            color: '#71717a',
            letterSpacing: '4px',
          }}
        >
          WEEKEND IMMINENT
        </div>
      </div>

      {/* Bottom Dramatic Subtitle */}
      <div
        style={{
          position: 'absolute',
          bottom: 240,
          textAlign: 'center',
          maxWidth: '85%',
          fontSize: 32,
          lineHeight: 1.6,
          color: '#d4d4d8',
          fontStyle: 'italic',
        }}
      >
        &ldquo;A tired developer sits in the dark...
        <br />
        <span style={{ color: '#fbbf24', fontWeight: 'bold', fontStyle: 'normal' }}>
          One single push remains.
        </span>&rdquo;
      </div>
    </AbsoluteFill>
  );
};
