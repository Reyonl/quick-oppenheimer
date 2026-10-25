import React, { useEffect, useRef } from 'react';
import { useCurrentFrame } from 'remotion';

export const FilmGrain: React.FC<{ opacity?: number }> = ({ opacity = 0.12 }) => {
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

    // Fast pseudo-random noise seeded slightly by frame
    for (let i = 0; i < data.length; i += 4) {
      const val = Math.floor(Math.random() * 255);
      data[i] = val;     // R
      data[i + 1] = val; // G
      data[i + 2] = val; // B
      data[i + 3] = 255; // A
    }

    ctx.putImageData(imgData, 0, 0);
  }, [frame]);

  // Subtle flicker variation per frame
  const flicker = 0.85 + ((frame * 17) % 30) * 0.01;

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 99,
        opacity: opacity * flicker,
        mixBlendMode: 'overlay',
      }}
    >
      <canvas
        ref={canvasRef}
        width={360}
        height={640}
        style={{
          width: '100%',
          height: '100%',
          imageRendering: 'pixelated',
        }}
      />
    </div>
  );
};
