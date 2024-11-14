<?php
require 'utils.php';
require_once '../DAO/conexao.php';
require_once '../DAO/produtoDAO/produtoGet.php';
require_once '../DAO/produtoDAO/produtoPost.php';
require_once '../DAO/produtoDAO/produtoPut.php';
require_once '../DAO/produtoDAO/produtoPatch.php';
require_once '../DAO/produtoDAO/produtoDelete.php';

$conexao = conectar();
$requestMethod = $_SERVER['REQUEST_METHOD'];

// Captura o método enviado no FormData
$method = $_POST['method'] ?? 'GET';

switch ($method) {
    case 'GET':
        $dados = json_decode(file_get_contents('php://input'));
        echo json_encode(pegar_produto($conexao, $dados)); // Retorna apenas o resultado do GET
        break;

    case 'POST':
        $produto = receberDadosProduto();
        $resp = incluir_produto($conexao, $produto);
        echo json_encode($resp ? criarResposta('200', 'Incluso com sucesso') : criarResposta('400', 'Não incluso'));
        break;

    case 'PUT':
        $produto = receberDadosProduto();
        $resp = editar_produto($conexao, $produto);
        $in = $resp ? criarResposta('200', 'Atualizado com sucesso') : criarResposta('400', 'Não Atualizado');

        echo json_encode($in);
        break;

    case 'PATCH':
        $produto = receberDadosProduto();
        $resp = editar_produto_parcialmente($conexao, $produto);
        echo json_encode($resp ? criarResposta('200', 'Atualizado com sucesso') : criarResposta('400', 'Não Atualizado'));
        break;

    case 'DELETE':
        $produto = receberDadosProduto();
        $resp = deletar_produto($conexao, $produto);
        echo json_encode($resp ? criarResposta('200', 'Excluído com sucesso') : criarResposta('400', 'Não Excluído'));
        break;

    default:
        echo json_encode(criarResposta('405', 'Método não permitido'));
        break;
}
