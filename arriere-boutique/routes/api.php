<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\EventApiController;
use App\Http\Controllers\CountriesApiController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

/**
 * Events Routes
 */

Route::get('events', [EventApiController::class, 'getAllEvents']);
Route::get('event/{id}', [EventApiController::class, 'getEvent']);
Route::post('events', [EventApiController::class, 'createEvent']);
Route::put('event/{id}', [EventApiController::class, 'updateEvent']);
Route::delete('event/{id}', [EventApiController::class, 'deleteEvent']);
Route::get('events/{date}', [EventApiController::class, 'getEventByCentury']);

/**
 * Countries Routes
 */

Route::get('countries', [CountriesApiController::class, 'getAllCountries']);
Route::post('countries', [CountriesApiController::class, 'createCountry']);
Route::delete('countries', [CountriesApiController::class, 'destroyCountry']);

/**
 * Test image
 */

