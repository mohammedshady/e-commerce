<?php

namespace App\Schema\Resolvers;

use App\Services\CategoryService;

class CategoryResolver
{
    public static function index(): array
    {
        return CategoryService::getCategories();
    }
}
