import React, { useState } from "react";
// import { CustomUserDetails } from "@upwardli/api";

import {
  Flex,
  Box,
  Heading,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  VStack,
} from "@chakra-ui/react";

import { FaCaretDown } from "react-icons/fa";

import GuideCarousel from "../../components/GuideCarousel";
import TaskItem from "./taskItem";

export const DashboardView = () => {
  // const [highImpactItems, setHighImpactItems] = useState(0);

  return (
    <Box py="4">
      <Flex align="center" justify="center" direction="column" py={3.5}>
        <Heading
          fontWeight="normal"
          letterSpacing="wider"
          lineHeight="none"
          fontSize="lg"
          mb={1.5}
        >
          Welcome, Aaron!
        </Heading>
        <Tabs variant="enclosed" width="100%">
          <TabList pb={1}>
            <Tab
              border="none"
              outline="none"
              fontSize="cp"
              fontWeight="black"
              letterSpacing="widest"
              textTransform="uppercase"
              px={3}
            >
              <VStack spacing={0}>
                <Text lineheight="none">To Do</Text>
                <Box as={FaCaretDown} />
              </VStack>
            </Tab>
            <Tab
              letterSpacing="widest"
              fontSize="cp"
              fontWeight="hairline"
              textTransform="uppercase"
            >
              <VStack spacing={0.25}>
                <Text lineheight="none">Completed</Text>
                <Box
                  as={FaCaretDown}
                  visibility="hidden"
                  _active={{ visibility: "visibile" }}
                />
              </VStack>
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel p={0.5}>
              <VStack>
                <TaskItem
                  completed={false}
                  title="How Upwardli Works"
                  text="Go to the Upwardli Basics Guide"
                  href="/guides/basics/"
                />
                <TaskItem
                  completed={false}
                  title="Activate Credit Action Plan"
                  text="Get started building your credit"
                  href="/credit/"
                />
                <TaskItem
                  completed={false}
                  title="Share Upwardli and Earn"
                  text="Share Upwardli and build your rewards"
                  href="/share/"
                />
                <TaskItem
                  completed={false}
                  title="How Upwardli Works"
                  text="Go to the Upwardli Basics Guide"
                  href="/guides/basics/"
                />
                <TaskItem
                  completed={false}
                  title="Activate Credit Action Plan"
                  text="Get started building your credit"
                  href="/credit/"
                />
                <TaskItem
                  completed={false}
                  title="Share Upwardli and Earn"
                  text="Share Upwardli and build your rewards"
                  href="/share/"
                />
              </VStack>
            </TabPanel>
            <TabPanel p={0}>
              <VStack>
                <TaskItem
                  completed={true}
                  title="Complete Your Profile"
                  href="#"
                  text=""
                />
              </VStack>
            </TabPanel>
          </TabPanels>
        </Tabs>
        <GuideCarousel />
      </Flex>
    </Box>
  );
};
