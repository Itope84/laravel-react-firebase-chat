<?php

namespace App;

use Mpociot\Firebase\SyncsWithFirebase;
use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    use SyncsWithFirebase;
}
