import * as React from "react";
import { StyleSheet, Button } from "react-native";

import { Text, View } from "../components/Themed";

import { ProfileParamList } from "../types";
import { createStackNavigator } from "@react-navigation/stack";

import { useAuthStateFunc } from "../hooks/AuthStateContext";

export default function ProfileScreen() {
  const logout = useAuthStateFunc().logout;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <Text>This is the profile screen.</Text>
      <Button title={"Logout"} onPress={logout}></Button>
    </View>
  );
}

export const ProfileStack = createStackNavigator<ProfileParamList>();

export const ProfileNavigator = () => {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{ headerTitle: "Profile" }}
      />
    </ProfileStack.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
