import React from 'react';
import { Sequence, Audio, staticFile } from 'remotion';

export const AudioTrack: React.FC = () => {
  return (
    <>
      {/* 0. Ambient Cinematic Room Tone Drone (0 - 600) */}
      <Sequence from={0} durationInFrames={600}>
        <Audio src={staticFile('sfx/sub_drone.wav')} volume={0.35} />
      </Sequence>

      {/* ==================================================== */}
      {/* SCENE 1: HOOK (Frames 0 - 60)                        */}
      {/* ==================================================== */}
      {/* Clock ticks on 16:59:57 and 16:59:58 */}
      <Sequence from={0} durationInFrames={15}>
        <Audio src={staticFile('sfx/clock_tick.wav')} volume={0.85} />
      </Sequence>
      <Sequence from={30} durationInFrames={15}>
        <Audio src={staticFile('sfx/clock_tick.wav')} volume={0.85} />
      </Sequence>
      {/* Voiceover 1 */}
      <Sequence from={4} durationInFrames={56}>
        <Audio src={staticFile('audio/vo_scene1.mp3')} volume={1.0} />
      </Sequence>

      {/* ==================================================== */}
      {/* SCENE 2: THE COMMAND (Frames 60 - 150)               */}
      {/* ==================================================== */}
      {/* Voiceover 2 */}
      <Sequence from={62} durationInFrames={75}>
        <Audio src={staticFile('audio/vo_scene2.mp3')} volume={1.0} />
      </Sequence>
      {/* Mechanical Keyboard Typing sequence */}
      <Sequence from={65} durationInFrames={55}>
        <Audio src={staticFile('sfx/keyboard_typing.wav')} volume={0.8} />
      </Sequence>
      {/* Critical Interlock Warning Alert Ping */}
      <Sequence from={102} durationInFrames={25}>
        <Audio src={staticFile('sfx/notification_ping.wav')} volume={0.7} />
      </Sequence>
      {/* Enter key punch */}
      <Sequence from={140} durationInFrames={15}>
        <Audio src={staticFile('sfx/key_click.wav')} volume={1.0} />
      </Sequence>

      {/* ==================================================== */}
      {/* SCENE 3: THE QUOTE (Frames 150 - 240)                */}
      {/* ==================================================== */}
      {/* Voiceover 3 */}
      <Sequence from={152} durationInFrames={85}>
        <Audio src={staticFile('audio/vo_scene3.mp3')} volume={1.0} />
      </Sequence>

      {/* ==================================================== */}
      {/* SCENE 4: COUNTDOWN (Frames 240 - 310)                */}
      {/* ==================================================== */}
      {/* Riser: frames 240 to 298 (stops at 298 for 12 frames of DEAD SILENCE!) */}
      <Sequence from={240} durationInFrames={58}>
        <Audio src={staticFile('sfx/riser.wav')} volume={0.9} />
      </Sequence>
      {/* Countdown pings on 3, 2, 1 */}
      <Sequence from={240} durationInFrames={15}>
        <Audio src={staticFile('sfx/clock_tick.wav')} volume={0.8} />
      </Sequence>
      <Sequence from={265} durationInFrames={15}>
        <Audio src={staticFile('sfx/clock_tick.wav')} volume={0.9} />
      </Sequence>
      <Sequence from={290} durationInFrames={8}>
        <Audio src={staticFile('sfx/clock_tick.wav')} volume={1.0} />
      </Sequence>
      {/* Frames 298 to 310: 12 frames of TOTAL DEAD SILENCE */}

      {/* ==================================================== */}
      {/* SCENE 5: BLAST (Frames 310 - 420)                    */}
      {/* ==================================================== */}
      {/* Massive Atomic Boom Detonation */}
      <Sequence from={310} durationInFrames={110}>
        <Audio src={staticFile('sfx/boom.wav')} volume={1.0} />
      </Sequence>
      {/* Voiceover 4 (whisper: "...It worked. But at what cost?") */}
      <Sequence from={345} durationInFrames={65}>
        <Audio src={staticFile('audio/vo_scene4.mp3')} volume={1.0} />
      </Sequence>

      {/* ==================================================== */}
      {/* SCENE 6: FALLOUT (Frames 420 - 540)                  */}
      {/* ==================================================== */}
      {/* PagerDuty SEV-0 siren alarm */}
      <Sequence from={425} durationInFrames={110}>
        <Audio src={staticFile('sfx/pagerduty_alarm.wav')} volume={0.5} />
      </Sequence>
      {/* Slack notification pings as messages spring in */}
      <Sequence from={425} durationInFrames={18}>
        <Audio src={staticFile('sfx/notification_ping.wav')} volume={0.85} />
      </Sequence>
      <Sequence from={445} durationInFrames={18}>
        <Audio src={staticFile('sfx/notification_ping.wav')} volume={0.85} />
      </Sequence>
      <Sequence from={465} durationInFrames={18}>
        <Audio src={staticFile('sfx/notification_ping.wav')} volume={0.85} />
      </Sequence>
      <Sequence from={485} durationInFrames={18}>
        <Audio src={staticFile('sfx/notification_ping.wav')} volume={0.9} />
      </Sequence>
      <Sequence from={505} durationInFrames={30}>
        <Audio src={staticFile('sfx/notification_ping.wav')} volume={1.0} />
      </Sequence>
      {/* Voiceover 5 */}
      <Sequence from={425} durationInFrames={110}>
        <Audio src={staticFile('audio/vo_scene5.mp3')} volume={1.0} />
      </Sequence>

      {/* ==================================================== */}
      {/* SCENE 7: MORAL (Frames 540 - 600)                    */}
      {/* ==================================================== */}
      <Sequence from={540} durationInFrames={15}>
        <Audio src={staticFile('sfx/clock_tick.wav')} volume={0.8} />
      </Sequence>
      <Sequence from={558} durationInFrames={15}>
        <Audio src={staticFile('sfx/clock_tick.wav')} volume={0.85} />
      </Sequence>
      <Sequence from={576} durationInFrames={22}>
        <Audio src={staticFile('sfx/notification_ping.wav')} volume={0.9} />
      </Sequence>
      {/* Voiceover 6 */}
      <Sequence from={545} durationInFrames={55}>
        <Audio src={staticFile('audio/vo_scene6.mp3')} volume={1.0} />
      </Sequence>
    </>
  );
};
