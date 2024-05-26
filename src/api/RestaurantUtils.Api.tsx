import { SearchState } from "@/Pages/SearchPage";
import { Restaurant, RestaurantSearchRespone } from "@/Types/types";
import { useQuery } from "react-query";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useSearchRestaurant = (
  searchState: SearchState,
  city?: string
) => {
  const createSearchRequest = async (): Promise<RestaurantSearchRespone> => {
    const params = new URLSearchParams();
    params.set("searchQuery", searchState.searchQuery);
    params.set("page", searchState.page.toString());
    params.set("selectedCuisines", searchState.selectedCuisines.join(","));
    params.set("sortOption", searchState.sortOption);

    const response = await fetch(
      `${API_BASE_URL}/api/v1/restaurantUtils/search/${city}?${params.toString()}`
    );

    if (!response.ok) {
      throw new Error("Failed to get restaurant");
    }

    return response.json();
  };

  const { data: results, isLoading } = useQuery(
    ["searchRestaurants", searchState],
    createSearchRequest,
    { enabled: !!city }
  );

  return {
    results,
    isLoading,
  };
};

export const useGetRestaurantWithId = ( restaurantId?: string ) => {
  const getRestaurantWithIdRequest = async (): Promise<Restaurant> => {
    const response = await fetch(
      `${API_BASE_URL}/api/v1/restaurantUtils/details/${restaurantId}`
    );

    if (!response.ok) {
      const errorResponse = await response.text();
      throw new Error(`Failed to found restaurant: ${errorResponse}`);
    }
    return response.json();
  };
  const { data: restaurant, isLoading } = useQuery(
    "getRestaurantWithId",
    getRestaurantWithIdRequest,
    {
        enabled: !!restaurantId,
    }
  );

  return {
    restaurant,
    isLoading,
  }
};
