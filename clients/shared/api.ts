import {
  NEXT_PUBLIC_UPWARDLI_RUNTIME_CONTEXT,
  NEXT_PUBLIC_UPWARDLI_API_HOST,
} from "@upwardli/shared/env";

import { CoreApi, Configuration } from "@upwardli/api";
import { getCookie } from "./utils";

export function getCoreAPIClient(): CoreApi {
  let config = new Configuration();
  // @ts-ignore: NEXT_PUBLIC_UPWARDLI_RUNTIME_CONTEXT is static in the container
  if (NEXT_PUBLIC_UPWARDLI_RUNTIME_CONTEXT === "web") {
    if (typeof window === "undefined") {
      // SSR - fetch is defined but not on window
      config = new Configuration({
        basePath: NEXT_PUBLIC_UPWARDLI_API_HOST,
        fetchApi: fetch,
      });
    } else {
      // Web
      const csrftoken = getCookie("csrftoken") || "";
      config = new Configuration({
        basePath: "//" + window.location.host,
        headers: {
          "X-CSRFToken": csrftoken,
        },
      });
    }
    // @ts-ignore: NEXT_PUBLIC_UPWARDLI_RUNTIME_CONTEXT is static in the container
  } else if (NEXT_PUBLIC_UPWARDLI_RUNTIME_CONTEXT === "native") {
    config = new Configuration({
      basePath: NEXT_PUBLIC_UPWARDLI_API_HOST,
    });
  } else {
    throw new Error("Unrecognized NEXT_PUBLIC_UPWARDLI_RUNTIME_CONTEXT");
  }
  return new CoreApi(config);
}
