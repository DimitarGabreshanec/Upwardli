import { FC } from "react";
import { Flex } from "@chakra-ui/react";
import Image from "next/image";

import type { RatingStarProps } from "../types/props";

const RatingStar: FC<RatingStarProps> = ({ maximumStar, currentStar }) => {
  if (currentStar > maximumStar) {
    return null;
  }

  return (
    <Flex alignItems="center">
      {[...Array(currentStar)].map((item, index) => (
        <Image
          id={item}
          key={index}
          src="../../images/star-blue-filled-icon.svg"
          width="11px"
          height="11px"
        />
      ))}
      {[...Array(maximumStar - currentStar)].map((item, index) => (
        <Image
          id={item}
          key={index}
          src="../../images/star-outline-icon.svg"
          width="11px"
          height="11px"
        />
      ))}
    </Flex>
  );
};

export default RatingStar;
