import { ReactNode } from "react";
import { useColorModeValue } from "@chakra-ui/react";

import Link from "../../Link";

const NavLink = ({ href, children }: { href: string; children: ReactNode }) => (
  <Link
    px={2}
    py={1}
    rounded={"md"}
    _hover={{
      textDecoration: "none",
      bg: useColorModeValue("gray.200", "gray.700"),
    }}
    href={href}
  >
    {children}
  </Link>
);

export default NavLink;
