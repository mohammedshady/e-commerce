<?php

namespace App\Models;

class ClothesProduct extends Product
{
    protected $category = 'clothes';

    public function __construct($name, $price, $in_stock = true, $description = '', array $attributes = [])
    {
        parent::__construct($name, $price, null, $in_stock, $description, $attributes);
    }
}
