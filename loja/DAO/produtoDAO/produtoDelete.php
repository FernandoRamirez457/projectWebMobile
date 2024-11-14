<?php


function deletar_produto($conexao, $u)
{
   $id = $u->id;

   $sql = "DELETE FROM Produtos WHERE ID = $id";
   $res = mysqli_query($conexao, $sql) or die("Erro ao tentar deletar");


   fecharConexao($conexao);
   return $res;
}

?>