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

$email = isset($_POST["email"]) ? filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL) : "";
$password = isset($_POST["password"]) ? trim($_POST["password"]) : "";

// Validate input
if (empty($email) || empty($password)) {
    echo json_encode(["status" => "error", "message" => "Email and password are required."]);
    exit;
}

// Check if JSON file exists
if (!file_exists($jsonFile)) {
    echo json_encode(["status" => "error", "message" => "No registered users found."]);
    exit;
}

// Load existing users
$data = json_decode(file_get_contents($jsonFile), true);
if ($data === null) {
    echo json_encode(["status" => "error", "message" => "Failed to load user data."]);
    exit;
}

// Check if credentials exist
$found = false;
foreach ($data["users"] as $user) {
    if (strcasecmp($user["email"], $email) === 0 && password_verify($password, $user["password"])) {
        $found = true;
        break;
    }
}

if ($found) {
    echo json_encode(["status" => "success", "message" => "Login Successful!"]);
} else {
    echo json_encode(["status" => "error", "message" => "Incorrect email or password."]);
}
exit;
?>
