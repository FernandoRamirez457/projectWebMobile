import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  navbar: {
    position: 'absolute', // Fixa o navbar
    top: 0, // Posiciona no topo da tela
    left: 0,
    right: 0,
    height: 60,
    backgroundColor: '#3E35E6',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    zIndex: 1, // Garante que o navbar fique acima dos outros elementos
  },
  logo: {
    color: '#fff',
    fontWeight: 'bold',
    height: 40,
    width: 140
  },
  menuIcon: {
    padding: 10,
  },
  menuText: {
    color: '#fff',
    fontSize: 24,
  },
  sidebar: {
    position: 'absolute',
    top: 60, // Ajusta o topo da sidebar para logo abaixo do navbar
    bottom: 0,
    left: 0,
    width: '60%',
    backgroundColor: '#555',
    padding: 20,
    zIndex: 2000
  },
  sidebarText: {
    color: '#fff',
    fontSize: 18,
    marginVertical: 10,
  },
});

export default styles;
