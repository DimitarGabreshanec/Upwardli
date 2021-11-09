import React from "react";
import { Checkbox, CheckboxProps } from "@chakra-ui/react";

const styles = {
  ".chakra-checkbox__control": {
    borderRadius: "50%",
    boxSize: "28px",
  },
  ".chakra-checkbox__control > div": {
    borderRadius: "50%",
    boxSize: "28px",
    background: "linear-gradient(206.26deg, #3E51FF 11.82%, #0071EB 75.87%)",
  },
  svg: {
    fontSize: "1rem",
  },
};

const CircleCheckbox = (props: CheckboxProps) => {
  return <Checkbox sx={styles} {...props} />;
};

export default CircleCheckbox;
