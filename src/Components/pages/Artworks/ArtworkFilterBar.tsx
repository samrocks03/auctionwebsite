import React, { useState } from "react";
import { Flex, Input, Select, Button, Box } from "@chakra-ui/react";

const ArtworkFilterBar = ({
  onSearch,
  onSort,
  onFilter,
}: {
  onSearch: Function;
  onSort: Function;
  onFilter: Function;
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  const handleSortChange = (e: any) => {
    const option = e.target.value;
    setSortOption(option);
    onSort(option);
  };

  const handleFilterChange = (e: any) => {
    const category = e.target.value;
    setCategoryFilter(category);
    onFilter(category);
  };

  return (
    <Box mb={4} px={40}>
      <Flex
        align="center"
        justify="center"
        flexWrap={{ base: "wrap", md: "nowrap" }}
      >
        <Input
          placeholder="Search by name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          flex={{ base: "100%", md: "auto" }}
          mb={{ base: 4, md: 0 }}
        />
        <Button
          colorScheme="blue"
          borderRadius="md"
          _hover={{ bg: "#000000" }}
          px={8}
          onClick={handleSearch}
          ml={{ base: 0, md: 4 }}
          flex={{ base: "100%", md: "auto" }}
        >
          Search
        </Button>
        <Select
          placeholder="Sort by"
          value={sortOption}
          onChange={handleSortChange}
          ml={{ base: 0, md: 4 }}
          flex={{ base: "100%", md: "auto" }}
          mb={{ base: 4, md: 0 }}
        >
          <option value="starting_price">Starting Price</option>
          <option value="highest_bid">Highest Bid</option>
        </Select>
        <Select
          placeholder="Filter by category"
          value={categoryFilter}
          onChange={handleFilterChange}
          ml={{ base: 0, md: 4 }}
          flex={{ base: "100%", md: "auto" }}
          mb={{ base: 4, md: 0 }}
        >
          <option value="Pencil_Art">Pencil Art</option>
          <option value="Canvas_Painting">Canvas Painting</option>
          {/* Add other category options as needed */}
        </Select>
      </Flex>
    </Box>
  );
};

export default ArtworkFilterBar;
