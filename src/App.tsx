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
import Protected from "./Protected";
// import { useEffect } from "react";
// import Protected from "./protected"; // Import the Protected component
const queryClient = new QueryClient();

// const navigate = useNavigate();
export const App = () => (
  <div>
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <Router>
          <Routes>
            <Route path="/signup" element={<SignUp />} />

            <Route path="/login" element={<Login />} />

            {/* Use Protected component for routes that require authentication */}
            <Route
              path="/"
              element={
                <Protected>
                  <Home />
                </Protected>
              }
            >
              <Route
                path="/users"
                element={
                  <Protected>
                    <Users />
                  </Protected>
                }
              />
              <Route
                path="/create-artworks"
                element={
                  <Protected>
                    <CreateArtworkForm />
                  </Protected>
                }
              />
              <Route
                path="/list-artworks"
                element={
                  <Protected>
                    <ListArtworks
                      artworkData={artworkData as unknown as Artwork[]}
                    />
                  </Protected>
                }
              />
            </Route>
          </Routes>
        </Router>
      </ChakraProvider>
    </QueryClientProvider>
  </div>
);

export default App;
