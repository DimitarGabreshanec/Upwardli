import { useState } from "react";
import { useRouter } from "next/router";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  Flex,
  Box,
  Grid,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Link,
  Center,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

import { getCoreAPIClient } from "@upwardli/shared/api";
import { Register } from "@upwardli/api/dist/models/Register";

import Layout from "../components/Layout";
import type { LayoutConfiguration } from "../types/object";

import { useAuth } from "../auth/Auth";
import { Meta } from "../components/Meta";
import * as ga from "../utils/ga";

export default function SignUpPage() {
  const router = useRouter();
  const { setAuthenticated } = useAuth();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isBusy, setIsBusy] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Register>();

  const LayoutConfiguration: LayoutConfiguration = { full: {}, embedded: {} };

  const handleSignup: SubmitHandler<Register> = async (data) => {
    const client = getCoreAPIClient();
    const register = {
      ...data,
      username: data.email,
      password2: data.password1,
    };
    try {
      setIsBusy(true);
      ga.event({
        action: "Account Creation",
        params: {
          email: data.email,
          username: data.username,
        },
      });
      await client.createRegister({ register: register });
      setIsBusy(false);
      setAuthenticated(true);
      router.push("/welcome/");
    } catch (error) {
      setIsBusy(false);
      //TODO catch 4xx error response body here
    }
  };

  return (
    <Layout
      config={LayoutConfiguration}
      bgColor={useColorModeValue("gray.50", "gray.800")}
    >
      <Meta title="Sign Up" />
      <Flex minH={"calc(100vh - 200px)"} align={"center"} justify={"center"}>
        <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
          <Stack align={"center"}>
            <Heading fontSize={"4xl"}>Create your account</Heading>
            <Text fontSize={"lg"} color={"gray.600"}>
              to enjoy all of our cool{" "}
              <Link href="/" color={"blue.400"}>
                features
              </Link>{" "}
              ✌️
            </Text>
          </Stack>
          <form onSubmit={handleSubmit(handleSignup)}>
            <Box
              rounded={"lg"}
              bg={useColorModeValue("white", "gray.700")}
              boxShadow={"lg"}
              p={8}
            >
              <Stack spacing={4}>
                <Grid templateColumns="repeat(2, 1fr)" gap={6}>
                  <FormControl>
                    <FormLabel>NAME</FormLabel>
                    <Input
                      type="text"
                      placeholder="First Name"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>&nbsp;</FormLabel>
                    <Input
                      type="text"
                      placeholder="Last Name"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </FormControl>
                </Grid>
                <FormControl isInvalid={!!errors.email}>
                  <FormLabel>EMAIL</FormLabel>
                  <Input
                    type="email"
                    placeholder="Enter Email"
                    {...register("email", {
                      required: "Email is required!",
                      pattern: {
                        value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i,
                        message: "Enter valid email address!",
                      },
                    })}
                  />
                  {errors.email?.message && (
                    <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
                  )}
                </FormControl>
                <FormControl isInvalid={!!errors.password1}>
                  <FormLabel>PASSWORD</FormLabel>
                  <Input
                    type="password"
                    placeholder="Minimum of 8 characters"
                    {...register("password1", {
                      required: "Password is required!",
                      minLength: {
                        value: 8,
                        message: "Minimum of 8 characters!",
                      },
                    })}
                  />
                  {errors.password1?.message && (
                    <FormErrorMessage>
                      {errors.password1?.message}
                    </FormErrorMessage>
                  )}
                </FormControl>
                <Stack spacing={10}>
                  <Button
                    bg={"blue.400"}
                    color={"white"}
                    _hover={{
                      bg: "blue.500",
                    }}
                    type="submit"
                    isLoading={isBusy}
                  >
                    Create Account
                  </Button>
                </Stack>
                <Center>
                  <Link href="/login">
                    Already have an account? Return to sign-In.
                  </Link>
                </Center>
                <Box textAlign="center">
                  By clicking "Create Account", you are agreeing to our{" "}
                  <a
                    href="https://www.upwardli.com/terms-of-service"
                    target="_blank"
                  >
                    User Agreement
                  </a>{" "}
                  &#38;{" "}
                  <a
                    href="https://www.upwardli.com/privacy-policy"
                    target="_blank"
                  >
                    Privacy Policy.
                  </a>
                </Box>
              </Stack>
            </Box>
          </form>
        </Stack>
      </Flex>
    </Layout>
  );
}
