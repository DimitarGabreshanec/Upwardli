import { FC, useState, useCallback } from "react";

import { Box, Flex, Text, Heading, Button } from "@chakra-ui/react";

import type { DashboardWizardStepThreeProps } from "../../../types/props";
import { isEmpty } from "../../../utils/helpers";
import theme from "../../../theme";

const DUMMY_DATA = [
  {
    id: 1,
    label: "1 year or more",
    value: "1-year-or-more",
  },
  {
    id: 2,
    label: "Less than 1 year",
    value: "less-than-1-year",
  },
  {
    id: 3,
    label: "Haven’t moved yet",
    value: "have-moved-yet",
  },
];

export const DashboardWizardStepThree: FC<DashboardWizardStepThreeProps> = ({
  handleNextPage,
}) => {
  const [selection, setSelection] = useState<string>("");

  const handleSelection = useCallback(
    (selectionValue: string) => {
      if (selection.includes(selectionValue)) {
        setSelection("");
      } else {
        setSelection(selectionValue);
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
          How long have you lived in the U.S.?
        </Heading>
        <Flex flexDirection="column" width="100%">
          {DUMMY_DATA.map(({ id, label, value }) => {
            return (
              <Box
                onClick={() => handleSelection(value)}
                key={id}
                bgColor="#fff"
                rounded="8px"
                boxShadow="0px 0px 6px 2px rgba(0, 34, 71, 0.17)"
                py="29px"
                px="20px"
                width="100%"
                mb="16px"
                opacity={
                  isEmpty(selection)
                    ? "1"
                    : selection.includes(value) && !isEmpty(selection)
                    ? "1"
                    : "0.5"
                }
              >
                <Text
                  color={
                    isEmpty(selection)
                      ? "grey.800"
                      : selection.includes(value) && !isEmpty(selection)
                      ? "brandBlue.600"
                      : "grey.800"
                  }
                  fontWeight={
                    isEmpty(selection)
                      ? "normal"
                      : selection.includes(value) && !isEmpty(selection)
                      ? "bold"
                      : "normal"
                  }
                >
                  {label}
                </Text>
              </Box>
            );
          })}
        </Flex>
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
