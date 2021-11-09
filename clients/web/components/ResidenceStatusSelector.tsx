import { FC, useState, useCallback, useRef } from "react";

import { useOutsideClick, Box, Text } from "@chakra-ui/react";
import { isEmpty } from "../utils/helpers";

const VISA_TYPES = [
  "Select Visa Type",
  "U.S Citizen",
  "Green Card",
  "F1",
  "H-1B",
  "H-4",
  "L1",
  "L2",
];

const ResidenceStatusSelector: FC<{ onChange: (value: string) => void }> = ({
  onChange,
}) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [selectionValue, setSelectionValue] = useState("");
  const dropdownRef = useRef(null);

  const handleClickOnSelector = useCallback(() => {
    setDropdownVisible(!dropdownVisible);
  }, [dropdownVisible]);

  useOutsideClick({
    ref: dropdownRef,
    handler: () => setDropdownVisible(false),
  });

  return (
    <Box
      onClick={handleClickOnSelector}
      width="100%"
      borderBottomColor="brandBlue.600"
      borderBottomStyle="solid"
      borderBottomWidth="1px"
      cursor="pointer"
      position="relative"
      py="7px"
      mb="36px"
    >
      <Text
        color={
          selectionValue !== "" && selectionValue !== "Select Visa Type"
            ? "#000"
            : "grey.600"
        }
        fontWeight="normal"
        fontSize="17px"
        lineHeight="24px"
        textAlign="center"
      >
        {isEmpty(selectionValue) ? "Select Visa Type" : selectionValue}
      </Text>
      {dropdownVisible && (
        <Box
          bgColor="#fff"
          boxShadow="lg"
          p="8px"
          position="absolute"
          width="100%"
          zIndex="10"
          top="40px"
          ref={dropdownRef}
        >
          {VISA_TYPES.map((item) => {
            return (
              <Text
                onClick={() => {
                  setSelectionValue(item);
                  setDropdownVisible(false);
                  onChange(item);
                }}
                textAlign="center"
                py="8px"
              >
                {item}
              </Text>
            );
          })}
        </Box>
      )}
    </Box>
  );
};

export default ResidenceStatusSelector;
