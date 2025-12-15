<?php
// Set CORS headers first
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Max-Age: 86400"); // 24 hours

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Then set content type
header("Content-Type: application/json; charset=UTF-8");

require_once 'db_config.php';

// Get POST data
$data = json_decode(file_get_contents("php://input"), true);

if (!$data) {
    echo json_encode(["error" => "Žiadne dáta neboli prijaté"]);
    exit();
}

// Get and validate data
$meno = trim($data['meno'] ?? '');
$rok = $data['rok_narodenia'] ?? '';
$stat = trim($data['stat'] ?? '');
$email = trim($data['email'] ?? '');
$password = trim($data['password'] ?? '');
$telefon = $data['telefon'] ?? null;
$poznamka = $data['poznamka'] ?? null;

// Back-end validation
if (empty($meno) || empty($rok) || empty($stat) || empty($email) || empty($password)) {
    echo json_encode(["error" => "Všetky povinné polia musia byť vyplnené"]);
    exit();
}

if (!preg_match("/^[a-zA-Zá-žÁ-Ž ]+$/", $meno)) {
    echo json_encode(["error" => "Meno musí obsahovať iba písmená"]);
    exit();
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(["error" => "Neplatný formát emailu"]);
    exit();
}

if (!is_numeric($rok)) {
    echo json_encode(["error" => "Rok narodenia musí byť číslo"]);
    exit();
}

if (strlen($password) < 6) {
    echo json_encode(["error" => "Heslo musí mať aspoň 6 znakov"]);
    exit();
}

// Check if email already exists
try {
    $checkStmt = $pdo->prepare("SELECT id FROM pouzivatelia WHERE email = ?");
    $checkStmt->execute([$email]);
    
    if ($checkStmt->fetch()) {
        echo json_encode(["error" => "Email už je registrovaný"]);
        exit();
    }
} catch (PDOException $e) {
    echo json_encode(["error" => "Chyba pri kontrole emailu: " . $e->getMessage()]);
    exit();
}

// For now, store plain password (NOT RECOMMENDED FOR PRODUCTION)
$hashed_password = password_hash($password, PASSWORD_DEFAULT);

// Insert into database
$sql = "INSERT INTO pouzivatelia (meno, rok_narodenia, stat, email, password, telefon, poznamka) 
        VALUES (?, ?, ?, ?, ?, ?, ?)";
$stmt = $pdo->prepare($sql);

try {
    $stmt->execute([$meno, $rok, $stat, $email, $hashed_password, $telefon, $poznamka]);
    echo json_encode(["success" => "Registrácia bola úspešná. Teraz sa môžete prihlásiť."]);
} catch (PDOException $e) {
    echo json_encode(["error" => "Chyba pri registrácii: " . $e->getMessage()]);
}
?>