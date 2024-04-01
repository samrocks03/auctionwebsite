// import { useState } from "react";
import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  DrawerCloseButton,
  Button,
  useDisclosure,
  Box,
  Flex,
} from "@chakra-ui/react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { useLogOutHook } from "../../Hooks/authentication.hooks";

const Home = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef<HTMLButtonElement | null>(null);
  const role = localStorage.getItem("userRole");
  const navigate = useNavigate();
  // console.log("Im in home oooooooooooooo");

  const drawerOptions = role
    ? role === "admin"
      ? [
          { name: "View All Users", path: "/users" },
          { name: "Create Artwork", path: "/create-artworks" },
          { name: "List Artworks", path: "/list-artworks" },
        ]
      : [
          { name: "Create Artwork", path: "/create-artworks" },
          { name: "List Artworks", path: "/list-artworks" },
        ]
    : [
        { name: "Log In", path: "/login" },
        { name: "Register", path: "/signup" },
      ];

  const { signOutMutation, isSuccess } = useLogOutHook();

  useEffect(() => {
    if (isSuccess) {
      console.log("I'm in success of logout");
      navigate("/login");
    }
  }, [isSuccess, navigate]);

  return (
    <>
      <Box h={"auto"} style={{ display: "flex" }}>
        <Flex justifyContent="flex-end" alignItems="center">
          <Button ref={btnRef} colorScheme="teal" onClick={onOpen}>
            <HamburgerIcon />
          </Button>
        </Flex>

        <Drawer placement="left" isOpen={isOpen} onClose={onClose}>
          <DrawerOverlay />

          <DrawerContent>
            <DrawerHeader>
              Art N Craft
              <DrawerCloseButton onClick={onClose} />
            </DrawerHeader>

            <DrawerBody>
              <ul style={{ listStyle: "none", padding: 0 }}>
                {drawerOptions.map((option, index) => (
                  <li key={index} style={{ marginBottom: "10px" }}>
                    <Button
                      as={Link}
                      to={option.path}
                      variant="link"
                      // hidden={true}
                      w="100%"
                      textAlign="left"
                    >
                      {option.name}
                    </Button>
                  </li>
                ))}
              </ul>
            </DrawerBody>

            <DrawerFooter>
              <Button
                as={Link}
                variant="link"
                onClick={() => {
                  signOutMutation();
                }}
                w="100%"
                textAlign="left"
              >
                Logout
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
        {/* <div ref={pageRef}> */}
        {/* </div> */}
      </Box>
      <Outlet />
    </>
  );
};

export default Home;
