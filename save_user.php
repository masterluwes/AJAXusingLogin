<?php
header("Content-Type: application/json"); // Ensure JSON response
error_reporting(E_ALL);
ini_set("display_errors", 1);

$jsonFile = "users.json";

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405);
    echo json_encode(["status" => "error", "message" => "Invalid request method. Use POST."]);
    exit;
}

$email = isset($_POST["email"]) ? $_POST["email"] : "";
$password = isset($_POST["password"]) ? $_POST["password"] : "";

// Validate input
if (empty($email) || empty($password)) {
    echo json_encode(["status" => "error", "message" => "Email and password are required."]);
    exit;
}

// Check if JSON file exists, otherwise create a new one
if (!file_exists($jsonFile)) {
    file_put_contents($jsonFile, json_encode(["users" => []], JSON_PRETTY_PRINT));
}

// Load existing users
$data = json_decode(file_get_contents($jsonFile), true);
if ($data === null) {
    echo json_encode(["status" => "error", "message" => "Failed to load user data."]);
    exit;
}

// Check if email already exists
foreach ($data["users"] as $user) {
    if (strcasecmp($user["email"], $email) === 0) {
        echo json_encode(["status" => "error", "message" => "Email already registered."]);
        exit;
    }
}

// Hash the password before saving it
$hashedPassword = password_hash($password, PASSWORD_BCRYPT);

// Add new user
$data["users"][] = ["email" => $email, "password" => $hashedPassword];

// Save JSON file
if (file_put_contents($jsonFile, json_encode($data, JSON_PRETTY_PRINT))) {
    echo json_encode(["status" => "success", "message" => "Registration Successful!"]);
} else {
    echo json_encode(["status" => "error", "message" => "Failed to save user data."]);
}
exit;
?>