import { NextPage } from "next";
import {
  Container,
  Flex,
  Image,
  Box,
  Heading,
  Link,
  SimpleGrid,
  VStack,
} from "@chakra-ui/react";

import type { CategoriesListType } from "../../types/object";
import { OFFERS_CATEGORIES } from "../../utils/constants";
import withAuth from "../../auth/withAuth";
import { Meta } from "../../components/Meta";
import GradientDecoratorHeader from "../../components/headers/GradientDecoratorHeader";

import Layout from "../../components/Layout";
import type { LayoutConfiguration } from "../../types/object";

const ServiceCategoryCard = ({
  title,
  href,
  thumbnail,
  backgroundGradient,
}: {
  title: string;
  href: string;
  thumbnail: string;
  backgroundGradient: string;
}) => (
  <Link href={href} borderRadius="xl" boxShadow="lg" w="100%">
    <Box h="100%" align="center">
      <VStack align="stretch" spacing="0">
        <Box p={3} style={{ background: backgroundGradient }} roundedTop="xl">
          <Image
            borderTopRadius="xl"
            objectFit="cover"
            src={thumbnail}
            alt="#"
          />
        </Box>
        <Flex
          align="center"
          justify="center"
          flexDirection="column"
          p={4}
          minH="61"
        >
          <Heading fontSize="15px" fontWeight="700" lineHeight="20px">
            {title}
          </Heading>
        </Flex>
      </VStack>
    </Box>
  </Link>
);

const LayoutConfigurationObject: LayoutConfiguration = {
  full: {},
  embedded: {
    header: {
      base: <GradientDecoratorHeader />,
    },
  },
};

const Offers: NextPage = () => {
  return (
    <Layout config={LayoutConfigurationObject}>
      <Meta title="Your Matched Service Options" />
      <Flex flexDirection="column" py="4" justify="center" align="center">
        <Heading textAlign="center" fontWeight="bold" size="sm" lineHeight="7">
          Your Matched Service Options
        </Heading>
        <SimpleGrid py={4} spacingX="3" spacingY="4" columns={[2, null, 3]}>
          {OFFERS_CATEGORIES.map((item: CategoriesListType) => {
            const { id, href, title, thumbnail, backgroundGradient } = item;
            return (
              <ServiceCategoryCard
                key={id}
                href={href}
                title={title}
                thumbnail={thumbnail}
                backgroundGradient={backgroundGradient}
              />
            );
          })}
        </SimpleGrid>
      </Flex>
    </Layout>
  );
};

export default withAuth(Offers);
