import { ChakraProvider, theme } from "@chakra-ui/react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignUp from "./Components/pages/Authentication/SignUp";
import Login from "./Components/pages/Authentication/Login";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./Components/pages/Home/Home";
import CreateArtworkForm from "./Components/pages/Artworks/CreateArtwork";
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import ListArtworks from "./Components/pages/Artworks/ListArtworks";

const queryClient = new QueryClient();

export const App = () => (
  <QueryClientProvider client={queryClient}>
    <ChakraProvider theme={theme}>
      <Router>
        < Home isAdmin={false}/>
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/create-artwork" element={<CreateArtworkForm />} />
          <Route path="/" element={<Home isAdmin={true}/>} />
          <Route path="/list-artworks" element={<ListArtworks />} />
        </Routes>
      </Router>
    </ChakraProvider>
  </QueryClientProvider>
);
