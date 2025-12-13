<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *"); // umožní volanie z React frontend

require 'db_config.php';

$search = $_GET['q'] ?? '';

$sql = "SELECT id, name, description, price, sale_price, category, created_at, updated_at
        FROM products
        WHERE name LIKE :search OR description LIKE :search";

$stmt = $pdo->prepare($sql);
$searchPattern = "%$search%";
$stmt->bindParam(':search', $searchPattern, PDO::PARAM_STR);
$stmt->execute();

$results = $stmt->fetchAll();

echo json_encode($results);
?>
