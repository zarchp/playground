import { useSudoku } from '@/context/sudoku-context';
import { formatTime, useTimer } from '@/hooks/use-timer';
import type { Difficulty } from '@/utils/sudoku-types';
import { useEffect, useMemo, useState } from 'react';
import { Button } from '../ui/button';

function bestKey(d: Difficulty) {
  return `sudoku_best_${d}`;
}

export default function Toolbar({
  onWin,
}: {
  onWin: (timeSeconds: number) => void;
}) {
  const {
    board,
    giveHint,
    resetBoard,
    difficulty,
    setDifficulty,
    won,
    movesCount,
  } = useSudoku();
  const { seconds, reset, pause } = useTimer(movesCount > 0 && !won);
  const [best, setBest] = useState<number | null>(null);
  const emptyCount = useMemo(
    () => board.flat().filter((x) => x === 0).length,
    [board],
  );

  useEffect(() => {
    const v = localStorage.getItem(bestKey(difficulty));
    setBest(v ? Number(v) : null);
  }, [difficulty]);

  useEffect(() => {
    if (won) {
      pause();
      const t = Math.floor(seconds);
      const prev = best ?? Infinity;
      if (t < prev) {
        localStorage.setItem(bestKey(difficulty), String(t));
        setBest(t);
      }
      onWin(t);
    }
  }, [won]);

  const newGame = async (d: Difficulty) => {
    setDifficulty(d);
    const res = await fetch('/sudoku/new', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN':
          (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement)
            ?.content ?? '',
      },
      body: JSON.stringify({ difficulty: d }),
    });
    const data = await res.json();
    resetBoard(data.puzzle);
    reset();
  };

  const check = () => {
    if (!won) alert('Not solved yet. Keep going!');
  };

  return (
    <div className="flex flex-col flex-wrap items-center gap-2">
      <div className="flex gap-2">
        <select
          value={difficulty}
          onChange={(e) => newGame(e.target.value as Difficulty)}
          className="rounded-lg border px-2 py-1"
          aria-label="Difficulty selector"
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>

        <Button onClick={() => newGame(difficulty)}>Play Again</Button>
        <Button
          variant="outline"
          onClick={check}
        >
          Check
        </Button>
        <Button
          variant="outline"
          onClick={giveHint}
        >
          Hint
        </Button>
      </div>

      <div className="flex items-center gap-3">
        {/* <span className="text-sm">
          Empty: <b>{emptyCount}</b>
        </span> */}
        <span
          aria-live="polite"
          className="font-mono text-2xl"
        >
          {formatTime(seconds)}
        </span>
        {/* <span className="text-sm">
          Best: <b>{best != null ? formatTime(best) : '—'}</b>
        </span> */}
      </div>
    </div>
  );
}
