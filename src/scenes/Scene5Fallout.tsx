import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  Audio,
  staticFile,
} from 'remotion';
import { CinematicSubtitles } from '../components/CinematicSubtitles';
import { generateGlitchSound } from '../utils/audioGenerator';

export const Scene5Fallout: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Notification 1: PagerDuty
  const notif1Spring = spring({ frame: frame - 10, fps, config: { damping: 12 } });
  // Notification 2: Slack CTO
  const notif2Spring = spring({ frame: frame - 35, fps, config: { damping: 12 } });
  // Notification 3: DevOps lead
  const notif3Spring = spring({ frame: frame - 60, fps, config: { damping: 12 } });

  // Rotating emergency red strobe light effect
  const strobeAlpha = interpolate(
    Math.sin(frame * 0.4),
    [-1, 1],
    [0.1, 0.45]
  );

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#0a0304',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: 40,
        overflow: 'hidden',
        fontFamily: "'Inter', -apple-system, sans-serif",
      }}
    >
      {/* Voiceover 5 */}
      {frame >= 5 && (
        <Audio src={staticFile('audio/vo_scene5.mp3')} volume={1.0} />
      )}

      {/* Real SFX: PagerDuty Emergency Siren & Slack Ding */}
      {frame === 10 && (
        <Audio src={staticFile('audio/pagerduty_alarm.wav')} volume={0.65} />
      )}
      {frame === 35 && (
        <Audio src={staticFile('audio/slack_ding.wav')} volume={0.85} />
      )}
      {frame === 60 && <Audio src={generateGlitchSound()} volume={0.7} />}

      {/* Red Emergency Strobe Overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: '#ef4444',
          opacity: strobeAlpha,
          mixBlendMode: 'screen',
          pointerEvents: 'none',
        }}
      />

      {/* Top Incident Status Banner */}
      <div
        style={{
          marginTop: 130,
          backgroundColor: '#450a0a',
          border: '2px solid #ef4444',
          borderRadius: 12,
          padding: '16px 32px',
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          boxShadow: '0 0 30px rgba(239, 68, 68, 0.5)',
        }}
      >
        <span style={{ fontSize: 32 }}>🚨</span>
        <div style={{ textAlign: 'left' }}>
          <div
            style={{
              color: '#ef4444',
              fontWeight: 900,
              fontSize: 26,
              letterSpacing: '2px',
            }}
          >
            STATUS: TOTAL SYSTEM COLLAPSE
          </div>
          <div
            style={{
              color: '#fca5a5',
              fontSize: 18,
              fontFamily: 'monospace',
            }}
          >
            GLOBAL ERROR RATE: 99.98% • ACTIVE SRE ON CALL: CRYING
          </div>
        </div>
      </div>

      {/* Frantic Notification Cards */}
      <div
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: 20,
          marginTop: 40,
          zIndex: 20,
          marginBottom: 140,
        }}
      >
        {/* Card 1: PagerDuty */}
        {frame >= 10 && (
          <div
            style={{
              backgroundColor: '#18181b',
              border: '2px solid #ef4444',
              borderRadius: 16,
              padding: 24,
              boxShadow: '0 20px 40px rgba(0,0,0,0.8)',
              transform: `scale(${interpolate(
                notif1Spring,
                [0, 1],
                [0.85, 1]
              )}) translateY(${interpolate(notif1Spring, [0, 1], [40, 0])}px)`,
              opacity: notif1Spring,
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ fontSize: 28 }}>📟</span>
                <span style={{ fontWeight: 800, fontSize: 22, color: '#ef4444' }}>
                  PagerDuty [SEV-0 CRITICAL]
                </span>
              </div>
              <span style={{ color: '#71717a', fontSize: 16 }}>Just now</span>
            </div>
            <div
              style={{
                marginTop: 12,
                fontSize: 22,
                color: '#f4f4f5',
                fontWeight: 600,
              }}
            >
              All 45 Kubernetes clusters unreachable. HTTP 500 across all ingress
              gateways.
            </div>
          </div>
        )}

        {/* Card 2: Slack CTO */}
        {frame >= 35 && (
          <div
            style={{
              backgroundColor: '#18181b',
              border: '2px solid #f59e0b',
              borderRadius: 16,
              padding: 24,
              boxShadow: '0 20px 40px rgba(0,0,0,0.8)',
              transform: `scale(${interpolate(
                notif2Spring,
                [0, 1],
                [0.85, 1]
              )}) translateY(${interpolate(notif2Spring, [0, 1], [40, 0])}px)`,
              opacity: notif2Spring,
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ fontSize: 28 }}>💬</span>
                <span style={{ fontWeight: 800, fontSize: 22, color: '#38bdf8' }}>
                  #war-room-production
                </span>
              </div>
              <span style={{ color: '#71717a', fontSize: 16 }}>10s ago</span>
            </div>
            <div
              style={{
                marginTop: 12,
                fontSize: 24,
                color: '#fef08a',
                fontWeight: 'bold',
              }}
            >
              CTO: &ldquo;WHO COMMITTED DIRECTLY TO MAIN AT 4:59 PM?! ANSWER ME
              NOW.&rdquo;
            </div>
          </div>
        )}

        {/* Card 3: DBA Lead */}
        {frame >= 60 && (
          <div
            style={{
              backgroundColor: '#18181b',
              border: '2px solid #ec4899',
              borderRadius: 16,
              padding: 24,
              boxShadow: '0 20px 40px rgba(0,0,0,0.8)',
              transform: `scale(${interpolate(
                notif3Spring,
                [0, 1],
                [0.85, 1]
              )}) translateY(${interpolate(notif3Spring, [0, 1], [40, 0])}px)`,
              opacity: notif3Spring,
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ fontSize: 28 }}>🗄️</span>
                <span style={{ fontWeight: 800, fontSize: 22, color: '#ec4899' }}>
                  Lead DBA
                </span>
              </div>
              <span style={{ color: '#71717a', fontSize: 16 }}>Just now</span>
            </div>
            <div style={{ marginTop: 12, fontSize: 22, color: '#f4f4f5' }}>
              &ldquo;The production database... is an empty file named{' '}
              <code>test.sql</code>.&rdquo;
            </div>
          </div>
        )}
      </div>

      {/* Dynamic Subtitles */}
      <CinematicSubtitles
        text="Total collapse. All microservices... annihilated."
        highlightWords={['Total', 'collapse', 'microservices', 'annihilated']}
        startFrame={5}
      />
    </AbsoluteFill>
  );
};
