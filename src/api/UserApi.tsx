import { User } from "@/Types/types";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

type CreateUserRequestType = {
    auth0Id: String;
    email: String;
}
export const useCreateUser = () => {
    const { getAccessTokenSilently } = useAuth0();
    const createUserRequest = async (user: CreateUserRequestType) => {
        const accessToken = await getAccessTokenSilently();
        if(!accessToken) {
            throw new Error('Access Token Not found')
        }
        const response = await fetch(`${API_BASE_URL}/api/v1/user/register`,{
            method: "POST",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        });

        if(!response.ok) {
            const errorResponse = await response.text();
            throw new Error(`Failed to create User: ${errorResponse}`);
        }
    };
    
    const {
        mutateAsync: createUser,
        isLoading,
        isError,
        isSuccess,
    } = useMutation(createUserRequest);

    return {
        createUser,
        isLoading,
        isError,
        isSuccess,
    };
};




type updateUserRequestType = {
    username:string,
    addressLine1: string,
    city: string,
    country: string,
}
export const useUpdateUser = () => {

    const {getAccessTokenSilently} = useAuth0();

    const updateUserRequest = async (formData : updateUserRequestType) => {

        const accessToken = await getAccessTokenSilently();
        
        if(!accessToken) {
            throw new Error("Unauthorized Request");
        }

        const response = await fetch(`${API_BASE_URL}/api/v1/user/updateCurrentUser`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });

        if(!response.ok) {
            const errorMessage = await response.text();
            throw new Error(`Failed to update user: ${errorMessage}`);
        }
    };

    const {
        mutateAsync: updateUser,
        isLoading,
    } = useMutation(updateUserRequest);
    
    return {
        updateUser,
        isLoading,
    }
}



export const useGetUser = () => {

    const {getAccessTokenSilently} = useAuth0();
    
    const getUserRequest = async(): Promise<User> => {
        
        const accessToken = await getAccessTokenSilently();

        if(!accessToken) {
            throw new Error('Unauthorized Request')
        }

        const response = await fetch(`${API_BASE_URL}/api/v1/user/getCurrentUser`,{
            method:"GET",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            }
        });

        if(!response.ok) {
            throw new Error('Failed to Fetch User')
        }

        return response.json();
    };
    const { data: currentUser, isLoading, error } = useQuery('getUser', getUserRequest);

    if(error) {
        toast.error(error.toString());
    }
    return {currentUser,isLoading}
};