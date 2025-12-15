<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");

require 'db_config.php';

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    echo json_encode(["success" => false, "error" => $conn->connect_error]);
    exit;
}

// test update
$sql = "UPDATE products SET name='Doe' WHERE id=2";

if ($conn->query($sql) === TRUE) {
    echo json_encode(["success" => true, "message" => "Record updated successfully"]);
} else {
    echo json_encode(["success" => false, "error" => $conn->error]);
}

$conn->close();
?>
