# Oppenheimer: "Destroyer of Production" 🎬🔥

> *"Now I am become Developer, the Destroyer of Production."*

A dramatic, cinematic 9:16 vertical video built purely in code using **Remotion (React + TypeScript)**. Parodies the iconic Christopher Nolan *Oppenheimer* aesthetic for Friday afternoon direct-to-production pushes.

---

## 📽️ Video Features

- **Format:** 9:16 Vertical (1080 x 1920) at 30 FPS, 20 seconds duration (600 frames). Perfect for TikTok, YouTube Shorts, and Instagram Reels.
- **Cinematic Overlays:** Procedural 70mm IMAX film grain (`FilmGrain.tsx`), lens vignette, and chromatic aberration.
- **Procedural Sound Engine:** Pure mathematical WAV PCM synthesis (`audioGenerator.ts`) generating heartbeat thumps, Geiger counter clicks, tech countdown beeps, atomic explosion bass sweeps, and emergency siren glitches without external network dependencies.
- **Visual FX:** High-performance HTML5 Canvas procedural shockwaves, plasma fireballs with turbulent flame rings, and explosive particle debris.

---

## ⏱️ Timeline & Scene Breakdown

1. **Scene 1 (0s - 3s / Frames 0-90): The Inciting Incident**
   - Los Alamos Codebase, Friday 4:59 PM.
   - Heartbeat pulsing and Geiger counter clicks as the clock ticks towards 5:00 PM.
2. **Scene 2 (3s - 6s / Frames 90-180): The Forbidden Command**
   - Terminal prompt typing: `git push --force origin main`.
   - Critical Safety Interlock warnings.
3. **Scene 3 (6s - 10s / Frames 180-300): The Quote & Countdown**
   - Dramatic typography: *"Now I am become Developer... the Destroyer of Production."*
   - Detonation countdown: `3... 2... 1...` with camera tremors.
4. **Scene 4 (10s - 14s / Frames 300-420): The Trinity Blast**
   - Blinding white flash into procedural nuclear fireball and shockwave rings.
   - Bugs flying out in 360° (`NullPointerException`, `ECONNREFUSED`, `DROP DATABASE CASCADE`, `OOM Killed`).
5. **Scene 5 (14s - 18s / Frames 420-540): The Fallout**
   - Emergency red rotating strobe light.
   - PagerDuty SEV-0 alert, Slack CTO ping (*"WHO COMMITTED DIRECTLY TO MAIN?!"*), and DBA panic.
6. **Scene 6 (18s - 20s / Frames 540-600): Outro**
   - Floating fire embers.
   - *"Zero tests. No staging. Pure confidence. Happy weekend, developers."*

---

## 🚀 Quick Start

### 1. Interactive Preview (Remotion Studio)
Launch the interactive web preview with real-time scrubber and timeline:
```bash
npm start
```

### 2. Render Full Video (MP4)
Render the complete 20-second video with audio:
```bash
npm run build
```
The output file will be saved to `out/oppenheimer-production.mp4`.

### 3. Render Still Frames
Render a single frame as high-resolution PNG:
```bash
# Render explosion peak (frame 330)
npm run still
```

### 4. Type Checking
```bash
npm run typecheck
```
