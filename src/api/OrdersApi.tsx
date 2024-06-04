import { Order } from "@/Types/types";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "react-query";
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
    name: string;
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

export const useGetOrder = () => {
  const { getAccessTokenSilently } = useAuth0();
  const getOrderRequest = async (): Promise<Order[]> => {
    const accessToken = await getAccessTokenSilently();
    const response = await fetch(`${API_BASE_URL}/api/v1/orders/getOrders`,{
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (!response.ok) {
      const errorResponse = await response.text();
      throw new Error(`Failed to get orders ${errorResponse}`);
    }
    return response.json();
  };

  const { data: orders, isLoading } = useQuery(
    "fetchGetOrders",
    getOrderRequest
  );

  return { orders, isLoading };
};

type UpdateOrderStatus = {
  orderId: string,
  status: string,
}

export const useUpdateOrderStatus = () => {
  const {getAccessTokenSilently} = useAuth0();
  const updateOrderStatusRequest = async(updateOrderStatus:UpdateOrderStatus) => {
    const accessToken = await getAccessTokenSilently();
    const response = await fetch(`${API_BASE_URL}/api/v1/orders/${updateOrderStatus.orderId}/status`,{
      method:"PATCH",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({status: updateOrderStatus.status})
    });

    if(!response.ok) {
      const errorResponse = await response.text;
      throw new Error(`Failed to update status: ${errorResponse}`)
    }
  }

  const {
    mutate: updateOrderStatus,
    isLoading,
    isError,
    isSuccess,
  } = useMutation(updateOrderStatusRequest);

  if(isError) {
    toast.error('Unable to update Order Status');
  }
  if(isSuccess) {
    toast.success('Order Updated');
  }

  return {
    updateOrderStatus,isLoading
  }
}
