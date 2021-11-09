import { NextPage } from "next";
import React from "react";
import withAuth from "../../auth/withAuth";

import { DashboardView } from "../../views/dashboard";
import Layout from "../../components/Layout";
import { Meta } from "../../components/Meta";
import type { LayoutConfiguration } from "../../types/object";

const Dashboard: NextPage = () => {
  const LayoutConfiguration: LayoutConfiguration = { full: {}, embedded: {} };

  return (
    <Layout config={LayoutConfiguration}>
      <Meta title="For You" />
      <DashboardView />
    </Layout>
  );
};

export default withAuth(Dashboard);
