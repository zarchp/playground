import type { Board } from './sudoku-types';

export function getConflicts(
  board: Board,
  r: number,
  c: number,
  value: number,
): Set<string> {
  const conflicts = new Set<string>();
  if (value === 0) return conflicts;

  for (let i = 0; i < 9; i++) {
    if (i !== c && board[r][i] === value) conflicts.add(`${r},${i}`);
    if (i !== r && board[i][c] === value) conflicts.add(`${i},${c}`);
  }
  const br = Math.floor(r / 3) * 3;
  const bc = Math.floor(c / 3) * 3;
  for (let i = 0; i < 3; i++)
    for (let j = 0; j < 3; j++) {
      const rr = br + i,
        cc = bc + j;
      if ((rr !== r || cc !== c) && board[rr][cc] === value)
        conflicts.add(`${rr},${cc}`);
    }
  if (conflicts.size) conflicts.add(`${r},${c}`); // include self when conflicting
  return conflicts;
}

export function highlightGroup(r: number, c: number): Set<string> {
  const s = new Set<string>();
  for (let i = 0; i < 9; i++) {
    s.add(`${r},${i}`);
    s.add(`${i},${c}`);
  }
  const br = Math.floor(r / 3) * 3;
  const bc = Math.floor(c / 3) * 3;
  for (let i = 0; i < 3; i++)
    for (let j = 0; j < 3; j++) s.add(`${br + i},${bc + j}`);
  return s;
}
