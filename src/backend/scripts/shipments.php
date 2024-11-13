<?php
header("Access-Control-Allow-Origin: *"); // Allow requests from any origin
header("Access-Control-Allow-Methods: GET, POST, OPTIONS"); // Allow only specific HTTP methods
header("Access-Control-Allow-Headers: Content-Type"); // Allow only specific headers
// Include database connection
include('../config/database.php');
header('Content-Type: application/json');


$sql = "SELECT * FROM shipments";
$result = $conn->query($sql);

$shipments = [];
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $shipments[] = $row;
    }
}

// Output data in JSON format
echo json_encode($shipments);


// Check if form is submitted
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Collect and sanitize form input data
    $sender = mysqli_real_escape_string($conn, $_POST['sender']);
    $receiver = mysqli_real_escape_string($conn, $_POST['receiver']);
    $status = mysqli_real_escape_string($conn, $_POST['status']);
    $shippingDate = mysqli_real_escape_string($conn, $_POST['shippingDate']);
    $expectedDelivery = mysqli_real_escape_string($conn, $_POST['expectedDelivery']);
    $location = mysqli_real_escape_string($conn, $_POST['location']);
    $trackingNumber = mysqli_real_escape_string($conn, $_POST['trackingNumber']);
    $weight = mysqli_real_escape_string($conn, $_POST['weight']);
    $dimensions = mysqli_real_escape_string($conn, $_POST['dimensions']);
    $shippingCost = mysqli_real_escape_string($conn, $_POST['shippingCost']);
    $paymentStatus = mysqli_real_escape_string($conn, $_POST['paymentStatus']);
    $deliveryType = mysqli_real_escape_string($conn, $_POST['deliveryType']);
    $contact = mysqli_real_escape_string($conn, $_POST['contact']);
    $deliveryAttempts = mysqli_real_escape_string($conn, $_POST['deliveryAttempts']);
    
    // Insert data into the database
    $query = "INSERT INTO shipments (sender, receiver, status, shippingDate, expectedDelivery, location, trackingNumber, weight, dimensions, shippingCost, paymentStatus, deliveryType, contact, deliveryAttempts) 
              VALUES ('$sender', '$receiver', '$status', '$shippingDate', '$expectedDelivery', '$location', '$trackingNumber', '$weight', '$dimensions', '$shippingCost', '$paymentStatus', '$deliveryType', '$contact', '$deliveryAttempts')";

    if (mysqli_query($conn, $query)) {
        echo "Shipment added successfully.";
    } else {
        echo "Error: " . mysqli_error($conn);
    }

    // Close the database connection
    mysqli_close($conn);
}

?>
