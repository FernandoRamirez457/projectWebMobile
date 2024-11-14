<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

header("Access-Control-Allow-Origin: *");

header("Access-Control-Allow-Methods: PUT, OPTIONS");

header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

function editar_produto($conexao, $u)
{

    $sql = "UPDATE produtos SET 
                nome = '{$u->nome}', 
                descricao = '{$u->descricao}', 
                marca = '{$u->marca}', 
                preco = {$u->preco}, 
                qtd = {$u->qtd}, 
                validade = '{$u->validade}', 
                status = '{$u->status}', 
                ImagemURL = '{$u->imagemURL}'
            WHERE id = {$u->id};";

    if (mysqli_query($conexao, $sql)) {
        fecharConexao($conexao);
        return true;
    } else {
        echo "Erro ao tentar atualizar: " . mysqli_error($conexao);
        fecharConexao($conexao);
        return false;
    }
}


