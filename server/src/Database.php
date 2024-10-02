<?php

namespace App;

use PDO;
use PDOException;

class Database
{
    private static ?PDO $connection = null;
    private $statement;

    public function __construct()
    {

        if (self::$connection === null) {
            try {
                self::$connection = new PDO('mysql:host=localhost;dbname=e-commerce', 'root', '');
                self::$connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            } catch (PDOException $e) {
                die('Connection failed: ' . $e->getMessage());
            }
        }
    }
    public function get()
    {
        return $this->statement->fetchAll();
    }
    public function getOne()
    {
        return $this->statement->fetch();
    }
    public function getValue()
    {
        return $this->statement->fetchColumn();
    }
    public function query($query, $params = [])
    {
        $this->statement = self::$connection->prepare($query);
        $this->statement->execute($params);

        return $this;
    }
}
