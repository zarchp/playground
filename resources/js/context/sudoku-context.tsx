import {
  SudokuMoves,
  createInitialState,
  type GState,
} from '@/game/sudoku-game';
import type { Board, Difficulty } from '@/utils/sudoku-types';
import React, { createContext, useContext, useMemo, useState } from 'react';

// Lightweight state container backed by immer-like mutable ops
function useGameState(initial: GState) {
  const [state, setState] = useState<GState>(initial);
  const update = (fn: (s: GState) => void) =>
    setState((prev) => {
      const next = structuredClone(prev);
      fn(next);
      return next;
    });
  return { state, update };
}

const SudokuCtx = createContext<{
  board: Board;
  fixed: Set<string>;
  selection: { row: number; col: number } | null;
  difficulty: Difficulty;
  movesCount: number;
  won: boolean;
  setDifficulty: (d: Difficulty) => void;
  selectCell: (r: number, c: number) => void;
  setNumber: (n: number) => void;
  clearCell: () => void;
  giveHint: () => void;
  resetBoard: (puzzle: Board) => void;
} | null>(null);

export function SudokuProvider({
  children,
  initialPuzzle,
  initialDifficulty,
}: {
  children: React.ReactNode;
  initialPuzzle: Board;
  initialDifficulty: Difficulty;
}) {
  const { state, update } = useGameState(
    createInitialState(initialPuzzle, initialDifficulty),
  );
  const [difficulty, setDifficulty] = useState<Difficulty>(initialDifficulty);

  const api = useMemo(
    () => ({
      board: state.board,
      fixed: state.fixed,
      selection: state.selection,
      difficulty,
      movesCount: state.movesCount,
      won: state.won,
      setDifficulty: (d: Difficulty) => setDifficulty(d),
      selectCell: (r: number, c: number) =>
        update((s) => SudokuMoves.select(s, r, c)),
      setNumber: (n: number) => update((s) => SudokuMoves.setNumber(s, n)),
      clearCell: () => update((s) => SudokuMoves.clear(s)),
      giveHint: () => update((s) => SudokuMoves.hint(s)),
      resetBoard: (puzzle: Board) =>
        update((s) => SudokuMoves.reset(s, puzzle, difficulty)),
    }),
    [state, difficulty],
  );

  return <SudokuCtx.Provider value={api}>{children}</SudokuCtx.Provider>;
}

export function useSudoku() {
  const ctx = useContext(SudokuCtx);
  if (!ctx) throw new Error('useSudoku must be used within SudokuProvider');
  return ctx;
}
