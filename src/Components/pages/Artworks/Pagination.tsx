import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Select,
  Flex,
  Text,
} from "@chakra-ui/react";

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
  pageSize: number;
}

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  onPageSizeChange,
  pageSize,
}: PaginationProps) => {
  return (
    <Flex justify="center" align="center">
      <Button
        onClick={() => onPageChange(currentPage - 1)}
        hidden={currentPage <= 1}
        mr={2}
      >
        Previous
      </Button>
      
      <Box>

        <Text mr={2}>Page</Text>
        <Select
          value={currentPage}
          onChange={(e) => onPageChange(parseInt(e.target.value))}
        >
          {
            [...Array(totalPages)].map((_, index) => (
            <option key={index + 1} value={index + 1}>
              {index + 1}
            </option>
            ))
          }
        </Select>
        <Text mx={2}>of {totalPages}</Text>
        
      </Box>

      
      <Button
        onClick={() => onPageChange(currentPage + 1)}
        hidden={currentPage === totalPages}
      >
        Next
      </Button>
      <Box ml={4}>
        <FormControl>
          <FormLabel>Items per page:</FormLabel>
          <Select
            value={pageSize}
            onChange={(e) => onPageSizeChange(parseInt(e.target.value))}
          >
            <option value="3">3</option>
            <option value="6">6</option>

            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
          </Select>
        </FormControl>
      </Box>
    </Flex>
  );
};
