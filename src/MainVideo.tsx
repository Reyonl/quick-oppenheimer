import React from 'react';
import { AbsoluteFill, Sequence } from 'remotion';
import { FilmGrain } from './components/FilmGrain';
import { Vignette } from './components/Vignette';
import { Scene1Inciting } from './scenes/Scene1Inciting';
import { Scene2ForbiddenCommand } from './scenes/Scene2ForbiddenCommand';
import { Scene3OppenheimerQuote } from './scenes/Scene3OppenheimerQuote';
import { Scene4TrinityBlast } from './scenes/Scene4TrinityBlast';
import { Scene5Fallout } from './scenes/Scene5Fallout';
import { Scene6Outro } from './scenes/Scene6Outro';

export const MainVideo: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: '#000000', overflow: 'hidden' }}>
      {/* Scene 1: Inciting Incident (0s - 3s) */}
      <Sequence from={0} durationInFrames={90}>
        <Scene1Inciting />
      </Sequence>

      {/* Scene 2: The Forbidden Command (3s - 6s) */}
      <Sequence from={90} durationInFrames={90}>
        <Scene2ForbiddenCommand />
      </Sequence>

      {/* Scene 3: The Quote & Countdown (6s - 10s) */}
      <Sequence from={180} durationInFrames={120}>
        <Scene3OppenheimerQuote />
      </Sequence>

      {/* Scene 4: The Trinity Blast (10s - 14s) */}
      <Sequence from={300} durationInFrames={120}>
        <Scene4TrinityBlast />
      </Sequence>

      {/* Scene 5: The Fallout / PagerDuty Chaos (14s - 18s) */}
      <Sequence from={420} durationInFrames={120}>
        <Scene5Fallout />
      </Sequence>

      {/* Scene 6: Outro (18s - 20s) */}
      <Sequence from={540} durationInFrames={60}>
        <Scene6Outro />
      </Sequence>

      {/* Cinematic Post-Processing Overlays */}
      <Vignette intensity={0.75} />
      <FilmGrain opacity={0.14} />
    </AbsoluteFill>
  );
};
