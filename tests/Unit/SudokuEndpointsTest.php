<?php

use Illuminate\Testing\Fluent\AssertableJson;

it('rejects too-fast score and lists leaderboard', function () {
    // Too fast rejected by validation (min:10)
    $res = $this->postJson('/sudoku/score', [
        'name' => 'X',
        'difficulty' => 'easy',
        'time_seconds' => 5,
    ]);
    $res->assertStatus(422);

    // Valid score
    $ok = $this->postJson('/sudoku/score', [
        'name' => 'Tester',
        'difficulty' => 'easy',
        'time_seconds' => 120,
    ]);
    $ok->assertOk()->assertJson(
        fn(AssertableJson $j) => $j
            ->where('stored', true)
            ->has('leaderboard')
            ->etc()
    );

    // Leaderboard fetch
    $lb = $this->get('/sudoku/leaderboard?difficulty=easy');
    $lb->assertOk()->assertJson(fn(AssertableJson $j) => $j->has('leaderboard'));
});
