<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        //Log::info('Request Data:', $request->all());
        Log::info('Prueba de log');

        $data = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'password' => ['required', 'string', 'min:6'],
        ]);
        $data['email'] = $data['name'].'@example.com';
        $user = User::create($data);
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'user' => $user,
            'token' => $token
        ]);
    }

    public function login(Request $request)
    {
        Log::info('Prueba de log');

        $data = $request->validate([
            'name' => ['required', 'string', 'max:255', 'exists:users'],
            'password' => ['required', 'string', 'min:6'],
        ]);

        $user = User::where('name', $data['name'])->first();

        if (Hash::check($data['password'], $user->password)) {
            Log::info('WTF???');
        }
        
        if (!$user || !Hash::check($data['password'], $user->password)) {
            Log::info('Prueba de log entro');
            Log::info($user);
            Log::info($data['password']);
            Log::info($user->password);
            return response()->json([
                'message' => 'The provided credentials are incorrect.'
            ], 401);
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'user' => $user,
            'token' => $token
        ]);
    }

    public function test(Request $request){

        Log::info('Request Data:', $request->all());
        Log::info('Prueba de log');
        
/* 
        $data = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'string', 'min:6'],
        ]);

        $user = User::create($data);
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'user' => $user,
            'token' => $token
        ]); */
    }
}
