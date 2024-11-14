import React from "react";
import styles from "./style";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Navbar from "../../components/navbar";

const HomeScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Navbar style={styles.sidebar} />

      <ScrollView style={styles.mainContent}>
        <View style={styles.header}>
          <Text style={styles.headerDate}>Outubro 11, 2024</Text>
          <View>
            <Text style={styles.welcomeMessage}>
              Bem Vindo de Volta!, Charlie
            </Text>
            <Text style={styles.subMessage}>Tenha um Ótimo Dia!</Text>
          </View>
        </View>

        <Text style={styles.membersTitle}>My Functions</Text>

        <View style={styles.functions}>
          <TouchableOpacity
            style={styles.functionBox}
            onPress={() => navigation.navigate("Products")}
          >
            <Image
              source={{
                uri: "https://cdn3d.iconscout.com/3d/premium/thumb/product-3d-icon-download-in-png-blend-fbx-gltf-file-formats--tag-packages-box-marketing-advertisement-pack-branding-icons-4863042.png?f=webp",
              }}
              style={styles.functionIcon}
            />
            <Text style={styles.functionTitle}>Access All Products</Text>
            <Text style={styles.functionDescription}>
              Visualize e gerencie todos os produtos disponíveis no sistema.
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.functionBox}>
            <Image
              source={{
                uri: "https://static.vecteezy.com/system/resources/previews/009/374/090/original/3d-user-account-icon-png.png",
              }}
              style={styles.functionIcon}
            />
            <Text style={styles.functionTitle}>Access All Users</Text>
            <Text style={styles.functionDescription}>
              Visualize e gerencie todos os usuários registrados no sistema.
            </Text>
          </TouchableOpacity>
        </View>

        {/* Members Section */}
        <View style={styles.membersSection}>
          <Text style={styles.membersTitle}>Members</Text>
          <View style={styles.memberBox}>
            <View style={styles.profileBox}>
              <Image
                source={{
                  uri: "https://img.freepik.com/vetores-gratis/ilustracao-de-desenho-animado-de-perfil-lateral-desenhada-a-mao_23-2150503812.jpg",
                }}
                style={styles.profilePic}
              />
              <Text style={styles.memberName}>Maria Selva</Text>
            </View>
            <Text style={styles.memberRole}>Mentor</Text>
            <TouchableOpacity style={styles.followButton}>
              <Text style={styles.followText}>Follow</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.memberBox}>
            <View style={styles.profileBox}>
              <Image
                source={{
                  uri: "https://img.freepik.com/vetores-gratis/ilustracao-de-desenho-animado-de-perfil-lateral-desenhada-a-mao_23-2150517168.jpg",
                }}
                style={styles.profilePic}
              />
              <Text style={styles.memberName}>Lucas Costa</Text>
            </View>
            <Text style={styles.memberRole}>Mentor</Text>
            <TouchableOpacity style={styles.followButton}>
              <Text style={styles.followText}>Follow</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.memberBox}>
            <View style={styles.profileBox}>
              <Image
                source={{
                  uri: "https://img.freepik.com/vetores-premium/ilustracao-de-desenho-animado-de-perfil-lateral-desenhada-a-mao_23-2150503791.jpg?semt=ais_hybrid",
                }}
                style={styles.profilePic}
              />
              <Text style={styles.memberName}>Rafael Alves</Text>
            </View>
            <Text style={styles.memberRole}>Mentor</Text>
            <TouchableOpacity style={styles.followButton}>
              <Text style={styles.followText}>Follow</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.memberBox}>
            <View style={styles.profileBox}>
              <Image
                source={{
                  uri: "https://img.freepik.com/free-vector/hand-drawn-side-profile-cartoon-illustration_23-2150503821.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1727827200&semt=ais_hybrid",
                }}
                style={styles.profilePic}
              />
              <Text style={styles.memberName}>Luis Almeida</Text>
            </View>
            <Text style={styles.memberRole}>Mentor</Text>
            <TouchableOpacity style={styles.followButton}>
              <Text style={styles.followText}>Follow</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
