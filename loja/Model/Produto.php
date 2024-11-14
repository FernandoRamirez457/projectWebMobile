<?php
class Produto
{
    public $id;
    public $nome;
    public $descricao;
    public $marca;
    public $preco;
    public $qtd;
    public $validade;
    public $status;
    public $imagemURL;

    public function __construct($id, $nome, $descricao, $marca, $preco, $qtd, $validade, $status, $imagemURL)
    {
        $this->id = $id;
        $this->nome = $nome;
        $this->descricao = $descricao;
        $this->marca = $marca;
        $this->preco = $preco;
        $this->qtd = $qtd;
        $this->validade = $validade;
        $this->status = $status;
        $this->imagemURL = $imagemURL;
    }
}
?>
