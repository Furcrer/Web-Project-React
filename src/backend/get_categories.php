<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *"); // allow React

require 'db_config.php';

$sql = "SELECT DISTINCT category FROM products";
$stmt = $pdo->query($sql);
$categories = $stmt->fetchAll(PDO::FETCH_COLUMN);

echo json_encode($categories);