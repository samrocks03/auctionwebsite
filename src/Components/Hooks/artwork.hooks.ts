import { useQuery, useMutation } from "@tanstack/react-query";
import { ARTWORKS_API, DELETE_BID_API, POST_ARTWORKS_API, POST_BID_API } from "../../ENDPOINTS";
import axios, { AxiosError } from "axios";
import { IBid, ICreateArtwork } from "../../Types/authentication.types";
import { useToast } from "@chakra-ui/react";

export const useGetArtworks = () => {
    const { isLoading, error, data, refetch } = useQuery({
        queryKey: ['artworks'],
        queryFn: () => axios.get(ARTWORKS_API, { withCredentials: true }),
    })
    return {
        artWorksData: data,
        isArtWorkLoading: isLoading,
        isArtWorkError: error,
        refetchArtworks: refetch
    };
}

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
                duration: 3000,
                isClosable: true,
            });
        },
        onError: (error: AxiosError) => {
            const err = (error.response?.data as { error_msg: string })?.error_msg;
            toast({
                title: "Error!",
                description: `${err}`,
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
    const { mutate, isSuccess, isPending } = useMutation({
        mutationFn: (id: string) => {
            return axios.delete(`${DELETE_BID_API}/${id}`, { withCredentials: true })
        },
        onSuccess: () => {
            // refetchTodos()
        },
    })
    return {
        deleteArtwork: mutate,
        isdeleteSuccess: isSuccess,
        isDeletePending: isPending
    }
}