<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PATCH");
function editar_produto_parcialmente($conexao, $u)
{
   $id = $u->id;
   $campo = array_keys((array) $u)[1];
   $valor = $u->$campo;

   $verificar_sql = "SELECT id FROM produtos WHERE id = $id";
   $verificar_res = mysqli_query($conexao, $verificar_sql);

   if (mysqli_num_rows($verificar_res) == 0) {
      echo "ID inválido. Por favor, informe um válido. \n";
      fecharConexao($conexao);
      return false;
   }

   $sql = "UPDATE produtos SET $campo = '$valor' WHERE id = $id;";
   $res = mysqli_query($conexao, $sql) or die("Erro ao tentar deletar");

   fecharConexao($conexao);

   return $res;
}

?>