<?php

declare(strict_types=1);

use App\Http\Controllers\ChatController;
use App\Http\Controllers\DiceController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function (): void {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::resource('chats', ChatController::class);

    Route::get('dice', DiceController::class)->name('dice.index');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
