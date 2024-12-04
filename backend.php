<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
header('Access-Control-Allow-Headers: Content-Type');

$servername = "localhost";
$username = "root"; // Usuário padrão do phpMyAdmin
$password = ""; // Senha padrão (deixe vazio caso não tenha definido uma senha)
$dbname = "noticias_db";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Falha na conexão com o banco de dados: " . $conn->connect_error);
}

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET' && isset($_GET['id'])) {
    $id = intval($_GET['id']);
    $sql = "SELECT * FROM noticias WHERE id = $id";
    $result = $conn->query($sql);
    echo json_encode($result->fetch_assoc());
} elseif ($method === 'GET') {
    $sql = "SELECT * FROM noticias ORDER BY data_criacao DESC";
    $result = $conn->query($sql);
    $news = [];
    while ($row = $result->fetch_assoc()) {
        $news[] = $row;
    }
    echo json_encode($news);
} elseif ($method === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    $titulo = $conn->real_escape_string($data['titulo']);
    $descricao = $conn->real_escape_string($data['descricao']);
    $imagem_url = $conn->real_escape_string($data['imagem_url']);
    $link = $conn->real_escape_string($data['link']);
    $fonte = $conn->real_escape_string($data['fonte']);

    $sql = "INSERT INTO noticias (titulo, descricao, imagem_url, link, fonte) 
            VALUES ('$titulo', '$descricao', '$imagem_url', '$link', '$fonte')";

    echo json_encode(['success' => $conn->query($sql)]);
} elseif ($method === 'PUT') {
    $data = json_decode(file_get_contents('php://input'), true);
    $id = intval($data['id']);
    $titulo = $conn->real_escape_string($data['titulo']);
    $descricao = $conn->real_escape_string($data['descricao']);
    $imagem_url = $conn->real_escape_string($data['imagem_url']);
    $link = $conn->real_escape_string($data['link']);
    $fonte = $conn->real_escape_string($data['fonte']);

    $sql = "UPDATE noticias 
            SET titulo='$titulo', descricao='$descricao', imagem_url='$imagem_url', link='$link', fonte='$fonte' 
            WHERE id = $id";

    echo json_encode(['success' => $conn->query($sql)]);
} elseif ($method === 'DELETE') {
    if (isset($_GET['action']) && $_GET['action'] === 'deleteAll') {
        $sql = "DELETE FROM noticias";  // Deleta todas as notícias
        echo json_encode(['success' => $conn->query($sql)]);
    } else {
        // Excluir uma notícia específica
        $data = json_decode(file_get_contents('php://input'), true);
        $id = intval($data['id']);
        $sql = "DELETE FROM noticias WHERE id = $id";
        echo json_encode(['success' => $conn->query($sql)]);
    }
}

$conn->close();
?>