import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import ProductCard from "../../components/product";
import styles from "./style";
import { useRoute } from "@react-navigation/native";

const ProductListScreen = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const route = useRoute();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost/loja/Controller/produto.php");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      }
    };

    fetchProducts();
  }, []);

  // Função para atualizar produto
  const updateProduct = (updatedProduct) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product
      )
    );
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      const updatedProduct = route.params?.updatedProduct || null;
      if (updatedProduct) {
        updateProduct(updatedProduct);
        navigation.setParams({ updatedProduct: null }); // Limpa o parâmetro
      }
    });

    return unsubscribe;
  }, [navigation, route.params]);

  const handleDelete = (productId) => {
    setProducts((prevProducts) =>
      prevProducts.filter((product) => product.id !== productId)
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={{ flexGrow: 1 }}>
        <Text style={styles.title}>Todos os Produtos</Text>

        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate("AddProduct")}
        >
          <Text style={styles.addButtonText}>+ Adicionar Produto</Text>
        </TouchableOpacity>

        <View style={styles.productGrid}>
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              navigation={navigation}
              onDelete={handleDelete}
              onEdit={() => navigation.navigate("EditProduct", { productId: product.id })}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default ProductListScreen;
