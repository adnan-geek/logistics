<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Include the database connection
$mysqli = include('../config/database.php');

// Check connection
if ($mysqli->connect_error) {
    die("Connection failed: " . $mysqli->connect_error);
}

// SQL to fetch data
$sql = "SELECT id, company_name, contact_person, email, phone_number, address, total_shipments, current_shipment_status, outstanding_balance, account_status, date_joined FROM clients";
$result = $mysqli->query($sql);
$clients = [];

// Fetch the results into an array
if ($result) {
    while ($row = $result->fetch_assoc()) {
        $clients[] = $row;
    }
    echo json_encode($clients);
} else {
    http_response_code(500);
    echo json_encode(['error' => 'Error fetching data: ' . $mysqli->error]);
}

// Close connection
$mysqli->close();
?>
