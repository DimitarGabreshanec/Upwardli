import { ReactNode } from "react";
import { GuideModuleSteps } from "@upwardli/api";

import type { LayoutConfiguration } from "./object";

declare namespace PropsType {
  interface CategoriesResultsCardProps {
    ssnRequired: boolean | undefined;
    recommended: boolean | undefined;
    logo: Blob | null | undefined | any;
    recipientGets: string | null | undefined;
    cost: string | null | undefined;
    reviewCount: number | undefined;
    reviewStars: number | undefined;
    isVerified: boolean | undefined;
    learMoreLabel: string | null | undefined;
    shortTitle: string | null | undefined;
  }
  interface RatingStarProps {
    maximumStar: number;
    currentStar: number;
  }
  interface DashboardWizardStepOneProps {
    handleNextPage: () => void;
  }
  interface DashboardWizardStepTwoProps {
    handleNextPage: () => void;
  }
  interface DashboardWizardStepThreeProps {
    handleNextPage: () => void;
  }
  interface DashboardWizardStepFourProps {
    handleNextPage: () => void;
  }

  interface FinancalGoalCardProps {
    id: number;
    label: string;
    icon: string;
    onSelect: (any) => void;
    selectionList: Array<number> | undefined;
  }

  interface LayoutProps {
    bgColor?: string;
    bgGradient?: string;
    config: LayoutConfiguration;
  }
  interface HeaderEmbeddedProps {
    bgColor?: string;
    actionLeftHandler?: (any) => void;
    title: string;
    subTitle?: string;
    circularProgress: {
      label: string;
      value: number;
    };
  }
  interface CircularProgressProps {
    label: string;
    labelColor: string;
    gradientPointBackground: string;
    circularColor: string;
    trackColor: string;
    value: number;
  }
  interface GuidesModuleProps {
    steps: Array<GuideModuleSteps>;
    currentStep: number;
    onNextPage: () => void;
  }
  interface GuideStepsProps {
    data: GuideModuleSteps;
    onNextPage: () => void;
  }
  interface HeadingCloseableHeaderProps {
    bgColor?: string;
    actionLeftHandler?: (any) => void;
    heading: string;
  }
}
export = PropsType;
export as namespace PropsType;
