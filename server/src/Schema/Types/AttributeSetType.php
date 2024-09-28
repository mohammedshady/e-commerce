<?php

namespace App\Schema\Types;

use GraphQL\Type\Definition\Type;
use GraphQL\Type\Definition\ObjectType;

class AttributeSetType extends ObjectType
{
    public function __construct()
    {
        parent::__construct([
            'name' => 'AttributeSet',
            'fields' => [
                'id' => Type::string(),
                'items' => Type::listOf(new ItemType()),
                'name' => Type::string(),
                'type' => Type::string(),
            ],
        ]);
    }
}
