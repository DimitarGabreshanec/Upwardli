import { FC } from "react";

import { SimpleChoiceFormStep, StaticPageStep } from "./guideSteps";
import type { GuidesModuleProps } from "../types/props";

const GuidesModule: FC<GuidesModuleProps> = ({
  steps,
  currentStep,
  onNextPage,
}) => {
  // because the index start from 0, so need to minus to 1
  const currentStepData = steps[currentStep - 1];
  const { contentType } = currentStepData;

  if (contentType === "static_page") {
    return <StaticPageStep onNextPage={onNextPage} data={currentStepData} />;
  } else {
    return (
      <SimpleChoiceFormStep onNextPage={onNextPage} data={currentStepData} />
    );
  }
  // TODO: need to put in switch when can complete the multiple choice form
};

export default GuidesModule;
