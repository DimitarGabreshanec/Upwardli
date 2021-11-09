import * as React from "react";
import { StyleSheet, SafeAreaView, Route } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";

import JwtAuthWebview from "../components/JwtAuthWebview";
import { Text, View } from "../components/Themed";
import { DashboardParamList } from "../types";
import GlobalStyles from "./GlobalStyles";
import Colors from "../constants/Colors";

interface Props {
  route: Route;
}

export default function DashboardScreen({ route }: Props) {
  const url = route.params?.url || "/dashboard/";
  return (
    <SafeAreaView
      style={[GlobalStyles.safeArea, { backgroundColor: Colors.topDecorator }]}
    >
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <JwtAuthWebview url={url} />
      </View>
    </SafeAreaView>
  );
}

export const DashboardStack = createStackNavigator<DashboardParamList>();

export const DashboardNavigator = () => {
  return (
    <DashboardStack.Navigator>
      <DashboardStack.Screen
        name="DashboardScreen"
        component={DashboardScreen}
        options={{ headerTitle: "For You" }}
      />
    </DashboardStack.Navigator>
  );
};
