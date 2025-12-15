<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once 'db_config.php';

// Get POST data
$data = json_decode(file_get_contents("php://input"), true);

if (!$data || !isset($data['id'])) {
    echo json_encode(["error" => "Missing user ID"]);
    exit();
}

$userId = intval($data['id']);

if ($userId <= 0) {
    echo json_encode(["error" => "Invalid user ID"]);
    exit();
}

try {
    // First, verify the user exists
    $checkStmt = $pdo->prepare("SELECT id FROM pouzivatelia WHERE id = ?");
    $checkStmt->execute([$userId]);
    
    if (!$checkStmt->fetch()) {
        echo json_encode(["error" => "User not found"]);
        exit();
    }
    
    // Delete the user
    $sql = "DELETE FROM pouzivatelia WHERE id = ?";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$userId]);
    
    if ($stmt->rowCount() > 0) {
        echo json_encode([
            "success" => true,
            "message" => "Váš účet bol úspešne vymazaný. Ďakujeme za používanie našej služby."
        ]);
    } else {
        echo json_encode([
            "error" => "Nepodarilo sa vymazať účet. Skúste to prosím neskôr."
        ]);
    }
    
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["error" => "Database error: " . $e->getMessage()]);
}
?>