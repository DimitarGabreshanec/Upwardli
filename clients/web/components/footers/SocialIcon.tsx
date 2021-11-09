import { FC, ReactNode } from "react";
import { Box } from "@chakra-ui/react";

const SocialIcon: FC<{ url: string; children: ReactNode }> = ({
  url,
  children,
}) => (
  <a href={url} target="_bank">
    <Box
      w="28px"
      h="28px"
      borderRadius={{ base: "50%" }}
      bgColor="white"
      color="#001E3D"
      p="6px"
      transition="opacity 170ms ease-in-out"
      fontSize="calc((1 - 1) * 1.2vw + 1rem)"
      _hover={{ opacity: "0.8" }}
    >
      {children}
    </Box>
  </a>
);

export default SocialIcon;
