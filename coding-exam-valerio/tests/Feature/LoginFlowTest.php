<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class LoginFlowTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_can_login_and_see_name_on_homepage()
    {
        $user = User::factory()->create([
            'name' => 'Jane Test',
            'password' => bcrypt('secret123'),
        ]);

        $response = $this->post(route('login'), [
            'email' => $user->email,
            'password' => 'secret123',
        ]);

        $response->assertRedirect('/');

        $this->followingRedirects()
            ->get('/')
            ->assertSee('Jane Test');
    }
}
