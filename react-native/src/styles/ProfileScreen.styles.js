import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  nameWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  displayName: {
    fontSize: 24,
    fontWeight: "bold",
  },
  displayNameInput: {
    fontSize: 24,
    borderBottomWidth: 1,
    marginRight: 8,
  },
  bioWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  bio: {
    fontSize: 16,
  },
  bioInput: {
    fontSize: 16,
    borderBottomWidth: 1,
    marginRight: 8,
  },
  editIcon: {
    fontSize: 18,
    marginLeft: 8,
  },
  email: {
    fontSize: 16,
    marginTop: 8,
  },
  phoneNumber: {
    fontSize: 16,
    marginTop: 8,
  },
  bio: {
    fontSize: 16,
    marginTop: 8,
  },
  createdAt: {
    fontSize: 16,
    marginTop: 8,
  },
});

export default styles;
