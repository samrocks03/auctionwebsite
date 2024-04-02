import { useQuery, useMutation } from "@tanstack/react-query";
import { ARTWORKS_API, DELETE_BID_API, FILTER_API, POST_ARTWORKS_API, POST_BID_API } from "../../ENDPOINTS";
import axios, { AxiosError } from "axios";
import { IBid, ICreateArtwork } from "../../Types/authentication.types";
import { useToast } from "@chakra-ui/react";


export interface IParams {
    start: number;
    count: number;
    category?: string;
}

export const useGetArtworks = (params: IParams) => {
    const { isLoading, error, data, refetch } = useQuery({
        queryKey: ['artworks', params],
        queryFn: () => axios.get(`${ARTWORKS_API}`, { params, withCredentials: true }),

    });
    return {
        artWorksData: data?.data,
        totalCount: data?.data["totalCount"],
        isArtWorkLoading: isLoading,
        isArtWorkError: error,
        refetchArtworks: refetch
    };
};


// export const useFilterPagination = (params: IParams) => {
//     const { isLoading, error, data, refetch } = useQuery({
//         queryKey: ['pagination', params],
//         queryFn: () => axios.get(`${FILTER_API}`, { params, withCredentials: true }),
//     });
//     return {
//         paginatedData: data,
//         isPaginatedLoading: isLoading,
//         isPaginatedError: error,
//         refetchPaginatedData: refetch
//     };
// };




export const usePostArtworks = () => {
    const toast = useToast();
    console.log("in post artworks--->");


    const { mutate, isError, isPending } = useMutation({
        mutationKey: ['postArtworks'],
        mutationFn: (payload: ICreateArtwork) => {
            console.log("---------------- In mutation function  ----------------")
            return axios.post(POST_ARTWORKS_API, payload, { withCredentials: true })
        },
        onSuccess: (data) => {
            toast({
                title: "Artwork created!",
                description: "Your artwork has been created!",
                position: "top-right",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
            console.log(data)
        },
        onError: (error: AxiosError) => {
            const err = (error.response?.data as { error_msg: string })?.error_msg;
            toast({
                title: "Error!",
                description: `${err}`,
                position: "top-right",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
    });

    return {
        postArtworksMutation: mutate,
        isPostArtworksError: isError,
        isPostArtworksPending: isPending
    }
}


export const usePostBid = () => {
    const toast = useToast();
    const { mutate, isError, isPending, isSuccess } = useMutation({
        mutationKey: ['postBid'],
        mutationFn: (payload: IBid) => axios.post(POST_BID_API, payload, { withCredentials: true }),
        onSuccess: (data) => {
            toast({
                title: "Bid created !",
                description: "Your bid has been created successfully!",
                status: "success",
                position: "top-right",
                duration: 3000,
                isClosable: true,
            });
        },
        onError: (error: AxiosError) => {
            const err = (error.response?.data as { error_msg: string })?.error_msg;
            toast({
                title: "Error!",
                description: `${err}`,
                position: "top-right",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }

    });

    return {
        postBidMutation: mutate,
        isPostBidError: isError,
        isPostBidPending: isPending,
        isPostBidSuccess: isSuccess
    }
}

export const useDeleteArtwork = () => {
    // const { refetchTodos } = useFetch({ _page: 1, _limit: 5 })
    const toast = useToast();
    const { mutate, isSuccess, isPending } = useMutation({
        mutationFn: (id: string) => {
            return axios.delete(`${DELETE_BID_API}/${id}`, { withCredentials: true })
        },
        onSuccess: () => {
            // refetchTodos()
            toast({
                title: "Artwork deleted !",
                description: "Your artwork has been deleted successfully!",
                status: "success",
                position: "top-right",
                duration: 3000,
                isClosable: true,
            });
        },
    })
    return {
        deleteArtwork: mutate,
        isdeleteSuccess: isSuccess,
        isDeletePending: isPending
    }
}
