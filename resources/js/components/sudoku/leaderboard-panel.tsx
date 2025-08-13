import { formatTime } from '@/hooks/use-timer';
import type { Difficulty } from '@/utils/sudoku-types';
import { useEffect, useState } from 'react';
import { Tabs, TabsList, TabsTrigger } from '../ui/tabs';

export default function LeaderboardPanel({
  defaultDifficulty,
}: {
  defaultDifficulty: Difficulty;
}) {
  const [difficulty, setDifficulty] = useState<Difficulty>(defaultDifficulty);
  const [rows, setRows] = useState<
    { name: string; time_seconds: number; created_at: string }[]
  >([]);

  const load = async (d: Difficulty) => {
    const res = await fetch(`/sudoku/leaderboard?difficulty=${d}`);
    const data = await res.json();
    setRows(data.leaderboard);
  };

  useEffect(() => {
    load(difficulty);
  }, [difficulty]);

  const medalColors = {
    1: 'bg-yellow-300 text-yellow-900', // gold
    2: 'bg-gray-300 text-gray-900', // silver
    3: 'bg-amber-600 text-amber-50', // bronze
  };

  const medals = {
    1: '🥇',
    2: '🥈',
    3: '🥉',
  };

  return (
    <div className="flex flex-col items-center gap-2 rounded border bg-background p-4 shadow">
      {/* <div className="mb-3 flex flex-col items-center justify-center gap-4"> */}
      <h1 className="text-2xl font-semibold">Leaderboard</h1>
      <Tabs defaultValue="easy">
        <TabsList>
          {(['easy', 'medium', 'hard'] as Difficulty[]).map((d) => (
            <TabsTrigger
              className="cursor-pointer capitalize data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              key={d}
              value={d}
              onClick={() => setDifficulty(d)}
            >
              {d}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
      {/* </div> */}
      <ol className="flex max-h-80 w-full flex-col items-stretch space-y-1 overflow-auto pr-2">
        {rows.map((r, i) => {
          const pos = i + 1;
          const isTop3 = pos <= 3;

          return (
            <li
              key={i}
              className={`flex items-center justify-between rounded-lg p-2`}
            >
              <span className="mr-2 truncate">
                {isTop3 ? (
                  <span className="">{medals[pos as 1 | 2 | 3]}</span>
                ) : (
                  <span className="mr-1 ml-1.5 w-8 text-right">{pos}.</span>
                )}
                {r.name}
              </span>
              <span className="font-mono">{formatTime(r.time_seconds)}</span>
            </li>
          );
        })}
        {!rows.length && (
          <p className="text-sm text-gray-500">No scores yet.</p>
        )}
      </ol>
    </div>
  );
}
