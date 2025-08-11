<?php

namespace App\Services\Sudoku;

final class Board
{
    /** @var int[][] */
    public array $grid; // 9x9, 0 = empty

    public function __construct(?array $grid = null)
    {
        $this->grid = $grid ?? array_fill(0, 9, array_fill(0, 9, 0));
    }

    public function copy(): self
    {
        return new self(array_map(fn($row) => array_values($row), $this->grid));
    }

    public static function from(array $grid): self
    {
        return new self($grid);
    }
}
