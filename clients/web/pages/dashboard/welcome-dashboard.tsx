import { useState, useCallback } from "react";
import { NextPage } from "next";

import {
  DashboardWizardStepOne,
  DashboardWizardStepTwo,
  DashboardWizardStepThree,
  DashboardWizardStepFour,
} from "../../views/dashboard/welcome-wizard";

import PageContainer from "../../components/PageContainer";
import Layout from "../../components/Layout";
import CircularProgressHeader from "../../components/headers/CircularProgressHeader";
import { Meta } from "../../components/Meta";
import withAuth from "../../auth/withAuth";
import * as ga from "../../utils/ga";

import type { LayoutConfiguration } from "../../types/object";

const WelcomeDashboardPage: NextPage = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);

  const goToPage = useCallback((destinationPageNumber) => {
    // when reach to the end of guide step
    if (destinationPageNumber <= 5) {
      ga.event({
        action: "Financial Profile Setup Step Completion",
      });
      setCurrentStep(destinationPageNumber);
    }
  }, []);

  const LayoutConfiguration: LayoutConfiguration = {
    full: {
      header: {
        base: (
          <CircularProgressHeader
            actionLeftHandler={() => alert("close icon clicked")}
            title="How Upwardli Works"
            subTitle="1/4 Steps completed"
            circularProgress={{ label: "1/4", value: 20 }}
          />
        ),
      },
    },
    embedded: {
      header: {
        base: (
          <CircularProgressHeader
            actionLeftHandler={() => alert("close icon clicked")}
            title="How Upwardli Works"
            subTitle="1/4 Steps completed"
            circularProgress={{ label: "1/4", value: 20 }}
          />
        ),
      },
    },
  };

  return (
    <Layout config={LayoutConfiguration}>
      <Meta title="Welcome" />
      <PageContainer>
        {currentStep === 1 && (
          <DashboardWizardStepOne handleNextPage={() => goToPage(2)} />
        )}
        {currentStep === 2 && (
          <DashboardWizardStepTwo handleNextPage={() => goToPage(3)} />
        )}
        {currentStep === 3 && (
          <DashboardWizardStepThree handleNextPage={() => goToPage(4)} />
        )}
        {currentStep === 4 && (
          <DashboardWizardStepFour handleNextPage={() => goToPage(5)} />
        )}
        {currentStep === 5 && <span>Page 5 here</span>}
      </PageContainer>
    </Layout>
  );
};

export default withAuth(WelcomeDashboardPage);
