import { Order, Restaurant } from "@/Types/types";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "react-query";
import { toast } from 'sonner'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useCreateRestaurant = () => {

    const {getAccessTokenSilently} = useAuth0();

    const createRestaurantRequest = async(restaurantFormData:FormData): Promise<Restaurant> => {

        const accessToken = await getAccessTokenSilently();

        if(!accessToken) {
            throw new Error('Unauthourized Request');
        }

        const response = await fetch(`${API_BASE_URL}/api/v1/restaurant/createRestaurant`,{
            method: 'POST',
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            body: restaurantFormData,
        })

        if(!response.ok) {
            const errorResponse = await response.text();
            throw new Error(`Failed to create Restaurant: ${errorResponse}`);
        }

        return response.json();
    }

    const { 
        mutate: createRestaurant,
        isLoading,
        isSuccess,
        isError,
     } = useMutation(createRestaurantRequest);

     if(isSuccess) {
        toast.message('Restaurant Created Successfully')
     }
     if(isError) {
        toast.error('Unable to Update Restaurant');
     }
     return {createRestaurant, isLoading};
}

export const useGetRestaurant = () => {

    const { getAccessTokenSilently } = useAuth0();

    const getRestaurantRequest = async () : Promise<Restaurant> => {
        
        const accessToken = await getAccessTokenSilently();

        const response = await fetch(`${API_BASE_URL}/api/v1/restaurant/getRestaurant`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });

        if(!response.ok) {
            const errorResponse = await response.text();;
            throw new Error(`Failed to get Restaurant: ${errorResponse}`)
        }

        return response.json();
    }

    const {
        data: restaurant,
        isLoading,
    } = useQuery('getRestaurant',getRestaurantRequest);

    return {
        restaurant,
        isLoading,
    }
}

export const useUpdateRestaurant = () => {

    const { getAccessTokenSilently } = useAuth0();

    const updateRestaurantRequest = async (restaurantFormData: FormData) => {

        const accessToken = await getAccessTokenSilently();

        const response = await fetch(`${API_BASE_URL}/api/v1/restaurant/updateRestaurant`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${accessToken}`
            },
            body: restaurantFormData
        });

        if(!response.ok) {
            const errorResponse = await response.text();
            throw new Error(`Failed to update restaurant ${errorResponse}`)
        }

    };

    const {
        mutate: updateRestaurant,
        isLoading,
        error,
        isSuccess
    } = useMutation(updateRestaurantRequest);

    if(isSuccess) {
        toast.success('Restaurant Updated');
    }
    if(error) {
        toast.error('Unable to update Restaurant');
    }

    return {
        updateRestaurant,
        isLoading,
    }

}

export const useGetRestaurantOrder = () => {
    const {getAccessTokenSilently} = useAuth0();
    const getRestaurantOrderRequest = async():Promise<Order[]> => {
        const accessToken = await getAccessTokenSilently();
        const response = await fetch(`${API_BASE_URL}/api/v1/restaurant/getRestaurantOrder`,{
            method: "GET",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type':'application/json'
            },
        });
        if(!response.ok) {
            throw new Error('Error in fetching restaurant order');
        };
        return response.json();
    }

    const {
        data: orders,
        isLoading,
    } = useQuery('getRestaurantOrder',getRestaurantOrderRequest);

    return {
        orders, isLoading,
    }
}