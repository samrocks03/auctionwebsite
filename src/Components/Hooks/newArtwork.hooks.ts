import { useQuery } from "@tanstack/react-query";
import { ARTWORKS_API } from "../../ENDPOINTS";
import axios from "axios";

export const useGetArtworks = () => {
    // const { isLoading, error, data } = useQuery({
    // queryKey: ['artworks', localStorage.getItem("authenticationToken")],

    //     queryFn: () => {
    //         // const authenticationToken = localStorage.getItem("authenticationToken");
    //         // const authToken = authenticationToken ? authenticationToken[0] : null;
    //         axios.get(ARTWORKS_API).then(res => console.log(res));
    //     }

    // })

    // return {
    //     artWorksData: data,
    //     isArtWorkLoading: isLoading,
    //     isArtWorkError: error
    // }

    // const authToken = localStorage.getItem("authenticationToken"); // Retrieve authentication token from localStorage
    // const tokenStr = localStorage.getItem('authenticationToken');
    const { isLoading, error, data } = useQuery({
        queryKey: ['artworks'],
        queryFn: () => axios.get(ARTWORKS_API, { withCredentials: true })
        // queryFn: () => axios.get(ARTWORKS_API, { withCredentials: true })
        // queryFn: async () => {
        //     try {
        //         const res = await fetch(`${ ARTWORKS_API }`, {
        //             credentials: "include",
        //         })
        //         const res2 = await res.json();
        //         console.log("this is our get result: ", res2);
        //     } catch (error) {
        //         console.log('Fetch Error: ', error)
        //     }
    })
    return {
        artWorksData: data,
        isArtWorkLoading: isLoading,
        isArtWorkError: error
    };
}