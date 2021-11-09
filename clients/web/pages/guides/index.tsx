import withAuth from "../../auth/withAuth";
import { GuidesView } from "../../views/guides";

import Layout from "../../components/Layout";
import type { LayoutConfiguration } from "../../types/object";
import { Meta } from "../../components/Meta";
import GradientDecoratorHeader from "../../components/headers/GradientDecoratorHeader";

const Guides = () => {
  const LayoutConfiguration: LayoutConfiguration = {
    full: {},
    embedded: {
      header: {
        base: <GradientDecoratorHeader />,
      },
    },
  };

  return (
    <Layout config={LayoutConfiguration}>
      <Meta title="Credit Guides" />
      <GuidesView />
    </Layout>
  );
};

export default withAuth(Guides);
