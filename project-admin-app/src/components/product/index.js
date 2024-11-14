import React, { useRef } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Animated,
  Platform,
} from "react-native";
import cardStyles from "./style";
import { deleteProduct } from "../../Screen/methods/delete";
import { showMessage } from "react-native-flash-message";

const ProductCard = ({ product, navigation, onDelete }) => {
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const translateYAnim = useRef(new Animated.Value(10)).current;

  const handleMouseEnter = () => {
    Animated.parallel([
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(translateYAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleMouseLeave = () => {
    Animated.parallel([
      Animated.timing(opacityAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(translateYAnim, {
        toValue: 10,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleDelete = async () => {
    try {
      await deleteProduct(product.id, onDelete);

      showMessage({
        message: "Produto apagado com sucesso!",
        type: "success",
        icon: "success",
        duration: 3000,
      });
    } catch (error) {
      console.error("Erro ao excluir produto:", error);

      showMessage({
        message: "Erro ao excluir produto",
        type: "danger",
        icon: "danger",
        duration: 3000,
      });
    }
  };

  const handleEdit = () => {
    navigation.navigate("PutProduct", { productId: product.id });
  };

  const handlePatch = () => {
    navigation.navigate("PatchProduct", { product: product });
  };

  return (
    <TouchableOpacity
      style={cardStyles.productCard}
      onMouseEnter={Platform.OS === "web" ? handleMouseEnter : null}
      onMouseLeave={Platform.OS === "web" ? handleMouseLeave : null}
      onPressIn={Platform.OS !== "web" ? handleMouseEnter : null}
      onPressOut={Platform.OS !== "web" ? handleMouseLeave : null}
      onPress={() => navigation.navigate("ProductDetail", { product })}
      activeOpacity={1}
    >
      <Image
        source={{ uri: product.imagemURL }}
        style={cardStyles.productImage}
      />
      <Text style={cardStyles.productName}>{product.nome}</Text>
      <Text style={cardStyles.productDescription}>{product.descricao}</Text>
      <Text style={cardStyles.productQtd}>Quant: {product.qtd}</Text>
      <Text style={cardStyles.productPrice}>R$ {product.preco}</Text>


      <Animated.View
        style={[
          cardStyles.actionIcons,
          {
            opacity: opacityAnim,
            transform: [{ translateY: translateYAnim }],
          },
        ]}
      >
        <TouchableOpacity
          style={[cardStyles.iconButton, { backgroundColor: "#F44336" }]}
          onPress={handleDelete}
        >
          <Image
            source={{
              uri: "https://img.icons8.com/m_rounded/512/FFFFFF/trash.png",
            }}
            style={cardStyles.iconMethod}
          ></Image>
        </TouchableOpacity>

        <TouchableOpacity
          style={[cardStyles.iconButton, { backgroundColor: "#2196F3" }]}
          onPress={handleEdit}
        >
          <Image
            source={{
              uri: "https://img.icons8.com/win10/512/FFFFFF/refresh.png",
            }}
            style={cardStyles.iconMethod}
          ></Image>
        </TouchableOpacity>

        <TouchableOpacity
          style={[cardStyles.iconButton, { backgroundColor: "#4CAF50" }]}
          onPress={handlePatch}
        >
          <Image
            source={{
              uri: "https://img.icons8.com/fluent-systems-filled/200/FFFFFF/edit.png",
            }}
            style={cardStyles.iconMethod}
          ></Image>
        </TouchableOpacity>
      </Animated.View>
    </TouchableOpacity>
  );
};

export default ProductCard;
