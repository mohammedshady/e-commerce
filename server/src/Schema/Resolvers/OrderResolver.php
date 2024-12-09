<?php

namespace App\Schema\Resolvers;

use App\Services\OrderService;
use App\Schema\AbstractResolver;

class OrderResolver extends AbstractResolver
{
    public function resolve($rootValue, array $args, $context, $info): string
    {
        $this->validateArgs(['items', 'price'], $args);
        return OrderService::insertOrder($args['items'], $args['price']);
    }
}
