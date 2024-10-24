<?php

namespace App\Services;

use App\Repository\CategoryRepository;

class CategoryService
{

    public static function getCategories(): array
    {
        $categories = CategoryRepository::getAllCategories();
        return $categories;
    }
}
