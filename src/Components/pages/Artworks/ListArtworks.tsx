import React, { useState, useRef } from "react";
import {
  SimpleGrid,
  Heading,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  Text,
  Image,
  Box,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogCloseButton,
  Input,
  VStack,
} from "@chakra-ui/react";
import { Artwork } from "../../../Types/types";
import { useGetArtworks } from "../../Hooks/newArtwork.hooks";
// import { Artwork } from "../../../types"; // Adjust the import path according to your project
// import {Artwork} from
interface Props {
  artworkData: Artwork[];
}

const ListArtworks = ({ artworkData }: Props) => {
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);
  const [bidValue, setBidValue] = useState<number | null>(null);
  const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false);
  const cancelRef = useRef<HTMLButtonElement | null>(null);

  // const { artWorksData } = useGetArtworks();
  // console.log("12345678---->", artWorksData);

  const openAlertDialog = (artwork: Artwork) => {
    setSelectedArtwork(artwork);
    setBidValue(artwork.Highest_bid + 500);
    setIsAlertDialogOpen(true);
  };

  const closeAlertDialog = () => {
    setIsAlertDialogOpen(false);
    setSelectedArtwork(null);
    setBidValue(null);
  };

  const handleBidInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(event.target.value);
    setBidValue(value);
  };

  const handleConfirmBid = () => {
    if (bidValue && selectedArtwork) {
      if (bidValue > selectedArtwork.Highest_bid) {
        // Implement logic to handle bid submission
        alert(
          `Bid of $${bidValue} placed successfully for ${selectedArtwork.Name}.`
        );
        closeAlertDialog();
      } else {
        alert(`Bid must be greater than ${selectedArtwork.Highest_bid}`);
      }
    }
  };

  return (
    <VStack spacing={6} alignItems="stretch">
      <Box bg="gray.100" py="8">
        <SimpleGrid
          spacing={8}
          columns={{ sm: 2, md: 2, lg: 3 }}
          gap="4"
          my="auto"
          mx="auto"
          maxW="container.lg"
        >
          {artworkData.map((artwork) => (
            <Card
              key={artwork.Id}
              bg="white"
              boxShadow="md"
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
              transition="transform 0.3s"
              _hover={{ transform: "scale(1.05)" }}
            >
              <Image
                height="200"
                width="400"
                src={artwork.Image}
                alt={artwork.Name}
              />
              <CardBody bg="gray.200" p="4">
                <CardHeader>
                  <Heading size="md" mb="2">
                    {artwork.Name}
                  </Heading>
                </CardHeader>
                <Text mb="2">{artwork.Description}</Text>
                <Text mb="2">Category: {artwork.Category}</Text>
                <Text mb="2">Starting Price: ${artwork.Starting_price}</Text>
                <Text mb="2">Highest Bid: ${artwork.Highest_bid}</Text>
              </CardBody>
              <CardFooter
                bg="gray"
                p="4"
                display="flex"
                justifyContent="flex-end"
              >
                <Button
                  colorScheme="blue"
                  borderRadius="md"
                  _hover={{ bg: "#000000" }}
                  onClick={() => openAlertDialog(artwork)}
                >
                  Place Bid
                </Button>
              </CardFooter>
            </Card>
          ))}
        </SimpleGrid>

        {/* AlertDialog */}
        <AlertDialog
          isOpen={isAlertDialogOpen}
          leastDestructiveRef={cancelRef}
          onClose={closeAlertDialog}
        >
          <AlertDialogOverlay />
          <AlertDialogContent>
            <AlertDialogHeader>Place Bid</AlertDialogHeader>
            <AlertDialogCloseButton />
            <AlertDialogBody>
              <Text mb="4">
                Enter bid higher than ${selectedArtwork?.Highest_bid}
              </Text>
              <Input
                type="number"
                value={bidValue || ""}
                onChange={handleBidInputChange}
                placeholder={`Enter bid higher than ${selectedArtwork?.Highest_bid}`}
              />
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={closeAlertDialog}>
                Cancel
              </Button>
              <Button colorScheme="blue" ml={3} onClick={handleConfirmBid}>
                Confirm Bid
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </Box>
    </VStack>
  );
};

export default ListArtworks;
