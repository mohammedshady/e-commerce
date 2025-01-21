<?php

namespace App\Schema\Resolvers;

interface ResolverInterface
{
    public static function index(...$args): array;
}