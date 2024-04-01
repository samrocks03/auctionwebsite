import { Box, Spinner } from "@chakra-ui/react";

export const SpinnerBro = () => {
  return (
    <Box h="100vh" display="flex" alignItems="center" justifyContent="center">
      <Spinner size="xl" />
    </Box>
  );
};
