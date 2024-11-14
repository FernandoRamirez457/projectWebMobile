import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Picker,
  Image,
} from "react-native";
import { launchImageLibrary } from "react-native-image-picker"; // Importa a função para seleção de imagem
import { showMessage } from "react-native-flash-message"; // Importa o showMessage
import styles from "./style.js";

const AddProductScreen = ({ navigation }) => {
  const [productStatus, setProductStatus] = useState("true");
  const [productName, setProductName] = useState("");
  const [productBrand, setProductBrand] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productQuantity, setProductQuantity] = useState("");
  const [productValidity, setProductValidity] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productImage, setProductImage] = useState(null);

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

  const handleAddProduct = async () => {
    const formData = new FormData();
    formData.append("method", "POST"); // Adiciona o método
    formData.append("status", productStatus);
    formData.append("nome", productName);
    formData.append("marca", productBrand);
    formData.append("preco", productPrice);
    formData.append("qtd", productQuantity);
    formData.append("validade", productValidity);
    formData.append("descricao", productDescription);

    // Se a imagem foi selecionada, adicione-a ao FormData
    if (productImage) {
      formData.append("imagemURL", {
        uri: productImage.uri,
        type: productImage.type,
        name: productImage.fileName,
      });
    }

    console.log("Dados do produto antes do envio:", {
      status: productStatus,
      nome: productName,
      marca: productBrand,
      preco: productPrice,
      qtd: productQuantity,
      validade: productValidity,
      descricao: productDescription,
      imagemURL: productImage,
    });

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
        // Exibe a mensagem de sucesso com react-native-flash-message
        showMessage({
          message: "Produto adicionado com sucesso!",
          type: "success",
          icon: "success",
          duration: 3000, // Exibe por 3 segundos
        });

        navigation.goBack(); // Retorna para a tela anterior
      } else {
        Alert.alert(
          "Erro",
          responseData.msg || "Falha ao adicionar produto. Tente novamente."
        );
      }
    } catch (error) {
      console.error("Erro ao adicionar produto:", error);
      Alert.alert("Erro", "Ocorreu um erro ao tentar adicionar o produto.");
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
              editable={false} // ID não editável
            />
            <TextInput type="hidden" value="" />
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
              keyboardType="default" // Pode ser alterado para "numeric" se você quiser
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
                id="preview-image"
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
          onPress={handleAddProduct}
        >
          <Text style={styles.finalizeButtonText}>Finalizar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AddProductScreen;
