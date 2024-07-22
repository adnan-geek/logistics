<?php
// Database configuration
$host = 'localhost'; // Replace with your database host
$user = 'root'; // Replace with your database username
$password = ''; // Replace with your database password
$dbname = 'greenam'; // Replace with your database name

// Create a new connection
$mysqli = new mysqli($host, $user, $password, $dbname);

// Check the connection
if ($mysqli->connect_error) {
    die("Connection failed: " . $mysqli->connect_error);
}

// Set the charset to UTF-8
$mysqli->set_charset("utf8");

return $mysqli;
?>
