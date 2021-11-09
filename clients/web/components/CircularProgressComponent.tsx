import { FC } from "react";

import { Box, Text, CircularProgress } from "@chakra-ui/react";

import type { CircularProgressProps } from "../types/props";

const CircularProgressComponent: FC<CircularProgressProps> = ({
  label,
  labelColor,
  gradientPointBackground,
  circularColor,
  trackColor,
  value,
}) => {
  return (
    <Box
      position="relative"
      width="44px"
      height="44px"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <CircularProgress
        value={value}
        color={circularColor}
        size="44px"
        trackColor={trackColor}
        position="absolute"
        left="0px"
        right="0px"
      />
      <Box
        rounded="full"
        width="26px"
        height="26px"
        display="flex"
        justifyContent="center"
        alignItems="center"
        style={{ background: gradientPointBackground }}
      >
        <Text
          color={labelColor}
          fontSize="9px"
          lineHeight="9px"
          fontWeight="bold"
        >
          {label}
        </Text>
      </Box>
    </Box>
  );
};

export default CircularProgressComponent;
