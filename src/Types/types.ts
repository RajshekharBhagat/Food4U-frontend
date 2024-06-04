export type User = {
    _id: string,
    email: string,
    username: string,
    addressLine1: string,
    city: string,
    country: string,
}

export type Menu = {
    _id: string,
    name: string,
    price: number,
}

export type Restaurant = {
    _id: string,
    user: string,
    restaurantName: string,
    city: string,
    country: string,
    deliveryPrice: number,
    estimatedDeliveryTime: number,
    cuisines: string[],
    menu: Menu[],
    imageUrl:string,
    lastUpdated: string;
}

export type OrderStatus = |'placed'|'paid'|'inProgress'|'outForDelivery'|'delivered';


export type Order = {
    _id: string,
    restaurant: Restaurant,
    user: User,
    cartItem: {
        menuId: string,
        name: string,
        quantity: string,
    }[],
    deliveryDetails: {
        name: string,
        addressLine1: string,
        city: string,
        email: string,
    },
    totalAmount: number,
    status: OrderStatus,
    createdAt: string,
    restaurantId: string;
}

export type RestaurantSearchRespone = {
    data: Restaurant[];
    pagination : {
        total: number,
        page: number,
        pages: number,
    }
}