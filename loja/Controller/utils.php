<?php
require "../Model/Produto.php";
require "../Model/Resposta.php";

// Define o diretório fixo para uploads
define('UPLOAD_DIR', '../Model/uploads/'); // Certifique-se de que o caminho está correto

function criarResposta($status, $msg)
{
    $resp = new Resposta($status, $msg);
    return json_encode($resp); // Retorna a resposta em formato JSON
}

function fazerUpload($file)
{
    // Verifica se o arquivo foi enviado corretamente
    if (isset($file) && $file['error'] === UPLOAD_ERR_OK) {
        $nomeArquivo = basename($file['name']);
        $caminhoArquivo = UPLOAD_DIR . $nomeArquivo;

        // Move o arquivo para o diretório de uploads
        if (move_uploaded_file($file['tmp_name'], $caminhoArquivo)) {
            return "http://localhost/loja/Model/uploads/" . $nomeArquivo; // Retorna a URL do arquivo se o upload for bem-sucedido
        } else {
            return criarResposta(false, "Erro ao mover o arquivo para o diretório de uploads.");
        }
    }
    return null; // Retorna null se não houver arquivo ou se houver erro no upload
}

// Função para processar imagem Base64
function fazerUploadBase64($base64Image)
{
    // Remove o prefixo da string Base64 se existir
    if (preg_match('/^data:image\/(\w+);base64,/', $base64Image, $type)) {
        $type = strtolower($type[1]); // Obtém a extensão da imagem
        if (!in_array($type, ['jpg', 'jpeg', 'png', 'gif'])) {
            return criarResposta(false, "Tipo de imagem não suportado.");
        }

        // Gera um nome único para o arquivo
        $nomeArquivo = uniqid() . '.' . $type;
        $caminhoArquivo = UPLOAD_DIR . $nomeArquivo;

        // Decodifica a imagem e salva
        if (file_put_contents($caminhoArquivo, base64_decode(substr($base64Image, strpos($base64Image, ',') + 1)))) {
            return "http://localhost/loja/Model/uploads/" . $nomeArquivo; // Retorna a URL do arquivo se o upload for bem-sucedido
        } else {
            return criarResposta(false, "Erro ao salvar a imagem.");
        }
    }
    return criarResposta(false, "Formato de imagem inválido.");
}

function receberDadosProduto()
{
    // Coleta os dados da requisição
    $id = $_POST['id'] ?? null;
    $nome = $_POST['nome'] ?? null;
    $descricao = $_POST['descricao'] ?? null;
    $marca = $_POST['marca'] ?? null;
    $preco = $_POST['preco'] ?? null;
    $qtd = $_POST['qtd'] ?? null;
    $validade = $_POST['validade'] ?? null;
    $status = $_POST['status'] ?? true; // Status padrão como verdadeiro

    // Chama a função de upload da imagem, caso exista
    $imagemURL = 'http://localhost/loja/Model/uploads/produto-padrao.jpg'; // Inicializa como nulo
    if (isset($_POST['imagemURL']) && strpos($_POST['imagemURL'], 'data:image') === 0) {
        $imagemURL = fazerUploadBase64($_POST['imagemURL']);
    } elseif (isset($_FILES['imagemURL']) && $_FILES['imagemURL']['error'] === UPLOAD_ERR_OK) {
        $imagemURL = fazerUpload($_FILES['imagemURL']);
    }

    return new Produto(
        $id,
        $nome,
        $descricao,
        $marca,
        $preco,
        $qtd,
        $validade,
        $status,
        $imagemURL
    );
}
