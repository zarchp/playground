<?php

use App\Services\Sudoku\Generator;
use App\Services\Sudoku\Board;
use App\Services\Sudoku\Solver;

test('generator produces uniquely solvable puzzles', function () {
    $gen = new Generator();
    foreach (['easy', 'medium', 'hard'] as $d) {
        $data = $gen->generate($d);
        $puzzle = Board::from($data['puzzle']);
        $solver = new Solver();
        expect($solver->countSolutions($puzzle, 2))->toBe(1);
    }
});
