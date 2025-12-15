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

try {
    // Build base query
    $sql = "SELECT id, meno, rok_narodenia, stat, email, telefon, poznamka FROM pouzivatelia WHERE 1=1";
    $params = [];
    
    // Add filter if provided
    if (!empty($_GET['filterValue']) && !empty($_GET['filterType'])) {
        $filterType = $_GET['filterType'];
        $filterValue = $_GET['filterValue'];
        
        // Validate filter type
        $allowedFilterTypes = ['meno', 'stat', 'email', 'rok_narodenia', 'telefon', 'poznamka'];
        
        if (in_array($filterType, $allowedFilterTypes)) {
            if ($filterType === 'rok_narodenia') {
                // Exact match for year
                $sql .= " AND rok_narodenia = ?";
                $params[] = $filterValue;
            } else {
                // LIKE for other fields
                $sql .= " AND $filterType LIKE ?";
                $params[] = '%' . $filterValue . '%';
            }
        }
    }
    
    // Add sorting
    $sortBy = $_GET['sortBy'] ?? 'id';
    $sortOrder = $_GET['sortOrder'] ?? 'asc';
    
    // Validate sort column
    $allowedSortColumns = ['id', 'meno', 'rok_narodenia', 'stat', 'email', 'telefon'];
    $sortBy = in_array($sortBy, $allowedSortColumns) ? $sortBy : 'id';
    $sortOrder = strtoupper($sortOrder) === 'DESC' ? 'DESC' : 'ASC';
    
    $sql .= " ORDER BY $sortBy $sortOrder";
    
    // Execute query
    $stmt = $pdo->prepare($sql);
    $stmt->execute($params);
    $users = $stmt->fetchAll();
    
    // XSS protection
    foreach ($users as &$user) {
        foreach ($user as $key => $value) {
            if ($value !== null) {
                $user[$key] = htmlspecialchars($value, ENT_QUOTES, 'UTF-8');
            }
        }
    }
    
    echo json_encode($users);
    
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["error" => "Database error: " . $e->getMessage()]);
}
?>