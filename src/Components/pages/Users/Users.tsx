import React from "react";
import {
  VStack,
  Box,
  Text,
  Heading,
  Avatar,
  Flex,
  Divider,
  SimpleGrid,
} from "@chakra-ui/react";
// import { usersData } from "../../../constants";
import { useGetUsers } from "../../Hooks/admin.hooks";

const Users = () => {
  const { usersData, isUsersLoading } = useGetUsers();
  console.log(usersData?.data);

  if (isUsersLoading) {
    return <Text>Loading...</Text>;
  }

  return (
    usersData?.data && (
      <VStack spacing={6} alignItems="stretch">
        <Heading as="h1" size="xl" textAlign="center" mb={8}>
          Users
        </Heading>
        <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={6}>
          {usersData?.data.map((user: any) => (
            <Box
              key={user.id}
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
            >
              <Flex borderColor="gray.200" p={4} alignItems="center">
                <Avatar
                  size="md"
                  name={`${user.first_name} ${user.last_name}`}
                />
                <VStack ml={4} alignItems="flex-start">
                  <Text fontWeight="bold">{`${user.first_name} ${user.last_name}`}</Text>
                  <Text>{user.email}</Text>
                </VStack>
              </Flex>
              <Divider />
            </Box>
          ))}
        </SimpleGrid>
      </VStack>
    )
  );
};

export default Users;
