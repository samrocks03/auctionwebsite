/* eslint-disable @typescript-eslint/no-unused-vars */

import { useQuery, useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { ARTWORKS_API, SIGNUP_API, LOGIN_API } from "../../ENDPOINTS";
import { toast } from "react-toastify";
import { IPostLogin, IPostSignUp } from "../../Types/authentication.types";
// import { position } from "@chakra-ui/react";

export const useSignUpAccount = () => {
    //const [cookies, setCookie] = useCookies(['accessToken']);
    const { mutate, isError, isPending } = useMutation({
        mutationKey: ['signUpAccount'],
        mutationFn: (payload: IPostSignUp) => axios.post(SIGNUP_API, payload, { withCredentials: true }),

        onSuccess: (data) => {
            toast.success("Logged in successfully ", { position: "top-right" })
            const authenticationToken = data.data["auth-token"];
            // storage.setToken(authenticationToken);
        },

        onError: (error: AxiosError) => {
            const err = (error.response?.data as { error_msg: string })?.error_msg;
            toast.error(`${err}`, { position: "top-right" });
        }
    })
    return {
        signUpMutation: mutate,
        isSignUpError: isError,
        isSignUpPending: isPending
    }
}

export const useSignInAccount = () => {
    //const [cookies, setCookie] = useCookies(['accessToken']);
    const { mutate, isError, isPending } = useMutation({
        mutationKey: ['signInAccount'],

        mutationFn: (payload: IPostLogin) => axios.post(LOGIN_API, payload, {
            withCredentials: true, // Enable sending credentials (like cookies) with the request
        }),

        onSuccess: (data) => {
            console.log(data)
            // const authToken = data.data["auth-token"];
            // console.log(authToken)

            const authenticationToken = data.data["auth-token"];
            // storage.setToken(authenticationToken);

            //localStorage.setItem("authenticationToken", authToken);
            //setCookie('accessToken', authToken);
            // setCookie('accessToken', authenticationToken);
            // console.log("heluuu ---- ", authenticationToken)
        },
        // console.log("Response Headers:", data.data["auth-token"]);

        onError: (error: AxiosError) => {
            const err = (error.response?.data as { error_msg: string })?.error_msg;
            toast.error(`${err}`, { position: "top-right" });
        }
    })
    return {
        signInMutation: mutate,
        isSignInError: isError,
        isSignInPending: isPending
    }
}