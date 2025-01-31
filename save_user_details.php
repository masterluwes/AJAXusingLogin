<?php
header("Content-Type: application/json");

// Get raw JSON input
$data = file_get_contents("php://input");
$decodedData = json_decode($data, true);

if ($decodedData) {
    // Define the new JSON file path for user details
    $filePath = 'user_details.json';

    // Hash the password and confirm password
    if (isset($decodedData['password'])) {
        $decodedData['password'] = password_hash($decodedData['password'], PASSWORD_DEFAULT);
    }
    if (isset($decodedData['confirm-password'])) {
        $decodedData['confirm-password'] = password_hash($decodedData['confirm-password'], PASSWORD_DEFAULT);
    }

    // Read existing data
    if (file_exists($filePath)) {
        $existingData = json_decode(file_get_contents($filePath), true);
    } else {
        $existingData = [];
    }

    // Append new user details
    $existingData[] = $decodedData;

    // Save data back to the file
    if (file_put_contents($filePath, json_encode($existingData, JSON_PRETTY_PRINT))) {
        echo json_encode(["status" => "success", "message" => "User details saved successfully!"]);
    } else {
        echo json_encode(["status" => "error", "message" => "Failed to save user details."]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Invalid JSON data received."]);
}
?>
