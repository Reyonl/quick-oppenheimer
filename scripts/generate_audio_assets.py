import asyncio
import os
import math
import struct
import wave
import edge_tts

AUDIO_DIR = os.path.join(os.getcwd(), "public", "audio")
os.makedirs(AUDIO_DIR, exist_ok=True)

# -------------------------------------------------------------
# 1. Voiceover Generation with Edge-TTS (Christopher Nolan / Oppenheimer Style)
# -------------------------------------------------------------
VO_SCRIPTS = [
    {
        "filename": "vo_scene1.mp3",
        "text": "Friday. 4:59 PM. A lone engineer sits in the dark. One single push remains.",
        "rate": "-12%",
        "pitch": "-4Hz",
    },
    {
        "filename": "vo_scene2.mp3",
        "text": "His fingers tremble... over the forbidden command.",
        "rate": "-10%",
        "pitch": "-4Hz",
    },
    {
        "filename": "vo_scene3.mp3",
        "text": "Now I am become Developer... the Destroyer of Production.",
        "rate": "-14%",
        "pitch": "-5Hz",
    },
    {
        "filename": "vo_scene4.mp3",
        "text": "...It worked. But at what cost?",
        "rate": "-15%",
        "pitch": "-4Hz",
    },
    {
        "filename": "vo_scene5.mp3",
        "text": "Total collapse. All microservices... annihilated.",
        "rate": "-12%",
        "pitch": "-4Hz",
    },
    {
        "filename": "vo_scene6.mp3",
        "text": "Zero tests. No staging. Happy weekend, developers.",
        "rate": "-10%",
        "pitch": "-3Hz",
    },
]

async def generate_voiceovers():
    print("Generating Oppenheimer Voiceovers with edge-tts...")
    voice = "en-US-ChristopherNeural"
    for item in VO_SCRIPTS:
        out_path = os.path.join(AUDIO_DIR, item["filename"])
        communicate = edge_tts.Communicate(
            text=item["text"],
            voice=voice,
            rate=item["rate"],
            pitch=item["pitch"],
        )
        await communicate.save(out_path)
        print(f"Generated: {item['filename']} -> {out_path}")

# -------------------------------------------------------------
# 2. Cinematic Sound Effects Generation (Mathematical Synthesis)
# -------------------------------------------------------------
def save_wav(filename, samples, sample_rate=44100):
    filepath = os.path.join(AUDIO_DIR, filename)
    with wave.open(filepath, "w") as wav_file:
        wav_file.setnchannels(1)  # mono
        wav_file.setsampwidth(2)  # 16-bit
        wav_file.setframerate(sample_rate)
        # convert to 16-bit signed PCM
        raw_data = bytearray()
        for s in samples:
            val = max(-1.0, min(1.0, s))
            int_val = int(val * 32767)
            raw_data.extend(struct.pack("<h", int_val))
        wav_file.writeframes(raw_data)
    print(f"Synthesized SFX: {filename}")

