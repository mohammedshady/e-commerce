<?php

namespace App\Models;

class TechProduct extends Product
{
    protected $category = 'tech';

    public function __construct($name, $price, $gallery, $in_stock = true, $description = '', array $attributes = [])
    {
        parent::__construct($name, $price, $gallery, $in_stock, $description, $attributes);
    }
}
