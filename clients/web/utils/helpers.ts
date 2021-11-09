import Router from "next/router";
import {
  TAB_DASHBOARD,
  TAB_GUIDE,
  TAB_CREDIT,
  TAB_MATCHES,
} from "@upwardli/shared/events";
/**
 * Validate the condition to check a variable is empty or not
 * @params input: string, array, object event number need to check
 */
export const isEmpty = (
  input:
    | string
    | Array<any>
    | Record<any, any>
    | number
    | undefined
    | FileList
    | null
    | boolean
): boolean => {
  if (input === null || input === undefined) {
    return true;
  }
  if (typeof input === "string" && input.trim() === "") {
    return true;
  }
  if (Array.isArray(input) && input.length === 0) {
    return true;
  }
  if (typeof input === "object" && Object.keys(input).length === 0) {
    return true;
  }
  return false;
};

export function getEnumKeyByEnumValue(
  myEnum: any,
  enumValue: number | string | string[]
): any {
  if (enumValue instanceof Array) {
    let keys = Object.keys(myEnum).filter((x) => myEnum[x] == enumValue[0]);
    return keys.length > 0 ? keys[0] : "";
  }
  let keys = Object.keys(myEnum).filter((x) => myEnum[x] == enumValue);
  return keys.length > 0 ? keys[0] : "";
}

export function handleNativeRoute(href: string) {
  const pathArr = href.split("/");
  const firstSegment = pathArr[1];
  switch (firstSegment) {
    case TAB_DASHBOARD:
      window.ReactNativeWebView.postMessage(
        JSON.stringify({
          tab: TAB_DASHBOARD,
          url: href,
        })
      );
      break;
    case TAB_GUIDE:
      window.ReactNativeWebView.postMessage(
        JSON.stringify({
          tab: TAB_GUIDE,
          url: href,
        })
      );
      break;
    case TAB_CREDIT:
      window.ReactNativeWebView.postMessage(
        JSON.stringify({
          tab: TAB_CREDIT,
          url: href,
        })
      );
      break;
    case TAB_MATCHES:
      window.ReactNativeWebView.postMessage(
        JSON.stringify({
          tab: TAB_MATCHES,
          url: href,
        })
      );
      break;
    default:
      break;
  }
}

export function routerPushWithNative(href: string) {
  if (window.isNativeApp) {
    handleNativeRoute(href);
  } else {
    Router.push(href);
  }
}
