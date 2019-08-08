<?php

namespace App\Http\Resources;

use Auth;
use Illuminate\Http\Resources\Json\JsonResource;

class ChatResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            "id" => $this->id,
            "initiator_id" => $this->initiator_id,
            "partner_id" => $this->partner_id,
            "partner" => Auth::id() === $this->initiator_id ? $this->partner : $this->initiator
        ];
    }
}
