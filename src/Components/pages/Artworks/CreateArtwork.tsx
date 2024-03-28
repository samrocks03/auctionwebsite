import { useFormik } from "formik";
import {
  Grid,
  Box,
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
  Button,
  FormErrorMessage,
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  useToast,
} from "@chakra-ui/react";
import { createArtWorkSchema } from "../../YupSchema/yup.schema";
import { useRef, useState } from "react";

const initialValues = {
  name: "",
  category: "",
  description: "",
  imageUrl: "",
  amount: "",
};

const CreateArtworkForm = () => {
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [isAuctionCreated, setIsAuctionCreated] = useState(false);
  const cancelRef = useRef<HTMLButtonElement | null>(null);
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: createArtWorkSchema,
    onSubmit: (values, actions) => {
      console.log("Artwork created!", values);
      actions.setSubmitting(false);
    },
  });
  const toast = useToast();

  const handleCloseConfirmation = () => {
    setIsConfirmationOpen(false);
  };

  const handleOpenConfirmation = () => {
    setIsConfirmationOpen(true);
  };

  const handleConfirmCreateAuction = () => {
    setIsAuctionCreated(true);
    setIsConfirmationOpen(false);
    // Additional logic to create auction
    // Show toast message
    toast({
      title: "Artwork created successfully",
      position: "top-right",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Box bg="#d4d4d4">
      <form onSubmit={formik.handleSubmit}>
        <Grid
          // className="broo"
          ml="25%"
          color="blue"
          templateColumns="repeat(2, 1fr)"
          gap={6}
          p={6}
          borderRadius="lg"
          boxShadow="lg"
        >
          <Box gridColumn="span 2">
            <FormControl
              isInvalid={!!formik.errors.name && formik.touched.name}
            >
              <FormLabel htmlFor="name" fontWeight="bold">
                Name
              </FormLabel>
              <Input
                id="name"
                {...formik.getFieldProps("name")}
                placeholder="Enter name of artwork"
                borderRadius="md"
                borderColor="gray.300"
                _hover={{ borderColor: "gray.400" }}
                _focus={{ borderColor: "blue.400" }}
              />
              <FormErrorMessage>{!!formik.errors.name}</FormErrorMessage>
            </FormControl>
          </Box>
          <Box>
            <FormControl
              isInvalid={!!formik.errors.category && formik.touched.category}
            >
              <FormLabel htmlFor="category" fontWeight="bold">
                Category
              </FormLabel>
              <Select
                id="category"
                {...formik.getFieldProps("category")}
                placeholder="Select category"
                borderRadius="md"
                borderColor="gray.300"
                _hover={{ borderColor: "gray.400" }}
                _focus={{ borderColor: "blue.400" }}
              >
                <option value="Canvas_Painting">Canvas Painting</option>
                <option value="Pencil_Art">Pencil Art</option>
              </Select>
              <FormErrorMessage>{!!formik.errors.category}</FormErrorMessage>
            </FormControl>
          </Box>
          <Box gridColumn="span 2">
            <FormControl
              isInvalid={
                !!formik.errors.description && formik.touched.description
              }
            >
              <FormLabel htmlFor="description" fontWeight="bold">
                Description
              </FormLabel>
              <Textarea
                id="description"
                {...formik.getFieldProps("description")}
                placeholder="Enter description of artwork"
                borderRadius="md"
                borderColor="gray.300"
                _hover={{ borderColor: "gray.400" }}
                _focus={{ borderColor: "blue.400" }}
              />
              <FormErrorMessage>{!!formik.errors.description}</FormErrorMessage>
            </FormControl>
          </Box>
          <Box gridColumn="span 2">
            <FormControl
              isInvalid={!!formik.errors.imageUrl && formik.touched.imageUrl}
            >
              <FormLabel htmlFor="imageUrl" fontWeight="bold">
                Image URL
              </FormLabel>
              <Input
                id="imageUrl"
                {...formik.getFieldProps("imageUrl")}
                placeholder="Enter URL of artwork image"
                borderRadius="md"
                borderColor="gray.300"
                _hover={{ borderColor: "gray.400" }}
                _focus={{ borderColor: "blue.400" }}
              />
              <FormErrorMessage>{!!formik.errors.imageUrl}</FormErrorMessage>
            </FormControl>
          </Box>
          <Box>
            <FormControl
              isInvalid={!!formik.errors.amount && formik.touched.amount}
            >
              <FormLabel htmlFor="amount" fontWeight="bold">
                Amount
              </FormLabel>
              <Input
                id="amount"
                {...formik.getFieldProps("amount")}
                type="number"
                placeholder="Enter amount"
                borderRadius="md"
                borderColor="gray.300"
                _hover={{ borderColor: "gray.400" }}
                _focus={{ borderColor: "blue.400" }}
              />
              <FormErrorMessage>{!!formik.errors.amount}</FormErrorMessage>
            </FormControl>
          </Box>
          <Box>
            <Button
              type="submit"
              colorScheme="blue"
              isLoading={formik.isSubmitting}
              onClick={handleOpenConfirmation}
              loadingText="Creating..."
              borderRadius="md"
              boxShadow="md"
              _hover={{ boxShadow: "lg" }}
            >
              Create Artwork
            </Button>
          </Box>
        </Grid>
      </form>

      <AlertDialog
        isOpen={isConfirmationOpen}
        leastDestructiveRef={cancelRef}
        onClose={handleCloseConfirmation}
      >
        <AlertDialogOverlay />
        <AlertDialogContent>
          <AlertDialogHeader>Create Auction</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            Are you sure you want to create an auction?
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button onClick={handleCloseConfirmation}>No</Button>
            <Button
              colorScheme="blue"
              ml={3}
              onClick={handleConfirmCreateAuction}
            >
              Yes
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Box>
  );
};

export default CreateArtworkForm;
