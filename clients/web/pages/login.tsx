import React, { useState } from "react";
import { useRouter } from "next/router";
import { Meta } from "../components/Meta";
import Layout from "../components/Layout";
import type { LayoutConfiguration } from "../types/object";
import { useAuth } from "../auth/Auth";
import { getCoreAPIClient } from "@upwardli/shared/api";

import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

export default function LoginPage() {
  const router = useRouter();
  const { setAuthenticated } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isBusy, setIsBusy] = useState(false);

  const LayoutConfiguration: LayoutConfiguration = { full: {}, embedded: {} };

  const loginHandler = React.useCallback(
    async (e) => {
      e.preventDefault();
      if (email && password) {
        setIsBusy(true);
        const client = getCoreAPIClient();
        await client.createLogin({
          login: {
            email,
            password,
          },
        });
        setIsBusy(false);
        setAuthenticated(true);
        router.push("/dashboard");
      }
    },
    [email, password, router]
  );

  return (
    <Layout
      config={LayoutConfiguration}
      bgColor={useColorModeValue("gray.50", "gray.800")}
    >
      <Meta title="Login" />
      <Flex minH={"100vh"} align={"center"} justify={"center"}>
        <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12}>
          <Stack align={"center"}>
            <Heading fontSize={"4xl"}>Sign in to Upwardli</Heading>
          </Stack>
          <form onSubmit={loginHandler}>
            <Box
              rounded={"lg"}
              bg={useColorModeValue("white", "gray.700")}
              boxShadow={"lg"}
              p={8}
            >
              <Stack spacing={4}>
                <FormControl id="email">
                  <FormLabel>Email address</FormLabel>
                  <Input
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </FormControl>
                <FormControl id="password">
                  <FormLabel>Password</FormLabel>
                  <Input
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </FormControl>
                <Stack spacing={10}>
                  <Stack
                    direction={{ base: "column", sm: "row" }}
                    align={"start"}
                    justify={"space-between"}
                  >
                    <Checkbox>Remember me</Checkbox>
                    <Link color={"blue.400"}>Forgot password?</Link>
                  </Stack>
                  <Button
                    bg={"blue.400"}
                    color={"white"}
                    _hover={{
                      bg: "blue.500",
                    }}
                    type="submit"
                    isLoading={isBusy}
                  >
                    Sign in
                  </Button>
                </Stack>
              </Stack>
            </Box>
          </form>
        </Stack>
      </Flex>
    </Layout>
  );
}
