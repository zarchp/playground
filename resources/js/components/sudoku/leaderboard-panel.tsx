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
    console.log(data);
  };

  useEffect(() => {
    load(difficulty);
  }, [difficulty]);

  return (
    <div className="rounded-2xl bg-background p-4 shadow-lg">
      <div className="mb-3 flex justify-center">
        <Tabs>
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
      </div>
      <ol className="max-h-80 space-y-1 overflow-auto pr-2">
        {rows.map((r, i) => (
          <li
            key={i}
            className="flex justify-between text-sm"
          >
            <span className="mr-2 truncate">
              {i + 1}. {r.name}
            </span>
            <span className="font-mono">{formatTime(r.time_seconds)}</span>
          </li>
        ))}
        {!rows.length && (
          <p className="text-sm text-gray-500">No scores yet.</p>
        )}
      </ol>
    </div>
  );
}
