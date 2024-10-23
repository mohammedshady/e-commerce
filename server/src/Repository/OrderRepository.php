<?php

namespace App\Repository;


class OrderRepository extends Repository
{
    public static function insertOrder(array $items, $price): string
    {
        // create order
        $orderId = OrderRepository::createOrder($price);

        foreach ($items as $item) {
            if (!empty($item['attributes'])) {
                $attributeSetName = uniqid('', true);
                $attributes = $item['attributes'];
                $attributeSpecIds = OrderRepository::getAttributeSpecIds($item['product'], $attributes);
                OrderRepository::insertAttributeSet($attributeSpecIds, $attributeSetName);
            } else {
                $attributeSetName = "NO_ATTRIBUTES";
            }

            $product = $item['product'];
            $quantity = $item['quantity'];
            OrderRepository::insertOrderItems($orderId, $product, $quantity, $attributeSetName);
        }

        return $orderId;
    }
    public static function createOrder($price): string
    {
        $query = "INSERT INTO orders (order_date, customer_name, customer_address, total_price) VALUES (NOW(), 'John Doe', '123 Main St, Anytown, USA', ?)";
        $params = [$price];
        (new static)->db->query($query, $params)->get();
        return (new static)->db->lastInsertId();
    }

    public static function insertOrderItems($orderId, $product, $quantity, $attributeSetName)
    {
        $insertOrderItemsQuery = "INSERT INTO order_items (product_id, quantity, product_attributes_id, order_id) VALUES (?, ?, ?, ?)";
        $params = [$product, $quantity, $attributeSetName, $orderId];
        (new static)->db->query($insertOrderItemsQuery, $params);
    }

    public static function getAttributeSpecIds($product, $attributes): array
    {
        $query = "SELECT pai.spec_id FROM product_attribute_items pai JOIN items i ON pai.item_id = i.id WHERE pai.product_id = ?";
        $params = [$product];
        if (!empty($attributes)) {
            $query .= " AND (";
            $numAttributes = count($attributes);
            foreach ($attributes as $index => $attribute) {
                $query .= "(pai.attribute_id = ? AND i.value = ?)";
                $params[] = $attribute["name"];
                $params[] = $attribute["value"];
                if ($index < $numAttributes - 1) {
                    $query .= " OR ";
                }
            }
            $query .= ")";
        } else return null;
        $attributeSpecIds = (new static)->db->query($query, $params)->get();
        return array_column($attributeSpecIds, 'spec_id');
    }
    public static function insertAttributeSet($attributeSpecIds, $attributeSetName)
    {
        $insertAttributesQuery = "INSERT INTO product_attribute_sets (attribute_set, attribute) VALUES ";
        $insertAttributeValues = [];

        foreach ($attributeSpecIds as $specId) {
            $insertAttributeValues[] = "('$attributeSetName', '$specId')";
        }
        if (!empty($insertAttributeValues)) {
            $insertAttributesQuery .= implode(', ', $insertAttributeValues);
            (new static)->db->query($insertAttributesQuery);
        }
    }
};
