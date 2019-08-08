<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    if(Auth::check()) {
        return redirect(route('home'));
    }
    return view('welcome');
});

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');

Route::group(['middleware' => ['auth']], function () {
    Route::get('/chats', 'ChatController@page')->name('chats.view');
    Route::get('/users/{user}/chat', 'ChatController@create')->name('user.chat');
    Route::get('/chats/all', 'ChatController@index');
    Route::post('/chats/{chat}/sendMessage', 'ChatController@sendMessage');
});