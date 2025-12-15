<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once 'db_config.php';

// Get user ID from query parameter
$userId = isset($_GET['id']) ? intval($_GET['id']) : 0;

if ($userId <= 0) {
    echo json_encode(["error" => "Invalid user ID"]);
    exit();
}

try {
    // Get user data (without password)
    $sql = "SELECT id, meno, rok_narodenia, stat, email, telefon, poznamka FROM pouzivatelia WHERE id = ?";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$userId]);
    $user = $stmt->fetch();
    
    if (!$user) {
        echo json_encode(["error" => "User not found"]);
        exit();
    }
    
    // XSS protection
    foreach ($user as $key => $value) {
        if ($value !== null) {
            $user[$key] = htmlspecialchars($value, ENT_QUOTES, 'UTF-8');
        }
    }
    
    echo json_encode($user);
    
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["error" => "Database error: " . $e->getMessage()]);
}
?>