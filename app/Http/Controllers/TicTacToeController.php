<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class TicTacToeController
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request): Response
    {
        return Inertia::render('tic-tac-toe/index');
    }
}
