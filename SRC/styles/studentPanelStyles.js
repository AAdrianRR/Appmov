import { StyleSheet } from "react-native";

const cardShadow = {
  elevation: 5,
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 3 },
  shadowOpacity: 0.3,
  shadowRadius: 5,
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 100,
    backgroundColor: "#f0fcff",
  },
  card1: {
    backgroundColor: "#f6a729",
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    ...cardShadow,
  },
  card2: {
    backgroundColor: "#28c3cd",
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    ...cardShadow,
  },
  card3: {
    backgroundColor: "#6e2166",
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    ...cardShadow,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#ffffff",
  },
  photo: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginRight: 20,
    borderWidth: 2,
    borderColor: "#fff",
  },
  infoBox: {
    flex: 1,
  },
  infoText: {
    fontSize: 16,
    color: "#fff",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
  },
  subText: {
    fontSize: 16,
    color: "#fff",
  },
  scheduleText: {
    fontSize: 16,
    color: "#fff",
  },
  downloadButton: {
    marginTop: 15,
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 8,
    alignSelf: "center",
  },
  downloadButtonText: {
    color: "#6e2166",
    fontWeight: "bold",
  },
  logoutButton: {
    marginTop: 20,
    backgroundColor: "#c1292e",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    ...cardShadow,
  },
  logoutText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 25,
    borderRadius: 15,
    alignItems: "center",
  },
  modalButton: {
    marginTop: 10,
    backgroundColor: "#28c3cd",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  modalButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default styles;
