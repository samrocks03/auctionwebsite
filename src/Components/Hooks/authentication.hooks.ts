/* eslint-disable @typescript-eslint/no-unused-vars */

import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { ARTWORKS_API, SIGNUP_API, LOGIN_API, LOGOUT_API } from "../../ENDPOINTS";
import { toast } from "react-toastify";
import { IPostLogin, IPostSignUp } from "../../Types/authentication.types";
import { useToast } from "@chakra-ui/react";


export const useSignUpAccount = () => {
    const { mutate, isError, isPending } = useMutation({
        mutationKey: ['signUpAccount'],
        mutationFn: (payload: IPostSignUp) => axios.post(SIGNUP_API, payload, { withCredentials: true }),
        onSuccess: (data) => {
            // console.log("This is new dataaaaaaaaaa--> ",data)
            // const { role_id, id, }
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
    const { mutate, isError, isPending } = useMutation({
        mutationKey: ['signInAccount'],
        mutationFn: (payload: IPostLogin) => axios.post(LOGIN_API, payload, {
            withCredentials: true, // Enable sending credentials (like cookies) with the request
        }),
        onSuccess: (data) => {
            const { role, token, userId } = data.data;
            localStorage.setItem('userRole', role);
            localStorage.setItem('userId', userId);
            localStorage.setItem('token', token);
            console.log("User role stored in localStorage:", role, userId);

            console.log("data-->", data.data);
        },
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

export const useLogOutHook = () => {
    const toast = useToast();
    const { mutate, isError, isPending, isSuccess } = useMutation({
        mutationKey: ['signOutAccount'],
        mutationFn: () => axios.post(LOGOUT_API, {}, { withCredentials: true }),
        onSuccess: () => {
            console.log("User role removed from localStorage:", localStorage.getItem('userRole'));
            console.log("User id removed from localStorage:", localStorage.getItem('userId'));
            console.log("Token removed from localStorage:", localStorage.getItem('token'));

            localStorage.removeItem('userRole');
            localStorage.removeItem('userId');
            localStorage.removeItem('token');

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
        signOutMutation: mutate,
        isSignOutError: isError,
        isSignOutPending: isPending,
        isSuccess
    }
}