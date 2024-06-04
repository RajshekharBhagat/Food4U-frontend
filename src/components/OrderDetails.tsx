import { Order } from "@/Types/types"
import { Separator } from "./ui/separator";

type Props = {
    orders: Order;
};

const OrderDetail = ({orders}: Props) => {
    return (
        <div className="space-y-3">
                <div className="flex flex-col">
                    <span className="font-semibold">Delivery to:</span>
                    <span>{orders.deliveryDetails.name}</span>
                    <span>{orders.deliveryDetails.addressLine1}, {orders.deliveryDetails.city}</span>
                </div>
                <div className="flex flex-col">
                    <span className="font-semibold">
                        Your Order
                    </span>
                    <ul>
                        {orders.cartItem.map((item) => (
                            <li>
                                {item.name} x {item.quantity}
                            </li>
                        ))}
                    </ul>
                </div>
                <Separator />
                <div className="flex flex-col">
                    <span className="font-semibold">Total</span>
                    <span>Rs {orders.totalAmount}</span>
                </div>

        </div>
    )
}

export default OrderDetail;