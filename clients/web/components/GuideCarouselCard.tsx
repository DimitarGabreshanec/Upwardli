import { Box, Text, Flex } from "@chakra-ui/react";
import Image from "next/image";

import Link from "./Link";

interface Props {
  id: number;
  title: string;
  text: string;
  imageSrc: string;
  url: string;
}

const GuideCarouselCard = ({ id, title, text, imageSrc, url }: Props) => {
  return (
    <Link href={url} w="100%" h="100%">
      <Flex
        boxShadow="0px 0px 6px 2px rgba(0, 34, 71, 0.17);"
        p={3}
        borderRadius={8}
        flexDirection="column"
      >
        <Box w="48px" h="48px" minW="48px" minH="48px" alignSelf="center">
          <Image
            // loader={cloudflareLoader}
            src={`..${imageSrc}`}
            alt={title}
            width={48}
            height={48}
          />
        </Box>
        <Box mt="3" h="34px" overflow="hidden">
          <Text
            decoration="none"
            textAlign="center"
            className="caption-2"
            fontFamily="Nunito Sans"
            casing="uppercase"
            lineHeight="17px"
          >
            {title}
          </Text>
        </Box>
      </Flex>
    </Link>
  );
};

export default GuideCarouselCard;
