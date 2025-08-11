<?php

namespace App\Providers;

use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\ServiceProvider;

class RateLimiterServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        RateLimiter::for(
            'sudoku-new',
            fn($request) => [
                Limit::perMinute(10)->by($request->ip())
            ]
        );
        RateLimiter::for(
            'sudoku-score',
            fn($request) => [
                Limit::perMinute(10)->by($request->ip())
            ]
        );
    }
}
