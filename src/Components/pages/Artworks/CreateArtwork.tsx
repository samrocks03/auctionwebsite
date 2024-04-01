/* eslint-disable @typescript-eslint/no-unused-vars */
import { useFormik } from "formik";
import {
  Grid,
  Box,
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
  Text,
  Button,
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
import { Category, ICreateArtwork } from "../../../Types/authentication.types";
import { usePostArtworks } from "../../Hooks/artwork.hooks";

const initialValues: ICreateArtwork = {
  name: "",
  category: Category.Canvas_Painting,
  description: "",
  image: "",
  starting_price: 1,
  duration: 1,
};

const CreateArtworkForm = () => {
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [isAuctionCreated, setIsAuctionCreated] = useState(false);

  const cancelRef = useRef<HTMLButtonElement | null>(null);
  const { postArtworksMutation, isPostArtworksPending } = usePostArtworks();
  const toast = useToast();

  const handleCloseConfirmation = () => {
    setIsConfirmationOpen(false);
  };

  const handleOpenConfirmation = () => {
    const errLength = Object.keys(formik.errors).length;
    if (!formik.errors || errLength === 0) {
      setIsConfirmationOpen(true);
    }
  };

  const handleConfirmCreateAuction = (values: {
    name: any;
    category: any;
    description: any;
    image: any;
    starting_price: any;
    duration: any;
  }) => {
    const payload: ICreateArtwork = {
      name: values.name,
      category: values.category,
      description: values.description,
      image: values.image,
      starting_price: values.starting_price,
      duration: values.duration,
    };

    setIsAuctionCreated(true);
    setIsConfirmationOpen(false);
    postArtworksMutation(payload);
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: createArtWorkSchema,
    onSubmit: (values, actions) => {
      // handleConfirmCreateAuction(values);
      // console.log("Artwork created in create artwork!");
    },
  });

  return (
    <Box bg="#d4d4d4">
      <form onSubmit={formik.handleSubmit}>
        <Grid
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
              isInvalid={formik.touched.name && Boolean(formik.errors.name)}
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
              {formik.touched.name && formik.errors.name && (
                <Text color="red" fontSize="sm">
                  {formik.errors.name}
                </Text>
              )}
            </FormControl>
          </Box>

          <Box>
            <FormControl
              isInvalid={
                formik.touched.category && Boolean(formik.errors.category)
              }
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
              {formik.touched.category && formik.errors.category && (
                <Text color="red" fontSize="sm">
                  {formik.errors.category}
                </Text>
              )}
            </FormControl>
          </Box>

          <Box gridColumn="span 2">
            <FormControl
              isInvalid={
                formik.touched.description && Boolean(formik.errors.description)
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
              {formik.touched.description && formik.errors.description && (
                <Text color="red" fontSize="sm">
                  {formik.errors.description}
                </Text>
              )}
              {/* <FormErrorMessage>{!!formik.errors.description}</FormErrorMessage> */}
            </FormControl>
          </Box>

          <Box gridColumn="span 2">
            <FormControl
              isInvalid={formik.touched.image && Boolean(formik.errors.image)}
            >
              <FormLabel htmlFor="image" fontWeight="bold">
                Image URL
              </FormLabel>
              <Input
                id="image"
                {...formik.getFieldProps("image")}
                placeholder="Enter URL of artwork image"
                borderRadius="md"
                borderColor="gray.300"
                _hover={{ borderColor: "gray.400" }}
                _focus={{ borderColor: "blue.400" }}
              />
              {formik.touched.image && formik.errors.image && (
                <Text color="red" fontSize="sm">
                  {formik.errors.image}
                </Text>
              )}
            </FormControl>
          </Box>

          <Box>
            <FormControl
              isInvalid={
                Boolean(formik.errors.starting_price) &&
                formik.touched.starting_price
              }
            >
              <FormLabel htmlFor="starting_price" fontWeight="bold">
                Amount
              </FormLabel>
              <Input
                id="starting_price"
                {...formik.getFieldProps("starting_price")}
                type="number"
                placeholder="Enter Starting Price"
                borderRadius="md"
                borderColor="gray.300"
                _hover={{ borderColor: "gray.400" }}
                _focus={{ borderColor: "blue.400" }}
              />
              {formik.touched.starting_price &&
                formik.errors.starting_price && (
                  <Text color="red" fontSize="sm">
                    {formik.errors.starting_price}
                  </Text>
                )}
            </FormControl>
          </Box>

          <Box>
            <FormControl>
              <FormLabel htmlFor="duration" fontWeight="bold">
                Duration
              </FormLabel>
              <Input
                id="duration"
                {...formik.getFieldProps("duration")}
                type="number"
                min={1}
                placeholder="Enter duration"
                borderRadius="md"
                borderColor="gray.300"
                _hover={{ borderColor: "gray.400" }}
                _focus={{ borderColor: "blue.400" }}
              />
              {formik.touched.duration && formik.errors.duration && (
                <Text color="red" fontSize="sm">
                  {formik.errors.duration}
                </Text>
              )}
            </FormControl>
          </Box>

          <Box>
            <Button
              type="submit"
              colorScheme="blue"
              // isLoading={formik.isSubmitting}
              onSubmit={handleOpenConfirmation}
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
              onClick={() => {
                handleConfirmCreateAuction(formik.values);
              }}
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
