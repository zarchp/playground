<?php

namespace App\Services\Sudoku;

final class Generator
{
    public function generate(string $difficulty = 'easy'): array
    {
        $full = $this->generateFullSolution();

        $givens = match ($difficulty) {
            'easy'   => random_int(50, 53),
            'medium' => random_int(35, 38),
            'hard'   => random_int(20, 23),
            default  => 36,
        };

        $puzzle = $this->carveSymmetric($full, 81 - $givens, 600 /*ms budget*/);

        return ['puzzle' => $puzzle, 'solution' => $full];
    }

    /** Create a fully solved board randomly by backtracking. */
    private function generateFullSolution(): array
    {
        $solver = new Solver();
        $nums = range(1, 9);
        shuffle($nums);
        $board = new Board();
        $board->grid[0] = $nums;
        if (!$solver->solve($board)) {
            $board = new Board();
            $solver->solve($board);
        }
        return $board->grid;
    }

    /**
     * Remove cells in CENTER-SYMMETRIC pairs (r,c) and (8-r,8-c) while keeping uniqueness.
     * Stops when target holes reached or time budget exceeded.
     */
    private function carveSymmetric(array $solution, int $holes, int $timeBudgetMs): array
    {
        $start = hrtime(true);

        $board = Board::from($solution);
        $pairs = [];
        for ($r = 0; $r < 9; $r++) {
            for ($c = 0; $c < 9; $c++) {
                $r2 = 8 - $r;
                $c2 = 8 - $c;
                // build each pair once
                if ($r < $r2 || ($r === $r2 && $c <= $c2)) {
                    $pairs[] = [[$r, $c], [$r2, $c2]];
                }
            }
        }
        shuffle($pairs);

        $solver = new Solver();
        $removed = 0;

        foreach ($pairs as [$a, $b]) {
            if ($removed >= $holes) break;
            [$r1, $c1] = $a;
            [$r2, $c2] = $b;
            $single = ($r1 === $r2 && $c1 === $c2);

            $bk1 = $board->grid[$r1][$c1];
            $bk2 = $board->grid[$r2][$c2];

            if ($bk1 === 0 && $bk2 === 0) continue;

            $board->grid[$r1][$c1] = 0;
            if (!$single) $board->grid[$r2][$c2] = 0;

            $count = $solver->countSolutions(Board::from($board->grid), 2);
            if (($single && $count === 1) || (!$single && $count === 1 && $removed + 2 <= $holes)) {
                $removed += $single ? 1 : 2;
            } else {
                $board->grid[$r1][$c1] = $bk1;
                if (!$single) $board->grid[$r2][$c2] = $bk2;
            }

            $elapsedMs = (hrtime(true) - $start) / 1_000_000;
            if ($elapsedMs > $timeBudgetMs) break;
        }

        return $board->grid;
    }
}
