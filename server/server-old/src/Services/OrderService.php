<?php

namespace App\Services;

use App\Repository\OrderRepository;

class OrderService
{

    public static function insertOrder(array $items, $price): string
    {
        return OrderRepository::insertOrder($items, $price);
    }
}
