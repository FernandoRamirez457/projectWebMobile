import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F0F4FA",
  },
  containerData: {
    marginBottom: 20,
  },
  containerImage: {
    marginTop: 20,
  },
  baseRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  baseInput: {
    flex: 1,
    marginHorizontal: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 10,
    padding: 10,
    backgroundColor: "#FFF",
  },
  picker: {
    height: 43,
    width: "100%",
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 10,
    backgroundColor: "#FFF",
  },
  imageButton: {
    padding: 10,
    backgroundColor: "red",
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
    marginBottom: 40
  },
  imageButtonText: {
    color: "#FFF",
    fontWeight: "bold",
  },
  finalizeButton: {
    backgroundColor: "#7E57C2",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  finalizeButtonText: {
    color: "#FFF",
    fontWeight: "bold",
  },
  imageFrame: {
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 10,
    marginTop: 10,
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  previewImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
});

export default styles;
