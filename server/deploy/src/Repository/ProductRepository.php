<?php

namespace App\Repository;

use App\Repository\CategoryRepository;

class ProductRepository extends Repository
{
    public static function getAllProducts(string $category = null): array
    {
        $query = 'SELECT * FROM products';
        $params = [];
        $categoryId = CategoryRepository::getCategory($category);
        // to be modified
        if ($category && strtolower($category) !== 'all') {
            $query .= ' WHERE category_id = :categoryId';
            $params['categoryId'] = $categoryId;
        }

        $products = (new static)->db->query($query, $params)->get();
        return $products;
    }
    public static function getProduct(string $id): array
    {
        $query = 'SELECT * FROM products where id = :id';
        $params = ['id' => $id];
        $product = (new static)->db->query($query, $params)->getOne();
        return $product;
    }
}
