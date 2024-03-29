import { ChakraProvider, theme } from "@chakra-ui/react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import SignUp from "./Components/pages/Authentication/SignUp";
import Login from "./Components/pages/Authentication/Login";
import Home from "./Components/pages/Home/Home";

import CreateArtworkForm from "./Components/pages/Artworks/CreateArtwork";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ListArtworks from "./Components/pages/Artworks/ListArtworks";
import { artworkData } from "./constants";
import { Artwork } from "./Types/types";
import Users from "./Components/pages/Users/Users";
// import Protected from "./Components/Provider/AuthLayout";
const queryClient = new QueryClient();

export const App = () => (
  <div>
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <Router>
          <Home isAdmin={true} />
          <Routes>
            {/* <Route
            path="/users"
            element={
              <Protected authentication={true}>
              <Users />
              </Protected>
            }
          /> */}
            <Route path="/users" element={<Users />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/create-artwork" element={<CreateArtworkForm />} />
            <Route path="/" element={<div></div>} />
            <Route
              path="/list-artworks"
              element={
                <ListArtworks
                  artworkData={artworkData as unknown as Artwork[]}
                />
              }
            />

            {/* <Route path="/list-artworks" element={<ListArtworks />} /> */}
          </Routes>
        </Router>
      </ChakraProvider>
    </QueryClientProvider>
  </div>
);
