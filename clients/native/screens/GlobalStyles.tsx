import { StyleSheet, Platform, StatusBar } from "react-native";
import Colors from "../constants/Colors";
import Constants from "expo-constants";
const statusBarHeight = Constants.statusBarHeight;

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  safeArea: {
    flex: 1,
    backgroundColor: "transparent",
    paddingTop: Platform.OS === "android" ? statusBarHeight : 0,
  },
  logo: {
    alignSelf: "center",
    margin: 20,
  },
  text: {
    color: Colors.grey["600"],
    fontSize: 13,
  },
  title2: {
    fontSize: 22,
    lineHeight: 28,
    color: Colors.grey["1000"],
    fontWeight: "bold",
    textAlign: "center",
  },
  body: {
    fontSize: 17,
    lineHeight: 22,
    color: Colors.grey["800"],
    textAlign: "center",
  },
  caption1: {
    fontSize: 12,
    lineHeight: 16,
    color: Colors.grey["600"],
  },
  fieldGroup: {
    marginBottom: 24,
  },
  fieldLabel: {
    fontSize: 15,
    color: "gray",
    paddingBottom: 5,
  },
  input: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "lightgray",
    backgroundColor: "transparent",
    fontSize: 17,
  },
  topDecorator: {
    width: "100%",
  },
});
