import React from "react";
import {
  TextInput,
  TextInputProps,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { View } from "./Themed";

interface Prop {
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  placeholder?: string | undefined;
}

interface AllProps extends Prop, TextInputProps {}

const PasswordToggleInput = React.forwardRef(
  (
    { password, setPassword, placeholder, ...rest }: AllProps,
    ref?: React.Ref<TextInput>
  ) => {
    const [secureTextEntry, setSecureTextEntry] = React.useState<boolean>(true);
    const [iconName, setIconName] = React.useState<any>("eye");

    function onIconPress() {
      setSecureTextEntry((prevSecureTextEntry) => !prevSecureTextEntry);
      setIconName(secureTextEntry ? "eye-off" : "eye");
    }

    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder={placeholder || "Password"}
          value={password}
          onChangeText={setPassword}
          secureTextEntry={secureTextEntry}
          ref={ref}
          {...rest}
        ></TextInput>
        <TouchableOpacity onPress={onIconPress}>
          <Ionicons style={styles.icon} name={iconName} size={20} />
        </TouchableOpacity>
      </View>
    );
  }
);

export default PasswordToggleInput;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "lightgray",
    backgroundColor: "transparent",
  },
  input: {
    flex: 1,
    fontSize: 17,
  },
  icon: {
    color: "gray",
  },
});
