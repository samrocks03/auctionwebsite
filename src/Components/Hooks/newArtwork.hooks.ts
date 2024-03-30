import { useQuery, useMutation } from "@tanstack/react-query";
import { ARTWORKS_API, POST_ARTWORKS_API } from "../../ENDPOINTS";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";
import { ICreateArtwork } from "../../Types/authentication.types";

export const useGetArtworks = () => {
    const { isLoading, error, data } = useQuery({
        queryKey: ['artworks'],
        queryFn: () => axios.get(ARTWORKS_API, { withCredentials: true })
    })
    return {
        artWorksData: data,
        isArtWorkLoading: isLoading,
        isArtWorkError: error
    };
}

export const usePostArtworks = () => {
    const { mutate, isError, isPending } = useMutation({
        mutationKey: ['postArtworks'],
        mutationFn: (payload: ICreateArtwork) => axios.post(POST_ARTWORKS_API, payload, { withCredentials: true }),
        onSuccess: (data) => {
            console.log(data)
        },
        onError: (error: AxiosError) => {
            const err = (error.response?.data as { error_msg: string })?.error_msg;
            toast.error(`${err}`, { position: "top-right" });
        }
    });

    return {
        postArtworksMutation: mutate,
        isPostArtworksError: isError,
        isPostArtworksPending: isPending
    }
}