import React from "react";
import {
  TouchableHighlight,
  StyleSheet,
  ViewStyle,
  ActivityIndicator,
} from "react-native";
import Colors from "../constants/Colors";
import { Text } from "./Themed";

type Prop = {
  label: string;
  onPress?: any;
  style?: ViewStyle;
  loading?: boolean;
};

export default function ButtonPrimary({
  label,
  onPress,
  style,
  loading,
}: Prop) {
  return (
    <TouchableHighlight
      style={[
        styles.buttonPrimary,
        style ? style : null,
        loading ? styles.loadingBg : null,
      ]}
      underlayColor={Colors.brandBlue["400"]}
      onPress={onPress}
      disabled={loading}
    >
      {loading ? (
        <ActivityIndicator color="#ffffff" />
      ) : (
        <Text style={styles.buttonTextPrimary}>{label}</Text>
      )}
    </TouchableHighlight>
  );
}
const styles = StyleSheet.create({
  buttonPrimary: {
    borderRadius: 10,
    height: 56,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.brandBlue["600"],
  },
  buttonTextPrimary: {
    textAlign: "center",
    fontSize: 17,
    fontWeight: "bold",
    color: "white",
  },
  loadingBg: {
    backgroundColor: Colors.brandBlue["400"],
  },
});
