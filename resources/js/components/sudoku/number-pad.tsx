import { useSudoku } from '@/context/sudoku-context';
import clsx from 'clsx';
import { useState } from 'react';
import { Button } from '../ui/button';

export default function NumberPad() {
  const { setNumber } = useSudoku();
  const [hover, setHover] = useState<number | null>(null);

  return (
    <div className="mt-4 grid grid-cols-5 gap-2 px-2 md:grid-cols-10">
      {Array.from({ length: 9 }, (_, i) => i + 1).map((n) => (
        <Button
          variant="secondary"
          key={n}
          type="button"
          className={clsx(
            'h-11 w-11 cursor-pointer border text-xl shadow-sm transition hover:shadow',
          )}
          onMouseEnter={() => setHover(n)}
          onMouseLeave={() => setHover(null)}
          onClick={() => setNumber(n)}
          aria-label={`Number ${n}`}
        >
          {n}
        </Button>
      ))}
      <Button
        variant="destructiveOutline"
        key="0"
        type="button"
        className={clsx(
          'h-11 w-11 cursor-pointer border shadow-sm transition hover:shadow',
        )}
        onMouseEnter={() => setHover(null)}
        onMouseLeave={() => setHover(null)}
        onClick={() => setNumber(0)}
        aria-label={`X`}
      >
        X
      </Button>
    </div>
  );
}
