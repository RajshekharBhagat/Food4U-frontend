import { useCreateRestaurant, useGetRestaurant, useUpdateRestaurant } from "@/api/RestaurantApi";
import ManageRestaurantForm from "@/forms/restaurant-form/ManageRestaurantForm";

const ManageRestaurantPage = () => {

  const {createRestaurant,isLoading: isCreateLoading} = useCreateRestaurant();
  const { restaurant} = useGetRestaurant();
  const { updateRestaurant, isLoading: isUpdateLoading} = useUpdateRestaurant();

  const isEditing = !!restaurant;

  return (
     <ManageRestaurantForm 
        restaurant={restaurant} 
        onSave={
        isEditing ? updateRestaurant : createRestaurant
        } 
        isLoading={
         isCreateLoading || isUpdateLoading 
        }
     />
  )
}

export default ManageRestaurantPage;