<?php

namespace App\Models;

abstract class Attribute extends Model
{
    protected $type;
    protected $items;

    public function __construct($type, $name, array $items = [])
    {
        parent::__construct(compact('name', 'type'));
        $this->initializeAttributes(['items' => $items]);
    }
}
// Note : I could've integrated these models with graphql resolvers But I did not want to miss the submission deadline.