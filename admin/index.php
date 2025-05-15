<?php
session_start();
require 'config.php';

if (isset($_SESSION['logado'])) {
    header('Location: dashboard.php');
    exit;
}

$erro = '';
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $usuario = $_POST['usuario'];
    $senha = md5($_POST['senha']); // mesma forma do insert

    $stmt = $conn->prepare("SELECT * FROM usuarios WHERE usuario = ? AND senha = ?");
    $stmt->bind_param("ss", $usuario, $senha);
    $stmt->execute();
    $resultado = $stmt->get_result();

    if ($resultado->num_rows > 0) {
        $_SESSION['logado'] = true;
        header("Location: dashboard.php");
        exit;
    } else {
        $erro = "Usuário ou senha incorretos.";
    }
}
?>
<!DOCTYPE html>
<html>
<head><title>Login</title></head>
<body>
<h2>Login</h2>
<form method="POST">
    Usuário: <input type="text" name="usuario"><br>
    Senha: <input type="password" name="senha"><br>
    <input type="submit" value="Entrar">
</form>
<?php if ($erro) echo "<p style='color:red;'>$erro</p>"; ?>
</body>
</html>
