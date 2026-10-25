import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  Audio,
  staticFile,
} from 'remotion';
import { Caption } from '../components/Caption';
import { monoFont } from '../utils/fonts';

export const Scene2Command: React.FC = () => {
  const frame = useCurrentFrame();

  const command = 'git push --force origin main';
  // Typing command char by char from frame 5 to 40
  const typedCount = Math.floor(
    interpolate(frame, [5, 40], [0, command.length], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    })
  );
  const displayedCommand = command.slice(0, typedCount);

  // Play key click every 2 frames during typing
  const isTyping = frame >= 5 && frame <= 40 && frame % 3 === 0;

  // Interlock box appears at frame 42
  const showInterlock = frame >= 42;

  // Proceed prompt appears at frame 62
  const showProceed = frame >= 62;

  // User types 'y' at frame 72
  const typedY = frame >= 72;
  const isKeyClickY = frame === 72;

  // Hits Enter at frame 80 (rel frame 80, global frame 140)
  const isEnter = frame === 80;

  // Slow push in for terminal
  const pushScale = interpolate(frame, [0, 90], [1.0, 1.05], {
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#060608',
        color: '#f4f4f5',
        overflow: 'hidden',
        padding: 80,
        fontFamily: monoFont,
        transform: `scale(${pushScale})`,
      }}
    >
      {/* Audio SFX: Key clicks */}
      {isTyping && (
        <Audio src={staticFile('sfx/key_click.wav')} volume={0.7} />
      )}
      {isKeyClickY && (
        <Audio src={staticFile('sfx/key_click.wav')} volume={0.85} />
      )}
      {isEnter && (
        <Audio src={staticFile('sfx/key_click.wav')} volume={1.0} />
      )}

      {/* Terminal Window Box filling the main area */}
      <div
        style={{
          width: '100%',
          backgroundColor: '#0b0c10',
          border: '2px solid #27272a',
          borderRadius: 20,
          boxShadow:
            '0 30px 60px -12px rgba(0, 0, 0, 0.95), 0 0 50px rgba(239, 68, 68, 0.15)',
          overflow: 'hidden',
        }}
      >
        {/* Terminal Header */}
        <div
          style={{
            backgroundColor: '#16171d',
            padding: '20px 28px',
            display: 'flex',
            alignItems: 'center',
            gap: 14,
            borderBottom: '1px solid #27272a',
          }}
        >
          <div
            style={{
              width: 20,
              height: 20,
              borderRadius: '50%',
              backgroundColor: '#ef4444',
            }}
          />
          <div
            style={{
              width: 20,
              height: 20,
              borderRadius: '50%',
              backgroundColor: '#eab308',
            }}
          />
          <div
            style={{
              width: 20,
              height: 20,
              borderRadius: '50%',
              backgroundColor: '#22c55e',
            }}
          />
          <span style={{ marginLeft: 16, fontSize: 24, color: '#a1a1aa' }}>
            zsh — root@oppenheimer-box: ~/prod
          </span>
        </div>

        {/* Terminal Content (Terminal text >= 44px) */}
        <div style={{ padding: '36px 32px', minHeight: 920 }}>
          {/* Prompt line */}
          <div
            style={{
              fontSize: 44, // >= 44px as strictly required
              fontWeight: 700,
              lineHeight: 1.4,
              wordBreak: 'break-all',
            }}
          >
            <span style={{ color: '#10b981' }}>oppenheimer</span>
            <span style={{ color: '#60a5fa' }}>:~/prod$ </span>
            <span style={{ color: '#fbbf24' }}>{displayedCommand}</span>
            {frame < 45 && (
              <span
                style={{
                  display: 'inline-block',
                  width: 16,
                  height: 42,
                  backgroundColor: frame % 12 < 6 ? '#fbbf24' : 'transparent',
                  marginLeft: 6,
                  verticalAlign: 'middle',
                }}
              />
            )}
          </div>

          {/* CRITICAL SAFETY INTERLOCK BOX */}
          {showInterlock && (
            <div
              style={{
                marginTop: 36,
                backgroundColor: 'rgba(239, 68, 68, 0.12)',
                border: '2px solid #ef4444',
                borderRadius: 14,
                padding: '28px 24px',
                boxShadow: '0 0 30px rgba(239, 68, 68, 0.25)',
              }}
            >
              <div
                style={{
                  fontSize: 32,
                  fontWeight: 900,
                  color: '#ef4444',
                  letterSpacing: '3px',
                  marginBottom: 16,
                }}
              >
                ⚠️ CRITICAL SAFETY INTERLOCK
              </div>

              <div
                style={{
                  fontSize: 28,
                  lineHeight: 1.6,
                  color: '#fecaca',
                }}
              >
                <div>• 127 microservices online</div>
                <div>• 0 staging environments tested</div>
                <div>
                  • <span style={{ color: '#fff', fontWeight: 'bold' }}>--force</span> will annihilate history
                </div>
                <div>
                  • last backup:{' '}
                  <span style={{ color: '#fbbf24', fontWeight: 'bold' }}>
                    ¯\_(ツ)_/¯
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Proceed Prompt */}
          {showProceed && (
            <div
              style={{
                marginTop: 36,
                fontSize: 44, // >= 44px
                fontWeight: 800,
                color: '#f4f4f5',
                lineHeight: 1.4,
              }}
            >
              <span>Proceed with annihilation? [y/N]: </span>
              <span style={{ color: '#ef4444' }}>{typedY ? 'y' : ''}</span>
              <span
                style={{
                  display: 'inline-block',
                  width: 16,
                  height: 42,
                  backgroundColor: frame % 10 < 5 ? '#ef4444' : 'transparent',
                  marginLeft: 6,
                  verticalAlign: 'middle',
                }}
              />
            </div>
          )}

          {/* Execution Status after Enter */}
          {isEnter && (
            <div
              style={{
                marginTop: 30,
                fontSize: 36,
                fontWeight: 900,
                color: '#ef4444',
                letterSpacing: '2px',
              }}
            >
              [!] TRANSMITTING FORCE OVERWRITE TO REMOTE...
            </div>
          )}
        </div>
      </div>

      {/* Caption at bottom */}
      <Caption
        text="Somewhere, a staging environment weeps."
        highlightWords={['staging', 'environment', 'weeps']}
        startFrame={5}
      />
    </AbsoluteFill>
  );
};
