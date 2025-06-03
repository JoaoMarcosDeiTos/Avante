<?php
session_start();
if (!isset($_SESSION['logado'])) {
    header("Location: ../auth/login.php");
    exit;
}
?>
