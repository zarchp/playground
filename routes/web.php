<?php

declare(strict_types=1);

use App\Http\Controllers\ChatController;
use App\Http\Controllers\DiceController;
use App\Http\Controllers\FourEightController;
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

// Route::middleware(['auth', 'verified'])->group(function (): void {});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
