<?php

declare(strict_types=1);

use App\Http\Controllers\ChatController;
use App\Http\Controllers\CodenamesController;
use App\Http\Controllers\DiceController;
use App\Http\Controllers\DrawController;
use App\Http\Controllers\FourEightController;
use App\Http\Controllers\SudokuController;
use App\Http\Controllers\TicTacToeController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/* Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home'); */

Route::get('/', function () {
    return Inertia::render('dashboard');
})->name('home');

Route::resource('chats', ChatController::class);

Route::get('dice', DiceController::class)->name('dice.index');

Route::get('2048', FourEightController::class)->name('four-eight.index');

Route::get('tic-tac-toe', TicTacToeController::class)->name('tic-tac-toe.index');

Route::get('/sudoku', [SudokuController::class, 'index'])->name('sudoku.index');
Route::post('/sudoku/new', [SudokuController::class, 'new'])
    // ->middleware('throttle:sudoku-new')
    ->name('sudoku.new');
Route::post('/sudoku/score', [SudokuController::class, 'score'])
    // ->middleware('throttle:sudoku-score')
    ->name('sudoku.score');
Route::get('/sudoku/leaderboard', [SudokuController::class, 'leaderboard'])->name('sudoku.leaderboard');

Route::get('codenames', CodenamesController::class)->name('codenames.index');

Route::get('free-draw', DrawController::class)->name('draw.index');

// require __DIR__ . '/settings.php';
// require __DIR__ . '/auth.php';
