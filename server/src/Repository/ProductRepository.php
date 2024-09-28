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
    //questionable
    public static function getProductGallery(string $product_id): array
    {
        $query = 'SELECT image_link FROM gallery WHERE product_id=:product_id';
        $params = ['product_id' => $product_id];
        $gallery = (new static)->db->query($query, $params)->get();
        return array_column($gallery, 'image_link');
    }
}
