<?php
// Enable error reporting for development
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

// Handle preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Only POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Method not allowed']);
    exit();
}

// Get input
$json = file_get_contents("php://input");
$data = json_decode($json, true);

if (json_last_error() !== JSON_ERROR_NONE) {
    echo json_encode(['success' => false, 'error' => 'Invalid JSON: ' . json_last_error_msg()]);
    exit();
}

// Validate required fields
if (!$data || !isset($data['id'])) {
    echo json_encode(['success' => false, 'error' => 'Missing required field: id']);
    exit();
}

// Include database configuration
require_once 'db_config.php';

try {
    // Check if product exists
    $checkStmt = $pdo->prepare("SELECT id FROM products WHERE id = ?");
    $checkStmt->execute([$data['id']]);
    
    if ($checkStmt->rowCount() === 0) {
        echo json_encode(['success' => false, 'error' => 'Product not found with ID: ' . $data['id']]);
        exit();
    }
    
    // Prepare update statement
    $stmt = $pdo->prepare("UPDATE products SET 
        name = :name, 
        category = :category, 
        description = :description, 
        price = :price, 
        sale_price = :sale_price,
        updated_at = NOW()
        WHERE id = :id");
    
    // Sanitize and validate data
    $id = filter_var($data['id'], FILTER_VALIDATE_INT);
    $name = isset($data['name']) ? trim($data['name']) : '';
    $category = isset($data['category']) ? trim($data['category']) : '';
    $description = isset($data['description']) ? trim($data['description']) : '';
    $price = isset($data['price']) ? filter_var($data['price'], FILTER_VALIDATE_FLOAT) : 0.0;
    $sale_price = isset($data['sale_price']) ? filter_var($data['sale_price'], FILTER_VALIDATE_FLOAT) : 0.0;
    
    // Additional validation
    if ($id === false || $id <= 0) {
        echo json_encode(['success' => false, 'error' => 'Invalid product ID']);
        exit();
    }
    
    if (empty($name)) {
        echo json_encode(['success' => false, 'error' => 'Product name cannot be empty']);
        exit();
    }
    
    if ($price === false || $price < 0) {
        echo json_encode(['success' => false, 'error' => 'Invalid price']);
        exit();
    }
    
    if ($sale_price === false || $sale_price < 0) {
        $sale_price = 0.0;
    }
    
    // Execute the update
    $stmt->execute([
        ':name' => $name,
        ':category' => $category,
        ':description' => $description,
        ':price' => $price,
        ':sale_price' => $sale_price,
        ':id' => $id
    ]);
    
    // Check if any rows were affected
    $rowCount = $stmt->rowCount();
    
    if ($rowCount > 0) {
        // Fetch the updated product to return
        $selectStmt = $pdo->prepare("SELECT * FROM products WHERE id = ?");
        $selectStmt->execute([$id]);
        $updatedProduct = $selectStmt->fetch();
        
        echo json_encode([
            'success' => true, 
            'message' => 'Product updated successfully',
            'product' => $updatedProduct
        ]);
    } else {
        echo json_encode(['success' => false, 'error' => 'No changes made or product not found']);
    }
    
} catch (PDOException $e) {
    // Handle database errors
    http_response_code(500);
    echo json_encode([
        'success' => false, 
        'error' => 'Database error: ' . $e->getMessage(),
        'error_code' => $e->getCode()
    ]);
    exit();
} catch (Exception $e) {
    // Handle other errors
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
    exit();
}