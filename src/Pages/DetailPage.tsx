import { Menu } from "@/Types/types";
import { useCreateCheckoutSession } from "@/api/OrdersApi";
import { useGetRestaurantWithId } from "@/api/RestaurantUtils.Api";
import CheckOutButton from "@/components/CheckOutButton";
import MenuItemInfo from "@/components/MenuItemInfo";
import OrderSummary from "@/components/OrderSummary";
import RestaruantInfo from "@/components/RestaruantInfo";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card, CardFooter } from "@/components/ui/card";
import { UserFormDate } from "@/forms/user-profile-form/UserProfileForm";
import { useState } from "react";
import { useParams } from "react-router-dom";

export type CartItem = {
  _id: string;
  name: string;
  price: number;
  quantity: number;
};

const DetailPage = () => {
  const { restaurantId } = useParams();
  const { restaurant, isLoading } = useGetRestaurantWithId(restaurantId);
  const { createCheckoutSession, isLoading: isCreateSessionLoading } =
    useCreateCheckoutSession();

  const [cartItem, setCartItem] = useState<CartItem[]>(() => {
    const storedCartItem = sessionStorage.getItem(`cartItem-${restaurantId}`);
    return storedCartItem ? JSON.parse(storedCartItem) : [];
  });

  const onCheckOut = async (userFormData: UserFormDate) => {
    if (!restaurant) {
      return;
    }
    const checkOutData = {
      cartItem: cartItem.map((cartItem) => ({
        menuId: cartItem._id,
        name: cartItem.name,
        quantity: cartItem.quantity.toString(),
      })),
      restaurantId: restaurant._id,
      deliveryDetails: {
        email: userFormData.email as string,
        name: userFormData.username,
        addressLine1: userFormData.addressLine1,
        city: userFormData.city,
      },
    };
    const data = await createCheckoutSession(checkOutData);
    window.location.href = data.url;
  };

  const addToCart = (menuItem: Menu) => {
    setCartItem((prevCartItem) => {
      const existringCartItem = prevCartItem.find(
        (cartItem) => cartItem._id === menuItem._id
      );
      let updatedCartItem;
      if (existringCartItem) {
        updatedCartItem = prevCartItem.map((cartItem) =>
          cartItem._id === menuItem._id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        updatedCartItem = [
          ...prevCartItem,
          {
            _id: menuItem._id,
            name: menuItem.name,
            price: menuItem.price,
            quantity: 1,
          },
        ];
      }

      sessionStorage.setItem(
        `cartItem-${restaurantId}`,
        JSON.stringify(updatedCartItem)
      );
      return updatedCartItem;
    });
  };

  const removeFromCart = (cartItem: CartItem) => {
    setCartItem((precCartItem) => {
      const updatedCartItem = precCartItem.filter(
        (item) => cartItem._id !== item._id
      );
      return updatedCartItem;
    });
  };

  if (isLoading || !restaurant) {
    return "Loading...";
  }

  return (
    <div className="flex flex-col gap-10">
      <AspectRatio ratio={16 / 5}>
        <img
          src={restaurant.imageUrl}
          className="rounded-md object-cover h-full w-full"
        />
      </AspectRatio>
      <div className="grid md:grid-cols-[4fr_3fr] gap-5 md:px-10">
        <div className="flex flex-col gap-4">
          <RestaruantInfo restaurant={restaurant} />
          <span className="text-xl font-semibold tracking-tighter">Menu</span>
          {restaurant.menu.map((menuItem) => (
            <MenuItemInfo
              addToCart={() => addToCart(menuItem)}
              menuItem={menuItem}
            />
          ))}
        </div>
        <div>
          <Card>
            <OrderSummary
              removeFromCart={removeFromCart}
              cartItems={cartItem}
              restaurant={restaurant}
            />
            <CardFooter>
              <CheckOutButton
                disabled={cartItem.length === 0}
                onCheckOut={onCheckOut}
                isLoading={isCreateSessionLoading}
              />
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
