<?php

namespace App\Schema\Resolvers;

use App\Services\OrderService;

class OrderResolver implements ResolverInterface
{
    public static function index(...$args): array
    {
        $items = $args[0] ?? [];
        $price = $args[1] ?? 0;
        return [OrderService::insertOrder($items, $price)];
    }
}