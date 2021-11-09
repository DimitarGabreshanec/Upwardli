import { Text, Box } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { Guide } from "@upwardli/api/src";
import { getCoreAPIClient } from "@upwardli/shared/api";
import GuideItem from "./guideItem";
import GuideCarousel from "../../components/GuideCarousel";

export const GuidesView = () => {
  const [guides, setGuides] = React.useState<Guide[]>([]);

  const fetchListGuides = React.useCallback(async () => {
    const client = getCoreAPIClient();

    const data = await client.listGuides({});
    setGuides(data);
  }, [setGuides]);

  useEffect(() => {
    fetchListGuides();
  }, []);

  return (
    <Box py="4">
      <Text
        mt="3"
        className="title-2"
        fontWeight="bold"
        textAlign="center"
        fontFamily="Nunito Sans"
      >
        Your Credit Guides
      </Text>
      <Box mt="5">
        {guides.map((item, key) => {
          const { id, title, read, readingTime, slug } = item;
          return (
            <Box mb="2" key={`guide-${item.id || key}`}>
              <GuideItem
                id={id || 0}
                title={title || ""}
                text={read || ""}
                time={readingTime}
                imageSrc="/images/dog.svg"
                url={`/guides/${slug}`}
              />
            </Box>
          );
        })}
      </Box>
      <GuideCarousel />
    </Box>
  );
};
