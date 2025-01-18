<?php

namespace App\Models;

abstract class Product extends Model
{
    protected $price;
    protected $gallery;
    protected $in_stock;
    protected $description;
    protected $attributes;

    public function __construct($name, $price, $gallery, $in_stock = true, $description = '', array $attributes = [])
    {
        parent::__construct(compact('name', 'price', 'gallery', 'in_stock', 'description'));
        $this->initializeAttributes(['attributes' => $attributes]);
    }
}
