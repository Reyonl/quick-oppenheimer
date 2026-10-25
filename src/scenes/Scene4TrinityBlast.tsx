import React, { useEffect, useRef } from 'react';
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  Audio,
  staticFile,
} from 'remotion';
import { CinematicSubtitles } from '../components/CinematicSubtitles';

interface FlyingBug {
  text: string;
  angle: number;
  speed: number;
  spin: number;
  size: number;
  color: string;
}

const BUGS_DATA: FlyingBug[] = [
  { text: 'NullPointerException', angle: 0.3, speed: 18, spin: 0.08, size: 28, color: '#f87171' },
  { text: 'TypeError: undefined is not a function', angle: 1.1, speed: 22, spin: -0.05, size: 24, color: '#facc15' },
  { text: '500 INTERNAL SERVER ERROR', angle: 2.2, speed: 19, spin: 0.06, size: 32, color: '#ef4444' },
  { text: 'ECONNREFUSED 127.0.0.1:5432', angle: 3.4, speed: 25, spin: -0.09, size: 26, color: '#fb923c' },
  { text: 'FATAL: KILLED (OOM)', angle: 4.2, speed: 21, spin: 0.12, size: 30, color: '#f43f5e' },
  { text: 'K8S Pod Evicted', angle: 5.1, speed: 23, spin: -0.07, size: 28, color: '#e879f9' },
  { text: 'DROP DATABASE production CASCADE', angle: 5.8, speed: 26, spin: 0.04, size: 34, color: '#ffffff' },
  { text: 'Stack Overflow at line 1337', angle: 1.8, speed: 20, spin: -0.1, size: 24, color: '#38bdf8' },
  { text: 'Memory Leak detected (+98GB)', angle: 2.8, speed: 22, spin: 0.07, size: 26, color: '#fbbf24' },
  { text: 'SIGSEGV (Segmentation Fault)', angle: 4.8, speed: 24, spin: -0.05, size: 30, color: '#f87171' },
];

