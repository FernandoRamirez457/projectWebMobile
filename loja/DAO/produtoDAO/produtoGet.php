<?php
function pegar_produto($conexao, $dados = null)
{
    $sql = isset($dados->id) && intval($dados->id) > 0 
        ? "SELECT * FROM Produtos WHERE ID = " . intval($dados->id) 
        : "SELECT * FROM Produtos";

    $res = mysqli_query($conexao, $sql) or die("Erro ao tentar consultar");
    $produtos = [];

    while ($registro = mysqli_fetch_assoc($res)) {
        $produtos[] = new Produto(
            intval($registro['ID']),
            $registro['Nome'],
            $registro['Descricao'],
            $registro['Marca'],
            floatval($registro['Preco']),
            intval($registro['qtd']),
            $registro['Validade'] ? date('Y-m-d', strtotime($registro['Validade'])) : null,
            boolval($registro['Status']),
            $registro['ImagemURL']
        );
    }

    fecharConexao($conexao);

    return !empty($produtos) ? $produtos : 'Produto não encontrado';
}
?>
