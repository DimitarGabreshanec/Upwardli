import { useState, useCallback, useEffect } from "react";
import { NextPage } from "next";
import { Flex, Text } from "@chakra-ui/react";
import { getCoreAPIClient } from "@upwardli/shared/api";
import { GuideModule } from "@upwardli/api/dist/models/GuideModule";
import { GuideModuleSteps } from "@upwardli/api/dist/models/GuideModuleSteps";
import { useRouter } from "next/router";

import type { LayoutConfiguration } from "../../types/object";
import Layout from "../../components/Layout";
import CircularProgressHeader from "../../components/headers/CircularProgressHeader";
import GuidesModule from "../../components/GuidesModule";
import { isEmpty } from "../../utils/helpers";
import { Meta } from "../../components/Meta";
import withAuth from "../../auth/withAuth";
import * as ga from "../../utils/ga";

const GuidePage: NextPage = () => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [isFetchingData, setIsFetchingData] = useState(true);
  const [pageTitle, setPageTitle] = useState<string>("");
  const [guidesSteps, setGuidesSteps] = useState<Array<GuideModuleSteps>>([]);
  const [guideModulesId, setGuideModulesId] = useState<number>(-1); // impossible id for guide modules is -1, need to change this id when the guide modules has more flexible id

  const numberSteps = guidesSteps.length;
  const percentagePerstep = 100 / numberSteps;

  useEffect(() => {
    async function fetchData() {
      try {
        // NOTE: cannot fetch the dynamic slug with next router in the first time, temporatory use window.location to get the pathname
        const slug = window.location.pathname
          .replace("/guides/", "")
          .replace("/", "");
        if (!isEmpty(slug)) {
          const client = getCoreAPIClient();
          const response: GuideModule = await client.retrieveGuideModule({
            slug: slug,
          });
          const { steps, title, id = -1 } = response;
          // no steps at this guide
          if (isEmpty(steps)) {
            router.push("/dashboard");
          } else {
            setGuidesSteps(steps);
            setPageTitle(title);
            setGuideModulesId(id);
          }
          setIsFetchingData(false);
        } else {
          router.push("/404");
        }
      } catch (error: any) {
        if ((error.status as number) === 404) {
          router.push("/404");
        } else {
          router.push("/500");
        }
      }
    }
    fetchData();
  }, []);

  const handleGoNextPage = useCallback(async () => {
    ga.event({
      action: "Guide Step Completion",
      params: {
        completed_step_id: guidesSteps[currentStep - 1].id,
        guide_title: pageTitle,
      },
    });
    if (currentStep < guidesSteps.length) {
      setCurrentStep(currentStep + 1);
    } else {
      // mark this guide as read and return to /guides page if success
      if (guideModulesId > -1) {
        try {
          const client = getCoreAPIClient();
          await client.markGuideAsReadGuideModule({
            guideGuideModuleRead: {
              guideModule: guideModulesId,
            },
          });
          router.push("/guides");
        } catch (error) {
          router.push("/500");
        }
      }
    }
  }, [currentStep, guidesSteps, guideModulesId]);

  const LayoutConfiguration: LayoutConfiguration = {
    full: {
      header: {
        base: (
          <CircularProgressHeader
            actionLeftHandler={() => alert("close icon clicked")}
            title={pageTitle}
            subTitle={`${currentStep}/${numberSteps} Steps completed`}
            circularProgress={{
              label: `${currentStep}/${numberSteps}`,
              value: percentagePerstep * currentStep,
            }}
          />
        ),
      },
    },
    embedded: {
      header: {
        base: (
          <CircularProgressHeader
            actionLeftHandler={() => alert("close icon clicked")}
            title={pageTitle}
            subTitle={`${currentStep}/${numberSteps} Steps completed`}
            circularProgress={{
              label: `${currentStep}/${numberSteps}`,
              value: percentagePerstep * currentStep,
            }}
          />
        ),
      },
    },
  };

  return (
    <Layout config={LayoutConfiguration}>
      <Meta title="Your Matched Service Options" />
      {isFetchingData ? (
        <Flex
          width="100%"
          height="100vh"
          justifyContent="center"
          alignItems="center"
        >
          <Text>loading</Text>
        </Flex>
      ) : (
        <GuidesModule
          steps={guidesSteps}
          currentStep={currentStep}
          onNextPage={handleGoNextPage}
        />
      )}
    </Layout>
  );
};

export default withAuth(GuidePage);
