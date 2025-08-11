import BoardGrid from '@/components/sudoku/board';
import LeaderboardPanel from '@/components/sudoku/leaderboard-panel';
import NumberPad from '@/components/sudoku/number-pad';
import Toolbar from '@/components/sudoku/toolbar';
import VictoryModal from '@/components/sudoku/victory-modal';
import { SudokuProvider, useSudoku } from '@/context/sudoku-context';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import type { Board, Difficulty } from '@/utils/sudoku-types';
import { Head, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function Index() {
  const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Home', href: route('home') },
    { title: 'Sudoku', href: route('sudoku.index') },
  ];

  const { props } = usePage<{
    initialPuzzle: Board;
    difficulty: Difficulty;
    leaderboard: any[];
  }>();
  const [leaderboard, setLeaderboard] = useState(props.leaderboard);

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Sudoku" />

      <div className="flex h-full justify-center md:items-center">
        <div className="mx-auto max-w-6xl space-y-4 p-4">
          <SudokuProvider
            initialPuzzle={props.initialPuzzle}
            initialDifficulty={props.difficulty}
          >
            <Main onLeaderboard={(lb) => setLeaderboard(lb)} />
          </SudokuProvider>
        </div>
      </div>
    </AppLayout>
  );
}

function Main({ onLeaderboard }: { onLeaderboard: (lb: any[]) => void }) {
  const { difficulty, won } = useSudoku();
  const [open, setOpen] = useState(false);
  const [timeSeconds, setTimeSeconds] = useState(0);

  return (
    <div className="grid items-start gap-4 md:grid-cols-[auto_300px]">
      <div className="space-y-2">
        <Toolbar
          onWin={(t) => {
            setTimeSeconds(t);
            setOpen(true);
          }}
        />
        <div className="flex flex-col items-center justify-center">
          <BoardGrid />
          <NumberPad />
        </div>
      </div>
      <LeaderboardPanel defaultDifficulty={difficulty} />
      <VictoryModal
        open={open}
        onClose={() => setOpen(false)}
        difficulty={difficulty}
        timeSeconds={timeSeconds}
        onSubmitted={onLeaderboard}
      />
    </div>
  );
}
