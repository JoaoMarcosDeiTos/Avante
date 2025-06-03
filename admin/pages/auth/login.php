<?php
session_start();
if (isset($_SESSION['logado'])) {
    header('Location: ../dashboard/dashboard.php');
    exit;
}
$erro = isset($_GET['erro']) ? $_GET['erro'] : '';
?>
<!DOCTYPE html>
<html>
<head>
    <title>Login</title>
    <link rel="stylesheet" href="../../assets/styles/style.css">
</head>
<body>
<div class="login-container">
    <h2>Login</h2>
    <form method="POST" action="auth.php" autocomplete="off">
        <label>Usuário:</label>
        <input type="text" name="usuario" required autocomplete="username">
        <label>Senha:</label>
        <input type="password" name="senha" required autocomplete="current-password">
        <input type="submit" value="Entrar">
    </form>
    <?php if ($erro) echo "<p>$erro</p>"; ?>
</div>
</body>
</html>
