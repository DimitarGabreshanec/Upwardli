import { FC } from "react";
import { Box, Image } from "@chakra-ui/react";

const GradientDecoratorHeader: FC = () => {
  return (
    <Box>
      <Box width="100%" height="44px" bgColor="#E4E8FF"></Box>
      <Image src="/images/top-decorator.svg" alt="decorator" w="100%" />
    </Box>
  );
};

export default GradientDecoratorHeader;
