<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = [
        'name',
        'price',
        'category',
        'stock',
        'image',
    ];

    public function orders() {
        return $this->belongsToMany(Order::class)->withPivot('quantity');
    }

    public function products() {
        return $this->belongsToMany(Product::class)->withPivot('quantity');
    }
}
