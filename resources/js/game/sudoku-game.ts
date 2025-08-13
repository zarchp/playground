import { cloneBoard, solve as tsSolve } from '@/utils/sudoku-solver';
import type { Board, Difficulty } from '@/utils/sudoku-types';

export type GState = {
  board: Board;
  fixed: Set<string>;
  solution: Board;
  selection: { row: number; col: number } | null;
  difficulty: Difficulty;
  movesCount: number;
  won: boolean;
};

export function createInitialState(
  puzzle: Board,
  difficulty: Difficulty,
): GState {
  const fixed = new Set<string>();
  for (let r = 0; r < 9; r++)
    for (let c = 0; c < 9; c++) if (puzzle[r][c] !== 0) fixed.add(`${r},${c}`);
  const solution = cloneBoard(puzzle);
  tsSolve(solution);
  return {
    board: cloneBoard(puzzle),
    fixed,
    solution,
    selection: null,
    difficulty,
    movesCount: 0,
    won: false,
  };
}

export const SudokuMoves = {
  select(state: GState, r: number, c: number) {
    state.selection = { row: r, col: c };
  },
  setNumber(state: GState, n: number) {
    const sel = state.selection;
    if (!sel) return;

    const key = `${sel.row},${sel.col}`;
    if (state.fixed.has(key)) return;
    if (n < 0 || n > 9) return;
    if (SudokuMoves.isWin(state)) return;

    state.board[sel.row][sel.col] = n;
    state.movesCount++;
    state.won = SudokuMoves.isWin(state);
  },
  isWin(state: GState) {
    return state.board.flat().every((x, i) => x === state.solution.flat()[i]);
  },
  clear(state: GState) {
    const sel = state.selection;
    if (!sel) return;

    const key = `${sel.row},${sel.col}`;
    if (state.fixed.has(key)) return;
    if (state.board[sel.row][sel.col] !== 0) {
      state.board[sel.row][sel.col] = 0;
      state.movesCount++;
    }
  },
  hint(state: GState) {
    const empty: Array<{ r: number; c: number }> = [];
    const incorrect: Array<{ r: number; c: number }> = [];

    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        const key = `${r},${c}`;
        if (state.fixed.has(key)) continue;
        const cur = state.board[r][c];
        const sol = state.solution[r][c];
        if (cur === 0) empty.push({ r, c });
        else if (cur !== sol) incorrect.push({ r, c });
      }
    }

    const pool = empty.length ? empty : incorrect;
    if (!pool.length) return;

    const pick = pool[Math.floor(Math.random() * pool.length)];
    const { r, c } = pick;

    state.board[r][c] = state.solution[r][c];
    state.selection = { row: r, col: c };
    state.movesCount++;

    let solved = true;
    outer: for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (state.board[i][j] !== state.solution[i][j]) {
          solved = false;
          break outer;
        }
      }
    }
    state.won = solved;
  },
  reset(state: GState, puzzle: Board, difficulty: Difficulty) {
    const next = createInitialState(puzzle, difficulty);
    Object.assign(state, next);
  },
};
