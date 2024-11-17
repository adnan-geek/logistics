<?php
header("Access-Control-Allow-Origin: *"); // Allow requests from any origin
header("Access-Control-Allow-Methods: GET, POST, OPTIONS"); // Allow these methods
header("Access-Control-Allow-Headers: Content-Type, Authorization"); // Allow headers
header("Content-Type: application/json; charset=UTF-8"); // Ensure JSON response format


// Include database connection
include('../config/database.php');

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Handle GET request - Fetch all shipments
    $sql = "SELECT * FROM shipments";
    $result = $conn->query($sql);

    $shipments = [];
    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $shipments[] = $row;
        }
    }

    echo json_encode($shipments);
} elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Handle POST request - Insert a new shipment
    $data = json_decode(file_get_contents("php://input"), true);

    // Validate input
    if (
        isset($data['sender'], $data['receiver'], $data['status'], $data['shippingDate'], 
              $data['expectedDelivery'], $data['location'], $data['trackingNumber'], 
              $data['weight'], $data['dimensions'], $data['shippingCost'], 
              $data['paymentStatus'], $data['deliveryType'], $data['contact'], 
              $data['deliveryAttempts'])
    ) {
        // Prepare SQL statement
        $query = "INSERT INTO shipments (sender, receiver, status, shippingDate, expectedDelivery, location, trackingNumber, weight, dimensions, shippingCost, paymentStatus, deliveryType, contact, deliveryAttempts) 
                  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        $stmt = $conn->prepare($query);

        // Bind parameters
        $stmt->bind_param(
            "ssssssssssssss", 
            $data['sender'], $data['receiver'], $data['status'], $data['shippingDate'], 
            $data['expectedDelivery'], $data['location'], $data['trackingNumber'], 
            $data['weight'], $data['dimensions'], $data['shippingCost'], 
            $data['paymentStatus'], $data['deliveryType'], $data['contact'], 
            $data['deliveryAttempts']
        );

        // Execute statement
        if ($stmt->execute()) {
            echo json_encode(['message' => 'Shipment added successfully.']);
        } else {
            echo json_encode(['error' => 'Failed to add shipment: ' . $stmt->error]);
        }

        $stmt->close();
    } else {
        // Handle missing fields
        echo json_encode(['error' => 'Missing required fields.']);
    }
}

// Close the database connection
$conn->close();
?>
