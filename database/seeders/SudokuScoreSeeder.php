<?php

namespace Database\Seeders;

use App\Models\SudokuScore;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SudokuScoreSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        foreach (['easy', 'medium', 'hard'] as $d) {
            for ($i = 1; $i <= 5; $i++) {
                SudokuScore::create([
                    'name' => 'Player ' . $i,
                    'difficulty' => $d,
                    'time_seconds' => random_int(60, 600),
                    'ip_hash' => hash('sha256', 'seed|' . $d . '|' . $i),
                    'user_agent' => 'seeder',
                ]);
            }
        }
    }
}
