<?php
require_once __DIR__ . '/../auth/authProtect.php'; // Proteção de sessão
?>
<!DOCTYPE html>
<html>
<head>
    <title>Dashboard</title>
    <link rel="stylesheet" href="../../styles/style.css">
</head>
<body>
<div class="login-container">
    <h1>Bem-vindo à Dashboard</h1>
    <ul>
        <li><a href="../../upload.php">Alterar imagens do site</a></li>
        <li><a href="../auth/logout.php">Sair</a></li>
    </ul>
</div>
</body>
</html>
