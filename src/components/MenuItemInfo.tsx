import { Menu } from "@/Types/types"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

type Props = {
    addToCart: () => void;
    menuItem: Menu;
}

const MenuItemInfo = ({menuItem, addToCart}: Props) => {

    return (
        <Card className='cursor-pointer' onClick={addToCart}>
            <CardHeader>
                <CardTitle>
                    {menuItem.name}
                </CardTitle>
            </CardHeader>
            <CardContent>
                Rs {menuItem.price}
            </CardContent>
        </Card>
    )

}

export default MenuItemInfo;