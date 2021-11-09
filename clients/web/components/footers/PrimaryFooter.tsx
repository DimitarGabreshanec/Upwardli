import { FC, ReactNode } from "react";
import {
  Box,
  Stack,
  Flex,
  Text,
  Image,
  Link,
  Grid,
  GridItem,
  HStack,
} from "@chakra-ui/react";
import PageContainer from "../PageContainer";
import { FiLink2 } from "react-icons/fi";
import {
  FaTwitter,
  FaFacebookF,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";

import SocialIcon from "./SocialIcon";

const Navigation = {
  about: {
    title: "About us",
    items: [
      { label: "Who We Are", url: "https://upwardli.com/about-us" },
      { label: "How Upwardli Works", url: "https://upwardli.com" },
      { label: "Our Values", url: "https://upwardli.com/our-values/" },
      { label: "Press", url: "https://upwardli.com" },
      { label: "We're Hiring!", url: "https://upwardli.com" },
    ],
  },
  resources: {
    title: "Resources",
    items: [
      {
        label: "Financial Resources for Newcomers",
        url: "https://www.upwardli.com/resources",
      },
      {
        label: "Why is Credit Important? Mastering Credit Scores in the U.S.",
        url: "https://www.upwardli.com/resources",
      },
      {
        label: "The Best Credit Cards, Banks and Services for Immigrants",
        url: "https://www.upwardli.com/resources",
      },
      {
        label: "Guide: How To Get a Credit Card for Immigrants",
        url: "https://www.upwardli.com/resources",
      },
      {
        label: "U.S. Finance Basics for International Students",
        url: "https://www.upwardli.com/resources",
      },
      {
        label: "Immigration, Community & Life in the U.S.",
        url: "https://www.upwardli.com/resources",
      },
    ],
  },
  support: {
    title: "Support",
    items: [
      {
        label: "Help Desk",
        url: "https://upwardli.zendesk.com/hc/en-us",
      },
      {
        label: "FAQ",
        url: "https://upwardli.zendesk.com/hc/en-us/sections/4406593863700-FAQ",
      },
      {
        label: "Contact Us",
        url: "https://upwardli.com/contact",
      },
    ],
  },
  connect: {
    title: "Connect with us",
    items: [
      {
        label: "User Agreement",
        url: "https://upwardli.com/terms-of-service",
      },
      {
        label: "Privacy Policy",
        url: "https://upwardli.com/privacy-policy",
      },
      {
        label: "Advertiser Disclosure",
        url: "https://www.upwardli.com/advertiser-disclosure",
      },
    ],
  },
};

const PrimaryFooter: FC<ReactNode> = () => {
  return (
    <Box bg="brandBlue.1000" color="brandBlue.200">
      <PageContainer
        py={{ base: "0px" }}
        pt={{ base: "4vw" }}
        pb={{ base: "46px", md: "6.6vmax" }}
      >
        <Flex flexDirection="column">
          <Grid
            w={{ base: "100%" }}
            pb={{ base: "35px" }}
            templateColumns={{ base: "1fr", md: "repeat(12, 1fr)" }}
          >
            <GridItem colSpan={3}>
              <Stack
                align={"flex-start"}
                p={{ base: "17px 0px 17px 0px", md: "0px 17px 24px 0px" }}
              >
                <Image
                  width={{ base: "100%", md: "212px" }}
                  marginBottom={{ base: "12px" }}
                  transform={{ base: "translateX(-15px) translateY(-10px)" }}
                  src="/images/horizontal-white-logo.png"
                  alt="Upwardli"
                />
                <Image
                  width={{ base: "162px" }}
                  py={{ base: "17px" }}
                  marginTop={{ base: "0px!important" }}
                  src="/images/footer/app-store.svg"
                  alt="Upwardli on App Store"
                />
                <Image
                  width={{ base: "162px" }}
                  py={{ base: "17px" }}
                  marginTop={{ base: "0px!important" }}
                  src="/images/footer/google-play.svg"
                  alt="Upwardli on Google play"
                />
              </Stack>
            </GridItem>
            <GridItem colSpan={2}>
              <Stack
                align={"flex-start"}
                gridGap="8px"
                fontSize="calc((.9 - 1) * 1.2vw + 1rem)"
                p={{ base: "17px 0px 17px 0px", md: "0px 17px 24px 0px" }}
                mt={{ base: "1rem" }}
              >
                <Text fontWeight="bold" textTransform="uppercase">
                  {Navigation.about.title}
                </Text>
                {Navigation.about.items.map(({ label, url }) => {
                  return (
                    <Link href={url} style={{ textDecoration: "none" }}>
                      <Text fontWeight="bold" lineHeight="1.4">
                        {label}
                      </Text>
                    </Link>
                  );
                })}
              </Stack>
            </GridItem>
            <GridItem colSpan={3}>
              <Stack
                align={"flex-start"}
                gridGap="8px"
                fontSize="calc((.9 - 1) * 1.2vw + 1rem)"
                p={{ base: "17px 0px 17px 0px", md: "0px 17px 24px 0px" }}
                mt={{ base: "1rem" }}
              >
                <Text fontWeight="bold" textTransform="uppercase">
                  {Navigation.resources.title}
                </Text>
                {Navigation.resources.items.map(({ label, url }) => {
                  return (
                    <Link href={url} style={{ textDecoration: "none" }}>
                      <Text fontWeight="bold" lineHeight="1.4">
                        {label}
                      </Text>
                    </Link>
                  );
                })}
              </Stack>
            </GridItem>
            <GridItem colSpan={2}>
              <Stack
                align={"flex-start"}
                gridGap="8px"
                fontSize="calc((.9 - 1) * 1.2vw + 1rem)"
                p={{ base: "17px 0px 17px 0px", md: "0px 17px 24px 0px" }}
                mt={{ base: "1rem" }}
              >
                <Text fontWeight="bold" textTransform="uppercase">
                  {Navigation.support.title}
                </Text>
                {Navigation.support.items.map(({ label, url }) => {
                  return (
                    <Link href={url} style={{ textDecoration: "none" }}>
                      <Text fontWeight="bold" lineHeight="1.4">
                        {label}
                      </Text>
                    </Link>
                  );
                })}
              </Stack>
            </GridItem>
            <GridItem colSpan={2}>
              <Stack
                align={"flex-start"}
                gridGap="8px"
                fontSize="calc((.9 - 1) * 1.2vw + 1rem)"
                mt={{ base: "1rem" }}
                p={{ base: "17px 0px 17px 0px", md: "0px 17px 24px 0px" }}
              >
                <Text fontWeight="bold" textTransform="uppercase">
                  {Navigation.connect.title}
                </Text>
                {Navigation.connect.items.map(({ label, url }) => {
                  return (
                    <Link href={url} style={{ textDecoration: "none" }}>
                      <Text fontWeight="bold" lineHeight="1.4">
                        {label}
                      </Text>
                    </Link>
                  );
                })}
                <Box py={{ base: "17px" }} mt={0} display={{ base: "block" }}>
                  <Box display="inline-block" m={{ base: "0 8px 0 0" }}>
                    <SocialIcon url="https://twitter.com/upwardli">
                      <FaTwitter />
                    </SocialIcon>
                  </Box>
                  <Box display="inline-block" m={{ base: "0 8px 0 0" }}>
                    <SocialIcon url="https://www.facebook.com/upwardli">
                      <FaFacebookF />
                    </SocialIcon>
                  </Box>
                  <Box display="inline-block" m={{ base: "0 8px 0 0" }}>
                    <SocialIcon url="https://www.tiktok.com/@upwardli?">
                      <FiLink2 />
                    </SocialIcon>
                  </Box>
                  <Box display="inline-block" m={{ base: "0 8px 0 0" }}>
                    <SocialIcon url="https://www.linkedin.com/company/upwardli">
                      <FaLinkedinIn />
                    </SocialIcon>
                  </Box>
                  <Box display="inline-block" m={{ base: "0 8px 0 0" }}>
                    <SocialIcon url="https://www.instagram.com/getupwardli/">
                      <FaInstagram />
                    </SocialIcon>
                  </Box>
                </Box>
              </Stack>
            </GridItem>
          </Grid>
          <Box py="25px">
            <Box
              borderTopWidth={1}
              borderStyle={"solid"}
              borderColor="brandBlue.600"
            />
          </Box>
          <Flex align="center" justify="center">
            <Text
              align="center"
              p="24px"
              fontSize="calc((.9 - 1) * 1.2vw + 1rem)"
              fontWeight="300"
              lineHeight="1.4"
            >
              &#169;
              {` ${new Date().getFullYear()}. Upward Financial Inc. All rights reserved.`}
            </Text>
          </Flex>
          <Box py={{ base: "17px" }} display={{ base: "block", md: "none" }} />
        </Flex>
      </PageContainer>
    </Box>
  );
};

export default PrimaryFooter;
