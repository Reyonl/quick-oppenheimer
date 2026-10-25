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
import { generateCountdownBeep, generateGeigerClick } from '../utils/audioGenerator';

export const Scene3OppenheimerQuote: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Part 1: Quote reveal (frames 0 to 70)
  // Part 2: Countdown 3, 2, 1 (frames 70 to 120)

  // Spring animation for quote 1
  const quote1Spring = spring({
    frame,
    fps,
    config: { damping: 14, mass: 0.8 },
  });

  // Spring animation for quote 2 ("DESTROYER OF PRODUCTION")
  const quote2Spring = spring({
    frame: frame - 25,
    fps,
    config: { damping: 12, mass: 1 },
  });

  // Violent screen shake as countdown reaches zero
  const tremorMagnitude = interpolate(frame, [70, 120], [0, 18], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const shakeX = Math.sin(frame * 1.8) * tremorMagnitude;
  const shakeY = Math.cos(frame * 2.2) * tremorMagnitude;

  // Countdown number calculation
  let countdownNum: string | null = null;
  if (frame >= 70 && frame < 85) countdownNum = '3';
  else if (frame >= 85 && frame < 100) countdownNum = '2';
  else if (frame >= 100 && frame < 118) countdownNum = '1';
  else if (frame >= 118) countdownNum = '0';

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#030304',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        transform: `translate(${shakeX}px, ${shakeY}px)`,
        padding: 40,
        fontFamily: "'Times New Roman', Times, serif",
      }}
    >
      {/* Voiceover 3 */}
      {frame >= 2 && (
        <Audio src={staticFile('audio/vo_scene3.mp3')} volume={1.0} />
      )}

      {/* Ludwig Göransson Style Violin Tension Swell */}
      {frame === 0 && (
        <Audio src={staticFile('audio/tension_riser.wav')} volume={0.8} />
      )}

      {/* Audio beeps during countdown */}
      {frame === 70 && <Audio src={generateCountdownBeep(700)} volume={0.8} />}
      {frame === 85 && <Audio src={generateCountdownBeep(900)} volume={0.85} />}
      {frame === 100 && <Audio src={generateCountdownBeep(1200)} volume={0.9} />}
      {frame === 115 && <Audio src={generateCountdownBeep(1600)} volume={1.0} />}

      {/* Extreme rapid geiger clicks */}
      {frame > 50 && frame % 3 === 0 && (
        <Audio src={generateGeigerClick()} volume={0.6} />
      )}

      {/* Glowing backdrop orange/fire aura preparing to explode */}
      <div
        style={{
          position: 'absolute',
          width: 800,
          height: 800,
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(245,158,11,0.25) 0%, transparent 70%)',
          filter: 'blur(60px)',
          transform: `scale(${interpolate(frame, [60, 120], [0.8, 2.5], {
            extrapolateLeft: 'clamp',
          })})`,
          opacity: interpolate(frame, [50, 120], [0.2, 0.9], {
            extrapolateLeft: 'clamp',
          }),
        }}
      />

      {/* Dramatic Quotes */}
      {frame < 75 && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            gap: 28,
            zIndex: 10,
            marginBottom: 80,
          }}
        >
          <div
            style={{
              fontSize: 36,
              letterSpacing: '10px',
              color: '#a1a1aa',
              textTransform: 'uppercase',
              opacity: quote1Spring,
              transform: `scale(${interpolate(quote1Spring, [0, 1], [0.8, 1])})`,
            }}
          >
            &ldquo;Now I am become Developer...&rdquo;
          </div>

          {frame >= 25 && (
            <div
              style={{
                fontSize: 68,
                fontWeight: 900,
                letterSpacing: '6px',
                color: '#f59e0b',
                textTransform: 'uppercase',
                textShadow:
                  '0 0 50px rgba(245, 158, 11, 0.8), 0 0 20px #ef4444',
                opacity: quote2Spring,
                transform: `scale(${interpolate(quote2Spring, [0, 1], [0.7, 1])})`,
                lineHeight: 1.15,
              }}
            >
              The Destroyer
              <br />
              <span style={{ color: '#ef4444' }}>of Production.</span>
            </div>
          )}

          {frame >= 40 && (
            <div
              style={{
                fontSize: 24,
                color: '#71717a',
                letterSpacing: '6px',
                fontFamily: 'monospace',
                marginTop: 20,
              }}
            >
              — J. ROBERT CODERHEIMER (1945)
            </div>
          )}
        </div>
      )}

      {/* Countdown 3, 2, 1 */}
      {countdownNum !== null && (
        <div
          style={{
            zIndex: 20,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 16,
            marginBottom: 80,
          }}
        >
          <div
            style={{
              fontSize: 220,
              fontWeight: 900,
              fontFamily: 'monospace',
              color: countdownNum === '0' ? '#ffffff' : '#f59e0b',
              textShadow: '0 0 80px rgba(239, 68, 68, 0.9), 0 0 30px #ffffff',
              transform: `scale(${interpolate(
                frame % 15,
                [0, 3, 14],
                [1.3, 1, 0.95]
              )})`,
            }}
          >
            {countdownNum}
          </div>
          <div
            style={{
              fontSize: 32,
              letterSpacing: '12px',
              color: '#ef4444',
              fontWeight: 'bold',
              fontFamily: 'monospace',
              textTransform: 'uppercase',
            }}
          >
            DETONATION SEQUENCE
          </div>
        </div>
      )}

      {/* Subtitles */}
      <CinematicSubtitles
        text="Now I am become Developer... the Destroyer of Production."
        highlightWords={['Developer', 'Destroyer', 'Production']}
        startFrame={2}
      />
    </AbsoluteFill>
  );
};
