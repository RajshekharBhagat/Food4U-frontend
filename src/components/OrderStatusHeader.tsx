import { Order } from "@/Types/types"
import { Progress } from "./ui/progress";
import { ORDER_STATUS } from "@/config/orderStatusConfig";
type Props = {
    order: Order,
}


const OrderStatusHeader = ({order}: Props) => {
    const getExpectedTime = () => {
        const created = new Date(order.createdAt);
        created.setTime(
            created.getMinutes() + order.restaurant.estimatedDeliveryTime
        )
        const hours = created.getHours();
        const minutes = created.getMinutes();
        const paddedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`
        return `${hours}:${paddedMinutes}`
    }

    const getOrderStatusInfo = () => {
        return ORDER_STATUS.find((o) => o.value === order.status) || ORDER_STATUS[0];
    }

    return (
        <>
            <h1 className="text-2xl font-bold tracking-tighter flex flex-col gap-5 md:flex-row md:justify-between">
                <span>Order Status: {getOrderStatusInfo().label}</span>
                <span>Expacted by: {getExpectedTime()}</span>
            </h1>
            <Progress className="animate-pulse"  value={getOrderStatusInfo().progressValue} />
        </>
    )
}

export default OrderStatusHeader;