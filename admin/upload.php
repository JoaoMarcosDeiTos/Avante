<?php
require 'auth.php';

$msg = '';
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_FILES['imagem'])) {
    $arquivo = $_FILES['imagem'];

    if ($arquivo['error'] === UPLOAD_ERR_OK) {
        $nomeTemp = $arquivo['tmp_name'];
        $nomeFinal = 'imagem-site.jpg'; // Sempre sobrescreve
        move_uploaded_file($nomeTemp, __DIR__ . "/uploads/$nomeFinal");
        $msg = "Imagem enviada com sucesso!";
    } else {
        $msg = "Erro ao enviar a imagem.";
    }
}
?>
<!DOCTYPE html>
<html>
<head><title>Upload de Imagem</title></head>
<body>
<h2>Alterar Imagem do Site</h2>
<form method="POST" enctype="multipart/form-data">
    Selecione a imagem: <input type="file" name="imagem"><br>
    <input type="submit" value="Enviar">
</form>
<?php if ($msg) echo "<p>$msg</p>"; ?>

<h3>Imagem Atual:</h3>
<img src="uploads/imagem-site.jpg" width="300" alt="Imagem do site">
<br><a href="dashboard.php">Voltar</a>
</body>
</html>
