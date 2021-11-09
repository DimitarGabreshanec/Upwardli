import React from "react";
import { StyleSheet, SafeAreaView, Route } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

import JwtAuthWebview from "../components/JwtAuthWebview";
import { Text, View } from "../components/Themed";
import { MatchesParamList } from "../types";
import GlobalStyles from "./GlobalStyles";

interface Props {
  route: Route;
}

export default function MatchesScreen({ route }: Props) {
  const url = route.params?.url || "/offers/";
  return (
    <SafeAreaView style={GlobalStyles.safeArea}>
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <JwtAuthWebview url={url} />
      </View>
    </SafeAreaView>
  );
}

export const MatchesStack = createStackNavigator<MatchesParamList>();

export const MatchesNavigator = () => {
  return (
    <MatchesStack.Navigator>
      <MatchesStack.Screen
        name="MatchesScreen"
        component={MatchesScreen}
        options={{ headerTitle: "Matches" }}
      />
    </MatchesStack.Navigator>
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
