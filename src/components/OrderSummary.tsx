import { CartItem } from "@/Pages/DetailPage";
import { Restaurant } from "@/Types/types";
import { CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { Trash } from "lucide-react";

type Props = {
  restaurant: Restaurant;
  cartItems: CartItem[];
  removeFromCart: (cartItem: CartItem) => void;
};

const OrderSummary = ({ restaurant, cartItems, removeFromCart}: Props) => {

  const getTotalCost = () => {
    const totalPrice = cartItems.reduce(
      (total, items) => total + items.price * items.quantity, 0
    );
    const totalWithDeliveryPrice = totalPrice + restaurant.deliveryPrice;
    return totalWithDeliveryPrice;
  };

  return (
    <CardHeader>
      <CardTitle className="flex justify-between tracking-tight font-semibold text-xl">
        <span>Your Order</span>
        <span>Rs {getTotalCost()}</span>
      </CardTitle>
      <CardContent className="flex flex-col gap-5">
        {cartItems.map((item) => (
          <div className="flex justify-between">
            <span>
             <Badge variant='outline' className="mr-2">
                {item.quantity}
             </Badge>
             {item.name}
            </span>
            <div className="flex items-center gap-1">
              <Trash className="cursor-pointer" size={20} color="red" onClick={() =>removeFromCart(item)} />
              <span>
                Rs {item.price * item.quantity}
              </span>
            </div>
          </div>
        ))}
        <Separator className="mt-4 bg-red-500"/>
        <div className="flex justify-between">
          <span>Delivery</span>
          <span>{restaurant.deliveryPrice}</span>
        </div>
        <Separator className="bg-red-500"/>
      </CardContent>
    </CardHeader>
  );
};

export default OrderSummary;
