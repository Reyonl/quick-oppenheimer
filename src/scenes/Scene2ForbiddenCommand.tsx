import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  Audio,
  staticFile,
} from 'remotion';
import { CinematicSubtitles } from '../components/CinematicSubtitles';
import { generateCountdownBeep } from '../utils/audioGenerator';

export const Scene2ForbiddenCommand: React.FC = () => {
  const frame = useCurrentFrame();

  const command = 'git push --force origin main';
  // Typing progress from frame 5 to 45
  const typedCount = Math.floor(
    interpolate(frame, [5, 45], [0, command.length], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    })
  );
  const displayedCommand = command.slice(0, typedCount);

  // Warning box emerges at frame 50
  const warningOpacity = interpolate(frame, [45, 55], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const warningScale = interpolate(frame, [45, 55], [0.9, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const shake = frame > 70 ? Math.sin(frame * 2.5) * 4 : 0;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#050507',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 40,
        fontFamily: "'Courier New', Courier, monospace",
        color: '#f4f4f5',
        transform: `translate(${shake}px, ${shake * 0.5}px)`,
      }}
    >
      {/* Voiceover 2 */}
      {frame >= 2 && (
        <Audio src={staticFile('audio/vo_scene2.mp3')} volume={1.0} />
      )}

      {/* Mechanical Keyboard Clacking Audio */}
      {frame === 5 && (
        <Audio src={staticFile('audio/keyboard_typing.wav')} volume={0.75} />
      )}

      {/* Warning Alert Sound */}
      {frame === 50 && <Audio src={generateCountdownBeep(440)} volume={0.8} />}
      {frame === 75 && <Audio src={generateCountdownBeep(880)} volume={0.9} />}

      {/* Terminal Window Box */}
      <div
        style={{
          width: '92%',
          backgroundColor: '#0f1015',
          border: '2px solid #27272a',
          borderRadius: 16,
          boxShadow:
            '0 25px 50px -12px rgba(0, 0, 0, 0.9), 0 0 40px rgba(239, 68, 68, 0.2)',
          overflow: 'hidden',
          marginBottom: 120,
        }}
      >
        {/* Terminal Header */}
        <div
          style={{
            backgroundColor: '#18181b',
            padding: '16px 24px',
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            borderBottom: '1px solid #27272a',
          }}
        >
          <div
            style={{
              width: 18,
              height: 18,
              borderRadius: '50%',
              backgroundColor: '#ef4444',
            }}
          />
          <div
            style={{
              width: 18,
              height: 18,
              borderRadius: '50%',
              backgroundColor: '#eab308',
            }}
          />
          <div
            style={{
              width: 18,
              height: 18,
              borderRadius: '50%',
              backgroundColor: '#22c55e',
            }}
          />
          <span style={{ marginLeft: 16, fontSize: 20, color: '#a1a1aa' }}>
            bash — root@oppenheimer-core:~
          </span>
        </div>

        {/* Terminal Content */}
        <div style={{ padding: '36px 28px', minHeight: 320 }}>
          <div style={{ fontSize: 22, color: '#71717a', marginBottom: 18 }}>
            Last login: Fri Oct 25 16:58:12 on ttys004
          </div>

          <div
            style={{
              fontSize: 34,
              fontWeight: 'bold',
              lineHeight: 1.5,
              wordBreak: 'break-all',
            }}
          >
            <span style={{ color: '#10b981' }}>oppenheimer@manhattan</span>
            <span style={{ color: '#60a5fa' }}>:~/production-app$ </span>
            <span style={{ color: '#fbbf24' }}>{displayedCommand}</span>
            <span
              style={{
                display: 'inline-block',
                width: 14,
                height: 32,
                backgroundColor: frame % 15 < 8 ? '#f59e0b' : 'transparent',
                marginLeft: 4,
                verticalAlign: 'middle',
              }}
            />
          </div>

          {/* Critical Warnings */}
          {warningOpacity > 0 && (
            <div
              style={{
                marginTop: 36,
                padding: '24px 20px',
                backgroundColor: 'rgba(239, 68, 68, 0.12)',
                border: '1px solid #ef4444',
                borderRadius: 10,
                opacity: warningOpacity,
                transform: `scale(${warningScale})`,
                display: 'flex',
                flexDirection: 'column',
                gap: 12,
              }}
            >
              <div
                style={{
                  color: '#ef4444',
                  fontSize: 26,
                  fontWeight: 900,
                  letterSpacing: '2px',
                }}
              >
                ☢️ CRITICAL SAFETY INTERLOCK ENGAGED
              </div>
              <div style={{ color: '#fca5a5', fontSize: 22 }}>
                • 127 Microservices online
                <br />
                • 0 Staging environments tested
                <br />
                • Flag{' '}
                <span style={{ color: '#fff', fontWeight: 'bold' }}>
                  --force
                </span>{' '}
                will annihilate history
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Tension Prompt */}
      {frame > 65 && (
        <div
          style={{
            position: 'absolute',
            bottom: 240,
            fontSize: 32,
            fontWeight: 800,
            letterSpacing: '5px',
            color: frame % 10 < 5 ? '#ef4444' : '#fff',
            textTransform: 'uppercase',
          }}
        >
          [ PRESS ENTER TO DETONATE ]
        </div>
      )}

      {/* Dynamic Voiceover Subtitles */}
      <CinematicSubtitles
        text="His fingers tremble... over the forbidden command."
        highlightWords={['fingers', 'tremble', 'forbidden', 'command']}
        startFrame={2}
      />
    </AbsoluteFill>
  );
};
