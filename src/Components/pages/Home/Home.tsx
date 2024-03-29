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
import { Link } from "react-router-dom";
import { useRef } from "react";
import { HamburgerIcon } from "@chakra-ui/icons";

const Home = ({ isAdmin }: { isAdmin: boolean }) => {
  // const [isListArtworksOpen, setIsListArtworksOpen] = useState(false); // State to track whether List Artworks is open

  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef<HTMLButtonElement | null>(null);

  const drawerOptions = isAdmin
    ? [
        { name: "View All Users", path: "/users" },
        { name: "Create Artwork", path: "/create-artwork" },
        { name: "List Artworks", path: "/list-artworks" },
      ]
    : [
        { name: "Create Artwork", path: "/create-artwork" },
        { name: "List Artworks", path: "/list-artworks" }, // Add List Artworks option
      ];

  // const toggleListArtworks = () => {
  //   setIsListArtworksOpen(!isListArtworksOpen);
  // };

  return (
    <>
      <Box h={"auto"} style={{ display: "flex" }}>
        <Flex
          justifyContent="flex-end"
          alignItems="center"
          
        >
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
                      w="100%"
                      textAlign="left"
                    >
                      {option.name}
                    </Button>
                  </li>
                ))}
              </ul>
            </DrawerBody>

            <DrawerFooter></DrawerFooter>
          </DrawerContent>
        </Drawer>

        {/* Render List Artworks component conditionally */}
        {/* {isListArtworksOpen && <ListArtworks />} */}
      </Box>
    </>
  );
};

export default Home;
