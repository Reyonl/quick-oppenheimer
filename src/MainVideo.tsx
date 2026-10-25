import React from 'react';
import { AbsoluteFill, Sequence } from 'remotion';
import { AudioTrack } from './components/AudioTrack';
import { Camera } from './components/Camera';
import { FilmGrain } from './components/FilmGrain';
import { Vignette } from './components/Vignette';
import { Scene1Hook } from './scenes/Scene1Hook';
import { Scene2Command } from './scenes/Scene2Command';
import { Scene3Quote } from './scenes/Scene3Quote';
import { Scene4Countdown } from './scenes/Scene4Countdown';
import { Scene5Blast } from './scenes/Scene5Blast';
import { Scene6Fallout } from './scenes/Scene6Fallout';
import { Scene7Moral } from './scenes/Scene7Moral';

// ==========================================
// SCENE TIMING CONSTANTS (Total: 600 frames)
// ==========================================
export const SCENE_1_HOOK = { from: 0, durationInFrames: 60 };
export const SCENE_2_COMMAND = { from: 60, durationInFrames: 90 };
export const SCENE_3_QUOTE = { from: 150, durationInFrames: 90 };
export const SCENE_4_COUNTDOWN = { from: 240, durationInFrames: 70 };
export const SCENE_5_BLAST = { from: 310, durationInFrames: 110 };
export const SCENE_6_FALLOUT = { from: 420, durationInFrames: 120 };
export const SCENE_7_MORAL = { from: 540, durationInFrames: 60 };

export const MainVideo: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: '#000000', overflow: 'hidden' }}>
      {/* Central Audio Engine: Full Sound Design & Oppenheimer Voiceover */}
      <AudioTrack />

      {/* Shared Camera Wrapper: Push-in + Exponentially Decaying Seeded Shake + Impact Flash & Chromatic Aberration */}
      <Camera>
        {/* Scene 1: HOOK (0-60) */}
        <Sequence
          from={SCENE_1_HOOK.from}
          durationInFrames={SCENE_1_HOOK.durationInFrames}
        >
          <Scene1Hook />
        </Sequence>

        {/* Scene 2: THE COMMAND (60-150) */}
        <Sequence
          from={SCENE_2_COMMAND.from}
          durationInFrames={SCENE_2_COMMAND.durationInFrames}
        >
          <Scene2Command />
        </Sequence>

        {/* Scene 3: THE QUOTE (150-240) */}
        <Sequence
          from={SCENE_3_QUOTE.from}
          durationInFrames={SCENE_3_QUOTE.durationInFrames}
        >
          <Scene3Quote />
        </Sequence>

        {/* Scene 4: COUNTDOWN (240-310) */}
        <Sequence
          from={SCENE_4_COUNTDOWN.from}
          durationInFrames={SCENE_4_COUNTDOWN.durationInFrames}
        >
          <Scene4Countdown />
        </Sequence>

        {/* Scene 5: BLAST (310-420) */}
        <Sequence
          from={SCENE_5_BLAST.from}
          durationInFrames={SCENE_5_BLAST.durationInFrames}
        >
          <Scene5Blast />
        </Sequence>

        {/* Scene 6: FALLOUT (420-540) */}
        <Sequence
          from={SCENE_6_FALLOUT.from}
          durationInFrames={SCENE_6_FALLOUT.durationInFrames}
        >
          <Scene6Fallout />
        </Sequence>

        {/* Scene 7: MORAL (540-600) */}
        <Sequence
          from={SCENE_7_MORAL.from}
          durationInFrames={SCENE_7_MORAL.durationInFrames}
        >
          <Scene7Moral />
        </Sequence>
      </Camera>

      {/* Cinematic Vignette & 70mm Film Grain */}
      <Vignette intensity={0.75} />
      <FilmGrain opacity={0.12} />
    </AbsoluteFill>
  );
};
