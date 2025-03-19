<?php
// Ativar exibição de erros para debug
ini_set('display_errors', 1);
error_reporting(E_ALL);

// Criar arquivo de log
$log_file = 'email_debug.txt';
function log_debug($message) {
    global $log_file;
    file_put_contents($log_file, date('[Y-m-d H:i:s] ') . $message . PHP_EOL, FILE_APPEND);
}

log_debug('Iniciando processamento da requisição');

// Configurações de segurança
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Chaves de API do EmailJS (mantenha estas chaves seguras)
$emailjs_service_id = 'service_pcftlul';
$emailjs_template_id = 'template_kum5gtf';
$emailjs_user_id = 'Lxn0pT0HD0L7DlCct';

// Permitir a requisição OPTIONS para pré-voo CORS
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Verifica se é uma requisição POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    log_debug('Método não permitido: ' . $_SERVER['REQUEST_METHOD']);
    http_response_code(405);
    echo json_encode(['erro' => 'Método não permitido']);
    exit;
}

// Recebe os dados do formulário
$input = file_get_contents('php://input');
log_debug('Dados recebidos: ' . $input);
$dados = json_decode($input, true);

// Validação básica
if (empty($dados['nome']) || empty($dados['email']) || empty($dados['mensagem'])) {
    log_debug('Campos obrigatórios não preenchidos');
    http_response_code(400);
    echo json_encode(['erro' => 'Por favor, preencha todos os campos obrigatórios']);
    exit;
}

// Validação de email
if (!filter_var($dados['email'], FILTER_VALIDATE_EMAIL)) {
    log_debug('Email inválido: ' . $dados['email']);
    http_response_code(400);
    echo json_encode(['erro' => 'Email inválido']);
    exit;
}

// Configurar os dados para o EmailJS
$emailjs_data = [
    'service_id' => $emailjs_service_id,
    'template_id' => $emailjs_template_id,
    'user_id' => $emailjs_user_id,
    'template_params' => [
        'name' => $dados['nome'],
        'message' => $dados['mensagem'],
        'from_name' => $dados['nome'],
        'from_email' => $dados['email'],
        'title' => 'Nova mensagem do site',
        'phone' => $dados['telefone'] ?? ''
    ]
];

log_debug('Preparando requisição para EmailJS: ' . json_encode($emailjs_data));

// Verificar se o cURL está instalado
if (!function_exists('curl_init')) {
    log_debug('Erro: cURL não está instalado');
    http_response_code(500);
    echo json_encode(['erro' => 'Erro de configuração do servidor: cURL não está instalado']);
    exit;
}

// Fazer a requisição para a API do EmailJS
$ch = curl_init('https://api.emailjs.com/api/v1.0/email/send');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($emailjs_data));
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Content-Type: application/json',
    'Origin: http://localhost' // Adicionar origem para evitar problemas de CORS
]);

// Adicionar opções para debug
curl_setopt($ch, CURLOPT_VERBOSE, true);
$verbose = fopen('php://temp', 'w+');
curl_setopt($ch, CURLOPT_STDERR, $verbose);

$response = curl_exec($ch);
$curl_error = curl_error($ch);
$http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);

// Log do debug verbose do cURL
rewind($verbose);
$verbose_log = stream_get_contents($verbose);
log_debug('Debug cURL: ' . $verbose_log);

if ($curl_error) {
    log_debug('Erro cURL: ' . $curl_error);
}

log_debug('Resposta HTTP: ' . $http_code);
log_debug('Resposta: ' . $response);

curl_close($ch);

// Verificar a resposta
if ($http_code === 200) {
    log_debug('Email enviado com sucesso');
    echo json_encode(['sucesso' => true, 'mensagem' => 'Email enviado com sucesso']);
} else {
    log_debug('Erro ao enviar email. HTTP Code: ' . $http_code . ', Resposta: ' . $response);
    http_response_code(500);
    echo json_encode([
        'erro' => 'Erro ao enviar email',
        'detalhes' => $response,
        'codigo' => $http_code
    ]);
} 