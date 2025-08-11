<?php

declare(strict_types=1);

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use PHPUnit\Framework\Attributes\Test;

final class DashboardTest
{
    use RefreshDatabase;

    /* #[Test]
    public function guests_are_redirected_to_the_login_page(): void
    {
        $this->get('/')->assertRedirect('/login');
    } */

    #[Test]
    public function authenticated_users_can_visit_the_dashboard(): void
    {
        $this->actingAs($user = User::factory()->create());

        $this->get('/')->assertOk();
    }
}
