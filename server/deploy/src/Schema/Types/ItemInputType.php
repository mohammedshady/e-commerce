<?php

namespace App\Schema\Types;

use GraphQL\Type\Definition\InputObjectType;
use GraphQL\Type\Definition\Type;

class ItemInputType extends InputObjectType
{
    public function __construct()
    {
        parent::__construct([
            'name' => 'ItemInput',
            'fields' => [
                'product' => Type::nonNull(Type::string()),
                'attributes' => ['type' => Type::listOf(Type::nonNull(new AttributeInputType()))],
                'quantity' => ['type' => Type::nonNull(Type::int())],
                'price' => ['type' => Type::nonNull(Type::float())]
            ],
        ]);
    }
}
