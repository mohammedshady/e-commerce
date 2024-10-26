<?php

namespace App\Models;

abstract class Model
{
    protected $id;
    protected $name;

    public function __construct(array $data = [])
    {
        $this->initializeAttributes($data);
    }

    protected function initializeAttributes(array $data)
    {
        foreach ($data as $property => $value) {
            if (property_exists($this, $property)) {
                $this->$property = $value;
            }
        }
    }
}
