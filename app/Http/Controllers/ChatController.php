<?php

namespace App\Http\Controllers;

use App\Message;
use App\Http\Resources\ChatResource;
use Validator;
use Auth;
use App\Chat;
use App\User;
use Illuminate\Http\Request;

class ChatController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */

    public function page ()
    {
        return view('chats');
    }

    public function index()
    {
        $chats = Auth::user()->chats();
        return response()->json(['data' => ChatResource::collection($chats), 'userId' => Auth::id()], 200);
    }

    public function create(User $user)
    {
        $chat = !!Chat::exists($user, Auth::user()) ? Chat::exists($user, Auth::user()) : Chat::create(['initiator_id' => Auth::id(), 'partner_id' => $user->id]);
        return view('chats', compact('chat'));
    }

    public function sendMessage(Request $request, Chat $chat)
    {

        if ($chat->initiator_id !== Auth::id() && $chat->partner_id !== Auth::id()) {
            return response()->json(['message' => 'sorry, you cannot view this chat'], 403);
        }

        $validator = Validator::make($request->all(), [
            'message' => 'string|min:1',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $message = new Message;
        $message->body = $request->message;
        $message->sender_id = Auth::id();
        $message->chat_id = $chat->id;

        $message->save();
        // send push notification if an app

        return response()->json(['message' => 'Message sent successfully'], 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //\
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Chat  $chat
     * @return \Illuminate\Http\Response
     */
    public function show(Chat $chat)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Chat  $chat
     * @return \Illuminate\Http\Response
     */
    public function edit(Chat $chat)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Chat  $chat
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Chat $chat)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Chat  $chat
     * @return \Illuminate\Http\Response
     */
    public function destroy(Chat $chat)
    {
        //
    }
}
