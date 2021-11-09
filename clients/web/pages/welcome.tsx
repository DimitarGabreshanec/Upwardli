import { Flex, Text, Image, Box } from "@chakra-ui/react";
import ButtonPrimary from "../components/ButtonPrimary";
import { Meta } from "../components/Meta";
import Link from "../components/Link";
import Layout from "../components/Layout";

import type { LayoutConfiguration } from "../types/object";

export default function Home() {
  // make the empty layout with dummy empty Box
  const LayoutConfiguration: LayoutConfiguration = {
    full: {
      header: {
        base: <Box />,
      },
      footer: {
        base: <Box />,
      },
    },
    embedded: {
      header: {
        base: <Box />,
      },
      footer: {
        base: <Box />,
      },
    },
  };

  return (
    <Layout config={LayoutConfiguration}>
      <Meta title="Get Started" />
      <Flex
        minH="100vh"
        direction="column"
        justifyContent="center"
        alignItems="center"
        p="4"
      >
        <Image
          src={`/images/welcome.svg`}
          alt="welcome"
          w="250"
          h="250"
          mb="7"
        ></Image>
        <Text
          className="title-2"
          color="grey.1000"
          fontFamily="heading"
          fontWeight="700"
          mb="2"
        >
          Let’s get going!
        </Text>
        <Text className="body" color="grey.800" fontFamily="body" mb="4">
          Your personal guide to a better financial life
        </Text>
        <Flex direction="column" p="3">
          {lists.map((list: string, index: number) => (
            <Flex key={index} pb="3">
              <Image
                src={`/images/check-green.svg`}
                alt="check-green"
                w="18"
                h="18"
                mr="3"
              ></Image>
              <Text className="callout" color="grey.1000" fontFamily="body">
                {list}
              </Text>
            </Flex>
          ))}
        </Flex>
        <Link href="/dashboard/" w="100%">
          <ButtonPrimary
            isFullWidth
            mt="3"
            borderRadius="xl"
            label="Get Started"
            fontWeight="bold"
          />
        </Link>
      </Flex>
    </Layout>
  );
}

const lists = [
  "Get matched with best services for where you are in your unique journey",
  "Step-by-step guidance to reach your goals like an expert",
  "Build your credit safely and quickly",
  "No SSN or credit history required",
];