export const Scene4TrinityBlast: React.FC = () => {
  const frame = useCurrentFrame();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // White flash: frames 0 to 18
  const flashOpacity = interpolate(frame, [0, 2, 18], [1, 1, 0], {
    extrapolateRight: 'clamp',
  });

  // Sound triggers at frame 5 (delayed shockwave impact)
  const playExplosion = frame === 5;

  // Camera violent rumble
  const rumbleStrength = interpolate(
    frame,
    [0, 15, 60, 120],
    [25, 20, 8, 2],
    {
      extrapolateRight: 'clamp',
    }
  );
  const shakeX = Math.sin(frame * 3.7) * rumbleStrength;
  const shakeY = Math.cos(frame * 4.3) * rumbleStrength;

  // Canvas-based fireball and shockwave
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);

    const centerX = w / 2;
    const centerY = h * 0.55;

    // 1. Shockwave Rings
    const shockRadius = interpolate(frame, [0, 90], [10, 800], {
      extrapolateRight: 'clamp',
    });
    const shockAlpha = interpolate(frame, [0, 30, 90], [0.9, 0.6, 0], {
      extrapolateRight: 'clamp',
    });

    ctx.save();
    ctx.lineWidth = 14;
    ctx.strokeStyle = `rgba(255, 200, 100, ${shockAlpha})`;
    ctx.beginPath();
    ctx.arc(centerX, centerY, shockRadius, 0, Math.PI * 2);
    ctx.stroke();

    // Secondary shockwave
    if (frame > 15) {
      const shock2Radius = (frame - 15) * 8;
      const shock2Alpha = Math.max(0, 0.8 - (frame - 15) * 0.015);
      ctx.lineWidth = 8;
      ctx.strokeStyle = `rgba(255, 100, 50, ${shock2Alpha})`;
      ctx.beginPath();
      ctx.arc(centerX, centerY, shock2Radius, 0, Math.PI * 2);
      ctx.stroke();
    }
    ctx.restore();

    // 2. Nuclear Plasma Fireball
    const fireRadius = interpolate(frame, [0, 60, 120], [20, 380, 520], {
      extrapolateRight: 'clamp',
    });

    const grad = ctx.createRadialGradient(
      centerX,
      centerY,
      10,
      centerX,
      centerY,
      fireRadius
    );
    grad.addColorStop(0, '#ffffff');
    grad.addColorStop(0.2, '#fef08a');
    grad.addColorStop(0.45, '#f97316');
    grad.addColorStop(0.75, '#dc2626');
    grad.addColorStop(0.95, '#450a0a');
    grad.addColorStop(1, 'rgba(0,0,0,0)');

    ctx.save();
    ctx.fillStyle = grad;
    ctx.beginPath();
    const steps = 40;
    for (let i = 0; i < steps; i++) {
      const angle = (i / steps) * Math.PI * 2;
      const noise =
        Math.sin(angle * 7 + frame * 0.3) * 25 +
        Math.cos(angle * 13 - frame * 0.2) * 15;
      const r = fireRadius + noise;
      const x = centerX + Math.cos(angle) * r;
      const y = centerY + Math.sin(angle) * r;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }, [frame]);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#090302',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transform: `translate(${shakeX}px, ${shakeY}px)`,
        overflow: 'hidden',
      }}
    >
      {/* Hans Zimmer Massive Atomic Boom SFX */}
      {playExplosion && (
        <Audio src={staticFile('audio/atomic_boom.wav')} volume={1.0} />
      )}

      {/* Voiceover 4 (whisper) */}
      {frame >= 40 && (
        <Audio src={staticFile('audio/vo_scene4.mp3')} volume={1.0} />
      )}

      {/* Fireball & Shockwaves Canvas */}
      <canvas
        ref={canvasRef}
        width={1080}
        height={1920}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
        }}
      />

      {/* Blinding White Flash */}
      {flashOpacity > 0 && (
        <AbsoluteFill
          style={{
            backgroundColor: '#ffffff',
            opacity: flashOpacity,
            zIndex: 100,
          }}
        />
      )}

      {/* Flying Bug & Error Tokens */}
      {frame > 5 &&
        BUGS_DATA.map((bug, idx) => {
          const t = frame - 5;
          const dist = bug.speed * t;
          const x = 540 + Math.cos(bug.angle) * dist;
          const y = 1056 + Math.sin(bug.angle) * dist;
          const rotation = bug.spin * t * 45;
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
                transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
                color: bug.color,
                fontSize: bug.size,
                fontWeight: 900,
                fontFamily: "'Courier New', Courier, monospace",
                textShadow: `0 0 20px ${bug.color}`,
                whiteSpace: 'nowrap',
                opacity,
                zIndex: 40,
                pointerEvents: 'none',
              }}
            >
              🔥 {bug.text}
            </div>
          );
        })}

      {/* Overlay Title at peak */}
      {frame > 30 && (
        <div
          style={{
            position: 'absolute',
            top: 180,
            textAlign: 'center',
            zIndex: 50,
          }}
        >
          <div
            style={{
              fontSize: 54,
              fontWeight: 900,
              letterSpacing: '8px',
              color: '#fef08a',
              textShadow: '0 0 40px #ea580c',
              fontFamily: 'monospace',
              textTransform: 'uppercase',
            }}
          >
            TRINITY CRITICAL EVENT
          </div>
          <div
            style={{
              fontSize: 26,
              color: '#ffedd5',
              letterSpacing: '4px',
              marginTop: 10,
              fontFamily: 'monospace',
            }}
          >
            YIELD: 100,000 FAILED REQUESTS / SEC
          </div>
        </div>
      )}

      {/* Whisper Subtitles */}
      {frame >= 35 && (
        <CinematicSubtitles
          text="...It worked. But at what cost?"
          highlightWords={['cost', 'worked']}
          startFrame={35}
        />
      )}
    </AbsoluteFill>
  );
};
