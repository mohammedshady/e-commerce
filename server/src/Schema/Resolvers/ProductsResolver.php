<?php

namespace App\Schema\Resolvers;

use App\Services\ProductService;

class ProductsResolver implements ResolverInterface
{
    public static function index(...$args): array
    {
        $category = $args[0] ?? null;
        return ProductService::getProducts($category);
    }

    public static function get(string $id): array
    {
        return ProductService::getProduct($id);
    }
}
