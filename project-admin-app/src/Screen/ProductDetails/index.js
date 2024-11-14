import React from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import Icon from "react-native-vector-icons/Ionicons"; // para ícones
import styles from "./style.js";

const ProductDetailScreen = ({ route }) => {
  const { product } = route.params; // Obtém os detalhes do produto passado na navegação

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: product.imagemURL }} style={styles.productImage} />
      </View>

      <View style={styles.detailsContainer}>
        <Text style={styles.productName}>{product.nome}</Text>
        <Text style={styles.productMark}>{product.marca}</Text>

        <View style={styles.priceContainer}>
          <Icon name="pricetag-outline" size={22} color="#FFF" />
          <Text style={styles.productPrice}>R$ {product.preco}</Text>
        </View>

        <Text style={styles.productDescription}>{product.descricao}</Text>
        <Text style={styles.productQtd}>Quantidade: {product.qtd}</Text>
        <Text style={styles.productValidity}>Validade: {product.validade}</Text>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Adicionar ao Carrinho</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default ProductDetailScreen;
