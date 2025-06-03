<?php
session_start();

if (isset($_SESSION['logado'])) {
    header('Location: pages/dashboard/dashboard.php');
    exit;
} else {
    header('Location: pages/auth/login.php');
    exit;
}
?>
