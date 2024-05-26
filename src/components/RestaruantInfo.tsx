import { Restaurant } from "@/Types/types"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Dot } from "lucide-react";

type Props = {
    restaurant: Restaurant;
}

const RestaruantInfo = ({restaurant}: Props) => {
    return (
        <Card className="border-red-500">
            <CardHeader>
                <CardTitle className="text-3xl font-bold tracking-tight">
                    {restaurant.restaurantName}
                </CardTitle>
                <CardDescription>
                    {restaurant.city},{restaurant.country}
                </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap">
                {restaurant.cuisines.map((item,index) => (
                    <span className="flex">
                        <span>{item}</span>
                        {index < restaurant.cuisines.length - 1 && <Dot />}
                    </span>
                ))}
            </CardContent>
        </Card>
    )
}

export default RestaruantInfo;