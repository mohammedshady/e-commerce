<?php

namespace App;

use PDO;
use PDOException;
use Dotenv\Dotenv;

class Database
{
    private static ?PDO $connection = null;
    private $statement;

    public function __construct()
    {
        $dotenv = Dotenv::createImmutable(__DIR__);
        $dotenv->load();
        if (self::$connection === null) {
            try {
                $host = $_ENV['DB_HOST'];
                $dbname = $_ENV['DB_NAME'];
                $user = $_ENV['DB_USER'];
                $pass = $_ENV['DB_PASS'];

                self::$connection = new PDO("mysql:host=$host;dbname=$dbname", $user, $pass);
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
    public function lastInsertId()
    {
        return self::$connection->lastInsertId();
    }
}
