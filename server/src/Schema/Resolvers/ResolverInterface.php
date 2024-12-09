<?php

namespace App\Schema;

interface ResolverInterface
{
    public function resolve($rootValue, array $args, $context, $info);
}
