<?php

namespace App\Services\Sudoku;

final class Solver
{
    /** Row/Col/Box bitmasks; bit n (1..9) set => number n present */
    private array $row = [];
    private array $col = [];
    private array $box = [];

    private function boxIdx(int $r, int $c): int
    {
        return intdiv($r, 3) * 3 + intdiv($c, 3);
    }

    private function initMasks(Board $board): bool
    {
        $this->row = array_fill(0, 9, 0);
        $this->col = array_fill(0, 9, 0);
        $this->box = array_fill(0, 9, 0);

        for ($r = 0; $r < 9; $r++) {
            for ($c = 0; $c < 9; $c++) {
                $v = $board->grid[$r][$c];
                if ($v === 0) continue;
                $bit = 1 << $v;
                $b = $this->boxIdx($r, $c);
                if (($this->row[$r] & $bit) || ($this->col[$c] & $bit) || ($this->box[$b] & $bit)) {
                    return false; // invalid board
                }
                $this->row[$r] |= $bit;
                $this->col[$c] |= $bit;
                $this->box[$b] |= $bit;
            }
        }
        return true;
    }

    private function candidatesMask(int $r, int $c): int
    {
        $b = $this->boxIdx($r, $c);
        // Bits 1..9 usable are those NOT in row/col/box.
        $used = $this->row[$r] | $this->col[$c] | $this->box[$b];
        // mask for values 1..9 (bit 0 unused)
        return (~$used) & 0x3FE;
    }

    private function place(Board $board, int $r, int $c, int $n): void
    {
        $bit = 1 << $n;
        $b = $this->boxIdx($r, $c);
        $board->grid[$r][$c] = $n;
        $this->row[$r] |= $bit;
        $this->col[$c] |= $bit;
        $this->box[$b] |= $bit;
    }

    private function unplace(Board $board, int $r, int $c, int $n): void
    {
        $bit = 1 << $n;
        $b = $this->boxIdx($r, $c);
        $board->grid[$r][$c] = 0;
        $this->row[$r] &= ~$bit;
        $this->col[$c] &= ~$bit;
        $this->box[$b] &= ~$bit;
    }

    /** Pick empty cell with minimum remaining values (MRV). */
    private function pickCell(Board $board): ?array
    {
        $best = null;
        $bestCount = 10; // >9
        for ($r = 0; $r < 9; $r++) {
            for ($c = 0; $c < 9; $c++) {
                if ($board->grid[$r][$c] !== 0) continue;
                $mask = $this->candidatesMask($r, $c);
                if ($mask === 0) return [$r, $c, 0]; // dead end
                // count bits cheaply (n<=9)
                $cnt = 0;
                for ($n = 1; $n <= 9; $n++) if ($mask & (1 << $n)) $cnt++;
                if ($cnt < $bestCount) {
                    $best = [$r, $c, $mask];
                    $bestCount = $cnt;
                    if ($cnt === 1) return $best;
                }
            }
        }
        return $best; // null means solved
    }

    public function solve(Board $board): bool
    {
        if (!$this->initMasks($board)) return false;
        return $this->dfs($board);
    }

    private function dfs(Board $board): bool
    {
        $pick = $this->pickCell($board);
        if ($pick === null) return true;       // solved
        [$r, $c, $mask] = $pick;
        if ($mask === 0) return false;         // dead end

        // Try candidates 1..9
        for ($n = 1; $n <= 9; $n++) {
            if (!($mask & (1 << $n))) continue;
            $this->place($board, $r, $c, $n);
            if ($this->dfs($board)) return true;
            $this->unplace($board, $r, $c, $n);
        }
        return false;
    }

    /** Count solutions up to $limit (early exit). Much faster with MRV+bitmasks. */
    public function countSolutions(Board $board, int $limit = 2): int
    {
        if (!$this->initMasks($board)) return 0;
        $count = 0;
        $this->dfsCount($board, $limit, $count);
        return $count;
    }

    private function dfsCount(Board $board, int $limit, int &$count): void
    {
        if ($count >= $limit) return;
        $pick = $this->pickCell($board);
        if ($pick === null) {
            $count++;
            return;
        }
        [$r, $c, $mask] = $pick;
        if ($mask === 0) return;

        for ($n = 1; $n <= 9; $n++) {
            if (!($mask & (1 << $n))) continue;
            $this->place($board, $r, $c, $n);
            $this->dfsCount($board, $limit, $count);
            $this->unplace($board, $r, $c, $n);
            if ($count >= $limit) return;
        }
    }

    public function isValid(Board $board, int $r, int $c, int $n): bool
    {
        // faster validity check using masks:
        $this->initMasks($board);
        $bit = 1 << $n;
        $b = $this->boxIdx($r, $c);
        return !(($this->row[$r] & $bit) || ($this->col[$c] & $bit) || ($this->box[$b] & $bit));
    }
}
