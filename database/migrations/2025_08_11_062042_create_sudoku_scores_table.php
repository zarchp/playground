<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('sudoku_scores', function (Blueprint $table) {
            $table->id();
            $table->string('name', 50);
            $table->enum('difficulty', ['easy', 'medium', 'hard'])->index();
            $table->unsignedInteger('time_seconds');
            $table->string('ip_hash', 64)->index();
            $table->string('user_agent', 255)->nullable();
            $table->timestamps();

            $table->index(['difficulty', 'time_seconds']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sudoku_scores');
    }
};
