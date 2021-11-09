import { FC } from "react";
import {
  AspectRatio,
  Box,
  Flex,
  Image,
  Heading,
  Text,
  Button,
  VStack,
} from "@chakra-ui/react";
import { GuideModuleContentOptions } from "@upwardli/api/dist/models/GuideModuleContentOptions";

import theme from "../../theme";
import { isEmpty } from "../../utils/helpers";
import type { GuideStepsProps } from "../../types/props";
import PageContainer from "../../components/PageContainer";

export const StaticPageStep: FC<GuideStepsProps> = ({ data, onNextPage }) => {
  const { buttonText, content } = data;

  const createMarkup = () => {
    return {
      __html: content?.textRendered ?? "",
    };
  };

  if (content) {
    return (
      <Box>
        <AspectRatio maxW="600px" ratio={16 / 9}>
          <Image
            src={content.image as unknown as string}
            alt={content.title ?? "Upwardli"}
            objectFit="cover"
          />
        </AspectRatio>
        <Flex
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <PageContainer>
            <Flex
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
            >
              <Heading
                color="#000"
                fontWeight="bold"
                fontSize="22px"
                lineHeight="26px"
                textAlign="center"
              >
                {content?.title ?? ""}
              </Heading>
              {!isEmpty(content?.textRendered ?? "") && (
                <Box
                  className="typography-content"
                  pt="8px"
                  pb="28px"
                  color="grey.800"
                  fontSize="17px"
                  lineHeight="24px"
                  dangerouslySetInnerHTML={createMarkup()}
                />
              )}
              {!isEmpty(content?.options ?? []) && (
                <VStack
                  pt="16px"
                  pb="32px"
                  alignItems="flex-start"
                  width="100%"
                >
                  {(
                    content?.options ?? ([] as Array<GuideModuleContentOptions>)
                  ).map((item: GuideModuleContentOptions) => {
                    const { id, image, text } = item;
                    return (
                      <Flex direction="row" key={id} alignItems="flex-start">
                        <Image
                          mr={{ base: "12px" }}
                          width="20px"
                          height="20px"
                          src={image as unknown as string}
                          flexShrink={0}
                        />
                        <Text
                          color="grey.800"
                          fontSize={{ base: "17px" }}
                          lineHeight="24px"
                        >
                          {text}
                        </Text>
                      </Flex>
                    );
                  })}
                </VStack>
              )}
              <Button
                py={{ base: "17px" }}
                height="auto"
                rounded="14px"
                width="100%"
                onClick={onNextPage}
                style={{
                  boxShadow: "0px 0px 6px 2px rrgba(0, 34, 71, 0.17)",
                  background: `linear-gradient(206.26deg, ${theme.colors.brandPurple[600]} 11.82%, ${theme.colors.brandBlue[600]} 75.87%)`,
                }}
              >
                <Text color="#fff" fontSize="17px" lineHeight="22px">
                  {buttonText}
                </Text>
              </Button>
            </Flex>
          </PageContainer>
        </Flex>
      </Box>
    );
  }

  // in case not content for this step
  return <Box></Box>;
};
