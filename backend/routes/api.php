<?php

use App\Http\Controllers\Api\TowingRequestController;
use App\Http\Controllers\Api\UserController;
use Illuminate\Support\Facades\Route;

Route::apiResource('requests', TowingRequestController::class)->only(['index', 'store']);
Route::post('requests/{towingRequest}/assign', [TowingRequestController::class, 'assign']);
Route::delete('requests/{towingRequest}', [TowingRequestController::class, 'destroy']);
Route::post('auth/validate', [UserController::class, 'validateName']);
