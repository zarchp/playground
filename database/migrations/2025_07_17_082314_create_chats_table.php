<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('chats', function (Blueprint $blueprint): void {
            $blueprint->id();
            $blueprint->foreignId('sender_id')->constrained('users');
            $blueprint->foreignId('receiver_id')->constrained('users');
            $blueprint->text('message');
            $blueprint->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('chats');
    }
};
