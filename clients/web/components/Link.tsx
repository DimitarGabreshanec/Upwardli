import React from "react";
import {
  Link as ChakraLink,
  LinkProps as ChakraLinkProps,
} from "@chakra-ui/react";
import NextLink, { LinkProps } from "next/link";
import { useRouter } from "next/router";
import { handleNativeRoute } from "../utils/helpers";

const Link = ({
  href,
  children,
  ...props
}: React.PropsWithChildren<LinkProps> & ChakraLinkProps) => {
  const router = useRouter();
  const onLinkClick = (e: any) => {
    if (window.isNativeApp) {
      e.preventDefault();
      handleNativeRoute(href);
    } else {
      router.push(href);
    }
  };
  return (
    <NextLink href={href} {...props}>
      <ChakraLink
        href={href as string}
        {...(props as any)}
        style={{ textDecoration: "none" }}
        onClick={onLinkClick}
      >
        {children}
      </ChakraLink>
    </NextLink>
  );
};

export default Link;
