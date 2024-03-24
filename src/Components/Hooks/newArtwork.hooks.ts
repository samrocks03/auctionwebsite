import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { ARTWORKS_API } from "../../ENDPOINTS";

export const useGetArtworks = () => {
    const { isLoading, error, data } = useQuery({
        queryKey: ['artworks', localStorage.getItem("authenticationToken")],

        queryFn: () => {
            // const authenticationToken = localStorage.getItem("authenticationToken");
            // const authToken = authenticationToken ? authenticationToken[0] : null;
            axios.get(ARTWORKS_API).then(res => console.log(res));
        }

    })

    return {
        artWorksData: data,
        isArtWorkLoading: isLoading,
        isArtWorkError: error
    }
}
