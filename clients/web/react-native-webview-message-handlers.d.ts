declare const webkit: Webkit;

interface Window {
  ReactNativeWebView: {
    postMessage(msg: string): void;
  };
  isNativeApp: boolean;
}
