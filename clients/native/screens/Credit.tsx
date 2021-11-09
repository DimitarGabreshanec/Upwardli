import * as React from "react";
import { SafeAreaView, Route } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

import JwtAuthWebview from "../components/JwtAuthWebview";
import { View } from "../components/Themed";
import { CreditParamList } from "../types";
import GlobalStyles from "./GlobalStyles";
import Colors from "../constants/Colors";

interface Props {
  route: Route;
}

export default function CreditScreen({ route }: Props) {
  const url = route.params?.url || "/credit/";
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

export const CreditStack = createStackNavigator<CreditParamList>();

export const CreditNavigator = () => {
  return (
    <CreditStack.Navigator>
      <CreditStack.Screen
        name="CreditScreen"
        component={CreditScreen}
        options={{ headerTitle: "For You" }}
      />
    </CreditStack.Navigator>
  );
};
