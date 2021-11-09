import { Box, Text, Flex, Spacer } from "@chakra-ui/react";
import Image from "next/image";

import Link from "../../components/Link";

interface Props {
  id: number;
  title: string;
  text: string;
  time: string;
  imageSrc: string;
  url: string;
}

const GuideItem = ({ id, title, text, time, imageSrc, url }: Props) => {
  return (
    <Link href={url} w="100%" h="100%">
      <Flex
        boxShadow="0px 0px 6px 2px rgba(0, 34, 71, 0.17)"
        p={3}
        borderRadius={8}
        justifyContent="space-between"
      >
        <Box w="calc(100% - 60px)">
          <Flex alignItems="center">
            <Box mr="1">
              <Image
                // loader={cloudflareLoader}
                src="../images/done-outline.svg"
                alt="done"
                width={12}
                height={10}
              />
            </Box>
            <Text
              fontFamily="Nunito Sans"
              textTransform="uppercase"
              color="brandBlue.600"
              className="caption-2"
            >
              guide {id}
            </Text>
          </Flex>
          <Box>
            <Text
              fontFamily="Nunito Sans"
              className="body"
              fontWeight="600"
              isTruncated
            >
              {title}
            </Text>
          </Box>
          <Box>
            <Text
              fontFamily="Nunito Sans"
              className="caption-1"
              color="grey.600"
            >
              {time}
            </Text>
          </Box>
        </Box>
        <Box w="56px" h="56px" minW="56px" minH="56px">
          <Image
            // loader={cloudflareLoader}
            src={`..${imageSrc}`}
            alt={title}
            width={56}
            height={56}
          />
        </Box>
      </Flex>
    </Link>
  );
};

export default GuideItem;
