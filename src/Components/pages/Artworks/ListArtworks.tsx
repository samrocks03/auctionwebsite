import {
  SimpleGrid,
  Heading,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  Text,
  Image
} from "@chakra-ui/react";
import { useGetArtworks } from "../../Hooks/newArtwork.hooks";

const ListArtworks = () => {
    const { artWorksData,isArtWorkLoading } = useGetArtworks();

    
    console.log(`This is artworks: ${artWorksData}`)
  return (
    <div>

      {/* <SimpleGrid
        spacing={4}
        templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
      >
        {artWorksData.map((artwork) => (
          <Card key={artwork.Id}>
            <CardHeader>
              <Heading size="md">{artwork.Name}</Heading>
            </CardHeader>
            <CardBody>
              <Image src={artwork.Image} alt={artwork.Name} />
              <Text>{artwork.Description}</Text>
              <Text>Category: {artwork.Category}</Text>
              <Text>Starting Price: ${artwork.Starting_price}</Text>
              <Text>Highest Bid: ${artwork.Highest_bid}</Text>
            </CardBody>
            <CardFooter>
              <Button>Place Bid</Button>
            </CardFooter>
          </Card>
        ))}
      </SimpleGrid> */}
    </div>
  );
};

export default ListArtworks;
