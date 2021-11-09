import { NextPage } from "next";
import React from "react";
import { Container, Image, Text, Flex } from "@chakra-ui/react";

const PlanBuildLoadingScreen: NextPage = () => (
  <Container maxW="container.xl" px={[0, 0, 4]}>
    <Flex
      w="100%"
      h="100vh"
      direction="column"
      alignItems="center"
      justifyContent="center"
    >
      <Image
        src="/images/plan-build-loading.svg"
        alt="decorator"
        w="100%"
        maxW="276px"
      />
      <Text
        className="title-2"
        color="brandBlue.800"
        fontFamily="heading"
        fontWeight="700"
        textAlign="center"
        mt="4"
        maxW="240px"
      >
        Building your personal credit action plan..
      </Text>
    </Flex>
  </Container>
);

export default PlanBuildLoadingScreen;
