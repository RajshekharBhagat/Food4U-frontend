import { useCreateRestaurant, useGetRestaurant, useGetRestaurantOrder, useUpdateRestaurant } from "@/api/RestaurantApi";
import OrderItemCard from "@/components/OrderItemCart";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ManageRestaurantForm from "@/forms/restaurant-form/ManageRestaurantForm";

const ManageRestaurantPage = () => {

  const {createRestaurant,isLoading: isCreateLoading} = useCreateRestaurant();
  const { restaurant} = useGetRestaurant();
  const { updateRestaurant, isLoading: isUpdateLoading} = useUpdateRestaurant();
   const {orders} = useGetRestaurantOrder();
  const isEditing = !!restaurant;

  return (
   <Tabs defaultValue="orders">
      <TabsList>
         <TabsTrigger value="orders">Orders</TabsTrigger>
         <TabsTrigger value="manage-restaurant">Manage Restaurant</TabsTrigger>
      </TabsList>
      <TabsContent value="orders" className="space-y-5 bg-red-50 px-10 rounded-lg py-4">
         <h2 className="text-2xl font-bold">{orders?.length} active orders</h2>
         {orders?.map((order) => (
           <OrderItemCard order={order} />
         ))}
      </TabsContent>
      <TabsContent value="manage-restaurant">
         <ManageRestaurantForm 
            restaurant={restaurant} 
            onSave={
            isEditing ? updateRestaurant : createRestaurant
            } 
            isLoading={
            isCreateLoading || isUpdateLoading 
            }
         />
      </TabsContent>
   </Tabs>
  )
}

export default ManageRestaurantPage;