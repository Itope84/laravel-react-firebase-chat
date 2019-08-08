<?php

namespace App;

use Mpociot\Firebase\SyncsWithFirebase;
use Illuminate\Database\Eloquent\Model;

class Chat extends Model
{
    use SyncsWithFirebase;
    protected $fillable = ['initiator_id', 'partner_id'];

    // who initiated the chat
    public function initiator()
    {
        return $this->belongsTo('App\User', 'initiator_id');
    }

    // Chat Partner
    public function partner()
    {
        return $this->belongsTo('App\User', 'partner_id');
    }

    public static function exists($user1, $user2) {
        return Chat::where(function($q) use ($user1, $user2) {
            $q->where('initiator_id', $user1->id)->where('partner_id', $user2->id);
        })->orWhere(function($q) use ($user1, $user2) {
            $q->where('initiator_id', $user2->id)->where('partner_id', $user1->id);
        })->first();
    }
}
