import { FC, useState, useMemo, useEffect } from "react";
import {
  Box,
  Flex,
  Avatar,
  HStack,
  Image,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useDisclosure,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useAuth } from "../../auth/Auth";
import { getCoreAPIClient } from "@upwardli/shared/api";
import { CustomUserDetails, CreateLogoutRequest } from "@upwardli/api";

import Link from "../Link";
import NavLink from "./items/NavLink";
import MobileNav from "./items/MobileNav";

import { isEmpty } from "../../utils/helpers";
import styles from "../../styles/header.module.css";

const PrimaryHeader: FC<any> = () => {
  const router = useRouter();
  const { setAuthenticated } = useAuth();
  const { isOpen, onToggle } = useDisclosure();
  const [userData, setUserData] = useState<CustomUserDetails>();

  useEffect(() => {
    async function fetchUser() {
      const client = getCoreAPIClient();
      const response = await client.retrieveCustomUserDetails({});
      setUserData(response);
    }
    fetchUser();
  }, [router.pathname]);

  useEffect(() => {
    // when the mobile navigation displayed, lock the scrollbar, otherwise make it scrollable
    if (isOpen) {
      document.body.style.overflowY = "hidden";
      document.body.style.backgroundColor = "#fff";
    } else {
      document.body.style.overflowY = "auto";
      document.body.style.backgroundColor = "auto";
    }
  }, [isOpen]);

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

  const logout = () => {
    const logoutRequest: CreateLogoutRequest = {
      logout: undefined,
    };
    getCoreAPIClient().createLogout(logoutRequest);
    setAuthenticated(false);
    router.push("/login");
  };

  return (
    <Box bgColor={isOpen ? "#fff" : "transparent"}>
      <Flex className={styles.headerAnnouncementBarWrapper}>
        <Flex alignItems="center" justifyContent="space-between" width="100%">
          {/* logo and navigation */}
          <Flex
            alignItems="center"
            justifyContent={{ base: "flex-start" }}
            position="relative"
            width="100%"
          >
            <Flex width="100%" alignContent="center">
              {/* for DESKTOP */}
              <Link href="/" className={styles.headerTitleLogo}>
                <Image
                  width={{ base: "167px" }}
                  height={{ base: "60px" }}
                  pb={{ base: "0px" }}
                  src="/images/horizontal-color-logo.png"
                  alt="Upwardli"
                />
              </Link>
              {!isEmpty(userData?.email ?? "") && (
                <HStack
                  as={"nav"}
                  ml={8}
                  spacing={4}
                  className={styles.authenticatedNavigation}
                >
                  <NavLink href="/dashboard/">For You</NavLink>
                  <NavLink href="/guides/">Credit Guide</NavLink>
                  <NavLink href="/credit/">Credit Plan</NavLink>
                  <NavLink href="/offers/">Matches</NavLink>
                </HStack>
              )}
              {/* for MOBILE */}
              <MobileNav isOpen={isOpen} userData={userData} />
              <Box
                onClick={onToggle}
                className={
                  !isOpen ? styles.headerBurger : styles.headerBurgerActive
                }
                ml={{ base: "7px" }}
                width={{ base: "35px" }}
                height={{ base: "35px" }}
                position="relative"
              >
                <Box className={styles.topBun}></Box>
                <Box className={styles.patty}></Box>
                <Box className={styles.bottomBun}></Box>
              </Box>
              <Link href="/" className={styles.headerMobileLogo}>
                <Flex flexBasis="1" justifyContent="center">
                  <Image
                    width={{ base: "113px" }}
                    height={{ base: "30px" }}
                    pb={{ base: "0px" }}
                    src="/images/wordmark-logo.png"
                    alt="Upwardli"
                  />
                </Flex>
              </Link>
            </Flex>
          </Flex>
          {/* navigation right button */}
          <Flex
            className={styles.headerRightAction}
            alignItems={"center"}
            display={{ base: "none", md: "flex" }}
          >
            {isEmpty(userData?.email ?? "") ? (
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
                  width={{ base: "158.08px" }}
                  height={{ base: "45.28px" }}
                  _hover={{
                    bgColor: "brandBlue.600",
                    borderColor: "brandBlue.600",
                    opacity: 0.7,
                  }}
                >
                  {functionalButtonProperties.text}
                </Button>
              </Link>
            ) : (
              <Menu autoSelect={false}>
                <MenuButton
                  as={Button}
                  rounded={"full"}
                  variant={"link"}
                  cursor={"pointer"}
                >
                  {userData && (
                    <Avatar
                      size={"sm"}
                      name={`${userData?.firstName ?? ""}  ${
                        userData?.lastName ?? ""
                      }`}
                    />
                  )}
                </MenuButton>
                <MenuList>
                  <Link href="/profile/">
                    <MenuItem>Profile</MenuItem>
                  </Link>
                  <Link href="#" onClick={logout}>
                    <MenuItem>Logout</MenuItem>
                  </Link>
                </MenuList>
              </Menu>
            )}
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
};

export default PrimaryHeader;
