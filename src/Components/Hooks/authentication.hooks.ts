/* eslint-disable @typescript-eslint/no-unused-vars */

import { useQuery, useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { ARTWORKS_API, SIGNUP_API, LOGIN_API } from "../../ENDPOINTS";
import { Toast } from "@chakra-ui/react";
import { IPostLogin, IPostSignUp } from "../../Types/authentication.types";

// export const useGetArtworks = () => {
//     const { isLoading, error, data } = useQuery({
//         queryKey: ['artworks'],
//         queryFn: () => axios.get(ARTWORKS_API).then(res => res)
//     })

//     return {
//         artWorksData: data,
//         isArtWorkLoading: isLoading,
//         isArtWorkError: error
//     }
// }


export const useSignUpAccount = () => {
    const { mutate, isError, isPending } = useMutation({
        mutationKey: ['signUpAccount'],
        mutationFn: (payload: IPostSignUp) => axios.post(SIGNUP_API, payload),

        onSuccess: (data) => {
            // const authenticationToken = data.data.Token;s
            // localStorage.setItem("authenticationToken", authenticationToken);
            // console.log("Token is: ", JSON.stringify(authenticationToken));
        },

        onError: (error: AxiosError) => {
            console.log(error.response?.data);
            Toast({
                title: "Error",
                description: `${error.response?.data}`,
                status: "error",
                duration: 1200,
                isClosable: true,
            });
        }
    })

    return {
        signUpMutation: mutate,
        isSignUpError: isError,
        isSignUpPending: isPending
    }
}



export const useSignInAccount = () => {
    const { mutate, isError, isPending } = useMutation({
        mutationKey: ['signInAccount'],

        mutationFn: (payload: IPostLogin) => axios.post(LOGIN_API, payload),

        onSuccess: (data) => {
            // const authenticationToken = data.data["auth-token"];
            // console.log(authenticationToken)
            // localStorage.setItem("authenticationToken", authenticationToken);
            // console.log("Token is: ", authenticationToken);
        },

        onError: (error: AxiosError) => {
            console.log(error.response?.data);
            Toast({
                title: "Error",
                description: `${error.response?.data}`,
                status: "error",
                duration: 1200,
                isClosable: true,
            });
        }
    })
    return {
        signInMutation: mutate,
        isSignInError: isError,
        isSignInPending: isPending
    }
}