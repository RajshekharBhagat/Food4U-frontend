import { useAuth0 } from "@auth0/auth0-react";
import { useMutation } from "react-query";
import { toast } from "sonner";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

type CheckoutSessionRequest = {
  cartItem: {
    menuId: string;
    name: string;
    quantity: string;
  }[];
  deliveryDetails: {
    email: string;
    username: string;
    addressLine1: string;
    city: string;
  };
  restaurantId: string;
};

export const useCreateCheckoutSession = () => {
  const { getAccessTokenSilently } = useAuth0();
  const createCheckoutSessionRequest = async (
    checkoutSessionRequest: CheckoutSessionRequest
  ) => {
    const accessToken = await getAccessTokenSilently();

    if (!accessToken) {
      throw new Error("Access Token not found");
    }

    const response = await fetch(
      `${API_BASE_URL}/api/v1/orders/checkout/create-checkout-session`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(checkoutSessionRequest),
      }
    );
    if (!response.ok) {
      const errorResponse = await response.text();
      throw new Error(`Error Creating Checkout Session : ${errorResponse}`);
    }
    return response.json();
  };

  const {
    mutateAsync: createCheckoutSession,
    isLoading,
    error,
    reset,
  } = useMutation(createCheckoutSessionRequest);

  if (error) {
    toast.error(error.toString());
    reset();
  }

  return {
    createCheckoutSession,
    isLoading,
  };
};
