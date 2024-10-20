<?php
header('Access-Control-Allow-Origin: http://localhost:3000');  // Allow requests from your React app
header('Access-Control-Allow-Methods: POST, GET, OPTIONS, DELETE');
header('Access-Control-Allow-Headers: Content-Type');

header('Content-Type: application/json');
$conn = include('../config/database.php');
$input = json_decode(file_get_contents("php://input"), true);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Prepare and bind for POST requests (insert or update)
    if (isset($input['id'])) {
        // Update existing client
        $stmt = $conn->prepare("UPDATE clients SET company_name=?, contact_person=?, email=?, phone_number=?, address=?, total_shipments=?, current_shipment_status=?, outstanding_balance=?, account_status=?, date_joined=? WHERE id=?");
        $stmt->bind_param("sssssssdssi", $input['company_name'], $input['contact_person'], $input['email'], $input['phone_number'], $input['address'], $input['total_shipments'], $input['current_shipment_status'], $input['outstanding_balance'], $input['account_status'], $input['date_joined'], $input['id']);
    } else {
        // Insert new client
        $stmt = $conn->prepare("INSERT INTO clients (company_name, contact_person, email, phone_number, address, total_shipments, current_shipment_status, outstanding_balance, account_status, date_joined) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
        $stmt->bind_param("ssssssssss", $input['company_name'], $input['contact_person'], $input['email'], $input['phone_number'], $input['address'], $input['total_shipments'], $input['current_shipment_status'], $input['outstanding_balance'], $input['account_status'], $input['date_joined']);
    }

    // Execute
    if ($stmt->execute()) {
        $response = ['success' => true, 'sentdata' => $input, 'message' => 'Client updated successfully'];
    } else {
        $response = ['success' => false, 'message' => 'Failed to update the client'];
    }

    $stmt->close();
} elseif ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    // Handle DELETE request
    if (isset($_GET['id'])) {
        $stmt = $conn->prepare("DELETE FROM clients WHERE id = ?");
        $stmt->bind_param("i", $_GET['id']);

        // Execute
        if ($stmt->execute()) {
            $response = ['success' => true, 'message' => 'Client deleted successfully'];
        } else {
            $response = ['success' => false, 'message' => 'Failed to delete the client'];
        }

        $stmt->close();
    } else {
        $response = ['success' => false, 'message' => 'Client ID not provided'];
    }
} else {
    $response = ['success' => false, 'message' => 'Invalid request method'];
}

$conn->close();
echo json_encode($response);
?>
