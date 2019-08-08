@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-12">
            <div class="card" id="chatApp">
                <chat-page :chat-id="{{isset($chat) ? $chat->id : 0}}" :user-id="{{Auth::id()}}"></chat-page>
            </div>
        </div>
    </div>
</div>
@endsection
