import { FC, useMemo } from "react";
import { SlideFade, Box, Button, VStack, Flex } from "@chakra-ui/react";
import { getCoreAPIClient } from "@upwardli/shared/api";
import { CustomUserDetails, CreateLogoutRequest } from "@upwardli/api";
import { useRouter } from "next/router";

import { isEmpty } from "../../../utils/helpers";
import NavLink from "./NavLink";
import Link from "../../Link";
import { useAuth } from "../../../auth/Auth";

import styles from "../../../styles/header.module.css";

const MobileNav: FC<{ isOpen: boolean; userData?: CustomUserDetails }> = ({
  isOpen,
  userData,
}) => {
  const userEmail = userData?.email ?? "";
  const { setAuthenticated } = useAuth();
  const router = useRouter();

  const logout = () => {
    const logoutRequest: CreateLogoutRequest = {
      logout: undefined,
    };
    getCoreAPIClient().createLogout(logoutRequest);
    setAuthenticated(false);
    router.push("/login");
  };

  const functionalButtonProperties: {
    link: string;
    text: string;
  } = useMemo(() => {
    const { pathname } = router;
    switch (pathname) {
      case "/login":
        return { link: "/signup", text: "Sign Up" };
      case "/signup":
        return { link: "/login", text: "Login" };
      default:
        return { link: "/signup", text: "Create Account" };
    }
  }, [router.pathname]);

  return (
    <SlideFade in={isOpen} className={styles.mobileNav}>
      <Box className={styles.mobileNavContent}>
        {isEmpty(userEmail) ? (
          <Flex alignItems="flex-end">
            <Link href={functionalButtonProperties.link}>
              <Button
                bgColor="brandBlue.600"
                borderColor="brandBlue.600"
                rounded="md"
                color="white"
                fontSize="calc((.9 - 1) * 1.2vw + 1rem)"
                padding={{ base: "0.96em 1.6032em" }}
                lineHeight="1.2em"
                fontWeight="800"
                letterSpacing=".02em"
                borderRadius=".4rem"
                width={{ base: "210px" }}
                height={{ base: "59px" }}
                _hover={{
                  bgColor: "brandBlue.600",
                  borderColor: "brandBlue.600",
                  opacity: 0.7,
                }}
              >
                {functionalButtonProperties.text}
              </Button>
            </Link>
          </Flex>
        ) : (
          <Flex flexDirection="column" justifyContent="space-between">
            <VStack
              as={"nav"}
              spacing={4}
              className={styles.authenticatedNavigationMobile}
            >
              <NavLink href="/dashboard/">For You</NavLink>
              <NavLink href="/guides/">Credit Guide</NavLink>
              <NavLink href="/credit/">Credit Plan</NavLink>
              <NavLink href="/offers/">Matches</NavLink>
            </VStack>
            <VStack
              as={"nav"}
              spacing={4}
              className={styles.authenticatedNavigationMobile}
            >
              <NavLink href="/profile/">Profile</NavLink>
              <Box onClick={logout}>
                <NavLink href="#">Logout</NavLink>
              </Box>
            </VStack>
          </Flex>
        )}
      </Box>
    </SlideFade>
  );
};

export default MobileNav;
