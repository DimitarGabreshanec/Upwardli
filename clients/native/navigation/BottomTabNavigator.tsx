/**
 * Learn more about createBottomTabNavigator:
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */

import * as React from "react";

import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import DashboardNavigator from "../screens/Dashboard";
import GuidesNavigator from "../screens/Learn";
import CreditNavigator from "../screens/Credit";
import MatchesNavigator from "../screens/Offers";
import ProfileNavigator from "../screens/Profile";
import { BottomTabParamList } from "../types";
import {
  SCREEN_DASHBOARD,
  SCREEN_GUIDE,
  SCREEN_CREDIT,
  SCREEN_MATCHES,
} from "@upwardli/shared/events";

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName={SCREEN_DASHBOARD}
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}
    >
      <BottomTab.Screen
        name={SCREEN_DASHBOARD}
        component={DashboardNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarMaterialIcon name="class" color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name={SCREEN_GUIDE}
        component={GuidesNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarMaterialIcon name="ballot" color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name={SCREEN_CREDIT}
        component={CreditNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarMaterialIcon name="credit-card" color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name={SCREEN_MATCHES}
        component={MatchesNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarCommunityMaterialIcon
              name="thumb-up-outline"
              color={color}
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="Profile"
        component={ProfileNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarCommunityMaterialIcon name="face-profile" color={color} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

function TabBarMaterialIcon(props: {
  name: React.ComponentProps<typeof MaterialIcons>["name"];
  color: string;
}) {
  return <MaterialIcons size={24} {...props} />;
}
function TabBarCommunityMaterialIcon(props: {
  name: React.ComponentProps<typeof MaterialCommunityIcons>["name"];
  color: string;
}) {
  return <MaterialCommunityIcons size={24} {...props} />;
}
