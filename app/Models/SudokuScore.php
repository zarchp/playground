<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SudokuScore extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'difficulty',
        'time_seconds',
        'ip_hash',
        'user_agent',
    ];

    protected $casts = [
        'time_seconds' => 'int',
    ];
}
