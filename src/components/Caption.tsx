import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { serifFont } from '../utils/fonts';

interface CaptionProps {
  text: string;
  italic?: boolean;
  highlightWords?: string[];
  startFrame?: number;
}

export const Caption: React.FC<CaptionProps> = ({
  text,
  italic = true,
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

  const translateY = interpolate(entrance, [0, 1], [25, 0]);
  const opacity = interpolate(entrance, [0, 1], [0, 1]);

  const words = text.split(' ');

  return (
    <div
      style={{
        position: 'absolute',
        bottom: 110,
        left: 80,
        right: 80,
        transform: `translateY(${translateY}px)`,
        opacity,
        zIndex: 80,
        backgroundColor: 'rgba(5, 5, 8, 0.88)',
        backdropFilter: 'blur(16px)',
        border: '1px solid rgba(245, 158, 11, 0.25)',
        borderRadius: 18,
        padding: '24px 32px',
        boxShadow:
          '0 25px 50px -12px rgba(0, 0, 0, 0.95), 0 0 35px rgba(245, 158, 11, 0.15)',
        textAlign: 'center',
        fontFamily: serifFont,
        fontStyle: italic ? 'italic' : 'normal',
      }}
    >
      <div
        style={{
          fontSize: 52, // >= 52px as strictly required
          fontWeight: 700,
          lineHeight: 1.35,
          color: '#f4f4f5',
          letterSpacing: '1px',
        }}
      >
        &ldquo;
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
                textShadow: isHighlighted
                  ? '0 0 20px rgba(251, 191, 36, 0.8)'
                  : 'none',
                fontWeight: isHighlighted ? 900 : 700,
                marginRight: 10,
                display: 'inline-block',
                fontStyle: isHighlighted ? 'normal' : 'italic',
              }}
            >
              {word}
            </span>
          );
        })}
        &rdquo;
      </div>
    </div>
  );
};
