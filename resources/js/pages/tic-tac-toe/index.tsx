import { GameBoard } from '@/components/tic-tac-toe/game-board';
import { Button } from '@/components/ui/button';
import { GameProvider, useGame } from '@/context/tic-tac-toe-context';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import clsx from 'clsx';

export default function TicTacToePage() {
  const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Home', href: route('home') },
    { title: 'Tic Tac Toe', href: route('tic-tac-toe.index') },
  ];

  return (
    <GameProvider>
      <AppLayout breadcrumbs={breadcrumbs}>
        <Head title="Tic Tac Toe" />
        <TicTacToeUI />
      </AppLayout>
    </GameProvider>
  );
}

function TicTacToeUI() {
  const {
    isXNext,
    winner,
    isDraw,
    mode,
    score,
    handleReset,
    handleModeChange,
  } = useGame();
  const modes = [
    { key: 'PVP', label: 'Player vs Player' },
    { key: 'EASY', label: 'vs Bot (Easy)' },
    { key: 'MEDIUM', label: 'vs Bot (Medium)' },
    { key: 'HARD', label: 'vs Bot (Hard)' },
  ];

  return (
    <div className="flex h-full flex-1 flex-col items-center justify-center gap-4 overflow-x-auto p-4">
      <div className="flex flex-col gap-12">
        <div className="mx-auto my-4 flex w-full max-w-xs gap-4">
          <select
            value={mode}
            onChange={(e) => handleModeChange(e.target.value as any)}
            className="w-full rounded border px-4 py-2"
          >
            {modes.map((mode) => (
              <option
                key={mode.key}
                value={mode.key}
                className="dark:bg-background"
              >
                {mode.label}
              </option>
            ))}
          </select>
          <Button
            variant={'secondary'}
            onClick={handleReset}
          >
            Reset
          </Button>
        </div>
        <GameBoard />
        <div className="flex justify-between gap-8 text-center">
          <div
            className={clsx('w-full rounded border px-2 py-4', {
              'bg-sky-300 dark:bg-sky-700': isXNext && !winner && !isDraw,
              'bg-green-300 dark:bg-green-700': winner === 'X',
              'bg-background': !isXNext && !winner,
            })}
          >
            <div>Player X</div>
            <div className="text-xl font-bold">{score.X}</div>
          </div>
          <div
            className={clsx('w-full rounded border px-2 py-4', {
              'bg-green-300 dark:bg-green-700': isDraw,
              'bg-background': !isDraw,
            })}
          >
            <div>Draw</div>
            <div className="text-xl font-bold">{score.Draw}</div>
          </div>
          <div
            className={clsx('w-full rounded border px-2 py-4', {
              'bg-sky-300 dark:bg-sky-700': !isXNext && !winner && !isDraw,
              'bg-green-300 dark:bg-green-700': winner === 'O',
              'bg-background': isXNext && !winner,
            })}
          >
            <div>{mode === 'PVP' ? 'Player' : 'Bot'} O</div>
            <div className="text-xl font-bold">{score.O}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
