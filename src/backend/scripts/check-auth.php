<?php
session_start();

// Include the database connection
$mysqli = include('database.php');

if (isset($_SESSION['admin_id'])) {
    $admin_id = $_SESSION['admin_id'];

    // Prepare and execute the query to verify session
    $stmt = $mysqli->prepare("SELECT id FROM admins WHERE id = ?");
    $stmt->bind_param('i', $admin_id);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows > 0) {
        echo json_encode(['authenticated' => true]);
    } else {
        echo json_encode(['authenticated' => false]);
    }

    $stmt->close();
} else {
    echo json_encode(['authenticated' => false]);
}

$mysqli->close();
?>
