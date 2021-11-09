import React from "react";
import { TextInput, StyleSheet, TextInputProps } from "react-native";
import { Text, View } from "./Themed";
import GlobalStyles from "../screens/GlobalStyles";

type Prop = {
  label?: string | undefined;
  placeholder?: string | undefined;
  value?: string;
  setValue?: React.Dispatch<React.SetStateAction<string>>;
  error?: string | undefined | boolean;
};

type AllProps = Prop & TextInputProps;

const FormGroupText = React.forwardRef(
  (
    { label, placeholder, value, setValue, error, ...rest }: AllProps,
    ref?: React.Ref<TextInput>
  ) => {
    return (
      <>
        <Text
          style={[GlobalStyles.fieldLabel, error ? styles.invalidLabel : null]}
        >
          {label}
        </Text>
        <TextInput
          style={[GlobalStyles.input, error ? styles.invalidInput : null]}
          value={value}
          onChangeText={setValue}
          placeholder={placeholder}
          ref={ref}
          {...rest}
        />
        {error ? <Text style={styles.errText}>{error}</Text> : null}
      </>
    );
  }
);
export default FormGroupText;

const styles = StyleSheet.create({
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
});
