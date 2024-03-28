/* eslint-disable @typescript-eslint/no-unused-vars */

import { useQuery, useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { ARTWORKS_API, SIGNUP_API, LOGIN_API } from "../../ENDPOINTS";
import { toast } from "react-toastify";
import { IPostLogin, IPostSignUp } from "../../Types/authentication.types";
import { position } from "@chakra-ui/react";
import { useCookies } from "react-cookie";



export const useSignUpAccount = () => {
    //const [cookies, setCookie] = useCookies(['accessToken']);

    const { mutate, isError, isPending } = useMutation({
        mutationKey: ['signUpAccount'],
        mutationFn: (payload: IPostSignUp) => axios.post(SIGNUP_API, payload),

        onSuccess: (data) => {

            console.log(data)
            toast.success("Logged in successfully ", { position: "top-right" })

            // const authenticationToken = data.data.Token;
            // localStorage.setItem("authenticationToken", authenticationToken);
            // console.log("Token is: ", JSON.stringify(authenticationToken));
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
    const [cookies, setCookie] = useCookies(['accessToken']);

    const { mutate, isError, isPending } = useMutation({
        mutationKey: ['signInAccount'],

        mutationFn: (payload: IPostLogin) => axios.post(LOGIN_API, payload),
        // mutationFn: (payload: IPostLogin) => axios.post(LOGIN_API, payload),

        onSuccess: (data) => {
            console.log(data)
            const authToken = data.data["auth-token"];
            console.log(authToken)
            //localStorage.setItem("authenticationToken", authToken);
            //setCookie('accessToken', authToken);
            setCookie('accessToken', authToken);


            console.log(authToken)
        },
        // const expiryTime = new Date().getTime() + (3.6e+6);
        // localStorage.setItem('authTokenExpiry',expiryTime.toString());
        // console.log(`Token is set in localstorage: ${authToken}`);
        // console.log(`Token expiry: ${new Date(expiryTime)}`)


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