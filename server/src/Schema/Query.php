<?php

namespace App\Schema;

use GraphQL\Type\Definition\Type;
use App\Schema\Types\ProductType;
use App\Schema\Types\CurrencyType;
use GraphQL\Type\Definition\ObjectType;
use App\Schema\Resolvers\ProductsResolver;

class Query
{
    public static function defineQueries()
    {
        //$productType = new ProductType();

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
                // 'categories' => [
                //     'type' => Type::listOf(new CategoryType()),
                //     'resolve' => static fn () => Resolvers\CategoriesResolver::index(),
                // ],
                'products' => [
                    'type' => Type::listOf(new ProductType()),
                    'args' => [
                        'category' => ['type' => Type::string()],
                    ],
                    'resolve' => static fn($rootValue, array $args): array => ProductsResolver::index($args['category'] ?? null),
                    //'resolve' => static function (array $args): array {
                    //print_r("HEEEEEEEEEEEEELOOOOOOOOOZ");
                    //
                    //return $args['category'] ?? null;
                    //},
                ],
                // 'currencies' => [
                //     'type' => Type::listOf(new CurrencyType()),
                //     'resolve' => static fn() => Resolvers\CurrenciesResolver::index(),
                // ],
                //ProductsResolver::index($args['category'] ?? null)
                // 'product' => [
                //     'type' => $productType,
                //     'args' => [
                //         'id' => ['type' => Type::nonNull(Type::string())],
                //     ],
                //     'resolve' => static fn ($rootValue, array $args) => Resolvers\ProductsResolver::show($args['id']),
                // ],
            ],
        ]);
    }
}
