import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';

interface SubtitleProps {
  text: string;
  highlightWords?: string[];
  startFrame?: number;
}

export const CinematicSubtitles: React.FC<SubtitleProps> = ({
  text,
  highlightWords = [],
  startFrame = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const relFrame = Math.max(0, frame - startFrame);

  const entrance = spring({
    frame: relFrame,
    fps,
    config: { damping: 14, mass: 0.8 },
  });

  const translateY = interpolate(entrance, [0, 1], [30, 0]);
  const opacity = interpolate(entrance, [0, 1], [0, 1]);

  const words = text.split(' ');

  return (
    <div
      style={{
        position: 'absolute',
        bottom: 140,
        left: '50%',
        transform: `translateX(-50%) translateY(${translateY}px)`,
        opacity,
        zIndex: 85,
        width: '90%',
        maxWidth: 900,
        backgroundColor: 'rgba(5, 5, 8, 0.82)',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(255, 255, 255, 0.15)',
        borderRadius: 16,
        padding: '20px 28px',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.8), 0 0 30px rgba(245, 158, 11, 0.15)',
        textAlign: 'center',
        fontFamily: "'Courier New', Courier, monospace",
      }}
    >
      <div
        style={{
          fontSize: 32,
          fontWeight: 700,
          lineHeight: 1.45,
          color: '#f4f4f5',
          letterSpacing: '1px',
        }}
      >
        {words.map((word, idx) => {
          const cleanWord = word.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
          const isHighlighted = highlightWords.some(
            (hw) => hw.toLowerCase() === cleanWord
          );

          return (
            <span
              key={idx}
              style={{
                color: isHighlighted ? '#fbbf24' : '#f4f4f5',
                textShadow: isHighlighted ? '0 0 16px rgba(251, 191, 36, 0.8)' : 'none',
                fontWeight: isHighlighted ? 900 : 700,
                marginRight: 8,
                display: 'inline-block',
              }}
            >
              {word}
            </span>
          );
        })}
      </div>
    </div>
  );
};
