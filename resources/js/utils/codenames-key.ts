export type Team = 'red' | 'blue';
export type CellType = Team | 'neutral' | 'assassin';

export type KeyCard = {
  startingTeam: Team;
  grid: CellType[][];
  seed?: string | null;
};

function mulberry32(seed: number) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function hashSeed(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h += (h << 1) + (h << 4) + (h << 7) + (h << 8) + (h << 24);
  }
  return h >>> 0;
}

function shuffleInPlace<T>(arr: T[], rng: () => number) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

export function generateKey(
  seed?: string | null,
  forceStartingTeam?: Team,
): KeyCard {
  const rng = seed
    ? mulberry32(hashSeed(seed))
    : mulberry32(Math.floor(Math.random() * 2 ** 31));
  const startingTeam: Team =
    forceStartingTeam ?? (rng() < 0.5 ? 'red' : 'blue');

  const counts =
    startingTeam === 'red'
      ? { red: 9, blue: 8, neutral: 7, assassin: 1 }
      : { red: 8, blue: 9, neutral: 7, assassin: 1 };

  const bag: CellType[] = [
    ...Array<CellType>(counts.red).fill('red'),
    ...Array<CellType>(counts.blue).fill('blue'),
    ...Array<CellType>(counts.neutral).fill('neutral'),
    'assassin',
  ];

  shuffleInPlace(bag, rng);

  const grid: CellType[][] = [];
  for (let r = 0; r < 5; r++) grid.push(bag.slice(r * 5, r * 5 + 5));

  return { startingTeam, grid, seed: seed ?? null };
}
