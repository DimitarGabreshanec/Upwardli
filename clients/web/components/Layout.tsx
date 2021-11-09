import { FC, PropsWithChildren, ReactNode } from "react";
import { Box } from "@chakra-ui/react";
import { NEXT_PUBLIC_UPWARDLI_WEB_CONTEXT } from "@upwardli/shared/env";
import { useBreakpointValue } from "@chakra-ui/react";

import PrimaryHeader from "./headers/PrimaryHeader";
import PrimaryFooter from "./footers/PrimaryFooter";
import PageContainer from "../components/PageContainer";

import type { LayoutProps } from "../types/props";
import type { ResponsiveType } from "../types/object";

const defaultConfiguration: ResponsiveType = {
  base: null,
  md: null,
  lg: null,
};

const Layout: FC<PropsWithChildren<ReactNode> & LayoutProps> = ({
  bgColor,
  bgGradient,
  config,
  children,
}) => {
  // generate base on screen size
  const generateVariants = (
    config: ResponsiveType,
    type: string,
    screen: string
  ): ResponsiveType => {
    if (type === "header") {
      const base = config.base ? (
        config.base
      ) : screen === "full" ? (
        <PrimaryHeader />
      ) : null;
      const md = config.md ? config.md : base;
      const lg = config.lg ? config.lg : md;
      return {
        base,
        md,
        lg,
      };
    }
    const base = config.base ? (
      config.base
    ) : screen === "full" ? (
      <PrimaryFooter />
    ) : null;
    const md = config.md ? config.md : base;
    const lg = config.lg ? config.lg : md;
    return {
      base,
      md,
      lg,
    };
  };

  // variants for each screen size
  const headerDesktopVariant = useBreakpointValue(
    generateVariants(
      config.full.header ? config.full.header : defaultConfiguration,
      "header",
      "full"
    )
  );

  const footerDesktopVariant = useBreakpointValue(
    generateVariants(
      config.full.header ? config.full.header : defaultConfiguration,
      "footer",
      "full"
    )
  );

  const headerEmbeddedVariant = useBreakpointValue(
    generateVariants(
      config.embedded.header ? config.embedded.header : defaultConfiguration,
      "header",
      "embedded"
    )
  );

  const footerEmbeddedVariant = useBreakpointValue(
    generateVariants(
      config.embedded.footer ? config.embedded.footer : defaultConfiguration,
      "footer",
      "embedded"
    )
  );

  // @ts-ignore: NEXT_PUBLIC_UPWARDLI_WEB_CONTEXT is static in the container
  if (NEXT_PUBLIC_UPWARDLI_WEB_CONTEXT === "full") {
    return (
      <Box
        maxW="100%"
        minH="100vh"
        bgGradient={bgGradient ? bgGradient : ""}
        bgColor={bgColor ? bgColor : "#fff"}
      >
        {headerDesktopVariant}
        <PageContainer py={0}>{children}</PageContainer>
        {footerDesktopVariant}
      </Box>
    );
  }
  // render layout for embedded website
  return (
    <Box
      maxW="100%"
      minH="100vh"
      bgGradient={bgGradient ? bgGradient : ""}
      bgColor={bgColor ? bgColor : "#fff"}
    >
      {headerEmbeddedVariant}
      <PageContainer py={0}>{children}</PageContainer>
      {footerEmbeddedVariant}
    </Box>
  );
};

export default Layout;
