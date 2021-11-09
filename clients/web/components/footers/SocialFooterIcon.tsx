import { FC, ReactNode } from "react";
import { VisuallyHidden, chakra } from "@chakra-ui/react";

const SocialFooterIcon: FC<{
  children: ReactNode;
  label: string;
  href: string;
}> = ({ children, label, href }) => (
  <chakra.button
    bg="white"
    rounded={"md"}
    w={8}
    h={8}
    cursor={"pointer"}
    as={"a"}
    href={href}
    m={0}
    display={"inline-flex"}
    alignItems={"center"}
    justifyContent={"center"}
    transition={"opacity 0.3s ease"}
    _hover={{
      opacity: 0.8,
    }}
  >
    <VisuallyHidden>{label}</VisuallyHidden>
    {children}
  </chakra.button>
);

export default SocialFooterIcon;
