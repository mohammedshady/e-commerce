<?php

namespace App\Schema;

abstract class AbstractResolver implements ResolverInterface
{
    protected function validateArgs(array $required, array $args): void
    {
        foreach ($required as $field) {
            if (!isset($args[$field])) {
                throw new \InvalidArgumentException("Missing argument: {$field}");
            }
        }
    }
}
