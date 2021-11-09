import React from "react";
import {
  Text,
  TextInput,
  TextInputProps,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { View } from "./Themed";

type Prop = {
  label?: string | undefined;
  placeholder?: string | undefined;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  error?: string | undefined | false;
};

type AllProps = Prop & TextInputProps;

const FormGroupPassword = React.forwardRef(
  (
    { label, placeholder, value, setValue, error, ...rest }: AllProps,
    ref: React.Ref<TextInput>
  ) => {
    const [secureTextEntry, setSecureTextEntry] = React.useState<boolean>(true);
    const [iconName, setIconName] = React.useState<any>("eye");

    function onIconPress() {
      setSecureTextEntry((prevSecureTextEntry) => !prevSecureTextEntry);
      setIconName(secureTextEntry ? "eye-off" : "eye");
    }

    return (
      <>
        <Text style={[styles.label, error ? styles.invalidLabel : null]}>
          {label}
        </Text>
        <View style={[styles.container, error ? styles.invalidInput : null]}>
          <TextInput
            style={styles.passwordInput}
            placeholder={placeholder || "Password"}
            value={value}
            onChangeText={setValue}
            secureTextEntry={secureTextEntry}
            ref={ref}
            {...rest}
          ></TextInput>
          <TouchableOpacity onPress={onIconPress}>
            <Ionicons style={styles.icon} name={iconName} size={20} />
          </TouchableOpacity>
        </View>
        {error ? <Text style={styles.errText}>{error}</Text> : null}
      </>
    );
  }
);
export default FormGroupPassword;

const styles = StyleSheet.create({
  label: {
    fontSize: 15,
    color: "gray",
    paddingBottom: 5,
  },
  invalidLabel: {
    color: "#A3090C",
  },
  invalidInput: {
    borderColor: "#A3090C",
  },
  errText: {
    fontSize: 12,
    color: "#A3090C",
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "lightgray",
    backgroundColor: "transparent",
  },
  passwordInput: {
    flex: 1,
    fontSize: 17,
  },
  icon: {
    color: "gray",
  },
});
