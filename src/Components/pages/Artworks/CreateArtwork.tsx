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
import { ICreateArtwork } from "../../../Types/authentication.types";
import { usePostArtworks } from "../../Hooks/newArtwork.hooks";

const initialValues = {
  name: "",
  category: "",
  description: "",
  imageUrl: "",
  amount: "",
  duration: "",
};

const CreateArtworkForm = () => {
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [isAuctionCreated, setIsAuctionCreated] = useState(false);
  const cancelRef = useRef<HTMLButtonElement | null>(null);
  const { postArtworksMutation, isPostArtworksPending } = usePostArtworks();
  const toast = useToast();

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: createArtWorkSchema,
    onSubmit: (values, actions) => {
      console.log("Artwork created!", values);
    },
  });

  const handleCloseConfirmation = () => {
    setIsConfirmationOpen(false);
  };

  const handleOpenConfirmation = () => {
    // console.log("Formik errors:", formik.errors);
    // console.log("Formik isValid:", formik.isValid);

    // console.log("Bro", !formik.errors);
    const errLength = Object.keys(formik.errors).length;
    // console.log("Bro 2 bro-->", errLength);

    if (!formik.errors || errLength === 0) {
      setIsConfirmationOpen(true);
    }
  };

  const handleConfirmCreateAuction = (values: any) => {
    const payload: ICreateArtwork = {
      name: values.name,
      category: values.category,
      description: values.description,
      imageUrl: values.imageUrl,
      amount: values.amount,
      duration: values.duration,
    };

    setIsAuctionCreated(true);
    setIsConfirmationOpen(false);

    if (!isPostArtworksPending) {
      postArtworksMutation(payload, {
        onSuccess: () => {
          toast({
            title: "Artwork created!",
            description: "Your artwork has been created!",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
        },
        onError: (error) => {
          toast({
            title: "Error!",
            description: `${error}`,
            status: "error",
            duration: 3000,
            isClosable: true,
          });

          console.log(error.message);
        },
      });
    }
  };

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
              isInvalid={
                formik.touched.imageUrl && Boolean(formik.errors.imageUrl)
              }
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
              {formik.touched.imageUrl && formik.errors.imageUrl && (
                <Text color="red" fontSize="sm">
                  {formik.errors.imageUrl}
                </Text>
              )}
            </FormControl>
          </Box>

          <Box>
            <FormControl
              isInvalid={Boolean(formik.errors.amount) && formik.touched.amount}
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
              {formik.touched.amount && formik.errors.amount && (
                <Text color="red" fontSize="sm">
                  {formik.errors.amount}
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
