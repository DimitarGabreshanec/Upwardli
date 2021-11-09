import React, { useState, useRef, useCallback } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import {
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Linking,
  Alert,
} from "react-native";
import ButtonPrimary from "../components/ButtonPrimary";
import { StackNavigationProp } from "@react-navigation/stack";
import { Text, View } from "../components/Themed";
import FormGroupText from "../components/FormGroupText";
import FormGroupPassword from "../components/FormGroupPassword";
import * as SecureStore from "expo-secure-store";
import { Register } from "@upwardli/api/src/models/Register";
import { getCoreAPIClient } from "@upwardli/shared/api";
import { useAuthStateFunc } from "../hooks/AuthStateContext";
import { RootStackParamList } from "../types";

import upwardliLogo from "../assets/images/logo.png";
import GlobalStyles from "./GlobalStyles";

type SignUpScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "SignUp"
>;

type Props = {
  navigation: SignUpScreenNavigationProp;
};

export default function SignUpScreen({ navigation }: Props) {
  const lastNameEl = useRef() as React.MutableRefObject<TextInput>;
  const EmailEl = useRef() as React.MutableRefObject<TextInput>;
  const passwordEl = useRef() as React.MutableRefObject<TextInput>;
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isBusy, setIsBusy] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Register>();

  const upwardliLogin = useAuthStateFunc().upwardliLogin;

  const handleSignUp: SubmitHandler<Register> = async (data) => {
    const client = getCoreAPIClient();
    const register = {
      ...data,
      username: data.email,
      password2: data.password1,
    };
    try {
      setIsBusy(true);
      const authResponse = await client.createRegister({ register: register });
      SecureStore.setItemAsync("accessToken", authResponse.accessToken);
      SecureStore.setItemAsync("refreshToken", authResponse.refreshToken);
      console.log("User successfully authenticated");
      setIsBusy(false);
      upwardliLogin();
      navigation.navigate("Welcome");
    } catch (error) {
      setIsBusy(false);
    }
  };

  const openUserAgreeMentURL = useCallback(() => {
    Linking.openURL("https://www.upwardli.com/terms-of-service").catch((err) =>
      console.error("An error occurred", err)
    );
  }, []);

  const openUserPrivacyPolicyURL = useCallback(() => {
    Linking.openURL("https://www.upwardli.com/privacy-policy").catch((err) =>
      console.error("An error occurred", err)
    );
  }, []);

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={[GlobalStyles.container, styles.container]}>
        <Image style={GlobalStyles.logo} source={upwardliLogo} />

        <View style={GlobalStyles.fieldGroup}>
          <Text style={GlobalStyles.fieldLabel}>NAME</Text>
          <View style={{ flexDirection: "row" }}>
            <View style={{ flex: 0.5, paddingRight: 6 }}>
              <TextInput
                style={GlobalStyles.input}
                value={firstName}
                onChangeText={setFirstName}
                placeholder="First Name"
                returnKeyType="next"
                blurOnSubmit={false}
                onSubmitEditing={() => lastNameEl.current.focus()}
              />
            </View>
            <View style={{ flex: 0.5, paddingLeft: 6 }}>
              <TextInput
                style={GlobalStyles.input}
                value={lastName}
                onChangeText={setLastName}
                placeholder="Last Name"
                ref={lastNameEl}
                returnKeyType="next"
                blurOnSubmit={false}
                onSubmitEditing={() => EmailEl.current.focus()}
              />
            </View>
          </View>
        </View>
        <View style={GlobalStyles.fieldGroup}>
          <Controller
            control={control}
            rules={{
              required: "Email is required!",
              pattern: {
                value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i,
                message: "Enter valid email address!",
              },
            }}
            render={({ field: { onChange, value } }) => (
              <FormGroupText
                label="EMAIL"
                placeholder="Enter Email"
                value={value}
                setValue={onChange}
                error={errors.email?.message}
                keyboardType="email-address"
                ref={EmailEl}
                returnKeyType="next"
                blurOnSubmit={false}
                onSubmitEditing={() => passwordEl.current.focus()}
              />
            )}
            name="email"
          />
        </View>
        <View style={GlobalStyles.fieldGroup}>
          <Controller
            control={control}
            rules={{
              required: "Password is required!",
              minLength: {
                value: 8,
                message: "Minimum of 8 characters!",
              },
            }}
            render={({ field: { onChange, value } }) => (
              <FormGroupPassword
                label="PASSWORD"
                placeholder="Minimum of 8 characters"
                value={value}
                setValue={onChange}
                error={errors.password1?.message}
                ref={passwordEl}
                returnKeyType="go"
                onSubmitEditing={handleSubmit(handleSignUp)}
              />
            )}
            name="password1"
          />
        </View>

        <ButtonPrimary
          label="Create Account"
          onPress={handleSubmit(handleSignUp)}
          loading={isBusy}
        />

        <TouchableOpacity onPress={() => navigation.navigate("SignIn")}>
          <Text style={[GlobalStyles.text, styles.signinText]}>
            Already have an account? Return to sign-In
          </Text>
        </TouchableOpacity>

        <Text style={[GlobalStyles.text, styles.signinText, styles.toCArea]}>
          By clicking "Create Account", you are agreeing to our{" "}
          <TouchableOpacity onPress={openUserAgreeMentURL}>
            <Text style={[GlobalStyles.text]}>User Agreement &#38;</Text>
          </TouchableOpacity>{" "}
          <TouchableOpacity onPress={openUserPrivacyPolicyURL}>
            <Text style={[GlobalStyles.text]}>Privacy Policy</Text>
          </TouchableOpacity>
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: "20%",
    paddingBottom: "10%",
  },
  signinText: {
    textAlign: "center",
    marginTop: 26,
  },
  toCArea: {
    width: "80%",
    marginLeft: "10%",
    lineHeight: 24,
  },
});
