import { FC, PropsWithChildren, ReactNode } from "react";
import { HTMLChakraProps, ThemingProps } from "@chakra-ui/system";
import { ContainerProps } from "@chakra-ui/react";

import { Container } from "@chakra-ui/react";

export interface PageContainerProps
  extends HTMLChakraProps<"div">,
    ContainerProps,
    ThemingProps<"Container"> {}

const PageContainer = (props: PageContainerProps) => {
  const { children, ...rest } = props;

  return (
    <Container
      width="100%"
      maxW="container.3xl"
      px={{ base: "39px", md: "4vw" }}
      py={{ base: "6vw", md: "1.3vw" }}
      {...rest}
    >
      {children}
    </Container>
  );
};

export default PageContainer;
