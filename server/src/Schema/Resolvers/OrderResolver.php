<?php

namespace App\Schema\Resolvers;

use App\Services\OrderService;

class OrderResolver
{
    public static function index(array $items, $price): string
    {
        return OrderService::insertOrder($items, $price);
    }
}
