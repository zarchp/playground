<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreSudokuScoreRequest;
use App\Models\Score;
use App\Models\SudokuScore;
use App\Services\Sudoku\Generator;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class SudokuController
{
    public function index(Request $request)
    {
        $difficulty = in_array($request->query('difficulty'), ['easy', 'medium', 'hard'])
            ? $request->query('difficulty')
            : 'easy';

        $gen = new Generator();
        $data = $gen->generate($difficulty);

        return Inertia::render('sudoku/index', [
            'initialPuzzle' => $data['puzzle'],
            'difficulty' => $difficulty,
            'leaderboard' => $this->top($difficulty),
        ]);
    }

    public function new(Request $request)
    {
        $request->validate(['difficulty' => 'required|in:easy,medium,hard']);
        $gen = new Generator();
        $data = $gen->generate($request->string('difficulty'));
        return response()->json([
            'puzzle' => $data['puzzle'],
        ]);
    }

    public function score(StoreSudokuScoreRequest $request)
    {
        $ua = substr((string) $request->userAgent(), 0, 255);
        $ip = (string) $request->ip();
        $ipHash = hash('sha256', config('app.key') . '|' . $ip . '|' . $ua);

        // Anti-cheat: reject < 10s (already validated by rules), optionally rate-limit in routes
        $score = SudokuScore::create([
            'name' => $request->string('name'),
            'difficulty' => $request->string('difficulty'),
            'time_seconds' => $request->integer('time_seconds'),
            'ip_hash' => $ipHash,
            'user_agent' => $ua,
        ]);

        if ($request->header('X-Inertia')) {
            return to_route('sudoku.index', ['difficulty' => $request->string('difficulty')])
                ->with('score_saved', true);
        }

        return response()->json([
            'stored' => true,
            'score' => $score,
            'leaderboard' => $this->top($request->string('difficulty')),
        ]);
    }

    public function leaderboard(Request $request)
    {
        $difficulty = $request->query('difficulty', 'easy');
        abort_unless(in_array($difficulty, ['easy', 'medium', 'hard']), 422);
        return response()->json(['leaderboard' => $this->top($difficulty)]);
    }

    private function top(string $difficulty)
    {
        return SudokuScore::query()
            ->where('difficulty', $difficulty)
            ->orderBy('time_seconds')
            ->orderBy('created_at')
            ->limit(50)
            ->get(['name', 'time_seconds', 'difficulty', 'created_at']);
    }
}
