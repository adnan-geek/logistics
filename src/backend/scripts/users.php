<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
// init the session 

// Include the database connection
$mysqli = include('../config/database.php');

// Check connection
if ($mysqli->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

// SQL to fetch data
$sql = "SELECT id, username, email, address, date_joined, solar_system_type, bills FROM users";
$result = $mysqli->query($sql);
$users = [];

// Fetch the results into an array
if ($result) {
    while ($row = $result->fetch_assoc()) {
        $users[] = $row;
    }
    echo json_encode($users);
} else {
    http_response_code(500);
    echo json_encode(['error' => 'Error fetching data: ' . $mysqli->error]);
}

        // Close connection
        $mysqli->close();
?>
