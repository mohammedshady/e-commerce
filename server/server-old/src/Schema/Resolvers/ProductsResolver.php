<?php

namespace App\Schema\Resolvers;

use App\Schema\AbstractResolver;
use App\Repository\ProductRepository;

class ProductResolver extends AbstractResolver
{
    public function resolve($rootValue, array $args, $context, $info)
    {
        $this->validateArgs(['id'], $args);
        return ProductRepository::getProduct($args['id']);
    }
}

class ProductsResolver extends AbstractResolver
{
    public function resolve($rootValue, array $args, $context, $info)
    {
        return ProductRepository::getAllProducts($args['category'] ?? null);
    }
}
