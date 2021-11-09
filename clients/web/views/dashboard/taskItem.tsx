import React from "react";
import { Box, Text, HStack } from "@chakra-ui/react";
import Link from "../../components/Link";
import CircleCheckbox from "../../components/CircleCheckbox";

const TaskItem = ({
  completed,
  title,
  href,
  text,
}: {
  completed: boolean;
  title: string;
  href: string;
  text: string;
}) => (
  <Box boxShadow="md" borderRadius={8} w="100%">
    <HStack>
      <Box
        w="4px"
        h="76px"
        background="linear-gradient(206.26deg, #3E51FF 11.82%, #0071EB 75.87%)"
        borderRadius="8px 0 0 8px"
      />
      <Box w="10%">
        <CircleCheckbox defaultIsChecked={completed} />
      </Box>
      <Box>
        <Text
          size="md"
          textDecoration={completed ? "line-through" : "none"}
          color={completed ? "#727272" : "#002247"}
        >
          {title}
        </Text>
        <Link href={href} w="100%" color="#0057B6">
          <Text>
            {text}
            {completed ? "" : "→"}
          </Text>
        </Link>
      </Box>
    </HStack>
  </Box>
);

export default TaskItem;
