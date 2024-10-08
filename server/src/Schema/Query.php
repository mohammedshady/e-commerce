<?php

namespace App\Schema;

use App\Schema\Resolvers\CategoryResolver;
use GraphQL\Type\Definition\Type;
use App\Schema\Types\ProductType;
use App\Schema\Types\CurrencyType;
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
                        'category' => ['type' => Type::string()],
                    ],
                    'resolve' => static fn($rootValue, array $args): array => ProductsResolver::index($args['category'] ?? null),
                ],
                'product' => [
                    'type' => $productType,
                    'args' => [
                        'id' => ['type' => Type::nonNull(Type::string())],
                    ],
                    'resolve' => static fn($rootValue, array $args): array => ProductsResolver::get($args['id']),
                ],
                'categories' => [
                    'type' => Type::listOf(Type::string()),
                    'resolve' => static fn($rootValue, array $args): array => CategoryResolver::index(),
                ],
            ],
        ]);
    }
}
