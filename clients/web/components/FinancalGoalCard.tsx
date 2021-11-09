import { FC, useMemo } from "react";

import { Box, Text, Image } from "@chakra-ui/react";

import type { FinancalGoalCardProps } from "../types/props";
import { isEmpty } from "../utils/helpers";

const FinancalGoalCard: FC<FinancalGoalCardProps> = ({
  id,
  label,
  icon,
  selectionList,
  onSelect,
}) => {
  const isSelected = useMemo(
    () => selectionList?.includes(id),
    [selectionList]
  );

  return (
    <Box
      rounded={8}
      p="12px"
      backgroundColor="#fff"
      boxShadow="0px 0px 6px 2px rgba(0, 34, 71, 0.17)"
      onClick={() => onSelect(id)}
      opacity={
        isEmpty(selectionList)
          ? "1"
          : isSelected && !isEmpty(selectionList)
          ? "1"
          : "0.5"
      }
    >
      <Image m="0px auto" mb="16px" src={icon} />
      <Text
        color={
          isEmpty(selectionList)
            ? "grey.800"
            : isSelected && !isEmpty(selectionList)
            ? "brandBlue.600"
            : "grey.800"
        }
        fontWeight={
          isEmpty(selectionList)
            ? "normal"
            : isSelected && !isEmpty(selectionList)
            ? "bold"
            : "normal"
        }
        fontSize="11px"
        lineHeight="14px"
        textAlign="center"
      >
        {label}
      </Text>
    </Box>
  );
};

export default FinancalGoalCard;
