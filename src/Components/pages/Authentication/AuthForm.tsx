import { Link } from "react-router-dom";
import { useFormik } from "formik";
import {
  FormControl,
  FormLabel,
  Button,
  Flex,
  Image,
  Input,
  Text,
  SlideFade,
} from "@chakra-ui/react";
import { AuthFormProps } from "../../../Types/authentication.types";

const AuthForm = ({
  initialValues,
  validationSchema,
  onSubmit,
  formType,
}: AuthFormProps) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <Flex
      align="center"
      justify="center"
      bg="gray.200"
      mb="3"
      mt="3"
      p="6"
      mx="16"
      borderRadius="20"
    >
      <SlideFade in={true} offsetY="20px">
        <Flex>
          <Image
            src="https://economictimes.indiatimes.com/thumb/msid-67343328,width-1200,height-900,resizemode-4,imgsize-696361/art-auction.jpg"
            alt="Auction webSite"
            w="60%"
            roundedTop="5"
            p="3"
            roundedRight={{ base: "0", lg: "0" }}
            roundedBottom={{ base: "5", lg: "5" }}
            borderRadius="20"
          />

          <Flex direction="column" w="50%" pl={{ base: "0", lg: "5" }}>
            <form onSubmit={formik.handleSubmit}>
              {formType === "signup" && (
                <>
                  <FormControl
                    id="firstName"
                    mb={4}
                    isInvalid={
                      formik.touched.firstName &&
                      Boolean(formik.errors.firstName)
                    }
                  >
                    <FormLabel>First Name</FormLabel>
                    <Input
                      type="text"
                      name="firstName"
                      placeholder="Enter your first name"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.firstName}
                    />
                    {formik.touched.firstName && formik.errors.firstName && (
                      <Text color="red" fontSize="sm">
                        {formik.errors.firstName}
                      </Text>
                    )}
                  </FormControl>

                  <FormControl
                    id="lastName"
                    mb={4}
                    isInvalid={
                      formik.touched.lastName && Boolean(formik.errors.lastName)
                    }
                  >
                    <FormLabel>Last Name</FormLabel>
                    <Input
                      type="text"
                      name="lastName"
                      placeholder="Enter your last name"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.lastName}
                    />
                    {formik.touched.lastName && formik.errors.lastName && (
                      <Text color="red" fontSize="sm">
                        {formik.errors.lastName}
                      </Text>
                    )}
                  </FormControl>
                </>
              )}

              <FormControl
                id="email"
                mb={4}
                isInvalid={formik.touched.email && Boolean(formik.errors.email)}
              >
                <FormLabel>Email address</FormLabel>
                <Input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                />
                {formik.touched.email && formik.errors.email && (
                  <Text color="red" fontSize="sm">
                    {formik.errors.email}
                  </Text>
                )}
              </FormControl>

              <FormControl
                id="password"
                mb={4}
                isInvalid={
                  formik.touched.password && Boolean(formik.errors.password)
                }
              >
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                />
                {formik.touched.password && formik.errors.password && (
                  <Text color="red" fontSize="sm">
                    {formik.errors.password}
                  </Text>
                )}
              </FormControl>

              <Button
                type="submit"
                colorScheme="blue"
                w="100%"
                _hover={{ bg: "blue.600" }}
                _focus={{ bg: "blue.600" }}
              >
                {formType === "signup" ? "Sign Up" : "Login"}
              </Button>
            </form>

            <Text mt={4}>
              {formType === "signup" ? (
                <>
                  Already have an account?{" "}
                  <Link to="/login" style={{ color: "blue" }}>
                    Login
                  </Link>
                </>
              ) : (
                <>
                  Don't have an account?{" "}
                  <Link to="/signup" style={{ color: "blue" }}>
                    Register
                  </Link>
                </>
              )}
            </Text>
          </Flex>
        </Flex>
      </SlideFade>
    </Flex>
  );
};

export default AuthForm;
