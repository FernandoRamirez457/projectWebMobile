import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Picker,
  Image,
} from "react-native";
import { launchImageLibrary } from "react-native-image-picker";
import { showMessage } from "react-native-flash-message"; // Importação do showMessage
import styles from "./style.js";

const UpdateProductScreen = ({ navigation, route }) => {
  const { product } = route.params; // Recebe o produto selecionado

  // Inicializa os estados com os valores do produto
  const [productStatus, setProductStatus] = useState(product.status || "true");
  const [productName, setProductName] = useState(product.nome || "");
  const [productBrand, setProductBrand] = useState(product.marca || "");
  const [productPrice, setProductPrice] = useState(product.preco || "");
  const [productQuantity, setProductQuantity] = useState(product.qtd || "");
  const [productValidity, setProductValidity] = useState(
    product.validade || ""
  );
  const [productDescription, setProductDescription] = useState(
    product.descricao || ""
  );
  const [productImage, setProductImage] = useState(product.imagemURL || null);

  const handleSelectImage = () => {
    launchImageLibrary({ mediaType: "photo" }, (response) => {
      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else {
        const source = {
          uri: response.assets[0].uri,
          type: response.assets[0].type,
          fileName: response.assets[0].fileName,
        };
        setProductImage(source);
      }
    });
  };

  const handleUpdateProduct = async () => {
    const formData = new FormData();
    formData.append("method", "PATCH"); // Indica o método PATCH para atualização
    formData.append("id", product.id); // ID do produto para identificar a atualização
    formData.append("status", productStatus);
    formData.append("nome", productName);
    formData.append("marca", productBrand);
    formData.append("preco", productPrice);
    formData.append("qtd", productQuantity);
    formData.append("validade", productValidity);
    formData.append("descricao", productDescription);

    // Adiciona a imagem ao FormData se uma nova imagem foi selecionada
    if (productImage && productImage.uri !== product.imagemURL) {
      formData.append("imagemURL", {
        uri: productImage.uri,
        type: productImage.type,
        name: productImage.fileName,
      });
    }

    try {
      const response = await fetch(
        "http://localhost/loja/Controller/produto.php",
        {
          method: "POST",
          body: formData,
          headers: {
            Accept: "application/json",
          },
        }
      );

      const responseData = await response.json();

      if (response.ok) {
        showMessage({
          message: "Produto atualizado com sucesso!",
          type: "success",
          icon: "success",
          duration: 3000, // Duração da mensagem
        });

        const updatedProduct = {
          id: product.id,
          nome: productName,
          marca: productBrand,
          preco: productPrice,
          qtd: productQuantity,
          validade: productValidity,
          descricao: productDescription,
          status: productStatus,
          imagemURL: productImage?.uri,
        };

        navigation.navigate("Products", { updatedProduct });
      } else {
        showMessage({
          message:
            responseData.msg || "Falha ao atualizar produto. Tente novamente.",
          type: "danger",
          icon: "danger",
          duration: 3000,
        });
      }
    } catch (error) {
      console.error("Erro ao atualizar produto:", error);
      showMessage({
        message: "Ocorreu um erro ao tentar atualizar o produto.",
        type: "danger",
        icon: "danger",
        duration: 3000,
      });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerData}>
        <View style={styles.baseRow}>
          <View style={styles.baseInput}>
            <Text>ID:</Text>
            <TextInput
              style={styles.input}
              value={String(product.id)}
              editable={false} // ID não editável
            />
          </View>

          <View style={styles.baseInput}>
            <Text>Status:</Text>
            <Picker
              selectedValue={productStatus}
              onValueChange={(itemValue) => setProductStatus(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="Disponível" value="true" />
              <Picker.Item label="Indisponível" value="false" />
            </Picker>
          </View>
        </View>

        <View style={styles.baseRow}>
          <View style={styles.baseInput}>
            <Text>Nome:</Text>
            <TextInput
              style={styles.input}
              value={productName}
              onChangeText={setProductName}
              required
            />
          </View>

          <View style={styles.baseInput}>
            <Text>Marca:</Text>
            <TextInput
              style={styles.input}
              value={productBrand}
              onChangeText={setProductBrand}
              required
            />
          </View>
        </View>

        <View style={styles.baseRow}>
          <View style={styles.baseInput}>
            <Text>Preço:</Text>
            <TextInput
              style={styles.input}
              value={productPrice}
              onChangeText={setProductPrice}
              required
              keyboardType="numeric"
            />
          </View>

          <View style={styles.baseInput}>
            <Text>Quantidade:</Text>
            <TextInput
              style={styles.input}
              value={productQuantity}
              onChangeText={setProductQuantity}
              required
              keyboardType="numeric"
            />
          </View>

          <View style={styles.baseInput}>
            <Text>Validade:</Text>
            <TextInput
              style={styles.input}
              value={productValidity}
              onChangeText={setProductValidity}
              required
            />
          </View>
        </View>

        <View style={styles.baseRow}>
          <View style={styles.baseInput}>
            <Text>Descrição:</Text>
            <TextInput
              style={styles.input}
              value={productDescription}
              onChangeText={setProductDescription}
              required
              multiline
            />
          </View>
        </View>
      </View>

      <View style={styles.containerImage}>
        <View style={styles.baseInput}>
          <Text>Imagem:</Text>
          <View style={styles.imageFrame}>
            {productImage && (
              <Image
                source={{ uri: productImage.uri }}
                style={styles.previewImage}
              />
            )}
          </View>
          <TouchableOpacity
            style={styles.imageButton}
            onPress={handleSelectImage}
          >
            <Text style={styles.imageButtonText}>
              {productImage ? "Imagem Selecionada" : "Selecionar Imagem"}
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.finalizeButton}
          onPress={handleUpdateProduct}
        >
          <Text style={styles.finalizeButtonText}>Atualizar Produto</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default UpdateProductScreen;
