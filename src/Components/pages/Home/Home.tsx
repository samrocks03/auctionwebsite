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
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
// import ListArtworks from "../Artworks/ListArtworks";
import { useRef } from "react";

const Home = ({ isAdmin }: { isAdmin: boolean }) => {
  // const [isListArtworksOpen, setIsListArtworksOpen] = useState(false); // State to track whether List Artworks is open

  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef<HTMLButtonElement | null>(null);
  // const btnRef = useRef();

  const drawerOptions = isAdmin
    ? [{ name: "View All Users", path: "/view-all-users" }]
    : [
        { name: "Create Artwork", path: "/create-artwork" },
        { name: "List Artworks", path: "/list-artworks" }, // Add List Artworks option
      ];

  // const toggleListArtworks = () => {
  //   setIsListArtworksOpen(!isListArtworksOpen);
  // };

  return (
    <>
      <div style={{ display: "flex" }}>
        <Button ref={btnRef} colorScheme="teal" onClick={onOpen}>
          Open
        </Button>

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
                      onClick={() => {
                        // Toggle List Artworks component when clicking on "List Artworks" option
                        if (option.path === "/list-artworks") {
                          // toggleListArtworks();
                        }
                      }}
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
      </div>
    </>
  );
};

export default Home;
