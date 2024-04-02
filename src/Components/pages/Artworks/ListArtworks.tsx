import React, { useState, useRef, useEffect } from "react";
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
  Input,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogCloseButton,
  VStack,
} from "@chakra-ui/react";
import { Artwork } from "../../../Types/types";

import {
  useDeleteArtwork,
  useGetArtworks,
  usePostBid,
} from "../../Hooks/artwork.hooks";
import { SpinnerBro } from "../../Spinner";
import ArtworkFilterBar from "./ArtworkFilterBar";

interface Props {
  artworkData: Artwork[];
}

const ListArtworks = ({ artworkData }: Props) => {
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);
  const [bidValue, setBidValue] = useState<number | null>(null);
  const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const cancelRef = useRef<HTMLButtonElement | null>(null);
  const [filteredArtworks, setFilteredArtworks] = useState<Artwork[]>([]);

  const { artWorksData, isArtWorkLoading, refetchArtworks } = useGetArtworks();
  const { deleteArtwork, isdeleteSuccess } = useDeleteArtwork();
  const { postBidMutation, isPostBidPending } = usePostBid();

  useEffect(() => {
    // Fetch artworks data when the component mounts
    refetchArtworks();
  }, [refetchArtworks]);

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

  const openDeleteDialog = (artwork: Artwork) => {
    setSelectedArtwork(artwork);
    setIsDeleteDialogOpen(true);
  };

  const closeDeleteDialog = () => {
    setIsDeleteDialogOpen(false);
    setSelectedArtwork(null);
  };

  const handleBidInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(event.target.value);
    setBidValue(value);
  };

  const handleConfirmBid = () => {
    if (bidValue && selectedArtwork) {
      if (bidValue > selectedArtwork.Highest_bid) {
        if (!isPostBidPending) {
          postBidMutation(
            {
              artwork_id: selectedArtwork.Id,
              amount: bidValue,
            },
            {
              onSuccess: () => {
                refetchArtworks();
              },
              onError: (error) => {
                console.log(error);
              },
            }
          );
        }
        closeAlertDialog();
      } else {
        alert(`Bid must be greater than ${selectedArtwork.Highest_bid}`);
      }
    }
  };

  const handleDeleteArtwork = () => {
    if (selectedArtwork) {
      deleteArtwork(selectedArtwork.Id);
      closeDeleteDialog();
    }
  };

  const userId = localStorage.getItem("userId");

  const handleSearch = (searchTerm: string) => {
    const filtered = artWorksData?.data.filter((artwork: Artwork) =>
      artwork.Name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredArtworks(filtered);
    // Trigger refetch after search
    refetchArtworks();
  };

  useEffect(() => {
    artWorksData?.data && setFilteredArtworks(artWorksData?.data);
  }, [artWorksData?.data]);

  const handleSort = (sortOption: string) => {
    const sorted = [...filteredArtworks].sort((a, b) => {
      if (sortOption === "starting_price") {
        return a.Starting_price - b.Starting_price;
      } else if (sortOption === "highest_bid") {
        return a.Highest_bid - b.Highest_bid;
      }
      return 0; // Add a default return value to handle other cases
    });
    setFilteredArtworks(sorted);
    // Trigger refetch after sort
    refetchArtworks();
  };

  const handleFilter = (category: string) => {
    if (category === "") {
      setFilteredArtworks(artWorksData?.data);
    } else {
      const filtered = artWorksData?.data.filter(
        (artwork: Artwork) => artwork.Category === category
      );
      setFilteredArtworks(filtered);
    }
    // Trigger refetch after filter
    refetchArtworks();
  };

  useEffect(() => {
    if (isdeleteSuccess) {
      refetchArtworks();
    }
  }, [isdeleteSuccess, refetchArtworks]);

  if (isArtWorkLoading) {
    return <SpinnerBro />;
  }
  return (
    artWorksData?.data && (
      <VStack spacing={6} alignItems="stretch">
        <Box bg="gray.100" py="8">
          <ArtworkFilterBar
            onSearch={handleSearch}
            onSort={handleSort}
            onFilter={handleFilter}
          />

          <SimpleGrid
            spacing={8}
            columns={{ sm: 2, md: 2, lg: 3 }}
            gap="4"
            my="auto"
            mx="auto"
            maxW="container.lg"
          >
            {filteredArtworks.map((artwork: Artwork) => (
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
                  {userId !== artwork.Owner_id && (
                    <Button
                      colorScheme="blue"
                      borderRadius="md"
                      _hover={{ bg: "#000000" }}
                      onClick={() => openAlertDialog(artwork)}
                    >
                      Place Bid
                    </Button>
                  )}

                  {userId === artwork.Owner_id && (
                    <>
                      <Button
                        colorScheme="red"
                        borderRadius="md"
                        onClick={() => openDeleteDialog(artwork)}
                      >
                        Delete Artwork
                      </Button>
                      <AlertDialog
                        isOpen={isDeleteDialogOpen}
                        leastDestructiveRef={cancelRef}
                        onClose={closeDeleteDialog}
                      >
                        <AlertDialogOverlay />
                        <AlertDialogContent>
                          <AlertDialogHeader>Delete Artwork</AlertDialogHeader>
                          <AlertDialogCloseButton />
                          <AlertDialogBody>
                            Are you sure you want to delete this artwork?
                          </AlertDialogBody>
                          <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={closeDeleteDialog}>
                              Cancel
                            </Button>
                            <Button
                              colorScheme="red"
                              ml={3}
                              onClick={handleDeleteArtwork}
                            >
                              Delete
                            </Button>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </>
                  )}
                </CardFooter>
              </Card>
            ))}
          </SimpleGrid>

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
    )
  );
};

export default ListArtworks;
