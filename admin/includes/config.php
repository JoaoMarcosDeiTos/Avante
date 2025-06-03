<?php
// config.php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "avante_db";

$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Falha na conexão: " . $conn->connect_error);
}
?>
