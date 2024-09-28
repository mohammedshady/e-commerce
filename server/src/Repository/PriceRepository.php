<?php

namespace App\Repository;

class PriceRepository extends Repository
{
    public static function getPrices(string $product_id): array
    {
        // Query to join prices and currencies table to get all required fields
        $query = 'SELECT p.amount, c.label AS label, c.symbol AS symbol FROM prices p JOIN currency c ON p.currency_id = c.id WHERE p.product_id = :product_id';
        $params = ['product_id' => $product_id];
        $result = (new static)->db->query($query, $params)->get();

        // format result for graphql
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
