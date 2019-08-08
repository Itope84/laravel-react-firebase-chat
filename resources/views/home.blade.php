@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">All Users</div>

                <div class="card-body px-0 py-0">
                    <ul class="list-group list-group-flush">
                       <li class="list-group-item"><h5 class="card-title mb-0 text-center">Click on a user to start a chat</h5></li>

                        @foreach ($users as $user)
                        <li class="list-group-item user-list-item">
                        <a href="{{route('user.chat', ['user' => $user->id])}}" class="nav-link">
                            <p class="card-text">
                                {{$user->name}}
                            </p>
                        </a>
                        </li>
                        @endforeach

                    </ul>

                </div>
            </div>
        </div>
    </div>
</div>
@endsection