def generate_sfx():
    sample_rate = 44100
    import random

    # SFX 1: Clock Tick (Mechanical wall clock)
    dur = 0.08
    n_samples = int(sample_rate * dur)
    tick = [0.0] * n_samples
    for i in range(n_samples):
        t = i / sample_rate
        decay = math.exp(-t * 120)
        sine = math.sin(2 * math.pi * 1800 * t)
        noise = (random.random() * 2 - 1) * 0.4
        tick[i] = (sine + noise) * decay * 0.8
    save_wav("clock_tick.wav", tick, sample_rate)

    # SFX 2: Mechanical Keyboard Typing Clack sequence (2 seconds of typing)
    dur = 2.0
    n_samples = int(sample_rate * dur)
    typing = [0.0] * n_samples
    key_hits = [0.05, 0.18, 0.32, 0.48, 0.65, 0.82, 0.98, 1.15, 1.32, 1.48, 1.62, 1.80]
    for hit_t in key_hits:
        start_idx = int(hit_t * sample_rate)
        click_dur = 0.04
        click_samples = int(sample_rate * click_dur)
        for i in range(click_samples):
            idx = start_idx + i
            if idx < n_samples:
                t = i / sample_rate
                decay = math.exp(-t * 150)
                freq = 2400 + random.uniform(-400, 400)
                click = math.sin(2 * math.pi * freq * t) + (random.random() * 2 - 1) * 0.6
                typing[idx] += click * decay * 0.6
    save_wav("keyboard_typing.wav", typing, sample_rate)

    # SFX 3: Ludwig Göransson Tension Violin Riser (4 seconds crescendo)
    dur = 4.0
    n_samples = int(sample_rate * dur)
    riser = [0.0] * n_samples
    for i in range(n_samples):
        t = i / sample_rate
        progress = t / dur
        # rising pitch from 120Hz to 880Hz
        cur_pitch = 120 * math.pow(880 / 120, progress)
        # saw-like harmonic layering (rich orchestral strings feel)
        val = 0.0
        for h in range(1, 6):
            phase = 2 * math.pi * cur_pitch * h * t
            val += (math.sin(phase) / h) * 0.4
        # add Shepard tone illusion & exponential amplitude swell
        amp = math.pow(progress, 2.2) * 0.95
        riser[i] = val * amp
    save_wav("tension_riser.wav", riser, sample_rate)

    # SFX 4: Hans Zimmer Atomic Boom (Massive Inception/Oppenheimer sub blast)
    dur = 4.5
    n_samples = int(sample_rate * dur)
    boom = [0.0] * n_samples
    filter_val = 0.0
    for i in range(n_samples):
        t = i / sample_rate
        # sub pitch sweep: 80Hz down to 22Hz
        pitch = 80 / (1 + t * 3.5)
        sub = math.sin(2 * math.pi * pitch * t) * 0.8
        sub2 = math.sin(2 * math.pi * (pitch * 0.5) * t) * 0.5

        # rumbling filtered noise shockwave
        raw_noise = random.random() * 2 - 1
        filter_val += 0.08 * (raw_noise - filter_val)

        attack = min(1.0, t / 0.02)
        decay = math.exp(-t * 0.8)
        boom[i] = (sub + sub2 + filter_val * 0.6) * attack * decay * 0.98
    save_wav("atomic_boom.wav", boom, sample_rate)

    # SFX 5: PagerDuty Emergency Siren
    dur = 3.5
    n_samples = int(sample_rate * dur)
    siren = [0.0] * n_samples
    for i in range(n_samples):
        t = i / sample_rate
        # 2-tone emergency oscillating beep
        freq = 880 if (int(t * 4) % 2 == 0) else 660
        wave_val = 1.0 if math.sin(2 * math.pi * freq * t) > 0 else -1.0
        # subtle envelope
        siren[i] = wave_val * 0.4
    save_wav("pagerduty_alarm.wav", siren, sample_rate)

    # SFX 6: Slack Ding
    dur = 0.5
    n_samples = int(sample_rate * dur)
    slack = [0.0] * n_samples
    for i in range(n_samples):
        t = i / sample_rate
        decay = math.exp(-t * 14)
        chime1 = math.sin(2 * math.pi * 1046.5 * t) # C6
        chime2 = math.sin(2 * math.pi * 1318.5 * t) # E6
        slack[i] = (chime1 * 0.6 + chime2 * 0.4) * decay * 0.7
    save_wav("slack_ding.wav", slack, sample_rate)

    # SFX 7: Dark Cinematic Sub Drone (Background ambience)
    dur = 20.0
    n_samples = int(sample_rate * dur)
    drone = [0.0] * n_samples
    for i in range(n_samples):
        t = i / sample_rate
        d1 = math.sin(2 * math.pi * 42.0 * t) * 0.35
        d2 = math.sin(2 * math.pi * 63.0 * t) * 0.2
        d3 = math.sin(2 * math.pi * (84.0 + math.sin(t * 0.5) * 2) * t) * 0.15
        drone[i] = d1 + d2 + d3
    save_wav("sub_drone.wav", drone, sample_rate)

async def main():
    await generate_voiceovers()
    generate_sfx()
    print("All Voiceovers and SFX generated successfully!")

if __name__ == "__main__":
    asyncio.run(main())
