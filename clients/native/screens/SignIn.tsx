import React, { useState, useRef } from "react";
import {
  Image,
  TextInput,
  TextInputBase,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import ButtonPrimary from "../components/ButtonPrimary";
import Layout from "../constants/Layout";
import Colors from "../constants/Colors";
import { StackNavigationProp } from "@react-navigation/stack";
import { Text, View } from "../components/Themed";
import ThirdPartyButton from "../components/ThirdPartyButton";
import PasswordToggleInput from "../components/PasswordToggleInput";
import * as SecureStore from "expo-secure-store";
import { Login } from "@upwardli/api/dist/models/Login";
import { getCoreAPIClient } from "@upwardli/shared/api";
import { useAuthStateFunc } from "../hooks/AuthStateContext";
import { RootStackParamList } from "../types";

import upwardliLogo from "../assets/images/logo.png";
import googleLogo from "../assets/images/google-logo.png";
import facebookLogo from "../assets/images/facebook-logo.png";
import appleLogo from "../assets/images/apple-logo.png";
import GlobalStyles from "./GlobalStyles";

type SignInScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "SignIn"
>;

type Props = {
  navigation: SignInScreenNavigationProp;
};

export default function SignInScreen({ navigation }: Props) {
  const passwordEl = useRef() as React.MutableRefObject<TextInput>;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isBusy, setIsBusy] = useState(false);

  const upwardliLogin = useAuthStateFunc().upwardliLogin;

  const handleEmailLogin = async () => {
    const client = getCoreAPIClient();
    //TODO remove before launch
    const login: Login = {
      email: "staff@upwardli.com",
      password: "upwardli",
    };
    // const login: Login = {
    //   email: email,
    //   password: password,
    // };
    try {
      setIsBusy(true);
      const authResponse = await client.createLogin({ login: login });
      SecureStore.setItemAsync("accessToken", authResponse.accessToken);
      SecureStore.setItemAsync("refreshToken", authResponse.refreshToken);
      console.log("User successfully authenticated");
      setIsBusy(false);
      upwardliLogin();
    } catch (error) {
      setIsBusy(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={[GlobalStyles.container, styles.container]}>
        <Image style={GlobalStyles.logo} source={upwardliLogo} />
        <TextInput
          style={GlobalStyles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          keyboardType="email-address"
          returnKeyType="next"
          blurOnSubmit={false}
          onSubmitEditing={() => passwordEl.current.focus()}
        />
        <PasswordToggleInput
          password={password}
          setPassword={setPassword}
          ref={passwordEl}
          returnKeyType="go"
          onSubmitEditing={handleEmailLogin}
        ></PasswordToggleInput>

        <ButtonPrimary
          label="Sign In"
          onPress={handleEmailLogin}
          loading={isBusy}
        />

        <View style={styles.linkContainer}>
          {/* <Text style={GlobalStyles.text}>Forgot ID/Password</Text> */}
          <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
            <Text style={GlobalStyles.text}>Create Account</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.seperatorContainer}>
          <View style={styles.seperatorLine}></View>
          <Text style={GlobalStyles.text}>OR</Text>
          <View style={styles.seperatorLine}></View>
        </View>
        {/* The third party buttons at the moment use the upwardliLogin function. Need to support third party authentication in the future. */}
        <ThirdPartyButton
          buttonImage={googleLogo}
          buttonText="Sign In With Google"
          onPress={upwardliLogin}
        ></ThirdPartyButton>
        <ThirdPartyButton
          buttonImage={facebookLogo}
          buttonText="Sign In With Facebook"
          onPress={upwardliLogin}
        ></ThirdPartyButton>
        <ThirdPartyButton
          buttonImage={appleLogo}
          buttonText="Sign In With Apple"
          onPress={upwardliLogin}
        ></ThirdPartyButton>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: "10%",
    paddingBottom: "10%",
    justifyContent: "space-evenly",
    height: Layout.window.height,
  },
  linkContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    backgroundColor: "transparent",
  },
  seperatorContainer: {
    alignSelf: "stretch",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: "5%",
    backgroundColor: "transparent",
  },
  seperatorLine: {
    width: "45%",
    height: 1,
    backgroundColor: Colors.grey["600"],
  },
});
