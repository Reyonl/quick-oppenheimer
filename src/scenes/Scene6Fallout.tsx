import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import { monoFont } from '../utils/fonts';

interface FeedItem {
  id: string;
  sender: string;
  badge: string;
  badgeColor: string;
  time: string;
  content: string;
  startFrame: number;
  highlight?: boolean;
}

export const Scene6Fallout: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Engineer status flips at frame 102
  const showAwayStatus = frame >= 102;
  const awaySpring = spring({
    frame: frame - 102,
    fps,
    config: { damping: 12 },
  });

  // Feed items list
  const feedItems: FeedItem[] = [
    {
      id: 'm1',
      sender: 'PagerDuty',
      badge: 'SEV-0 CRITICAL',
      badgeColor: '#ef4444',
      time: '5:00 PM',
      content: '🚨 All 45 Kubernetes clusters unreachable. 100% ingress packet loss.',
      startFrame: 5,
    },
    {
      id: 'm2',
      sender: 'Customer Support',
      badge: 'INCIDENT',
      badgeColor: '#f97316',
      time: '5:01 PM',
      content: '🔥 Twitter is on fire. Someone posted the fire emoji 40,000 times.',
      startFrame: 25,
    },
    {
      id: 'm3',
      sender: 'Alex (Junior Intern)',
      badge: 'DEV',
      badgeColor: '#a855f7',
      time: '5:01 PM',
      content: 'is this related to my PR? (it’s just a typo fix in the readme)',
      startFrame: 45,
    },
    {
      id: 'm4',
      sender: 'Sarah (CTO)',
      badge: 'EXECUTIVE',
      badgeColor: '#ef4444',
      time: '5:02 PM',
      content: 'WHO COMMITTED DIRECTLY TO MAIN AT 4:59 PM?! ANSWER ME NOW.',
      startFrame: 65,
    },
    {
      id: 'm6',
      sender: 'Marcus (Lead DBA)',
      badge: 'FATAL DISASTER',
      badgeColor: '#dc2626',
      time: '5:02 PM',
      content: 'The production database... is an empty file named test.sql.',
      startFrame: 85,
      highlight: true,
    },
  ];

  // Feed scroll calculation: as messages come in, feed smoothly shifts upward
  const scrollOffset = interpolate(frame, [5, 45, 85, 110], [0, 80, 240, 310], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#070304',
        color: '#f4f4f5',
        overflow: 'hidden',
        padding: 80,
        fontFamily: monoFont,
      }}
    >
      {/* Top Channel Header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: '#12131a',
          border: '2px solid #27272a',
          borderRadius: 16,
          padding: '18px 24px',
          boxShadow: '0 10px 25px rgba(0,0,0,0.7)',
          zIndex: 50,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <span style={{ fontSize: 32 }}>🚨</span>
          <div>
            <div style={{ fontSize: 24, fontWeight: 900, color: '#f4f4f5' }}>
              #war-room-production
            </div>
            <div style={{ fontSize: 18, color: '#ef4444' }}>
              142 members panicked • 5,820 unread mentions
            </div>
          </div>
        </div>

        {/* Engineer Status Badge (Flips at frame 102) */}
        <div
          style={{
            backgroundColor: showAwayStatus ? '#064e3b' : '#3f3f46',
            border: `2px solid ${showAwayStatus ? '#10b981' : '#71717a'}`,
            borderRadius: 12,
            padding: '10px 18px',
            fontSize: 20,
            fontWeight: 800,
            color: '#ffffff',
            transform: showAwayStatus
              ? `scale(${interpolate(awaySpring, [0, 1], [0.8, 1])})`
              : 'none',
          }}
        >
          {showAwayStatus ? '🌴 Away - back Monday' : '🟢 Online'}
        </div>
      </div>

      {/* Slack / PagerDuty Message Feed filling vertical space */}
      <div
        style={{
          marginTop: 30,
          display: 'flex',
          flexDirection: 'column',
          gap: 20,
          transform: `translateY(-${scrollOffset}px)`,
        }}
      >
        {feedItems.map((item) => {
          if (frame < item.startFrame) return null;

          const itemSpring = spring({
            frame: frame - item.startFrame,
            fps,
            config: { damping: 12, mass: 0.8 },
          });

          const scale = interpolate(itemSpring, [0, 1], [0.88, 1]);
          const opacity = itemSpring;

          return (
            <div
              key={item.id}
              style={{
                backgroundColor: item.highlight
                  ? 'rgba(220, 38, 38, 0.22)'
                  : '#13141c',
                border: `2px solid ${item.highlight ? '#ef4444' : '#27272a'}`,
                borderRadius: 16,
                padding: '22px 26px',
                boxShadow: item.highlight
                  ? '0 20px 50px rgba(239, 68, 68, 0.4)'
                  : '0 15px 35px rgba(0,0,0,0.6)',
                opacity,
                transform: `scale(${scale})`,
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: 10,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span style={{ fontSize: 24, fontWeight: 900, color: '#fff' }}>
                    {item.sender}
                  </span>
                  <span
                    style={{
                      fontSize: 16,
                      fontWeight: 800,
                      backgroundColor: item.badgeColor,
                      color: '#fff',
                      padding: '4px 10px',
                      borderRadius: 6,
                    }}
                  >
                    {item.badge}
                  </span>
                </div>
                <span style={{ fontSize: 18, color: '#71717a' }}>{item.time}</span>
              </div>

              <div
                style={{
                  fontSize: item.highlight ? 28 : 24,
                  fontWeight: item.highlight ? 900 : 600,
                  color: item.highlight ? '#fef08a' : '#e4e4e7',
                  lineHeight: 1.45,
                }}
              >
                {item.content}
              </div>
            </div>
          );
        })}

        {/* "CTO is typing..." indicator that never stops */}
        {frame >= 75 && (
          <div
            style={{
              padding: '16px 20px',
              color: '#ef4444',
              fontSize: 22,
              fontStyle: 'italic',
              display: 'flex',
              alignItems: 'center',
              gap: 12,
            }}
          >
            <span>💬 Sarah (CTO) is typing</span>
            <span>{'.'.repeat((Math.floor(frame / 6) % 4) + 1)}</span>
          </div>
        )}
      </div>

      {/* Floating Status Notification on bottom when Away status triggers */}
      {showAwayStatus && (
        <div
          style={{
            position: 'absolute',
            bottom: 120,
            left: 80,
            right: 80,
            backgroundColor: 'rgba(16, 185, 129, 0.92)',
            borderRadius: 18,
            padding: '24px 32px',
            textAlign: 'center',
            boxShadow: '0 20px 40px rgba(0,0,0,0.8), 0 0 40px rgba(16, 185, 129, 0.5)',
            transform: `scale(${interpolate(awaySpring, [0, 1], [0.85, 1])})`,
            zIndex: 90,
          }}
        >
          <div style={{ fontSize: 32, fontWeight: 900, color: '#042f2e' }}>
            STATUS UPDATED
          </div>
          <div style={{ fontSize: 24, fontWeight: 700, color: '#022c22', marginTop: 4 }}>
            &ldquo;🌴 Away - back Monday. Have a nice weekend!&rdquo;
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};
