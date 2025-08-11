import type { Board } from './sudoku-types';

export function cloneBoard(b: Board): Board {
  return b.map((row) => [...row]);
}

export function isValid(
  board: Board,
  r: number,
  c: number,
  n: number,
): boolean {
  for (let i = 0; i < 9; i++) {
    if (board[r][i] === n) return false;
    if (board[i][c] === n) return false;
  }
  const br = Math.floor(r / 3) * 3;
  const bc = Math.floor(c / 3) * 3;
  for (let i = 0; i < 3; i++)
    for (let j = 0; j < 3; j++) {
      if (board[br + i][bc + j] === n) return false;
    }
  return true;
}

export function solve(board: Board): boolean {
  const empty = findEmpty(board);
  if (!empty) return true;
  const { row, col } = empty;
  for (let n = 1; n <= 9; n++) {
    if (isValid(board, row, col, n)) {
      board[row][col] = n;
      if (solve(board)) return true;
      board[row][col] = 0;
    }
  }
  return false;
}

export function findEmpty(board: Board): { row: number; col: number } | null {
  for (let r = 0; r < 9; r++)
    for (let c = 0; c < 9; c++) {
      if (board[r][c] === 0) return { row: r, col: c };
    }
  return null;
}
