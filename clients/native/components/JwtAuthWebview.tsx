import React, { useState } from "react";
import WebView from "react-native-webview";
import * as SecureStore from "expo-secure-store";
import { NEXT_PUBLIC_UPWARDLI_API_HOST } from "@upwardli/shared/env";
import { useNavigation } from "@react-navigation/native";
import {
  TAB_DASHBOARD,
  TAB_GUIDE,
  TAB_CREDIT,
  TAB_MATCHES,
  SCREEN_DASHBOARD,
  SCREEN_GUIDE,
  SCREEN_CREDIT,
  SCREEN_MATCHES,
} from "@upwardli/shared/events";

export default function JwtAuthWebview({ url }: { url: string }) {
  const navigation = useNavigation();
  const [webviewUrl, setWebviewUrl] = useState("");
  Promise.all([
    SecureStore.getItemAsync("accessToken"),
    SecureStore.getItemAsync("refreshToken"),
  ]).then((res) => {
    const [accessToken, refreshToken] = res;
    setWebviewUrl(
      `${NEXT_PUBLIC_UPWARDLI_API_HOST}/core/jwt-auth/?next=${url}&accesstoken=${accessToken}&refreshtoken=${refreshToken}&embedded=1`
    );
  });
  const runFirst = `
    window.isNativeApp = true;
    true; // note: this is required, or you'll sometimes get silent failures
  `;

  const onMessage = (event: any) => {
    const message = JSON.parse(event.nativeEvent.data);
    switch (message.tab) {
      case TAB_DASHBOARD:
        navigation.navigate("Root", {
          screen: SCREEN_DASHBOARD,
          key: SCREEN_DASHBOARD + Math.random(),
          params: { url: message.url },
        });
        break;
      case TAB_GUIDE:
        navigation.navigate("Root", {
          screen: SCREEN_GUIDE,
          key: SCREEN_GUIDE + Math.random(),
          params: { url: message.url },
        });
        break;
      case TAB_CREDIT:
        navigation.navigate("Root", {
          screen: SCREEN_CREDIT,
          key: SCREEN_CREDIT + Math.random(),
          params: { url: message.url },
        });
        break;
      case TAB_MATCHES:
        navigation.navigate("Root", {
          screen: SCREEN_MATCHES,
          key: SCREEN_MATCHES + Math.random(),
          params: { url: message.url },
        });
        break;
      default:
        break;
    }
  };

  return (
    <WebView
      source={{ uri: webviewUrl }}
      incognito={true}
      injectedJavaScriptBeforeContentLoaded={runFirst}
      onMessage={onMessage}
    />
  );
}
