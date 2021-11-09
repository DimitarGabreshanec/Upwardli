/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */
import {
  SCREEN_DASHBOARD,
  SCREEN_GUIDE,
  SCREEN_CREDIT,
  SCREEN_MATCHES,
} from "@upwardli/shared/events";

export type RootStackParamList = {
  Root: undefined;
  NotFound: undefined;
  SignIn: undefined;
  SignUp: undefined;
  Welcome: undefined;
};

export type BottomTabParamList = {
  [SCREEN_DASHBOARD]: undefined;
  [SCREEN_GUIDE]: undefined;
  [SCREEN_CREDIT]: undefined;
  [SCREEN_MATCHES]: undefined;
  Profile: undefined;
};

export type DashboardParamList = {
  DashboardScreen: undefined;
};

export type GuidesParamList = {
  GuidesScreen: undefined;
};

export type CreditParamList = {
  CreditScreen: undefined;
};

export type MatchesParamList = {
  MatchesScreen: undefined;
};

export type ProfileParamList = {
  ProfileScreen: undefined;
};
