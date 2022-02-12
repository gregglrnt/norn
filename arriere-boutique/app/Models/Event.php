<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    use HasFactory;
    //protected $table = "event";
    protected $fillable = ['date', 'name', 'coordinates', 'description', 'country_id'];
    //hidden fields in the API : 
    protected $hidden = ['created_at', 'updated_at', 'country_id'];

    public function country() {
        return $this->belongsTo('App\Models\Country');
    }

}
