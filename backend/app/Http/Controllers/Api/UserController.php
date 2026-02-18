<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class UserController extends Controller
{
    public function validateName(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'role' => ['required', 'in:driver,customer'],
        ]);

        $name = trim($validated['name']);
        $role = $validated['role'];
        $normalizedName = strtolower($name);

        $existing = User::query()
            ->whereRaw('LOWER(name) = ?', [$normalizedName])
            ->first();

        if ($existing && $existing->role !== $role) {
            return response()->json([
                'message' => 'This name is already registered for another role.',
            ], 409);
        }

        if (!$existing) {
            User::create([
                'name' => $name,
                'role' => $role,
                'email' => Str::uuid() . '@tareeqk.local',
                'password' => Hash::make(Str::random(16)),
            ]);
        }

        return response()->json(['status' => 'ok']);
    }
}
