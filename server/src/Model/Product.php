<?php

namespace App\Models;
//extends Model
class Product
{
    public string $id;
    public string $name;
    public bool $inStock;
    public array $gallery;
    public string $description;
    public string $category;
    public array $attributes;
    public array $prices;
    public string $brand;


    public function __construct(
        string $id,
        string $name,
        bool $inStock,
        array $gallery,
        string $description,
        string $category,
        array $attributes,
        array $prices,
        string $brand
    ) {
        $this->id = $id;
        $this->name = $name;
        $this->inStock = $inStock;
        $this->gallery = $gallery;
        $this->description = $description;
        $this->category = $category;
        $this->attributes = $attributes;
        $this->prices = $prices;
        $this->brand = $brand;
    }
}
