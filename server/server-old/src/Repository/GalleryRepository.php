<?php

namespace App\Repository;

class GalleryRepository extends Repository
{

    public static function getProductGallery(string $product_id): array
    {
        $query = 'SELECT image_link FROM gallery WHERE product_id=:product_id';
        $params = ['product_id' => $product_id];
        $gallery = (new static)->db->query($query, $params)->get();
        return array_column($gallery, 'image_link');
    }
}
