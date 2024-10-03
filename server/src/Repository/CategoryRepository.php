<?php

namespace App\Repository;

class CategoryRepository extends Repository
{
    public static function getAllCategories(): array
    {
        $query = 'SELECT name from categories';
        $params = [];
        $result = (new static)->db->query($query, $params)->get();
        return array_column($result, 'name');
    }
    public static function getCategory(string $name): int
    {
        $query = 'SELECT id FROM categories WHERE name = :name';
        $params = ['name' => $name];

        $result = (new static)->db->query($query, $params)->getValue();
        return (int)$result;
    }
    public static function getCategoryName(int $id): string
    {
        $query = 'SELECT name FROM categories WHERE id = :id';
        $params = ['id' => $id];
        $result = (new static)->db->query($query, $params)->getValue();
        return $result;
    }
}
