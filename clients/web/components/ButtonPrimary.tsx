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

const ButtonPrimary = (props: ButtonProps) => {
  const { label, ...rest } = props;

  return (
    <Button
      h="14"
      {...rest}
      fontSize="17px"
      fontWeight="bold"
      textColor="white"
      colorScheme="brandBlue"
      transition="none"
      bgGradient="linear(to-b, brandPurple.600, brandBlue.600)"
    >
      {label}
    </Button>
  );
};

export default ButtonPrimary;
