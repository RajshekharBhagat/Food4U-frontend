import { useGetOrder } from "@/api/OrdersApi";
import OrderDetail from "@/components/OrderDetails";
import OrderStatusHeader from "@/components/OrderStatusHeader";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";

const OrderPage = () => {
  const { orders, isLoading } = useGetOrder();

  if (isLoading) {
    return "Orders Loading...";
  }

  if (!orders || orders.length === 0) {
    return "No Orders Found!";
  }

  return (
    <div className="space-y-10">
      {orders.map((order) => (
        <div className="bg-red-50 p-10 rounded-md shadow-md space-y-10">
          <OrderStatusHeader order={order} />
          <div className="grid gap-10 md:grid-cols-2">
            <OrderDetail orders={order} />
            <AspectRatio ratio={16 / 5}>
              <img src={order.restaurant.imageUrl} className="rounded-md object-cover h-full w-full" />
            </AspectRatio>
          </div>
        </div>
      ))} 
    </div>
  );
};

export default OrderPage;
