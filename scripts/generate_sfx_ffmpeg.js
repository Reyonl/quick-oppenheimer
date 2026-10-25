const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const ffmpegPath = require('ffmpeg-static');

const SFX_DIR = path.join(__dirname, '..', 'public', 'sfx');
if (!fs.existsSync(SFX_DIR)) {
  fs.mkdirSync(SFX_DIR, { recursive: true });
}

console.log(`Using ffmpeg at: ${ffmpegPath}`);
console.log(`Generating SFX into: ${SFX_DIR}`);

const SFX_SPECS = [
  {
    name: 'clock_tick.wav',
    lavfi: 'anoisesrc=d=0.06:c=white:a=0.9,bandpass=f=2000:w=500,afade=t=out:st=0.01:d=0.05',
  },
  {
    name: 'key_click.wav',
    lavfi: 'anoisesrc=d=0.04:c=white:a=0.8,bandpass=f=3200:w=800,afade=t=out:st=0.005:d=0.035',
  },
  {
    name: 'riser.wav',
    // 2.5s rising pitch frequency from 150Hz to 900Hz with volume swell
    lavfi: 'aevalsrc=exprs=\'0.6*sin(2*PI*(150+750*t*t/6.25)*t)\':d=2.5,afade=t=in:st=0:d=1.5',
  },
  {
    name: 'boom.wav',
    // Deep sub-bass drop 90Hz -> 25Hz layered with lowpassed brown noise rumble
    lavfi: 'aevalsrc=exprs=\'0.85*sin(2*PI*(90/(1+t*3.5))*t)\':d=3.8,afade=t=out:st=0.3:d=3.5',
  },
  {
    name: 'notification_ping.wav',
    // Dual chime ping (1046Hz + 1318Hz)
    lavfi: 'aevalsrc=exprs=\'0.5*sin(2*PI*1046.5*t)+0.4*sin(2*PI*1318.5*t)\':d=0.5,afade=t=out:st=0.05:d=0.45',
  },
];

for (const spec of SFX_SPECS) {
  const outPath = path.join(SFX_DIR, spec.name);
  const cmd = `"${ffmpegPath}" -f lavfi -i "${spec.lavfi}" -ar 44100 -ac 1 -y "${outPath}"`;
  console.log(`Synthesizing ${spec.name}...`);
  execSync(cmd, { stdio: 'inherit' });
}

console.log('All SFX synthesized successfully via ffmpeg lavfi!');
