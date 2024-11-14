import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Picker,
  Image,
} from "react-native";
import { launchImageLibrary } from "react-native-image-picker";
import { showMessage } from "react-native-flash-message";
import styles from "./style.js";

const EditProductScreen = ({ route, navigation }) => {
  const { productId } = route.params;

  const [productStatus, setProductStatus] = useState("true");
  const [productName, setProductName] = useState("");
  const [productBrand, setProductBrand] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productQuantity, setProductQuantity] = useState("");
  const [productValidity, setProductValidity] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productImage, setProductImage] = useState(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost/loja/Controller/produto.php?id=${productId}`
        );
        const data = await response.json();
        if (response.ok) {
          setProductName(data.nome || "");
          setProductBrand(data.marca || "");
          setProductPrice(data.preco || "");
          setProductQuantity(data.qtd || "");
          setProductValidity(data.validade || "");
          setProductDescription(data.descricao || "");
          setProductStatus(data.status ? "true" : "false");
        } else {
          Alert.alert("Erro", "Falha ao carregar os dados do produto.");
        }
      } catch (error) {
        console.error("Erro ao buscar produto:", error);
        Alert.alert("Erro", "Ocorreu um erro ao tentar carregar o produto.");
      }
    };

    fetchProductDetails();
  }, [productId]);

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
        };
        setProductImage(source);
      }
    });
  };

  const handleEditProduct = async () => {
    const formData = new FormData();
    formData.append("method", "PUT");
    formData.append("id", productId);
    formData.append("status", productStatus);
    formData.append("nome", productName);
    formData.append("marca", productBrand);
    formData.append("preco", productPrice);
    formData.append("qtd", productQuantity);
    formData.append("validade", productValidity);
    formData.append("descricao", productDescription);

    if (productImage) {
      formData.append("imagemURL", {
        uri: productImage.uri,
        type: productImage.type,
        name: "product_image.jpg",
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
          duration: 3000,
        });

        const updatedProduct = {
          id: productId,
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
        Alert.alert(
          "Erro",
          responseData.msg || "Falha ao atualizar produto. Tente novamente."
        );
      }
    } catch (error) {
      console.error("Erro ao atualizar produto:", error);
      Alert.alert("Erro", "Ocorreu um erro ao tentar atualizar o produto.");
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
              value={String(productId)}
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
            />
          </View>

          <View style={styles.baseInput}>
            <Text>Marca:</Text>
            <TextInput
              style={styles.input}
              value={productBrand}
              onChangeText={setProductBrand}
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
              keyboardType="numeric"
            />
          </View>

          <View style={styles.baseInput}>
            <Text>Quantidade:</Text>
            <TextInput
              style={styles.input}
              value={productQuantity}
              onChangeText={setProductQuantity}
              keyboardType="numeric"
            />
          </View>

          <View style={styles.baseInput}>
            <Text>Validade:</Text>
            <TextInput
              style={styles.input}
              value={productValidity}
              onChangeText={setProductValidity}
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
              multiline
            />
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
            onPress={handleEditProduct}
          >
            <Text style={styles.finalizeButtonText}>Finalizar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default EditProductScreen;

