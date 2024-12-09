<?php

namespace App\Schema;

use GraphQL\Type\Definition\Type;
use GraphQL\Type\Definition\ObjectType;
use App\Schema\Resolvers\OrderResolver;
use App\Schema\Types\ItemInputType;

class Mutation
{
    public static function defineMutations()
    {
        return new ObjectType([
            'name' => 'Mutation',
            'fields' => [
                'addOrder' => [
                    'type' => Type::string(),
                    'args' => [
                        'items' => ['type' => Type::listOf(Type::nonNull(new ItemInputType()))],
                        'price' => ['type' => Type::nonNull(Type::float())]
                    ],
                    'resolve' => [new OrderResolver(), 'resolve']
                ],
            ],
        ]);
    }
}
