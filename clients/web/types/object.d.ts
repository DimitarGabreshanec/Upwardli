import { ReactNode } from "react";
declare namespace ObjectInterfaceType {
  interface CategoriesListType {
    id: number;
    href: string;
    title: string;
    thumbnail: string;
    backgroundGradient: string;
  }
  interface LayoutConfiguration {
    full: {
      header?: ResponsiveType;
      footer?: ResponsiveType;
    };
    embedded: {
      header?: ResponsiveType;
      footer?: ResponsiveType;
    };
  }
  interface ResponsiveType {
    base: ReactNode;
    md?: ReactNode;
    lg?: ReactNode;
  }
}
export = ObjectInterfaceType;
export as namespace ObjectInterfaceType;
