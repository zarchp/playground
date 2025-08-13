import type { Difficulty } from '@/utils/sudoku-types';
import { formatClock } from '@/utils/time';
import { router, useForm } from '@inertiajs/react';
import confetti from 'canvas-confetti';
import { useEffect, useRef } from 'react';
import { Button } from '../ui/button';

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
  const fired = useRef(false);

  const { data, setData, post, processing, errors, reset, clearErrors } =
    useForm<{
      name: string;
      difficulty: Difficulty;
      time_seconds: number;
    }>({
      name: '',
      difficulty,
      time_seconds: timeSeconds,
    });

  useEffect(() => {
    if (open && !fired.current) {
      fired.current = true;
      confetti({ particleCount: 120, spread: 75, gravity: 0.8 });
    }
  }, [open]);

  useEffect(() => {
    setData('difficulty', difficulty);
  }, [difficulty, setData]);

  useEffect(() => {
    setData('time_seconds', timeSeconds);
  }, [timeSeconds, setData]);

  useEffect(() => {
    if (!open) {
      reset('name');
      clearErrors();
      fired.current = false;
    }
  }, [open, reset, clearErrors]);

  const submit = () => {
    post('/sudoku/score', {
      preserveScroll: true,
      onSuccess: () => {
        // After save, reload only the leaderboard prop from the page
        router.reload({
          only: ['leaderboard'],
          onSuccess: (page) => {
            const lb = (page.props as any).leaderboard ?? [];
            onSubmitted(lb);
            onClose();
            reset('name');
          },
        });
      },
    });
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
          Time: <b>{formatClock(data.time_seconds)}</b>
        </p>

        <label
          className="mb-1 block text-sm font-medium"
          htmlFor="name"
        >
          Name
        </label>
        <input
          id="name"
          className="mb-1 w-full rounded-lg border px-3 py-2"
          value={data.name}
          onChange={(e) => setData('name', e.target.value)}
          placeholder="Your name"
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? 'name-error' : undefined}
        />
        {errors.name && (
          <p
            id="name-error"
            className="mb-3 text-sm text-red-600"
          >
            {errors.name}
          </p>
        )}
        {errors.time_seconds && (
          <p
            id="time_seconds-error"
            className="mb-3 text-sm text-red-600"
          >
            {errors.time_seconds}
          </p>
        )}

        <div className="mt-4 flex justify-end gap-2">
          <button
            className="rounded-lg px-3 py-1.5"
            onClick={onClose}
            disabled={processing}
          >
            Close
          </button>
          <Button
            onClick={submit}
            disabled={processing || !data.name.trim()}
          >
            {processing ? 'Submitting…' : 'Submit Score'}
          </Button>
        </div>
      </div>
    </div>
  );
}
