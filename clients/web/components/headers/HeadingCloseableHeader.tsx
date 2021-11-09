import { FC } from "react";
import { Flex, Heading } from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";

import type { HeadingCloseableHeaderProps } from "../../types/props";
import PageContainer from "../PageContainer";

const HeadingCloseableHeader: FC<HeadingCloseableHeaderProps> = ({
  bgColor,
  actionLeftHandler,
  heading,
}) => (
  <header>
    <PageContainer bgColor={bgColor ? bgColor : "#fff"} py={0}>
      <Flex
        py={4}
        position="relative"
        alignItems="center"
        justifyContent="center"
      >
        <CloseIcon position="absolute" left="0px" onClick={actionLeftHandler} />
        <Heading textAlign="center" fontWeight="bold" size="sm" lineHeight="7">
          {heading}
        </Heading>
      </Flex>
    </PageContainer>
  </header>
);

export default HeadingCloseableHeader;
