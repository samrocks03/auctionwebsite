/* eslint-disable @typescript-eslint/no-unused-vars */

import { useQuery, useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { SHOW_USERS_API } from "../../ENDPOINTS";

export const useGetUsers = () => {
    const { isLoading, error, data } = useQuery({
        queryKey: ['users'],
        queryFn: () => axios.get(SHOW_USERS_API, { withCredentials: true })
    })
    return {
        usersData: data,
        isUsersLoading: isLoading,
        isUsersError: error
    }
}