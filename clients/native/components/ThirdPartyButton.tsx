import * as React from "react";
import { StyleSheet, Image, TouchableHighlight } from "react-native";

import { Text, View } from "./Themed";

type Prop = {
  buttonImage: object;
  buttonText: string | undefined;
  onPress: () => void;
};
export default function ThirdPartyButton({
  buttonImage,
  buttonText,
  onPress,
}: Prop) {
  return (
    <TouchableHighlight
      style={styles.container}
      onPress={onPress}
      underlayColor="lightgrey"
    >
      <View style={styles.buttonContainer}>
        {buttonImage && (
          <Image style={styles.buttonLogo} source={buttonImage}></Image>
        )}
        <Text style={styles.buttonText}>{buttonText}</Text>
      </View>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderRadius: 10,
    alignSelf: "stretch",
    backgroundColor: "white",
    borderColor: "lightgrey",
    borderWidth: 1,
    alignItems: "center",
  },
  buttonContainer: {
    backgroundColor: "transparent",
    flexDirection: "row",
    alignItems: "center",
  },
  buttonLogo: {
    height: 20,
    width: 20,
    marginRight: 10,
  },
  buttonText: {
    textAlign: "center",
    fontSize: 16,
    color: "grey",
  },
});
