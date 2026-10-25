# Oppenheimer: "Destroyer of Production" 🎬🔥

> *"Now I am become Developer, the Destroyer of Production."*

A dramatic, cinematic 9:16 vertical video built purely in code using **Remotion (React + TypeScript)**. Parodies the iconic Christopher Nolan *Oppenheimer* aesthetic for Friday afternoon direct-to-production pushes.

---

## 📽️ Video Features

- **Format:** 9:16 Vertical (1080 x 1920) at 30 FPS, 20 seconds duration (600 frames). Ready for TikTok, YouTube Shorts, and Instagram Reels.
- **AI Voiceover (Edge-TTS):** Haunting baritone whisper narration (`en-US-ChristopherNeural`) styled after Cillian Murphy / Christopher Nolan's *Oppenheimer*.
- **Dynamic Animated Subtitles:** TikTok-style kinetic captions (`CinematicSubtitles.tsx`) with keyword highlighting and translucent blur cards for instant viewer comprehension (even on mute).
- **Cinematic Overlays:** Procedural 70mm IMAX film grain (`FilmGrain.tsx`), anamorphic vignette, and chromatic aberration.
- **Cinematic SFX Suite:** 
  - Mechanical blue-switch keyboard typing (`keyboard_typing.wav`)
  - Ludwig Göransson-style rising Shepard/violin crescendo (`tension_riser.wav`)
  - Hans Zimmer massive atomic boom shockwave (`atomic_boom.wav`)
  - PagerDuty SEV-0 emergency alarm siren (`pagerduty_alarm.wav`)
  - Slack notification chime (`slack_ding.wav`)
  - Deep 40Hz room tone drone (`sub_drone.wav`)
- **Visual FX:** High-performance HTML5 Canvas procedural shockwaves, plasma fireballs with turbulent flame rings, and explosive particle debris.

---

## ⏱️ Timeline & Scene Breakdown

1. **Scene 1 (0s - 3s / Frames 0-90): The Inciting Incident**
   - Los Alamos Codebase, Friday 4:59 PM.
   - *VO:* "Friday. 4:59 PM. A lone engineer sits in the dark. One single push remains."
   - Clock ticking & heartbeat pulse.
2. **Scene 2 (3s - 6s / Frames 90-180): The Forbidden Command**
   - Terminal typing: `git push --force origin main`.
   - *VO:* "His fingers tremble... over the forbidden command."
   - Mechanical keyboard clacks + critical safety interlock alarms.
3. **Scene 3 (6s - 10s / Frames 180-300): The Quote & Countdown**
   - *VO:* "Now I am become Developer... the Destroyer of Production."
   - Ludwig Göransson violin riser + Trinity countdown `3... 2... 1...`.
4. **Scene 4 (10s - 14s / Frames 300-420): The Trinity Blast**
   - Blinding white flash -> Hans Zimmer atomic boom with plasma fireball.
   - *VO (whisper):* "...It worked. But at what cost?"
   - Bugs flying out in 360° (`NullPointerException`, `DROP DATABASE`, `ECONNREFUSED`).
5. **Scene 5 (14s - 18s / Frames 420-540): The Fallout**
   - Emergency red rotating strobe light + PagerDuty SEV-0 alarm & Slack CTO ping.
   - *VO:* "Total collapse. All microservices... annihilated."
6. **Scene 6 (18s - 20s / Frames 540-600): Outro**
   - Floating fire embers.
   - *VO:* "Zero tests. No staging. Happy weekend, developers."

---

## 🚀 Quick Start

### 1. Interactive Preview (Remotion Studio)
Launch the interactive web preview with real-time scrubber and timeline:
```bash
npm start
```

### 2. Render Full Video (MP4)
Render the complete 20-second video with audio & voiceover:
```bash
npm run build
```
The output file is saved to `out/oppenheimer-production.mp4`.

### 3. Generate Audio Assets (Optional)
```bash
python scripts/generate_audio_assets.py
```

### 4. Type Checking
```bash
npm run typecheck
```
