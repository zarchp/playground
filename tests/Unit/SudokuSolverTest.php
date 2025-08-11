<?php

use App\Services\Sudoku\Board;
use App\Services\Sudoku\Solver;

test('solver solves known puzzle', function () {
    $p = [
        [0, 0, 0, 2, 6, 0, 7, 0, 1],
        [6, 8, 0, 0, 7, 0, 0, 9, 0],
        [1, 9, 0, 0, 0, 4, 5, 0, 0],
        [8, 2, 0, 1, 0, 0, 0, 4, 0],
        [0, 0, 4, 6, 0, 2, 9, 0, 0],
        [0, 5, 0, 0, 0, 3, 0, 2, 8],
        [0, 0, 9, 3, 0, 0, 0, 7, 4],
        [0, 4, 0, 0, 5, 0, 0, 3, 6],
        [7, 0, 3, 0, 1, 8, 0, 0, 0],
    ];
    $board = new Board($p);
    $solver = new Solver();
    expect($solver->solve($board))->toBeTrue();
    // ensure no zeros remain
    foreach ($board->grid as $row) foreach ($row as $v) expect($v)->toBeGreaterThan(0);
});
