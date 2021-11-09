import React, { FC, PropsWithChildren, ReactNode, useEffect } from "react";

import { Box, Text } from "@chakra-ui/react";

import { getCoreAPIClient } from "@upwardli/shared/api";
import { useEmblaCarousel } from "embla-carousel/react";
import { setupWheelGestures } from "embla-carousel-wheel-gestures";

import { Guide } from "@upwardli/api/dist/models/Guide";
import GuideCarouselCard from "./GuideCarouselCard";

const EmblaCarouselContainer: FC<PropsWithChildren<ReactNode>> = (
  { children },
  props: []
) => {
  /* spreading this empty object on load forces the carousel to be
  scrollable, otherwise it (oddly) doesn't register as a scrollable object
  until the window is resized and its reInit() function is called - weird */
  const { ...guides } = props;
  const [emblaRef, embla] = useEmblaCarousel({
    loop: false,
    dragFree: true,
    containScroll: "keepSnaps",
  });

  useEffect(() => embla && setupWheelGestures(embla), [embla]);

  useEffect(() => {
    if (embla && embla.slideNodes().length !== guides.length) {
      embla.reInit(); /* If the slides prop length changes, pick it up */
    }
  }, [
    embla,
    guides /* Add slides as a dependency to trigger this when the prop changes */,
  ]);

  const handleMouseOver = () => {
    document.body.style.overflow = "hidden";
  };

  const handleMouseOut = () => {
    document.body.style.overflow = "scroll";
  };

  function handleWheel(e: React.WheelEvent<HTMLDivElement>) {
    if (e.deltaY > 0 && embla) {
      embla.scrollNext();
    } else if (embla) {
      embla.scrollPrev();
    }
  }

  return (
    <>
      <Box
        mt={3}
        className="embla"
        onMouseOverCapture={handleMouseOver}
        onMouseOutCapture={handleMouseOut}
        slides={children}
      >
        <Box
          className="embla__viewport"
          ref={emblaRef}
          onWheelCapture={handleWheel}
        >
          <Box className="embla__container">{children}</Box>
        </Box>
      </Box>
    </>
  );
};

function GuideCarousel(): JSX.Element {
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
    <Box mt={2} mb={10} width="100%">
      <Text
        ml={1}
        mt={10}
        className="caption-2"
        fontFamily="Nunito Sans"
        casing="uppercase"
      >
        Explore financial Guides
      </Text>
      <EmblaCarouselContainer>
        {guides.map(
          (item, key: number): JSX.Element => (
            <Box
              className="embla__slide"
              key={`introductory-${item.id || key}`}
            >
              <Box className="embla__slide__inner" px="1" py="2">
                <GuideCarouselCard
                  id={item.id || 0}
                  title={item.title || ""}
                  text={item.read || ""}
                  imageSrc="/images/dog.svg"
                  url={`/guides/${item.slug}`}
                />
              </Box>
            </Box>
          )
        )}
      </EmblaCarouselContainer>
    </Box>
  );
}

export default GuideCarousel;
