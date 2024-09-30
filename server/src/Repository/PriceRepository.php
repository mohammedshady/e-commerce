<?php

namespace App\Repository;

class PriceRepository extends Repository
{
    public static function getProductPrices(string $product_id): array
    {
        $query = 'SELECT p.amount, c.label AS label, c.symbol AS symbol FROM prices p JOIN currency c ON p.currency_id = c.id WHERE p.product_id = :product_id';
        $params = ['product_id' => $product_id];
        $result = (new static)->db->query($query, $params)->get();

        $formattedResult = array_map(function ($row) {
            return [
                'amount' => $row['amount'],
                'currency' => [
                    'label' => $row['label'],
                    'symbol' => $row['symbol'],
                ],
            ];
        }, $result);

        return $formattedResult;
    }
}
