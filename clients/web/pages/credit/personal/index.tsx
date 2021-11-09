import { NextPage } from "next";
import { useState, useEffect } from "react";
import { Box, Image, Text, Flex } from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";

import PlanBuildLoadingScreen from "../../../views/credit/PlanBuildLoadingScreen";
import Link from "../../../components/Link";
import withAuth from "../../../auth/withAuth";
import { CREDIT_PLANS } from "../../../utils/constants";
import Layout from "../../../components/Layout";
import CircularProgressHeader from "../../../components/headers/CircularProgressHeader";
import type { LayoutConfiguration } from "../../../types/object";

const PersonalCredit: NextPage = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);

  if (isLoading) {
    return <PlanBuildLoadingScreen />;
  }

  const LayoutConfiguration: LayoutConfiguration = {
    full: {
      header: {
        base: (
          <CircularProgressHeader
            bgColor="transparent"
            actionLeftHandler={() => alert("close icon clicked")}
            title="Credit Action Plan"
            subTitle="0/4 actions"
            circularProgress={{ label: "1/4", value: 20 }}
          />
        ),
      },
    },
    embedded: {
      header: {
        base: (
          <CircularProgressHeader
            bgColor="transparent"
            actionLeftHandler={() => alert("close icon clicked")}
            title="Credit Action Plan"
            subTitle="0/4 actions"
            circularProgress={{ label: "1/4", value: 20 }}
          />
        ),
      },
    },
  };

  return (
    <Layout
      config={LayoutConfiguration}
      bgGradient="linear(to-bl, rgba(62, 81, 255, 0.12), rgb(0, 113, 235, 0.12))"
    >
      <Box p="4">
        <Text
          className="title-2"
          fontWeight="400"
          fontFamily="heading"
          textAlign="center"
          color="grey.1000"
        >
          Aaron, here is your personalized Credit Action Plan.
        </Text>
        <Text
          mt="2"
          mb="36px"
          className="body"
          fontWeight="400"
          fontFamily="heading"
          textAlign="center"
          color="grey.800"
        >
          We estimate these actions will raise your credit score [X] points
          within [Y] weeks.
        </Text>
      </Box>
      <Box px={4}>
        {CREDIT_PLANS.map((plan: any, index: number) => (
          <Box
            key={plan.id}
            bg="#fff"
            mb="4"
            p="3"
            borderRadius="lg"
            style={{ boxShadow: "0px 0px 6px 2px rgba(0, 34, 71, 0.17)" }}
          >
            <Flex>
              <Image
                src={`/images/order-icon-${index + 1}.svg`}
                alt="order-icon"
                w="28.6"
                h="28.6"
                mr="2"
              ></Image>
              <Text
                mt="1"
                className="headline"
                fontWeight="400"
                fontFamily="heading"
                color="grey.800"
              >
                {plan.title}
              </Text>
            </Flex>
            <Flex justifyContent="flex-end" alignItems="center" mt="3">
              <Link
                href={plan.link}
                className="subhead"
                color="brandBlue.600"
                fontWeight="700"
              >
                Start Now <ChevronRightIcon w={6} h={6} />
              </Link>
            </Flex>
          </Box>
        ))}
        <Text className="footnote" color="grey.800" fontFamily="body">
          Disclaimer will go here.
        </Text>
      </Box>
    </Layout>
  );
};

export default withAuth(PersonalCredit);
