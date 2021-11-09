import { useEffect, useState } from "react";
import { CustomUserDetails } from "@upwardli/api/dist/models/CustomUserDetails";
import { Link } from "@chakra-ui/react";

import Layout from "../components/Layout";
import { getCoreAPIClient } from "@upwardli/shared/api";
import CircularProgressHeader from "../components/headers/CircularProgressHeader";
import styles from "../styles/Home.module.css";
import { Meta } from "../components/Meta";
import type { LayoutConfiguration } from "../types/object";

export default function Home() {
  const [userData, setUserData] = useState<CustomUserDetails>();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    async function fetchUser() {
      const client = getCoreAPIClient();
      const response = await client.retrieveCustomUserDetails({});
      setUserData(response);
      setIsLoggedIn(true);
    }
    fetchUser();
  }, []);

  const LayoutConfiguration: LayoutConfiguration = {
    full: {},
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
      <Meta title="Home" />
      <div className={styles.container}>
        <h1>
          {isLoggedIn && userData && (
            <span>Welcome {userData.firstName || userData.email}!</span>
          )}
          {!isLoggedIn && <span> Not Logged In</span>}{" "}
          <Link href="/login">Login</Link> or{" "}
          <Link href="/signup">Sign Up</Link>
        </h1>
      </div>
    </Layout>
  );
}
