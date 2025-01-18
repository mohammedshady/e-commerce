<?php

namespace App\Schema\Resolvers;

use App\Services\ProductService;

class ProductsResolver
{
    public static function index(?string $category = null): array
    {
        return ProductService::getProducts($category);
    }
    public static function get(string $id): array
    {
        return ProductService::getProduct($id);
    }
}
