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

export default function ButtonSecondaryOutline({
  label,
  onPress,
  style,
  loading,
}: Prop) {
  return (
    <TouchableHighlight
      style={[
        styles.buttonSecondaryOutline,
        style ? style : null,
        loading ? styles.loadingBg : null,
      ]}
      underlayColor={Colors.grey["200"]}
      onPress={onPress}
      disabled={loading}
    >
      {loading ? (
        <ActivityIndicator />
      ) : (
        <Text style={styles.buttonTextSecondaryOutline}>{label}</Text>
      )}
    </TouchableHighlight>
  );
}
const styles = StyleSheet.create({
  buttonSecondaryOutline: {
    borderRadius: 10,
    height: 56,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.grey["600"],
  },
  buttonTextSecondaryOutline: {
    textAlign: "center",
    fontSize: 17,
    color: Colors.grey["600"],
  },
  loadingBg: {
    backgroundColor: Colors.grey["200"],
  },
});
