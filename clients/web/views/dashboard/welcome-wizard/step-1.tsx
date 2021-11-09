import { FC, ReactNode } from "react";

import { Box, Flex, Image, Text, Heading, Button } from "@chakra-ui/react";
import theme from "../../../theme";

import type { DashboardWizardStepOneProps } from "../../../types/props";

export const DashboardWizardStepOne: FC<DashboardWizardStepOneProps> = ({
  handleNextPage,
}) => {
  return (
    <Box>
      <Flex
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        py={{ base: "17px" }}
      >
        <Image
          src="../../images/illustrations/workflow.svg"
          mb={{ base: "16px" }}
        />
        <Heading
          color="#000"
          fontWeight="bold"
          fontSize="22px"
          lineHeight="26px"
        >
          Win your financial journey
        </Heading>
        <Box
          pt="8px"
          pb="28px"
          color="grey.800"
          fontSize="17px"
          lineHeight="24px"
        >
          <Text mb="16px">
            This 2 minute quiz pinpoints where you are n your financial journey
            and what comes next.
          </Text>
          <Text>
            <strong>The result?</strong> Service recommendations and guidance
            personalized to your unique profile.
          </Text>
        </Box>
        <Button
          py={{ base: "17px" }}
          height="auto"
          rounded="14px"
          width="100%"
          onClick={handleNextPage}
          style={{
            boxShadow: "0px 0px 6px 2px rrgba(0, 34, 71, 0.17)",
            background: `linear-gradient(206.26deg, ${theme.colors.brandPurple[600]} 11.82%, ${theme.colors.brandBlue[600]} 75.87%)`,
          }}
        >
          <Text color="#fff" fontSize="17px" lineHeight="22px">
            Next
          </Text>
        </Button>
      </Flex>
    </Box>
  );
};
