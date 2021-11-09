import React from "react";

import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";

// Required to use typescript-axios OpenAPI client
// See: https://www.npmjs.com/package/react-native-url-polyfill
import "react-native-url-polyfill/auto";

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
   
  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <>
        <Navigation colorScheme={colorScheme} />
      </>
    );
  }
}
