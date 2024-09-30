<?php

namespace App\Repository;

class AttributesRepository extends Repository
{
    public static function getProductAttributes(string $productId): array
    {
        $query = "SELECT pa.attribute_id, a.name, a.type, i.id as item_id, i.display_value, i.value FROM product_attribute_items pa JOIN attributes a ON pa.attribute_id = a.id JOIN items i ON pa.item_id = i.id WHERE pa.product_id = :productId";
        $params = ['productId' => $productId];
        $result = (new static)->db->query($query, $params)->get();

        $attributes = [];
        foreach ($result as $row) {
            $attributeId = $row['attribute_id'];
            if (!isset($attributes[$attributeId])) {
                $attributes[$attributeId] = [
                    'id' => $attributeId,
                    'name' => $row['name'],
                    'type' => $row['type'],
                    'items' => []
                ];
            }
            $attributes[$attributeId]['items'][] = [
                'id' => $row['display_value'], // id in database is an incremental value but a string in graphql schema 
                'displayValue' => $row['display_value'],
                'value' => $row['value']
            ];
        }
        return $attributes;
    }
}
