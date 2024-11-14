<?php 

error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");

function incluir_produto($conexao, $u) {
    // Insere o produto no banco de dados
    $sql = "INSERT INTO produtos (nome, descricao, marca, preco, qtd, validade, imagemURL) VALUES (?, ?, ?, ?, ?, ?, ?)";
    $stmt = $conexao->prepare($sql);

    // Execute a inserção
    if (!$stmt->execute([
        $u->nome,
        $u->descricao,
        $u->marca,
        $u->preco,
        $u->qtd,
        $u->validade,
        $u->imagemURL // Aqui, assume-se que a imagem já foi processada
    ])) {
        error_log("Erro na inserção: " . print_r($stmt->errorInfo(), true));
        return false; // Retorna false se a inserção falhar
    }

    fecharConexao($conexao); // Fecha a conexão

    return true; // Retorna true se a inserção foi bem-sucedida
}
