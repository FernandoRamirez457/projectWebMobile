// deleteProduct.js
import { Alert } from "react-native";

export const deleteProduct = async (productId, onDelete) => {
  const formData = new FormData();
  formData.append("method", "DELETE");
  formData.append("id", productId);

  try {
    const response = await fetch("http://localhost/loja/Controller/produto.php", {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
      },
    });

    const responseData = await response.json();

    if (response.ok) {
      Alert.alert("Sucesso", "Produto excluído com sucesso!");
      onDelete(productId);
    } else {
      Alert.alert("Erro", responseData.msg || "Falha ao excluir o produto.");
    }
  } catch (error) {
    console.error("Erro ao excluir produto:", error);
    Alert.alert("Erro", "Ocorreu um erro ao tentar excluir o produto.");
  }
};
