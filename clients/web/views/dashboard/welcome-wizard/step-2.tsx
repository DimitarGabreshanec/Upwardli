import { FC, useState, useCallback } from "react";

import { Box, Flex, Text, Heading, Button, SimpleGrid } from "@chakra-ui/react";
import FinancalGoalCard from "../../../components/FinancalGoalCard";

import type { DashboardWizardStepTwoProps } from "../../../types/props";
import theme from "../../../theme";

const DUMMY_DATA = [
  {
    id: 1,
    label: "Build my Credit Score",
    icon: "/images/financal-goals/build-my-credit-score.svg",
  },
  {
    id: 2,
    label: "Get Better credit cards",
    icon: "/images/financal-goals/get-better-credit-cards.svg",
  },
  {
    id: 3,
    label: "Get a Bank Account",
    icon: "/images/financal-goals/get-a-bank-account.svg",
  },
  {
    id: 4,
    label: "Pay off Student Loans",
    icon: "/images/financal-goals/pay-off-student-loans.svg",
  },
  {
    id: 5,
    label: "Establish my SSN",
    icon: "/images/financal-goals/establish-my-ssn.svg",
  },
  {
    id: 6,
    label: "Send Money Back Home",
    icon: "/images/financal-goals/send-money-back-home.svg",
  },
  {
    id: 7,
    label: "Start Saving money",
    icon: "/images/financal-goals/start-saving-money.svg",
  },
  {
    id: 8,
    label: "Buy a Car",
    icon: "/images/financal-goals/buy-a-car.svg",
  },
  {
    id: 9,
    label: "Buy a House",
    icon: "/images/financal-goals/buy-a-home.svg",
  },
];

export const DashboardWizardStepTwo: FC<DashboardWizardStepTwoProps> = ({
  handleNextPage,
}) => {
  const [selection, setSelection] = useState<Array<number>>([]);

  const handleSelection = useCallback(
    (selectionId: number) => {
      if (selection.indexOf(selectionId) > -1) {
        const newSelectionExcludeSelectionId = selection.filter(
          (id) => id !== selectionId
        );
        setSelection(newSelectionExcludeSelectionId);
      } else {
        const newSelection = [...selection, selectionId];
        setSelection(newSelection);
      }
    },
    [selection]
  );

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
          Aaron, what financial goals can we help you achieve?
        </Heading>
        <SimpleGrid
          columns={{ base: 3 }}
          row={{ base: 3 }}
          gap={3}
          width="100%"
          mb="32px"
        >
          {DUMMY_DATA.map(({ id, label, icon }) => {
            return (
              <FinancalGoalCard
                key={id}
                id={id}
                label={label}
                icon={icon}
                selectionList={selection}
                onSelect={handleSelection}
              />
            );
          })}
        </SimpleGrid>
        <Button
          disabled={selection.length === 0}
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
