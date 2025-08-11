import { useSudoku } from '@/context/sudoku-context';
import { getConflicts, highlightGroup } from '@/utils/conflicts';
import clsx from 'clsx';
import { useEffect, useMemo, useRef } from 'react';

export default function Board() {
  const { board, fixed, selection, selectCell, setNumber, clearCell } =
    useSudoku();
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedKey = selection ? `${selection.row},${selection.col}` : null;

  const conflicts = useMemo(() => {
    if (!selection) return new Set<string>();
    const val = board[selection.row][selection.col];
    return getConflicts(board, selection.row, selection.col, val);
  }, [board, selection]);

  const group = useMemo(
    () =>
      selection
        ? highlightGroup(selection.row, selection.col)
        : new Set<string>(),
    [selection],
  );

  // keyboard support
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onKey = (e: KeyboardEvent) => {
      if (!selection) return;
      if (e.key === 'Backspace' || e.key === 'Delete' || e.key === '0') {
        e.preventDefault();
        clearCell();
        return;
      }
      if (e.key >= '1' && e.key <= '9') {
        e.preventDefault();
        setNumber(Number(e.key));
        return;
      }
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        e.preventDefault();
        const { row, col } = selection;
        const delta: Record<string, [number, number]> = {
          ArrowUp: [-1, 0],
          ArrowDown: [1, 0],
          ArrowLeft: [0, -1],
          ArrowRight: [0, 1],
        };
        const [dr, dc] = delta[e.key];
        const nr = (row + dr + 9) % 9;
        const nc = (col + dc + 9) % 9;
        selectCell(nr, nc);
      }
    };
    el.addEventListener('keydown', onKey);
    return () => el.removeEventListener('keydown', onKey);
  }, [selection, setNumber, clearCell, selectCell]);

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      role="grid"
      aria-label="Sudoku grid"
      className="shadow-lg outline-none select-none"
    >
      {board.map((row, r) => (
        <div
          role="row"
          key={r}
          className="grid grid-cols-9"
        >
          {row.map((val, c) => {
            const key = `${r},${c}`;
            const isFixed = fixed.has(key);
            const isSelected = key === selectedKey;
            const isConflict = conflicts.has(key);
            const inGroup = group.has(key);
            const thickBorders = clsx(
              r % 3 === 0 && 'border-t-4',
              c % 3 === 0 && 'border-l-4',
              r === 8 && 'border-b-4',
              c === 8 && 'border-r-4',
            );
            const base = clsx(
              'flex h-10 w-10 items-center justify-center border border-gray-900 md:h-12 md:h-14 md:w-12 md:w-14 dark:border-gray-100',
              'cursor-pointer text-2xl md:text-4xl',
              thickBorders,
              isFixed
                ? 'bg-gray-300 text-gray-800 dark:bg-gray-700 dark:text-gray-100'
                : 'bg-white2',
              inGroup &&
                !isSelected &&
                !isConflict &&
                'bg-blue-100 dark:bg-blue-950',
              isSelected &&
                !isFixed &&
                !isConflict &&
                'z-10 bg-accent-foreground text-white shadow-xl',
              isConflict && 'bg-red-100 dark:bg-red-900',
            );
            return (
              <div
                key={key}
                role="gridcell"
                aria-selected={isSelected}
                aria-label={`Row ${r + 1} Column ${c + 1} ${isFixed ? 'given' : 'empty'}`}
                className={base}
                onClick={() => selectCell(r, c)}
              >
                <span className={clsx('leading-none')}>{val || ''}</span>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
