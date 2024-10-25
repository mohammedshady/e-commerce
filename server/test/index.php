<?php
$host = 'sql309.byetcluster.com';
$username = 'if0_37582438';
$password = 'P85jJTUdo7W9e';
$dbname = 'if0_37582438_commerce';




$connection = new mysqli($host, $username, $password, $dbname);


if ($connection->connect_error) {
    die("Connection failed: " . $connection->connect_error);
}

$sql = "SELECT * FROM products";
$result = $connection->query($sql);

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        echo "Product ID: " . $row['id'] . " - Name: " . $row['name'] . " - Price: " . $row['brand'] . "<br>";
    }
} else {
    echo "0 results";
}


$connection->close();
