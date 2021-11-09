import * as React from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView, Route } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

import JwtAuthWebview from "../components/JwtAuthWebview";
import { Text, View } from "../components/Themed";
import { GuidesParamList } from "../types";
import GlobalStyles from "./GlobalStyles";
import Colors from "../constants/Colors";

interface Props {
  route: Route;
}

export default function GuidesScreen({ route }: Props) {
  const url = route.params?.url || "/guides/";
  return (
    <SafeAreaView
      style={[GlobalStyles.safeArea, { backgroundColor: Colors.topDecorator }]}
    >
      <StatusBar />
      <View style={GlobalStyles.container}>
        <JwtAuthWebview url={url} />
      </View>
    </SafeAreaView>
  );
}

export const GuidesStack = createStackNavigator<GuidesParamList>();

export const DashboardNavigator = () => {
  return (
    <GuidesStack.Navigator>
      <GuidesStack.Screen
        name="GuidesScreen"
        component={GuidesScreen}
        options={{ headerTitle: "Guides" }}
      />
    </GuidesStack.Navigator>
  );
};
