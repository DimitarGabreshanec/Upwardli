import { FC } from "react";
import { Box, Flex, Image, Text, Button } from "@chakra-ui/react";
import Link from "next/link";

import RatingStar from "../components/RatingStar";
import { isEmpty } from "../utils/helpers";

import type { CategoriesResultsCardProps } from "../types/props";
import theme from "../theme";
import * as ga from "../utils/ga";

const CategoriesResultsCard: FC<CategoriesResultsCardProps> = ({
  ssnRequired,
  recommended,
  logo,
  recipientGets,
  cost,
  reviewCount = 0,
  reviewStars = 0,
  isVerified,
  learMoreLabel = "",
  shortTitle,
}) => {
  const ssnRequiredTagGenerator = () => {
    if (!ssnRequired) {
      return (
        <Box
          rounded="5px"
          style={{
            backgroundImage: `linear-gradient(to bottom, ${theme.colors.brandOrange[600]}, ${theme.colors.brandOrange[400]})`,
          }}
          p="1px"
        >
          <Box
            color="brandOrange.900"
            rounded="5px"
            px={{ base: "4px" }}
            py={{ base: "2px" }}
            fontSize={{ base: "11px" }}
            bg="#fff"
          >
            No SSN Required
          </Box>
        </Box>
      );
    }
    return <Box h={1} w="94.06px"></Box>;
  };

  const recommendationTagGenerator = () => {
    if (recommended) {
      return (
        <Box rounded="5px" backgroundColor="rgba(4, 144, 63, 0.08)" p="1px">
          <Box
            backgroundColor="rgba(4, 144, 63, 0.08)"
            color="#04903F"
            fontSize={{ base: "11px" }}
            fontWeight={{ base: "400" }}
            lineHeight={{ base: "17px" }}
            rounded="5px"
            px={{ base: "4px" }}
            py={{ base: "2px" }}
          >
            RECOMMEND
          </Box>
        </Box>
      );
    }
    return <Box h={1} w="80.08px"></Box>;
  };

  const handleGAEvent = () => {
    ga.event({
      action: "Offer Clicks",
      params: {
        offer_short_title: shortTitle,
      },
    });
  };

  return (
    <Box
      bgColor="#fff"
      p={{ base: "12px" }}
      rounded={{ base: "8px" }}
      style={{ boxShadow: "0px 0px 6px 2px rgba(0, 34, 71, 0.17)" }}
      position="relative"
    >
      <Flex
        justifyContent="space-between"
        alignItems="flex-start"
        position="absolute"
        top="12px"
        left="12px"
        width="calc(100% - 24px)"
      >
        {ssnRequiredTagGenerator()}
        {recommendationTagGenerator()}
      </Flex>
      <Flex justifyContent="center" alignItems="flex-start">
        <Box width="80px" minHeight="30px">
          {!isEmpty(logo) ||
            (logo && (
              <Image
                borderTopRadius="xl"
                objectFit="cover"
                src={logo}
                alt=""
                width={{ base: "100%" }}
              />
            ))}
        </Box>
      </Flex>
      <Box
        h="1px"
        w="100%"
        my="8px"
        backgroundImage={`linear-gradient(to bottom, ${theme.colors.brandOrange[600]}, ${theme.colors.brandOrange[400]})`}
      />
      <Text
        color="grey.800"
        textAlign="center"
        fontSize="12px"
        fontWeight="400"
        lineHeight="18px"
      >
        Recipient gets
      </Text>
      <Text
        color="brandBlue.1000"
        textAlign="center"
        fontSize="34px"
        fontWeight="800"
        lineHeight="41px"
      >
        {recipientGets}
      </Text>
      <Flex
        my="8px"
        justifyContent="center"
        alignItems="center"
        backgroundColor="brandBlue.50"
        p="4.5px"
        fontSize="15px"
        fontWeight="400"
        lineHeight="20px"
        mb="14px"
      >
        <Text color="brandBlue.800" mr="6px">
          Total Cost
        </Text>
        <Text color="brandBlue.1000" ml="6px">
          {cost}
        </Text>
      </Flex>
      <Button
        width="100%"
        bgGradient="linear(to-b, brandPurple.600, brandBlue.600)"
        color="#fff"
        fontSize="17px"
        lineHeight="20px"
        rounded="14px"
        boxShadow="0px 0px 6px 2px rgba(0, 34, 71, 0.17)"
        py="6px"
        onClick={handleGAEvent}
      >
        Get Started
      </Button>
      <Flex justifyContent="space-between" alignItems="center" my="14px">
        <Flex justifyContent="center" alignItems="center">
          <Text
            fontSize="12px"
            fontWeight="normal"
            lineHeight="14px"
            color="grey.800"
            mr="8px"
          >
            {`Reviews (${reviewCount})`}
          </Text>
          <RatingStar maximumStar={5} currentStar={reviewStars} />
        </Flex>
        {isVerified && (
          <Text
            color="#04903F"
            fontSize="11px"
            fontWeight="400"
            lineHeight="14px"
          >
            Verified
          </Text>
        )}
      </Flex>
      {!isEmpty(learMoreLabel) ||
        (learMoreLabel && (
          <Flex justifyContent="center" alignItems="center" p="6px">
            <Link href={learMoreLabel}>
              <Flex justifyContent="center" alignItems="center">
                <Text
                  textTransform="uppercase"
                  color="grey.800"
                  fontSize="11px"
                  lineHeight="17px"
                  mr="7px"
                >
                  Learn more
                </Text>
                <Image src="../../images/arrow-down-icon.svg" mt="-1px" />
              </Flex>
            </Link>
          </Flex>
        ))}
    </Box>
  );
};

export default CategoriesResultsCard;
