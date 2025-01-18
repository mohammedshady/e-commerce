<?php

namespace App\Schema;

use App\Schema\Resolvers\CategoryResolver;
use GraphQL\Type\Definition\Type;
use App\Schema\Types\ProductType;
use App\Schema\Resolvers\ProductResolver;
use GraphQL\Type\Definition\ObjectType;
use App\Schema\Resolvers\ProductsResolver;

class Query
{
    public static function defineQueries()
    {
        $productType = new ProductType();

        return new ObjectType([
            'name' => 'Query',
            'fields' => [
                'echo' => [
                    'type' => Type::string(),
                    'args' => [
                        'message' => ['type' => Type::string()],
                    ],
                    'resolve' => static fn($rootValue, array $args): string => $args['message'],
                ],
                'products' => [
                    'type' => Type::listOf($productType),
                    'args' => [
                        'category' => Type::string()
                    ],
                    'resolve' => [new ProductsResolver(), 'resolve']
                ],
                'product' => [
                    'type' => $productType,
                    'args' => [
                        'id' => Type::nonNull(Type::string())
                    ],
                    'resolve' => [new ProductResolver(), 'resolve']
                ],
                'categories' => [
                    'type' => Type::listOf(Type::string()),
                    'resolve' => [new CategoryResolver(), 'resolve']
                ],
            ],
        ]);
    }
}
