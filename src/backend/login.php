<?php
// Set CORS headers first
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Max-Age: 86400"); // 24 hours

// Handle preflight request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Then set content type
header("Content-Type: application/json; charset=UTF-8");

require_once 'db_config.php';

// Get POST data
$data = json_decode(file_get_contents("php://input"), true);

if (!$data) {
    echo json_encode(["error" => "No data received"]);
    exit();
}

// Validate required fields
$email = trim($data['email'] ?? '');
$password = trim($data['password'] ?? '');

if (empty($email) || empty($password)) {
    echo json_encode(["error" => "Email and password are required"]);
    exit();
}

// Validate email format
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(["error" => "Invalid email format"]);
    exit();
}

try {
    // Check if user exists
    $stmt = $pdo->prepare("SELECT * FROM pouzivatelia WHERE email = ?");
    $stmt->execute([$email]);
    $user = $stmt->fetch();
    
    if (!$user) {
        echo json_encode(["error" => "Invalid email or password"]);
        exit();
    }
    
    // Check password using password_verify() for hashed passwords
    if (!password_verify($password, $user['password'])) {
        echo json_encode(["error" => "Invalid email or password"]);
        exit();
    }
    
    // Remove password from response
    unset($user['password']);
    
    echo json_encode([
        "success" => true,
        "message" => "Login successful",
        "user" => $user
    ]);
    
} catch (PDOException $e) {
    echo json_encode(["error" => "Database error: " . $e->getMessage()]);
    exit();
}
?>