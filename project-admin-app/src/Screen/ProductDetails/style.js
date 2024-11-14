import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 0,
    backgroundColor: "#F4F7FA",
  },
  imageContainer: {
    backgroundColor: "#FFF",
    padding: 15,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  productImage: {
    width: "100%",
    height: 300,
    borderRadius: 20,
  },
  detailsContainer: {
    paddingHorizontal: 25,
    paddingVertical: 20,
  },
  productName: {
    fontSize: 30,
    fontWeight: "800",
    color: "#333",
    textAlign: "center",
    marginBottom: 8,
  },
  productMark: {
    fontSize: 16,
    color: "#777",
    textAlign: "center",
    marginBottom: 20,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#7D4ED8",
    borderRadius: 25,
    paddingVertical: 8,
    paddingHorizontal: 15,
    alignSelf: "center",
    marginBottom: 20,
  },
  productPrice: {
    fontSize: 24,
    fontWeight: "700",
    color: "#FFF",
    marginLeft: 8,
  },
  productDescription: {
    fontSize: 16,
    color: "#4F4F4F",
    textAlign: "justify",
    lineHeight: 22,
    marginBottom: 15,
  },
  productQtd: {
    fontSize: 14,
    color: "#555",
    marginBottom: 5,
  },
  productValidity: {
    fontSize: 14,
    color: "#A0A4A8",
    marginBottom: 25,
  },
  button: {
    backgroundColor: "#4D47C3",
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: "center",
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "700",
  },
});

export default styles;
