<?php
session_start();
require_once __DIR__ . '/../../includes/config.php';

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $usuario = trim($_POST['usuario']);
    $senha = $_POST['senha'];

    if (empty($usuario) || empty($senha)) {
        header("Location: login.php?erro=Preencha todos os campos.");
        exit;
    }

    $stmt = $conn->prepare("SELECT senha FROM usuarios WHERE usuario = ?");
    $stmt->bind_param("s", $usuario);
    $stmt->execute();
    $resultado = $stmt->get_result();

    if ($resultado->num_rows > 0) {
        $row = $resultado->fetch_assoc();
        if ($senha === $row['senha']) { // Aqui é comparando texto puro!
            $_SESSION['logado'] = true;
            header("Location: ../dashboard/dashboard.php");
            exit;
        } else {
            header("Location: login.php?erro=Usuário ou senha incorretos.");
            exit;
        }
    } else {
        header("Location: login.php?erro=Usuário ou senha incorretos.");
        exit;
    }
} else {
    header("Location: login.php");
    exit;
}
?>
