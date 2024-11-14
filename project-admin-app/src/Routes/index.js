import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import FlashMessage from "react-native-flash-message";

// Importação das telas
import HomeScreen from "../Screen/Home";
import ProductListScreen from "../Screen/Product";
import ProductDetailScreen from "../Screen/ProductDetails";
import AddProductScreen from "../Screen/methods/post";
import UpdateProductScreen from "../Screen/methods/patch";
import EditProductScreen from "../Screen/methods/put";

const Router = () => {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Products"
          component={ProductListScreen}
          options={{ title: "Lista de Produtos" }}
        />
        <Stack.Screen
          name="ProductDetail"
          component={ProductDetailScreen}
          options={{ title: "Detalhes do Produto" }}
        />
        <Stack.Screen
          name="AddProduct"
          component={AddProductScreen}
          options={{ title: "Adicionar Produto" }}
        />
        <Stack.Screen
          name="PatchProduct"
          component={UpdateProductScreen}
          options={{ title: "Editar Produto" }}
        />
        <Stack.Screen
          name="PutProduct"
          component={EditProductScreen}
          options={{ title: "Atualizar Produto" }}
        />
      </Stack.Navigator>

      {/* FlashMessage é colocado aqui */}
      <FlashMessage position="top" />
    </NavigationContainer>
  );
};

export default Router;
