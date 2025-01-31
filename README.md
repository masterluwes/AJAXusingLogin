Employee Registration & Login System

Project Overview

This project is a user registration and authentication system built using HTML, CSS, JavaScript, PHP, and JSON. It allows users to register, log in, and store their details securely.

Features: 
- User Registration: Users can sign up with their personal details.
- Login Authentication: Secure login system using hashed passwords.
- Password Security: Passwords are hashed before being stored.
- JSON-based Storage: User credentials and details are stored in separate JSON files.
- File Uploads: Users can upload a resume (image file).

Installation & Setup
1. Clone or Download this repository.
2. Set up a local server using XAMPP.
3. Place the project in the htdocs (for XAMPP).
4. Start the Apache server in XAMPP.
5. Access the system in your browser via http://localhost/project-root/login.html.

How It Works
A) Registration Process
1. Users fill out the registration form (forms.html).
2. Data is sent via AJAX to save_user.php (email & password) and save_user_details.php (personal details).
3. The system hashes passwords before storing them in users.json.
4. User details are stored in user_details.json.

B) Login Process
1. Users enter their email and password on login.html.
2. AJAX sends the credentials to login.php.
3. login.php verifies hashed passwords using password_verify().
4. If authentication is successful, the user is redirected to kiosk/index.html.

C) Security Measures
1. Password Hashing: Uses password_hash() and password_verify().
2. Input Sanitization: Filters and trims user input.
3. Prevent SQL Injection: Though JSON-based, input sanitation is applied.

D) Future Improvements 
1. Implement session-based authentication.
2. Add database support (MySQL instead of JSON).
3. Improve user profile editing.

Author
Developed by [Group 9]:
- Luis Daniel Enriquez
- Ann Jennie Kris Gumasing
- Xyrellemhaey Jarabejo
- Angelica Atienza
