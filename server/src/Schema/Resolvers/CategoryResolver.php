<?php

namespace App\Schema\Resolvers;

use App\Schema\AbstractResolver;
use App\Repository\CategoryRepository;

class CategoryResolver extends AbstractResolver
{
    public function resolve($rootValue, array $args, $context, $info)
    {
        return CategoryRepository::getAllCategories();
    }
}
