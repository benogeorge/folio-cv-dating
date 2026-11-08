const adjectives = [
  "Arctic", "Nova", "Lunar", "Solar", "Cosmic", "Neon", "Prism", "Echo",
  "Drift", "Flux", "Volt", "Zinc", "Apex", "Core", "Deep", "Edge",
  "Flow", "Grid", "Haze", "Iron", "Vesper", "Cipher", "Aura", "Quantum"
];

const nouns = [
  "Volta", "Crest", "Pulse", "Bloom", "Stone", "Flame", "Wave", "Drift",
  "Storm", "Forge", "Light", "Mist", "Peak", "Ridge", "Shore", "Vale",
  "Wind", "Zeal", "Beacon", "Nexus", "Solace", "Kite", "Quark", "Zenith"
];

export function generateCodename(): string {
  const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  const num = Math.floor(Math.random() * 90) + 10;
  return `${adj}_${noun}_${num}`;
}
