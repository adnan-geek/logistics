<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json; charset=UTF-8");

include('../config/database.php');

// Function to generate tracking number


// GET: Fetch all shipments
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $sql = "SELECT * FROM shipments";
    $result = $conn->query($sql);
    $shipments = [];
    while ($row = $result->fetch_assoc()) $shipments[] = $row;
    echo json_encode($shipments);

// POST: Add a new shipment
} elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);
    if (!isset($data['sender'], $data['receiver'], $data['status'], $data['shippingDate'], $data['expectedDelivery'], $data['location'], $data['weight'], $data['dimensions'], $data['shippingCost'], $data['paymentStatus'], $data['deliveryType'], $data['contact'], $data['deliveryAttempts'])) {
        echo json_encode(["success" => false, "message" => "Missing required fields."]);
        exit;
    }

    function generateTrackingNumber($conn) {
        // Get the latest shipment ID (this ensures uniqueness based on shipment order)
        $sql = "SELECT MAX(id) AS last_id FROM shipments";
        $id_result = $conn->query($sql);
        $last_id = 0; // Default value in case the table is empty

        if ($id_result && $row = $id_result->fetch_assoc()) {
            $last_id = $row['last_id'] ?: 0; // If NULL, set to 0
        }

        // Increment the ID for the new shipment
        $new_id = $last_id + 1;

        // Format the new tracking number
        $prefix = "TRK";
        $id_part = str_pad($new_id, 6, "0", STR_PAD_LEFT); // Padded to 6 digits
        $date_part = date("Ymd"); // Current date in YYYYMMDD format

        // Combine to form the full tracking number
        $tracking_number = $prefix . $id_part . $date_part;

        return $tracking_number;
    }





    $data['trackingNumber'] = generateTrackingNumber($conn);
    $query = "INSERT INTO shipments (sender, receiver, status, shippingDate, expectedDelivery, location, trackingNumber, weight, dimensions, shippingCost, paymentStatus, deliveryType, contact, deliveryAttempts) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("ssssssssssssss", $data['sender'], $data['receiver'], $data['status'], $data['shippingDate'], $data['expectedDelivery'], $data['location'], $data['trackingNumber'], $data['weight'], $data['dimensions'], $data['shippingCost'], $data['paymentStatus'], $data['deliveryType'], $data['contact'], $data['deliveryAttempts']);
    if ($stmt->execute()) {
        echo json_encode(["success" => true, "message" => "Shipment added successfully."]);
    } else {
        echo json_encode(["success" => false, "message" => "Failed to add shipment.", "error" => $stmt->error]);
    }
    $stmt->close();

// PUT: Update a shipment
} elseif ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    $data = json_decode(file_get_contents("php://input"), true);
    if (!isset($data['id'], $data['status'], $data['location'])) {
        echo json_encode(["success" => false, "message" => "Missing required fields."]);
        exit;
    }
    $test = intval($data['id']);

    $query = "UPDATE shipments SET status = ?, location = ? WHERE id = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("ssi", $data['status'], $data['location'],$test);
    if ($stmt->execute()) {
        if ($stmt->affected_rows > 0) {
            echo json_encode(["success" => true, "message" => "Shipment updated successfully."]);
        } else {
            echo json_encode(["success" => true, "message" => "Shipment not found."]);
        }
    } else {
        echo json_encode(["success" => false, "message" => "Failed to update shipment.", "error" => $stmt->error]);
    }
    $stmt->close();

// DELETE: Delete a shipment
} elseif ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    parse_str(file_get_contents("php://input"), $data);
    if (!isset($data['id'])) {
        echo json_encode(["success" => false, "message" => "Missing shipment ID."]);
        exit;
    }
    $id = intval($data['id']);
    $query = "DELETE FROM shipments WHERE id = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("i", $id);
    if ($stmt->execute()) {
        if ($stmt->affected_rows > 0) {
            echo json_encode(["success" => true, "message" => "Shipment deleted successfully."]);
        } else {
            echo json_encode(["success" => false, "message" => "Shipment not found."]);
        }
    } else {
        echo json_encode(["success" => false, "message" => "Failed to delete shipment.", "error" => $stmt->error]);
    }
    $stmt->close();
}

$conn->close();
?>
