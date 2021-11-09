import React from "react";
import { Box, Image, Text, Heading } from "@chakra-ui/react";

import withAuth from "../../auth/withAuth";
import ButtonPrimary from "../../components/ButtonPrimary";
import ButtonSecondaryOutline from "../../components/ButtonSecondaryOutline";
import { Meta } from "../../components/Meta";
import Layout from "../../components/Layout";
import type { LayoutConfiguration } from "../../types/object";
import GradientDecoratorHeader from "../../components/headers/GradientDecoratorHeader";
import { routerPushWithNative } from "../../utils/helpers";

const Guides = () => {
  const activateCredit = () => {
    routerPushWithNative("/credit/personal");
  };

  const learnMore = () => {
    routerPushWithNative("/guides");
  };

  const LayoutConfiguration: LayoutConfiguration = {
    full: {},
    embedded: {
      header: {
        base: <GradientDecoratorHeader />,
      },
    },
  };

  return (
    <Layout config={LayoutConfiguration}>
      <Meta title="Credit Plan" />
      <Box textAlign="center" py={4}>
        <Box width="90%" m="0 auto">
          <Heading
            mt="3"
            fontWeight="bold"
            textAlign="center"
            fontSize="22px"
            lineHeight="26px"
          >
            Credit Score Action Plan
          </Heading>
          <Text
            mt="1"
            color="grey.800"
            fontSize="17px"
            fontWeight="normal"
            lineHeight="24px"
          >
            Grow your score fast with an expert combination of services and
            guidance.
          </Text>
        </Box>
        <Image
          mt="10"
          src="/images/screens/credit-chart.svg"
          alt="decorator"
          w="100%"
        />
        <Text mt="7" color="grey.800" fontSize="17px" lineHeight="24px">
          Activate your personalized credit building strategy in minutes and
          start taking action.
        </Text>
        <ButtonPrimary
          isFullWidth
          mt="3"
          label="Activate Credit Action Plan"
          fontWeight="bold"
          onClick={activateCredit}
        />
        <ButtonSecondaryOutline
          isFullWidth
          mt="3"
          label="Learn More About credit Scores"
          onClick={learnMore}
          color="grey.600"
        />
        <Box textAlign="left" fontSize="12px" lineHeight="18px">
          <Text mt="3" color="grey.600" fontWeight="bold">
            [!] Activating your credit plan will not affect your credit score.
          </Text>
          <Text mt="1" color="grey.600">
            By clicking above, you agree to the Credit Authorization Agreement
            and provide written consent for Upwardli to obtain your credit
            information on a recurring basis from your profile.
          </Text>
        </Box>
      </Box>
    </Layout>
  );
};

export default withAuth(Guides);
