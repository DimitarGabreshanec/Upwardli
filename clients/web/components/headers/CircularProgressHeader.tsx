import React, { FC } from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";

import type { HeaderEmbeddedProps } from "../../types/props";
import { isEmpty } from "../../utils/helpers";
import PageContainer from "../PageContainer";
import CircularProgressComponent from "../CircularProgressComponent";
import theme from "../../theme";

const CircularProgressHeader: FC<HeaderEmbeddedProps> = ({
  bgColor,
  actionLeftHandler,
  title,
  subTitle,
  circularProgress,
}) => {
  return (
    <header>
      <Box bgColor={bgColor ? bgColor : "#fff"} py="8px">
        <PageContainer>
          <Flex justifyContent="space-between" alignItems="center">
            <Flex justifyContent="flex-start" alignItems="center">
              <Box onClick={actionLeftHandler} mr={{ base: "17px" }}>
                <CloseIcon />
              </Box>
              <Flex flexDirection="column" justifyContent="flex-start">
                <Text
                  color="#000"
                  fontWeight="600"
                  fontSize="17px"
                  lineHeight="22px"
                  letterSpacing="-0.408px"
                >
                  {title}
                </Text>
                {!isEmpty(title) && (
                  <Text
                    color="grey.600"
                    fontSize={{ base: "12px" }}
                    lineHeight="18px"
                  >
                    {subTitle}
                  </Text>
                )}
              </Flex>
            </Flex>
            <Box>
              <CircularProgressComponent
                label={circularProgress.label || ""}
                labelColor="brandOrange.1000"
                gradientPointBackground={`linear-gradient(206.26deg, ${theme.colors.brandOrange[600]} 11.82%, ${theme.colors.brandOrange[400]} 75.87%)`}
                circularColor="brandOrange.600"
                trackColor="brandOrange.300"
                value={
                  circularProgress.value < 100 ? circularProgress.value : 100
                }
              />
            </Box>
          </Flex>
        </PageContainer>
      </Box>
    </header>
  );
};

export default CircularProgressHeader;
