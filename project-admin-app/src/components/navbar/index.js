import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import styles from "./style";
export default function Navbar() {
  // Estado para controlar a visibilidade da sidebar
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);



  return (
    <>
      {/* Navbar com logo e menu icon */}
      <View style={styles.navbar}>
        <TouchableOpacity style={styles.menuIcon}>
          <Text style={styles.menuText}>☰</Text>
        </TouchableOpacity>
        <Image source={require("../../imagem/creaty-logo.png")} style={styles.logo}/>
      </View>
    </>
  );
}
