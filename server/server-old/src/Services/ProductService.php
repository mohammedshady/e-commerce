<?php

namespace App\Services;

use App\Models\Product;
use App\Repository\ProductRepository;
use App\Repository\GalleryRepository;
use App\Repository\CategoryRepository;
use App\Repository\PriceRepository;
use App\Repository\AttributesRepository;

class ProductService
{
    public static function getProducts(string $category = null): array
    {
        $products = ProductRepository::getAllProducts($category);
        $updatedProducts = [];
        foreach ($products as $product) {
            $product['gallery'] = GalleryRepository::getProductGallery($product['id']);
            $product['category'] = CategoryRepository::getCategoryName($product['category_id']);
            $product['prices'] = PriceRepository::getProductPrices($product['id']);
            $product['attributes'] = AttributesRepository::getProductAttributes($product['id']);
            $updatedProducts[] = $product;
        }
        return $updatedProducts;
    }
    public static function getProduct(string $id): array
    {
        $product = ProductRepository::getProduct($id);
        $updatedProduct = [];
        $product['gallery'] = GalleryRepository::getProductGallery($product['id']);
        $product['category'] = CategoryRepository::getCategoryName($product['category_id']);
        $product['prices'] = PriceRepository::getProductPrices($product['id']);
        $product['attributes'] = AttributesRepository::getProductAttributes($product['id']);
        $updatedProduct = $product;

        return $updatedProduct;
    }
}
