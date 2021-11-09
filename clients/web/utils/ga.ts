import { NEXT_PUBLIC_GOOGLE_ANALYTICS_ID } from "@upwardli/shared/env";

declare global {
  interface Window {
    gtag: any;
  }
}

// log the pageview with their URL
export const pageview = (url: string) => {
  window.gtag("config", NEXT_PUBLIC_GOOGLE_ANALYTICS_ID, {
    page_path: url,
  });
};

// log specific events happening.
export const event = (request: {
  action: string;
  params?: Record<string, any>;
}) => {
  const { action, params } = request;
  window.gtag("event", action, params);
};
