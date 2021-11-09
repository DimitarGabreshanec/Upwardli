import { FC, useState, useCallback } from "react";

import { Box, Flex, Text, Heading, Button } from "@chakra-ui/react";
import ResidenceStatusSelector from "../../../components/ResidenceStatusSelector";
import type { DashboardWizardStepFourProps } from "../../../types/props";
import theme from "../../../theme";

export const DashboardWizardStepFour: FC<DashboardWizardStepFourProps> = ({
  handleNextPage,
}) => {
  const [selectionValue, setSelectionValue] = useState<string>("");

  return (
    <Box>
      <Flex
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        py={{ base: "17px" }}
      >
        <Heading
          textAlign="center"
          color="#000"
          fontSize="22px"
          fontWeight="normal"
          lineHeight="26px"
          mb={{ base: "12px" }}
        >
          What is your residence status in the U.S.?
        </Heading>
        <ResidenceStatusSelector
          onChange={(value: string) => setSelectionValue(value)}
        />
        <Button
          disabled={
            selectionValue.trim().length === 0 ||
            selectionValue.trim() === "Select Visa Type"
          }
          py={{ base: "17px" }}
          height="auto"
          rounded="14px"
          width="100%"
          onClick={handleNextPage}
          mb="17px"
          style={{
            boxShadow: "0px 0px 6px 2px rrgba(0, 34, 71, 0.17)",
            background: `linear-gradient(206.26deg, ${theme.colors.brandPurple[600]} 11.82%, ${theme.colors.brandBlue[600]} 75.87%)`,
          }}
        >
          <Text color="#fff" fontSize="17px" lineHeight="22px">
            Next
          </Text>
        </Button>
        <Button
          py={{ base: "17px" }}
          height="auto"
          rounded="14px"
          width="100%"
          bgColor="transparent"
        >
          <Text
            color="grey.600"
            fontSize="17px"
            lineHeight="22px"
            fontWeight="normal"
          >
            Save And Exit
          </Text>
        </Button>
      </Flex>
    </Box>
  );
};
