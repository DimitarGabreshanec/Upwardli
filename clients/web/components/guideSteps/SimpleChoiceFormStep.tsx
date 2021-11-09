import { FC, useState, useCallback } from "react";
import { Box, Flex, Text, Heading, Button, Image } from "@chakra-ui/react";
import { getCoreAPIClient } from "@upwardli/shared/api";
import { GuideModuleContentItems } from "@upwardli/api/dist/models/GuideModuleContentItems";

import type { GuideStepsProps } from "../../types/props";
import { isEmpty } from "../../utils/helpers";
import PageContainer from "../PageContainer";
import theme from "../../theme";

export const SimpleChoiceFormStep: FC<GuideStepsProps> = ({
  data,
  onNextPage,
}) => {
  const [selection, setSelection] = useState<number>(-1);
  const { content } = data;

  const handleSelection = useCallback(
    (selectionValue: number) => {
      if (selection === selectionValue) {
        setSelection(-1);
      } else {
        setSelection(selectionValue);
      }
    },
    [selection]
  );

  const submitFormSelection = useCallback(async (selectionId, callback) => {
    try {
      const client = getCoreAPIClient();
      await client.saveSimpleFormResultsGuideModuleRaw({
        userGuideSimpleFormChoice: {
          simpleFormItemId: parseInt(selectionId),
        },
      });
      callback && callback();
    } catch (error) {
      alert(error);
    }
  }, []);

  if (content) {
    return (
      <Box>
        <PageContainer>
          <Flex
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            py={{ base: "17px" }}
          >
            <Heading
              textAlign="center"
              color="#000"
              fontSize="22px"
              fontWeight="normal"
              lineHeight="26px"
              mb={{ base: "24px" }}
            >
              {content?.title ?? ""}
            </Heading>
            <Flex flexDirection="column" width="100%" mb="12px">
              {(content?.items ?? ([] as Array<GuideModuleContentItems>)).map(
                ({ id, image, text }) => {
                  return (
                    <Box
                      onClick={() => handleSelection(id ? id : -1)}
                      key={id}
                      bgColor="#fff"
                      rounded="8px"
                      boxShadow="0px 0px 6px 2px rgba(0, 34, 71, 0.17)"
                      py="12px"
                      px="20px"
                      width="100%"
                      mb="16px"
                      opacity={
                        isEmpty(selection)
                          ? "1"
                          : selection === id && !isEmpty(selection)
                          ? "1"
                          : "0.5"
                      }
                    >
                      <Flex
                        flexDirection="row"
                        width="100%"
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <Text
                          color={
                            isEmpty(selection)
                              ? "#000"
                              : selection === id && !isEmpty(selection)
                              ? "brandBlue.600"
                              : "#000"
                          }
                          mr={{ base: "24px" }}
                          fontWeight={
                            isEmpty(selection)
                              ? "normal"
                              : selection === id && !isEmpty(selection)
                              ? "bold"
                              : "normal"
                          }
                        >
                          {text}
                        </Text>
                        <Image
                          src={image as unknown as string}
                          width="56px"
                          height="56px"
                          flexShrink={0}
                        />
                      </Flex>
                    </Box>
                  );
                }
              )}
            </Flex>
            <Button
              disabled={selection === -1}
              py={{ base: "17px" }}
              height="auto"
              rounded="14px"
              width="100%"
              onClick={() => submitFormSelection(selection, onNextPage)}
              mb="17px"
              style={{
                boxShadow: "0px 0px 6px 2px rrgba(0, 34, 71, 0.17)",
                background: `linear-gradient(206.26deg, ${theme.colors.brandPurple[600]} 11.82%, ${theme.colors.brandBlue[600]} 75.87%)`,
              }}
            >
              <Text color="#fff" fontSize="17px" lineHeight="22px">
                Next
              </Text>
            </Button>
            <Button
              py={{ base: "17px" }}
              height="auto"
              rounded="14px"
              width="100%"
              bgColor="transparent"
            >
              <Text
                color="grey.600"
                fontSize="17px"
                lineHeight="22px"
                fontWeight="normal"
              >
                Save And Exit
              </Text>
            </Button>
          </Flex>
        </PageContainer>
      </Box>
    );
  }

  // in case not content for this step
  return <Box></Box>;
};
