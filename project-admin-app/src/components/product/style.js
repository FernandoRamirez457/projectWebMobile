import { StyleSheet, Animated } from "react-native";

const cardStyles = StyleSheet.create({
  productCard: {
    width: "48%",
    backgroundColor: "#FFF",
    padding: 15,
    marginBottom: 20,
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    position: "relative",
    transform: [{ scale: 1 }],
    transitionDuration: "200ms",
  },
  productImage: {
    width: 120,
    height: 120,
    marginBottom: 10,
    borderRadius: 10,
    transition: "200ms",
  },
  productName: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#333",
  },
  productPrice: {
    fontSize: 19,
    color: "#7E57C2",
    fontWeight: "bold",

  },
  productDescription: {
    fontSize: 14,
    marginBottom: 5,
    color: "#333",
  },
  productQtd: {
    fontSize: 10,
    marginBottom: 5,
    color: 'gray',
  },
  actionIcons: {
    position: "absolute",
    top: 10,
    right: 10,
    flexDirection: "column",
  },
  iconButton: {
    padding: 10,
    borderRadius: 5,
    marginBottom: 5,
    transform: [{ scale: 1 }],
    transitionDuration: "200ms",
  },

  iconMethod: {
    height: 25,
    width: 25
  }
});

export default cardStyles;
