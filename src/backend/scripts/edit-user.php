<?php
header('Access-Control-Allow-Origin: http://localhost:3000');  // Allow requests from your React app
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

header('Content-Type: application/json');
$conn = include('../config/database.php');
$input = json_decode(file_get_contents("php://input"),true);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Prepare and bind
   
    $stmt = $conn->prepare("UPDATE users SET username=?, email=?, address=?, date_joined=?, solar_system_type=?, bills=?, status=? WHERE id=?");
    $stmt->bind_param("sssssssi", $input['username'], $input['email'], $input['address'], $input['date_joined'], $input['solar_system_type'], $input['bills'], $input['status'], $input['id']);

    // Execute
    if ($stmt->execute()) {
        echo json_encode(['status' => 'success', 'message' => 'User updated successfully']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Failed to update user']);
    }

    $stmt->close();
} else {
    echo json_encode(['status' => 'error', 'message' => 'Missing required fields']);
}

$conn->close();
?>
