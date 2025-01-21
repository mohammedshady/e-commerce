<?php

namespace App\Schema\Resolvers;

use App\Services\CategoryService;

class CategoryResolver implements ResolverInterface
{
    public static function index(...$args): array
    {
        return CategoryService::getCategories();
    }
}