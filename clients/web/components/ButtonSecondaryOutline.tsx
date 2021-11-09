import React from "react";
import { HTMLChakraProps, ThemingProps } from "@chakra-ui/system";
import { Button, ButtonOptions } from "@chakra-ui/react";

interface Props {
  label: string;
}

export interface ButtonProps
  extends HTMLChakraProps<"button">,
    ButtonOptions,
    Props,
    ThemingProps<"Button"> {}

const ButtonSecondaryOutline = (props: ButtonProps) => {
  const { label, ...rest } = props;

  return (
    <Button
      h="14"
      {...rest}
      fontSize="17px"
      textColor="grey.600"
      colorScheme="grey.600"
      transition="none"
      variant="outline"
    >
      {label}
    </Button>
  );
};

export default ButtonSecondaryOutline;
