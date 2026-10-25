import React, { useEffect, useRef } from 'react';
import { useCurrentFrame } from 'remotion';

// Deterministic Pseudo-Random Generator (No Math.random())
function createSeededLcg(seed: number) {
  let s = Math.abs(seed) % 2147483647;
  if (s === 0) s = 1;
  return () => {
    s = (s * 48271) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

export const FilmGrain: React.FC<{ opacity?: number }> = ({ opacity = 0.14 }) => {
  const frame = useCurrentFrame();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;
    const imgData = ctx.createImageData(w, h);
    const data = imgData.data;

    // Seed per frame to create organic 1940s 70mm film noise flicker
    const nextRandom = createSeededLcg((frame + 1) * 7919);

    for (let i = 0; i < data.length; i += 4) {
      const val = Math.floor(nextRandom() * 255);
      data[i] = val;
      data[i + 1] = val;
      data[i + 2] = val;
      data[i + 3] = 255;
    }

    ctx.putImageData(imgData, 0, 0);
  }, [frame]);

  const flicker = 0.88 + ((frame * 17) % 25) * 0.01;

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 9000,
        opacity: opacity * flicker,
        mixBlendMode: 'screen',
      }}
    >
      <canvas
        ref={canvasRef}
        width={270}
        height={480}
        style={{
          width: '100%',
          height: '100%',
          imageRendering: 'pixelated',
        }}
      />
    </div>
  );
};
