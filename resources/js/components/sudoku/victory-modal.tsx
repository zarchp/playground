import type { Difficulty } from '@/utils/sudoku-types';
import confetti from 'canvas-confetti';
import { useEffect, useRef, useState } from 'react';

export default function VictoryModal({
  open,
  onClose,
  difficulty,
  timeSeconds,
  onSubmitted,
}: {
  open: boolean;
  onClose: () => void;
  difficulty: Difficulty;
  timeSeconds: number;
  onSubmitted: (leaderboard: any[]) => void;
}) {
  const [name, setName] = useState('');
  const fired = useRef(false);

  useEffect(() => {
    if (open && !fired.current) {
      fired.current = true;
      confetti({ particleCount: 120, spread: 75, gravity: 0.8 });
    }
  }, [open]);

  const submit = async () => {
    const res = await fetch('/sudoku/score', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN':
          (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement)
            ?.content ?? '',
      },
      body: JSON.stringify({ name, difficulty, time_seconds: timeSeconds }),
    });
    const data = await res.json();
    onSubmitted(data.leaderboard);
    onClose();
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Victory"
    >
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
        <h2 className="mb-2 text-2xl font-bold">Congrats, you win! 🎉</h2>
        <p className="mb-4">
          Time: <b>{Math.floor(timeSeconds)}s</b>
        </p>
        <label className="mb-1 block text-sm font-medium">Name</label>
        <input
          className="mb-4 w-full rounded-lg border px-3 py-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
        />
        <div className="flex justify-end gap-2">
          <button
            className="rounded-lg px-3 py-1.5"
            onClick={onClose}
          >
            Close
          </button>
          <button
            className="rounded-lg bg-blue-600 px-3 py-1.5 text-white"
            onClick={submit}
            disabled={!name.trim()}
          >
            Submit Score
          </button>
        </div>
      </div>
    </div>
  );
}
