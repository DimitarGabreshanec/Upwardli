import { useState, useCallback, useEffect } from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { Box, SimpleGrid, Heading } from "@chakra-ui/react";
import { getCoreAPIClient } from "@upwardli/shared/api";
import { Offer } from "@upwardli/api/dist/models/Offer";
import { ListOffersCategoryEnum } from "@upwardli/api/dist/apis/CoreApi";

import { OFFERS_CATEGORIES } from "../../utils/constants";
import type { LayoutConfiguration } from "../../types/object";
import Layout from "../../components/Layout";
import CategoriesResultsCard from "../../components/CategoriesResultsCard";
import { isEmpty, getEnumKeyByEnumValue } from "../../utils/helpers";
import { Meta } from "../../components/Meta";
import HeadingCloseableHeader from "../../components/headers/HeadingCloseableHeader";
import withAuth from "../../auth/withAuth";

const OffersSlugPage: NextPage = () => {
  const router = useRouter();
  const [categoriesResultsData, setCategoriesResultData] = useState<
    Array<Offer>
  >([]);
  const [pageTitle, setPageTitle] = useState("");

  useEffect(() => {
    async function fetchOffers() {
      const slug = router?.query?.slug ?? "";
      const title = slug
        ? OFFERS_CATEGORIES.find((element) => element.href === slug)?.title ??
          ""
        : "";
      ("");
      setPageTitle(title);
      const client = getCoreAPIClient();
      const enumFields: keyof typeof ListOffersCategoryEnum =
        getEnumKeyByEnumValue(ListOffersCategoryEnum, slug);
      const response = await client.listOffers({
        category: ListOffersCategoryEnum[enumFields],
      });
      setCategoriesResultData(response?.results ?? []);
    }
    fetchOffers();
  }, []);

  const LayoutConfigurationObject: LayoutConfiguration = {
    full: {},
    embedded: {
      header: {
        base: (
          <HeadingCloseableHeader
            actionLeftHandler={() => router.push("/offers")}
            heading={pageTitle}
          />
        ),
      },
    },
  };

  const generateListCategoriesResult = useCallback(() => {
    if (isEmpty(categoriesResultsData)) {
      <Box justifyContent="center" alignItems="center" p={6}>
        No result found
      </Box>;
    } else {
      return (
        <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} gap={4}>
          {categoriesResultsData.map((item, index) => {
            console.log(item);
            const {
              ssnRequired,
              recommended,
              logo,
              recipientGets,
              totalCost,
              reviewCount,
              reviewStars,
              isVerified,
              learnMore,
              shortTitle,
            } = item;
            return (
              <CategoriesResultsCard
                key={index}
                ssnRequired={ssnRequired}
                recommended={recommended}
                logo={logo}
                recipientGets={recipientGets}
                cost={totalCost}
                reviewCount={reviewCount}
                reviewStars={reviewStars}
                isVerified={isVerified}
                learMoreLabel={learnMore}
                shortTitle={shortTitle}
              />
            );
          })}
        </SimpleGrid>
      );
    }
  }, [categoriesResultsData]);

  return (
    <Layout config={LayoutConfigurationObject}>
      <Meta title={pageTitle} />
      <Box pb="4">
        <Heading
          textAlign="center"
          fontWeight="bold"
          size="sm"
          lineHeight="7"
          display={["none", "block"]}
        >
          {pageTitle}
        </Heading>
        <Box mt={{ base: "14px" }}>{generateListCategoriesResult()}</Box>
      </Box>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const pageSlug = params?.slug ?? "";

  const isAvailableSlug =
    OFFERS_CATEGORIES.filter((item) => item.href === pageSlug).length > 0;

  // if the slug is in avaiable list, fetch data pass to page, otherwise redirect to 404 page
  if (!isAvailableSlug) {
    return {
      notFound: true,
    };
  }
  return {
    props: {},
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = OFFERS_CATEGORIES.map((item) => {
    return {
      params: {
        slug: item.href,
      },
    };
  });

  // generate the list of available slug of this page
  return {
    paths,
    fallback: false,
  };
};

export default withAuth(OffersSlugPage);
