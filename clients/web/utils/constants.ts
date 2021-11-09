import theme from "../theme";

import type { CategoriesListType } from "../types/object";

export const OFFERS_CATEGORIES: Array<CategoriesListType> = [
  {
    id: 1,
    href: "money-transfer",
    title: "Best Money Transfer Services",
    thumbnail: "/images/categories/best-money-transfer-services.png",
    backgroundGradient: `linear-gradient(206.26deg, ${theme.colors.brandPurple[800]} 0%, ${theme.colors.brandPurple[400]} 100%)`,
  },
  {
    id: 2,
    href: "student-loans",
    title: "Student Loan & Refinance Options",
    thumbnail: "/images/categories/student-loan-and-refinance-options.png",
    backgroundGradient: `linear-gradient(206.26deg, ${theme.colors.brandPurple[600]} 0%, ${theme.colors.brandBlue[600]} 100%)`,
  },
  {
    id: 3,
    href: "credit-building-cards",
    title: "Top Finance Apps For Immigrants",
    thumbnail: "/images/categories/top-finance-apps-for-immigrants.png",
    backgroundGradient: `linear-gradient(206.26deg, ${theme.colors.brandPurple[600]} 0%, ${theme.colors.brandBlue[600]} 100%)`,
  },
  {
    id: 4,
    href: "credit-cards",
    title: "Best Credit Cards for Newcomers",
    thumbnail: "/images/categories/best-credit-cards-for-newcomers.png",
    backgroundGradient: `linear-gradient(206.26deg, ${theme.colors.brandOrange[600]} 0%, ${theme.colors.brandOrange[400]} 100%)`,
  },
  {
    id: 5,
    href: "credit-builder",
    title: "Grow Credit with Credit Builders",
    thumbnail: "/images/categories/grow-credit-with-credit-builders.png",
    backgroundGradient: `linear-gradient(206.26deg, ${theme.colors.brandOrange[600]} 0%, ${theme.colors.brandOrange[400]} 100%)`,
  },
  {
    id: 6,
    href: "banking",
    title: "Top Bank Accounts for Immigrants",
    thumbnail: "/images/categories/top-bank-accounts-for-immigrants.png",
    backgroundGradient: `linear-gradient(206.26deg, ${theme.colors.brandPurple[800]} 0%, ${theme.colors.brandPurple[400]} 100%)`,
  },
];

export const CREDIT_PLANS = [
  {
    id: 1,
    title: "Add Cards to Improve Credit Variety",
    link: "#",
  },
  {
    id: 2,
    title: "Subscribe to Free Credit Building Tools",
    link: "#",
  },
  {
    id: 3,
    title: "Refinance Existing Debt ",
    link: "#",
  },
  {
    id: 4,
    title: "Enable notifications",
    link: "#",
  },
];
