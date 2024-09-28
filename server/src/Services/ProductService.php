<?php

namespace App\Services;

use App\Repository\ProductRepository;
use App\Repository\CategoryRepository;
use App\Repository\PriceRepository;

class ProductService
{
    public static function getProducts(string $category = null): array
    {
        $products = ProductRepository::getAllProducts($category);
        $updatedProducts = [];
        foreach ($products as $product) {
            $product['gallery'] = ProductRepository::getProductGallery($product['id']);
            $product['category'] = CategoryRepository::getCategoryName($product['category_id']);
            $product['prices'] = PriceRepository::getPrices($product['id']);
            $updatedProducts[] = $product;
        }
        return $updatedProducts;
    }
    // public static function getProductById(string $id): array
    // {
    //     return ProductRepository::getProductById($id);
    // }
}
