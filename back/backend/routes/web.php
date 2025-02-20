<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::post('/api/register', [AuthController::class, 'register']);
//Route::post('/api/login', [AuthController::class, 'login']);
Route::post('/api/test', [AuthController::class, 'test']);
Route::post('/apiUser', [AuthController::class, 'login']);

//users
Route::get('/api/users', [UserController::class, 'index']);
Route::post('/api/insertUser', [AuthController::class, 'register']);
Route::post('/api/updateUser/{id}', [UserController::class, 'update']);

//groups
Route::get('/api/groups', [UserController::class, 'index']);